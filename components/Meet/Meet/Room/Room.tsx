import MediaContext from '@/components/Meet/Meet/State/MediaContext'
import api from '@/components/lib/api';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { SocketContext } from '@/components/context/SocketContext';
import { useSearchParams } from 'next/navigation';
import { memo, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import JoinMeetingRequest from './JoinMeetingRequest';
import { createCustomStream } from '../../type';
import { streamContextDto } from '../../types';
import MeetingRoom from './MeetingRoom';


const Room = () => {
    const { socket, myPeer }: any = useContext(SocketContext);
    const userSelector = useSelector((state: any) => state?.userSliceReducer);
    const meetingSelector = useSelector((state: any) => state?.meetingSliceReducer);
    const param = useSearchParams();
    const ref = useRef<HTMLVideoElement>(null)
    // @ts-ignore
    const { Navigator, setNavigator, pinnedParticipants, setAbsentParticipantsDetails, meetingId, setMeetingId, opponentNonMediaStreamStream, setOpponentNonMediaStreamStream, participantsDetails, setParticipantsDetails, opponentStream, setOpponentStream, isJoinMeetPage, setIsJoinMeetPage, MediaActions, myStream, setMyStream, video, setVideo, audio, setAudio } = useContext<streamContextDto>(MediaContext)

    const { data, isLoading, refetch: refetchAllActivePArticipants } = useQuery(["get-all-active-participants", meetingId], () => {
        return api.get(`/meet/get-all-active-not-active-participants?meetingId=${meetingId}&isActive=true`)
    },
        {
            onSuccess({ data }) {
                console.log(data)
                var temp = {};
                data && Array.isArray(data) && data?.map((participant: { participantId: string }, i: number) => {
                    // @ts-ignore
                    temp[participant?.participantId] = participant
                    // Object.defineProperty(temp, participant?.participantId, {value : participant, writable : true})
                })
                console.log(temp)
                setParticipantsDetails(temp)
            },
            onError(err: any) {
                toast?.error(err?.response?.data?.message)
            },
            enabled: Boolean(meetingId && (!isJoinMeetPage)),
            keepPreviousData: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false
        }
    )
    const { data: AbsentUser, isLoading: AbsentUserLoading, refetch: refetchAllDisActiveParticipants } = useQuery(["get-all-not-active-participants", meetingId], () => {
        return api.get(`/meet/get-all-active-not-active-participants?meetingId=${meetingId}&isActive=false`)
    },
        {
            onSuccess({ data }) {
                console.log(data)
                setAbsentParticipantsDetails(data)
            },
            onError(err: any) {
                toast?.error(err?.response?.data?.message)
            },
            enabled: Boolean(meetingId && (!isJoinMeetPage)),
            keepPreviousData: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false
        }
    )

    useEffect(() => {
        if (meetingId) {
            setMeetingId(param?.get("id"))
            console.log("================= mounted  ===============")
        }
    }, [meetingId])

    useEffect(() => {
        if (window && window?.navigator) {
            setNavigator(window?.navigator)
        }
    }, [window, window?.navigator])

    useEffect(() => {
        if (ref.current && myStream?.active) {
            ref.current.srcObject = myStream
        }
    }, [myStream, ref, isJoinMeetPage])

    const mediaAction = useCallback((isVideoOn: boolean, isAudioOn: boolean): Promise<MediaStream> => {
        return new Promise((resolve, reject) => {
            console.log("==================================")
            // @ts-ignore
            if (Navigator && Navigator?.mediaDevices && Navigator?.mediaDevices?.getUserMedia) {
                // @ts-ignore
                var getUserMedia = Navigator.getUserMedia || Navigator.webkitGetUserMedia || Navigator.mozGetUserMedia;
                getUserMedia({ video: isVideoOn, audio: isAudioOn }, function (stream: MediaStream) {
                    resolve(stream);
                }, function (err: any) {
                    toast.error(err);
                });
            } else {
                toast.error("getUserMedia not supported");
            }
        });
    }, [Navigator])

    // to on-off video or audio and to set myStream
    useEffect(() => {
        if (!isJoinMeetPage && participantsDetails && myPeer && socket) {
            if ((video || audio)) {
                mediaAction(video, audio).then((stream: MediaStream) => {

                    Promise.all(Object?.keys(participantsDetails)?.map((participantId: any, i: number) => {
                        console.log("sending-media-stream")
                        console.log(stream)
                        console.log({ video, audio })
                        socket.emit(`sending-stream`, { type: "sending-media-stream", opponentId: userSelector?.userId, sendingTo: participantId, meetingId });
                        handelOpponentStreamCall(participantId, stream)
                        setMyStream(stream)
                    }))
                })
            } else {
                const customVideoStream = createCustomStream()
                setMyStream(customVideoStream)
                Promise.all(Object?.keys(participantsDetails)?.map((participantId: any, i: number) => {
                    socket.emit(`sending-stream`, { type: "sending-non-custom-created-media-stream", opponentId: userSelector?.userId, sendingTo: participantId, meetingId });
                    handelOpponentStreamCall(participantId, customVideoStream)
                }))
            }
        }
    }
        , [video, audio, isJoinMeetPage, participantsDetails, myPeer, socket, mediaAction])

    useEffect(() => {
        if (socket && myPeer && (!isJoinMeetPage)) {
            myPeer.on("call", function (call: any) {
                console.log("recieved call")
                console.log({ audio, video, call })
                console.log("call by => ", call?.peer)
                var peerId = call.peer
                if (myStream.active && (video || audio)) {
                    console.log("answering active stream")
                    socket.emit(`sending-stream`, { type: "sending-media-stream", opponentId: userSelector?.userId, sendingTo: peerId, meetingId });
                    call.answer(myStream)
                } else {
                    console.log("answering custom created stream")
                    socket.emit(`sending-stream`, { type: "sending-non-custom-created-media-stream", opponentId: userSelector?.userId, sendingTo: peerId, meetingId });
                    // const customAudioStream = createCustomStream()
                    call.answer(myStream)
                }
                call.on('stream', function (remoteStream: MediaStream) {
                    console.log("recieved opponent stream");
                    console.log(remoteStream);
                    const temp: any = {}
                    temp[peerId] = remoteStream;
                    setOpponentStream((prev: any) => {
                        return (
                            {
                                ...prev,
                                ...temp,
                            }
                        )
                    })
                });
            })
        }
    }, [socket, myPeer, userSelector?.userId, audio, video, myStream, isJoinMeetPage])

    // useEffect(() => {
    //     if (myPeer && (!isJoinMeetPage)) {
    //         console.log({ myPeer })
    //         myPeer.on('connection', function (conn: any) {
    //             conn.on('data', function (data: any) {
    //                 console.log("recieved data from peer");
    //                 console.log(data);
    //                 handelPeerSendData(data)
    //             });
    //         });
    //     }
    // }, [myPeer, isJoinMeetPage])

    const handelSendingNonMediaStream = (opponentId: string) => {
        console.log("handelNonMediaStream")
        console.log(opponentNonMediaStreamStream)
        setOpponentNonMediaStreamStream((prev: Array<string>) => {
            if (!prev.includes(opponentId)) {
                return [...prev, opponentId]
            } else {
                return prev
            }
        }
        )
    }

    const handelSendingMediaStream = (opponentId: string) => {
        console.log("handelSendingMediaStream")
        setOpponentNonMediaStreamStream((prev: Array<String>) => {
            if (prev.includes(opponentId)) {
                return prev.filter(id => id != opponentId)
            }
            else {
                return prev
            }
        })
    }

    // const peerDataConnection = (data: any, opponentId: string) => {
    //     var conn = myPeer.connect(opponentId);
    //     console.log("connecting to " + opponentId)
    //     conn.on('open', function () {
    //         conn.send(data);
    //     })
    // }

    // console.log({ opponentNonMediaStreamStream, opponentStream, myStream })

    const handelOpponentStreamCall = (joinedUserId: string, stream: MediaStream) => {
        //     setMyStream(stream)

        console.log("calling to " + joinedUserId)
        const call = myPeer.call(joinedUserId, stream);

        call.on("stream", function (remoteStream: MediaStream) {
            console.log("recieved stream from ")
            const temp: any = {}
            console.log("setting remote stream of  " + joinedUserId);
            temp[joinedUserId] = remoteStream;
            setOpponentStream((prev: any) => {
                return (
                    {
                        ...prev,
                        ...temp,
                    }
                )
            })
        })
    }


    // const handelCall = (joinedUserId: string) => {
    //     console.log("handel  call")
    //     console.log(audio, video)
    //     if (video || audio) {
    //         socket.emit(`sending-stream`, { type: "sending-media-stream", opponentId: userSelector?.userId, sendingTo: joinedUserId });
    //         var getUserMedia = Navigator.getUserMedia || Navigator.webkitGetUserMedia || Navigator.mozGetUserMedia;
    //         getUserMedia({ video: video, audio: audio }, function (stream: MediaStream) {
    //             // calling to joined user
    //             console.log("sending stream")
    //             console.log(stream)
    //             handelOpponentStreamCall(joinedUserId, stream)
    //             setMyStream(stream)
    //         })
    //     } else {
    //         console.log("sending custom created stream")
    //         socket.emit(`sending-stream`, { type: "sending-non-custom-created-media-stream", opponentId: userSelector?.userId, sendingTo: joinedUserId, meetingId });
    //         const customAudioStream = createCustomStream()
    //         handelOpponentStreamCall(joinedUserId, customAudioStream)
    //     }
    // }

    // const handelJoin = (joinedUserId: string) => {
    //     console.log("handel  join")
    //     console.log(meetingSelector)
    //     if (video || audio) {
    //         handelCall(joinedUserId)
    //     }
    // }

    // const handelCallAllParticipants = (data: any) => {
    //     Promise.all(data?.participants?.map((participant: any, i: number) => {
    //         handelCall(participant?.participantId)
    //     }))
    // }

    const handelParticipantsLefMeeting = (data: any) => {
        const { leftUserId } = data
        refetchAllActivePArticipants()
        if (leftUserId) {
            setOpponentNonMediaStreamStream((prev: any) => prev.filter((id: string) => id === leftUserId))
            setOpponentStream((prev: any) => {
                const temp = prev;
                delete temp[leftUserId];
                return temp
            })
        }
    }
    const notificationHandler = (data: any) => {
        console.log("handel notify", data)
        console.log(data?.type === "establish-connect")
        switch (data?.type) {
            case "establish-connect":
                setIsJoinMeetPage(false)
                refetchAllActivePArticipants()
                refetchAllDisActiveParticipants()
                // handelCallAllParticipants(data)
                break;
            case "new-participants-joined-meeting":
                if (!isJoinMeetPage) {
                    refetchAllActivePArticipants()
                    refetchAllDisActiveParticipants()
                    toast.success((data?.name ?? "new user") + " joined meeting")
                }
                break;
            case "participants-left-meeting":
                if (!isJoinMeetPage) {
                    refetchAllActivePArticipants()
                    refetchAllDisActiveParticipants()
                    handelParticipantsLefMeeting(data)
                    toast.error((data?.name ?? "new user") + " left meeting")
                }
                break;
            case "sending-non-custom-created-media-stream":
                if (!isJoinMeetPage) {
                    handelSendingNonMediaStream(data?.opponentId)
                }
                break;
            case "sending-media-stream":
                if (!isJoinMeetPage) {
                    handelSendingMediaStream(data?.opponentId)
                }
                break;
        }
    }

    useEffect(() => {
        if (socket && myPeer?._id && userSelector.userId && meetingId) {
            socket.on(`${meetingId}-notify`, notificationHandler)
            socket.on(`${userSelector?.userId}-notify`, notificationHandler)
            socket.on(`${userSelector?.userId}-meet-join-notification`, notificationHandler)

            return () => {
                socket.off(`${meetingId}-notify`, notificationHandler)
                socket.off(`${userSelector?.userId}-meet-join-notification`, notificationHandler)
            }
        }
    }, [socket, myPeer?._id, userSelector.userId, meetingId, meetingSelector.audio, video, isJoinMeetPage])

    const handleJoinMeet = async () => {
        if (meetingId) {
            socket?.emit("joinMeet", { meetingId })
        }
    }

    console.log({ pinnedParticipants })

    return (

        <>
            {isJoinMeetPage ?
                <JoinMeetingRequest handleJoinMeet={handleJoinMeet} />
                :
                <div className='w-[100hv - 50px] h-[100vw] overflow-hidden flex flex-col'>
                    {/* <div className='w-full flex'>
                        {video &&
                            <div className='m-2 border border-slate-500 cursor-pointer rounded-full p-2'
                                onClick={() => {
                                    console.log("tying to off video ")
                                    setVideo(false)
                                    // MediaController(false, audio)
                                }}
                            >
                                <VideoICameraIco height={30} width={30} />
                            </div>
                        }
                        {!video &&
                            <div className='m-2 border border-slate-500 cursor-pointer rounded-full p-2'
                                onClick={() => {
                                    console.log("tying to on video ")
                                    setVideo(true)
                                    // MediaController(true, audio)
                                }}
                            >
                                <VideoSlashIco height={30} width={30} />
                            </div>
                        }
                        {!audio && <div className='m-2 border border-slate-500 cursor-pointer rounded-full p-2'
                            onClick={() => {
                                setAudio(true)
                                // MediaController(video, true)
                            }}
                        >
                            <UnMuteIco height={25} width={25} />
                        </div>}
                        {audio &&
                            <div className='m-2 border border-slate-500 cursor-pointer rounded-full p-2'
                                onClick={() => {
                                    setAudio(false)
                                    if (video) {
                                        // MediaController(video, false)
                                    }
                                }}
                            >
                                <VoiceMikeIco height={25} width={25} />
                            </div>
                        }
                    </div> */}
                    <MeetingRoom />
                </div>
            }
        </>
    )
}

export default memo(Room)
