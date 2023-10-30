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
import { messageDto, streamContextDto } from '../../types';
import MeetingRoom from './MeetingRoom';
import Peer from 'peerjs';


const Room = () => {
    const { socket, myPeer, myScreenPeer }: any = useContext(SocketContext);
    const userSelector = useSelector((state: any) => state?.userSliceReducer);
    const meetingSelector = useSelector((state: any) => state?.meetingSliceReducer);
    const param = useSearchParams();
    const ref = useRef<HTMLVideoElement>(null)
    // @ts-ignore
    const { opponentScreenShareStream, setOpponentScreenShareStrem, setMyScreenShareStream, myScreenShareStream, isScreenShare, setIsScreenShare, setMessages, messages, setHandRaisedUser, HandRaisedUser, Navigator, setNavigator, pinnedParticipants, setAbsentParticipantsDetails, meetingId, setMeetingId, opponentNonMediaStreamStream, setOpponentNonMediaStreamStream, participantsDetails, setParticipantsDetails, opponentStream, setOpponentStream, isJoinMeetPage, setIsJoinMeetPage, MediaActions, myStream, setMyStream, video, setVideo, audio, setAudio } = useContext<streamContextDto>(MediaContext)

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
        if (typeof window !== 'undefined' && userSelector?.userId && window?.navigator) {
            setNavigator(window?.navigator)
        }
    }, [userSelector?.userId, socket, myPeer])

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
                if (!getUserMedia) {
                    return;
                }
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

    console.log({ opponentScreenShareStream, opponentNonMediaStreamStream, opponentStream , myStream})

    // calling - screen share
    useEffect(() => {
        if (!isJoinMeetPage && participantsDetails && myScreenPeer && socket) {
            if (isScreenShare) {
                Navigator.mediaDevices.getDisplayMedia({ video: { mediaSource: "screen" }, audio: false })
                    .then((stream: MediaStream) => {
                        Promise.all(Object?.keys(participantsDetails)?.map((participantId: any, i: number) => {
                            console.log("sending-screen-share-stream")
                            handelOpponentStreamCall(`${participantId}-screen-share`, stream, myScreenPeer)
                            // socket.emit(`sending-stream`, { type: "sending-media-stream", opponentId: userSelector?.userId, sendingTo: participantId, meetingId });
                        }))
                        setMyScreenShareStream(stream)
                    })
            }
            // else {
            //     const customVideoStream = createCustomStream()
            //     setMyStream(customVideoStream)
            //     Promise.all(Object?.keys(participantsDetails)?.map((participantId: any, i: number) => {
            //         socket.emit(`sending-stream`, { type: "sending-non-custom-created-media-stream", opponentId: userSelector?.userId, sendingTo: participantId, meetingId });
            //         handelOpponentStreamCall(participantId, customVideoStream, myScreenPeer)
            //     }))
            // }
        }
    }
        , [isScreenShare, isJoinMeetPage, participantsDetails, myScreenPeer, socket, mediaAction])
    // recieving - screen stream
    useEffect(() => {
        if (socket && myPeer && (!isJoinMeetPage)) {
            myScreenPeer?.on("call", function (call: any) {
                var peerId = call?.peer
                if (myScreenShareStream && myScreenShareStream?.active && isScreenShare) {
                    console.log("answering active stream")
                    socket.emit(`sending-stream`, { type: "sending-media-stream", opponentId: userSelector?.userId, sendingTo: peerId, meetingId });
                    call?.answer(myScreenShareStream)
                } else {
                    console.log("answering custom created stream")
                    socket.emit(`sending-stream`, { type: "sending-non-custom-created-media-stream", opponentId: userSelector?.userId, sendingTo: peerId, meetingId });
                    const customAudioStream = createCustomStream()
                    call?.answer(customAudioStream)
                }
                call.on('stream', function (remoteStream: MediaStream) {
                    console.log("recieved opponent screen stream");
                    console.log(remoteStream.getTracks());
                    const temp: any = {}
                    temp[peerId] = remoteStream;
                    const remoteStreamTrack = remoteStream.getTracks()
                    setOpponentScreenShareStrem((prev: any) => {
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
    }, [socket, myScreenPeer, userSelector?.userId, audio, video, myStream, isJoinMeetPage, myScreenShareStream])


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
                        handelOpponentStreamCall(participantId, stream, myPeer)
                    }))
                    if(myStream){
                        const tracks = myStream.getTracks()
                        tracks.forEach((track) => {
                            track.stop()
                        })
                    }
                    setMyStream(stream)
                })
            } else {
                const customVideoStream = createCustomStream()
                setMyStream(customVideoStream)
                Promise.all(Object?.keys(participantsDetails)?.map((participantId: any, i: number) => {
                    socket.emit(`sending-stream`, { type: "sending-non-custom-created-media-stream", opponentId: userSelector?.userId, sendingTo: participantId, meetingId });
                    handelOpponentStreamCall(participantId, customVideoStream, myPeer)
                }))
            }
        }
    }
        , [video, audio, isJoinMeetPage, participantsDetails, myPeer, socket, mediaAction])

    useEffect(() => {
        console.log("myStream changed")
        console.log(myStream)
    }, [myStream])

    // useEffect(() => {
    // if (!isJoinMeetPage && isScreenShare) {
    //     console.log("sending-screen-stream")
    //     Promise.all(Object?.keys(participantsDetails)?.map((participantId: any, i: number) => {
    //         socket?.emit(`sending-stream`, { type: "sending-media-stream", opponentId: userSelector?.userId, sendingTo: participantId, meetingId });
    //         handelOpponentStreamCall(participantId, myStream)
    //     }))
    // }
    // else if (!isJoinMeetPage && !isScreenShare && myStream) {
    //     console.log("sending-screen-stream")
    //     let tracks = myStream.getTracks()
    //     if (tracks.length == 0) {
    //         Promise.all(Object?.keys(participantsDetails)?.map((participantId: any, i: number) => {
    //             socket?.emit(`sending-stream`, { type: "sending-non-custom-created-media-stream", opponentId: userSelector?.userId, sendingTo: participantId, meetingId });
    //             handelOpponentStreamCall(participantId, myStream)
    //         }))
    //     } else {
    //         Promise.all(Object?.keys(participantsDetails)?.map((participantId: any, i: number) => {
    //             console.log("sending-media-stream")
    //             socket?.emit(`sending-stream`, { type: "sending-media-stream", opponentId: userSelector?.userId, sendingTo: participantId, meetingId });
    //             handelOpponentStreamCall(participantId, myStream)
    //         }))
    //     }
    // }
    // }, [socket, myPeer, isJoinMeetPage, isScreenShare, startScreenShare, myStream])

    useEffect(() => {
        if (socket && myPeer && (!isJoinMeetPage)) {
            myPeer?.on("call", function (call: any) {
                var peerId = call?.peer
                if (myStream && myStream?.active && (video || audio || isScreenShare)) {
                    console.log("answering active stream")
                    socket.emit(`sending-stream`, { type: "sending-media-stream", opponentId: userSelector?.userId, sendingTo: peerId, meetingId });
                    call?.answer(myStream)
                } else {
                    console.log("answering custom created stream")
                    socket.emit(`sending-stream`, { type: "sending-non-custom-created-media-stream", opponentId: userSelector?.userId, sendingTo: peerId, meetingId });
                    // const customAudioStream = createCustomStream()
                    call?.answer(myStream)
                }
                call.on('stream', function (remoteStream: MediaStream) {
                    console.log("recieved opponent stream");
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
    }, [socket, myPeer, userSelector?.userId, audio, video, myStream, isJoinMeetPage, myScreenShareStream])

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

    const handelSendingNonMediaStream = (opponentId: string, screenShareStreamId: string) => {
        console.log("handelNonMediaStream")
        const temp: any = {};
        temp[opponentId] = screenShareStreamId;
        setOpponentNonMediaStreamStream((prev: Array<string>) => {
            if (!prev.includes(opponentId)) {
                return [...prev, opponentId]
            } else {
                return prev
            }
        }
        )
    }

    const handelSendingMediaStream = (opponentId: string, screenShareStreamId: string) => {
        console.log("handelSendingMediaStream")
        const temp: any = {};
        temp[opponentId] = screenShareStreamId;
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

    const handelOpponentStreamCall = (joinedUserId: string, stream: MediaStream, peer: Peer) => {
        //     setMyStream(stream)

        if (!joinedUserId) {
            return;
        }
        console.log("calling to " + joinedUserId)
        const call = peer?.call(joinedUserId, stream);

        call?.on("stream", function (remoteStream: MediaStream) {
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

    const handelMessage = (data: messageDto) => {
        setMessages((prev: any) => {
            const temp = [data, ...prev]
            temp?.sort((a, b) => (new Date(a.createdAt) === new Date(b.createdAt)) ? 0 : (new Date(a.createdAt) > new Date(b.createdAt)) ? -1 : 1);
            return temp.reverse()
        })
    }

    const notificationHandler = useCallback((data: any) => {
        console.log("handel notify", data)
        console.log({ isJoinMeetPage })
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
                    setHandRaisedUser((prev: any) => prev.filter((id: string) => id !== data?.leftUserId))
                    toast.error((data?.name ?? "new user") + " left meeting")
                }
                break;
            case "sending-non-custom-created-media-stream":
                if (!isJoinMeetPage) {
                    handelSendingNonMediaStream(data?.opponentId, data?.screenShareStreamId)
                }
                break;
            case "sending-media-stream":
                if (!isJoinMeetPage) {
                    handelSendingMediaStream(data?.opponentId, data?.screenShareStreamId)
                }
                break;
            case "emoji-reactions":
                if (!isJoinMeetPage) {
                    console.log()
                    toast.success(`${participantsDetails?.[data?.userId]?.userName} reacted ${data?.emoji}`)
                }
                break;
            case "is-raise-my-hand":
                console.log(data)
                console.log(isJoinMeetPage)
                if (!isJoinMeetPage) {
                    if (data?.isRaiseMyHand === true) {
                        console.log("setting userId")
                        setHandRaisedUser((prev: any) => [data?.userId, ...prev])
                    } else if (data?.isRaiseMyHand === false) {
                        console.log("removing userId")
                        setHandRaisedUser((prev: any) => prev.filter((id: string) => id !== data?.userId))
                    }
                }
                break;
            case "message":
                if (!isJoinMeetPage) {
                    handelMessage(data);
                }
                break;
        }
    }, [isJoinMeetPage, userSelector])

    useEffect(() => {
        if (socket && myPeer?._id && userSelector.userId && meetingId) {
            socket?.on(`${meetingId}-notify`, notificationHandler)
            socket?.on(`${userSelector?.userId}-notify`, notificationHandler)
            socket?.on(`${userSelector?.userId}-meet-join-notification`, notificationHandler)

            return () => {
                socket?.off(`${meetingId}-notify`, notificationHandler)
                socket?.off(`${userSelector?.userId}-meet-join-notification`, notificationHandler)
            }
        }
    }, [socket, myPeer?._id, userSelector.userId, meetingId, meetingSelector.audio, video, isJoinMeetPage])

    const handleJoinMeet = async () => {
        if (meetingId) {
            socket?.emit("joinMeet", { meetingId })
        }
    }


    return (
        <>
            {isJoinMeetPage ?
                <JoinMeetingRequest handleJoinMeet={handleJoinMeet} />
                :
                <div className='w-[100hv - 50px] h-[100vw] overflow-hidden flex flex-col'>
                    <MeetingRoom />
                </div>
            }
        </>
    )
}

export default memo(Room)
