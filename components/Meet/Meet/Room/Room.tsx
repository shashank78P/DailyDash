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
    const myVideoRef = useRef<HTMLVideoElement>();
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
                    toast.error(err?.message ?? "getUserMedia not supported");
                });
            } else {
                toast.error("getUserMedia not supported");
            }
        });
    }, [Navigator])

    console.log({ opponentScreenShareStream, opponentNonMediaStreamStream, opponentStream, myScreenShareStream, myStream })

    useEffect(() => {
        if (!myScreenShareStream?.active) {
            console.log("turned off screen share")
        }
    }, [myScreenShareStream?.active, myScreenShareStream])

    // calling - screen share
    useEffect(() => {
        if (!isJoinMeetPage && participantsDetails && myScreenPeer && socket) {
            if (isScreenShare && !myScreenShareStream) {
                Navigator.mediaDevices.getDisplayMedia({ video: { mediaSource: "screen" }, audio: false })
                    .then((stream: MediaStream) => {

                        const videoTrack = stream.getVideoTracks()[0];
                        videoTrack.onended = function () {
                            console.log("Screen sharing has been turned off");
                            setIsScreenShare(false)
                            setMyScreenShareStream(null)
                            socket.emit("screen-share-stop", { meetingId, userId: userSelector?.userId })
                        };
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
        , [isScreenShare, isJoinMeetPage, participantsDetails, myScreenPeer, socket])
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
                    console.log(remoteStream);
                    const temp: any = {}
                    temp[peerId] = remoteStream;
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
    }, [socket, myScreenPeer, userSelector?.userId, isScreenShare, isJoinMeetPage, myScreenShareStream])


    // to on-off video or audio and to set myStream
    useEffect(() => {
        if (!isJoinMeetPage && participantsDetails && myPeer && socket) {
            if (video || audio) {
                mediaAction(video, audio).then((stream: MediaStream) => {
                    Promise.all(Object?.keys(participantsDetails)?.map((participantId: any, i: number) => {
                        console.log("sending-media-stream")
                        console.log(stream)
                        console.log({ video, audio })
                        // const tracks = myStream.getTracks()
                        // tracks?.map((track , i)=>{
                        //     track?.stop()
                        // })
                        socket.emit(`sending-stream`, { type: "sending-media-stream", opponentId: userSelector?.userId, sendingTo: participantId, meetingId });
                        handelOpponentStreamCall(participantId, stream, myPeer)
                        setMyStream(stream)
                    }))
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
        if (socket && myPeer && (!isJoinMeetPage)) {
            myPeer?.on("call", function (call: any) {
                console.log({ video, audio })
                console.log("recieved call")
                console.log("call by => ", call?.peer)
                var peerId = call.peer
                const currentMyStream: any = myVideoRef?.current?.srcObject;
                if (currentMyStream?.active && (video || audio)) {
                    console.log("answering active stream")
                    console.log(currentMyStream)
                    socket.emit(`sending-stream`, { type: "sending-media-stream", opponentId: userSelector?.userId, sendingTo: peerId, meetingId });
                    call.answer(currentMyStream)
                } else {
                    console.log("answering custom created stream")
                    console.log(currentMyStream)
                    socket.emit(`sending-stream`, { type: "sending-non-custom-created-media-stream", opponentId: userSelector?.userId, sendingTo: peerId, meetingId });
                    // const customAudioStream = createCustomStream()
                    call.answer(currentMyStream)
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
    }, [socket, myPeer, userSelector?.userId, isJoinMeetPage, myStream, video, audio])


    useEffect(() => {
        console.log("myStream changed")
        console.log(myStream)
    }, [myStream])


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

    const handelOpponentStreamCall = useCallback((joinedUserId: string, stream: MediaStream, peer: Peer) => {
        //     setMyStream(stream)

        if (!joinedUserId) {
            return;
        }
        console.log("calling to " + joinedUserId)
        const call = peer?.call(joinedUserId, stream);

        call?.on("stream", function (remoteStream: MediaStream) {
            console.log("recieved stream response ")
            console.log("setting remote stream of  " + joinedUserId);
            const temp: any = {}
            console.log(remoteStream)
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
    }, [])

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
                console.log("participants-left-meeting")
                console.log(isJoinMeetPage)
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
            case "screen-share-stop":
                if (!isJoinMeetPage) {
                    setOpponentScreenShareStrem((prev: any) => {
                        const temp = prev;
                        delete prev[`${data?.userId}-screen-share`]
                        return temp;
                    })
                }
                break;
            case "emoji-reactions":
                if (!isJoinMeetPage) {
                    console.log(participantsDetails, data?.userId)
                    console.log(participantsDetails?.[data?.userId]?.userName)
                    toast.success(`${participantsDetails?.[data?.userId]?.userName ?? ""} reacted ${data?.emoji}`)
                }
                break;
            case "is-raise-my-hand":
                console.log(data)
                console.log(isJoinMeetPage)
                if (!isJoinMeetPage) {
                    if (data?.isRaiseMyHand == true) {
                        console.log("setting userId")
                        setHandRaisedUser((prev: any) => [data?.userId, ...prev])
                    } else if (data?.isRaiseMyHand == false) {
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
    }, [isJoinMeetPage, userSelector,participantsDetails])

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
                <div className='w-full h-screen flex flex-col'>
                    <MeetingRoom myVideoRef={myVideoRef} />
                </div>
            }
        </>
    )
}

export default memo(Room)
