import MediaContext from '@/components/Meet/Meet/State/MediaContext'
import api from '@/components/lib/api';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { SocketContext } from '@/components/context/SocketContext';
import { meetingAction } from '@/components/store/slice/meetingSlice';
import { useSearchParams } from 'next/navigation';
import { memo, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import JoinMeetingRequest from './JoinMeetingRequest';
import { createCustomStream, mediaAction } from '../../type';
import UnMuteIco from '@/components/assets/UnMuteIco';
import VideoSlashIco from '@/components/assets/VideoSlashIco';
import VoiceMikeIco from '@/components/assets/VoiceMikeIco';
import VideoICameraIco from '@/components/assets/VideoICameraIco';
import { streamContextDto } from '../../types';


const Room = () => {
    const [meetingId, setMeetingId] = useState<String | null>(null)
    const { socket, myPeer }: any = useContext(SocketContext);
    const userSelector = useSelector((state: any) => state?.userSliceReducer);
    const meetingSelector = useSelector((state: any) => state?.meetingSliceReducer);
    const param = useSearchParams();
    let dispatch = useDispatch();
    const ref = useRef<HTMLVideoElement>(null)
    const oppo = useRef<HTMLVideoElement>(null)
    const { opponentNonMediaStreamStream, setOpponentNonMediaStreamStream, participantsDetails, setParticipantsDetails, opponentStream, setOpponentStream, isJoinMeetPage, setIsJoinMeetPage, MediaActions, myStream, setMyStream, video, setVideo, audio, setAudio } = useContext<streamContextDto>(MediaContext)

    const { data, isLoading, refetch: refetchAllActivePArticipants } = useQuery(["join-meet", meetingId], () => {
        return api.get(`/meet/get-all-active-participants?meetingId=${meetingId}`)
    },
        {
            onSuccess({ data }) {
                console.log(data)
                setParticipantsDetails(data)
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
        setMeetingId(param?.get("id"))
        console.log("================= mounted  ===============")
    }, [])
    useEffect(() => {
        if (opponentStream) {
            console.log("called to set stream to oppo video tag")
            let keys = Object?.keys(opponentStream)
            const opponentStreamContainer = document.getElementById("opponentStream")
            const div = (document.createElement("div"))
            keys.forEach(key => {
                console.log({ key, opponentNonMediaStreamStream, opponentStream })
                if (opponentNonMediaStreamStream.includes(key)) {
                    console.log(key + " is non-media ")
                } else {
                    const h1Element = document.createElement("h1")
                    const videoElement = document.createElement("video")
                    videoElement.setAttribute("height", "100px")
                    videoElement.setAttribute("height", "100px")
                    videoElement.setAttribute("autoPlay", "true")
                    videoElement.setAttribute("controls", "true")
                    console.log("setting stream to oppo video tag")
                    h1Element.innerText = key
                    videoElement.srcObject = opponentStream[key]
                    div?.appendChild(h1Element)
                    div?.appendChild(videoElement)
                }
            });
            opponentStreamContainer?.replaceChildren(div)
        }
    }, [opponentStream, Object.keys(opponentStream), opponentNonMediaStreamStream])

    useEffect(() => {
        if (ref.current && myStream?.active) {
            ref.current.srcObject = myStream
        }
    }, [myStream, ref, isJoinMeetPage])

    // to on-off video or audio and to set myStream
    useEffect(() => {
        if (!isJoinMeetPage && participantsDetails && Array.isArray(participantsDetails) && myPeer && socket) {
            if ((video || audio)) {
                mediaAction(video, audio).then((stream) => {
                    Promise.all(participantsDetails?.map((participant: any, i: number) => {
                        console.log("sending-media-stream")
                        console.log(stream)
                        console.log({video , audio})
                        peerDataConnection({ type: "sending-media-stream", opponentId: userSelector?.userId }, participant?.participantId);
                        handelOpponentStreamCall(participant?.participantId, stream)
                        setMyStream(stream)
                    }))
                })
            } else {
                Promise.all(participantsDetails?.map((participant: any, i: number) => {
                    peerDataConnection({ type: "sending-non-custom-created-media-stream", opponentId: userSelector?.userId }, participant?.participantId);
                    const customVideoStream = createCustomStream()
                    setMyStream(customVideoStream)
                    handelOpponentStreamCall(participant?.participantId, customVideoStream)
                }))
            }
        }
    }
        , [video, audio, isJoinMeetPage, participantsDetails , myPeer , socket])

    useEffect(() => {
        if (socket && myPeer && (!isJoinMeetPage)) {
            myPeer.on("call", function (call: any) {
                console.log("recieved call")
                console.log({ audio, video, call })
                console.log("call by => ", call?.peer)
                var peerId = call.peer
                if (myStream.active && (video || audio)) {
                    console.log("answering active stream")
                    peerDataConnection({ type: "sending-media-stream", opponentId: userSelector?.userId }, peerId);
                    call.answer(myStream)
                } else {
                    console.log("answering custom created stream")
                    peerDataConnection({ type: "sending-non-custom-created-media-stream", opponentId: userSelector?.userId }, peerId);
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

    useEffect(() => {
        if (myPeer && (!isJoinMeetPage)) {
            console.log({ myPeer })
            myPeer.on('connection', function (conn: any) {
                conn.on('data', function (data: any) {
                    console.log("recieved data from peer");
                    console.log(data);
                    handelPeerSendData(data)
                });
            });
        }
    }, [myPeer, isJoinMeetPage])

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

    const handelPeerSendData = (data: any) => {
        switch (data?.type) {
            case "sending-non-custom-created-media-stream":
                handelSendingNonMediaStream(data?.opponentId)
                break;
            case "sending-media-stream":
                handelSendingMediaStream(data?.opponentId)
                break;
        }
    }

    const peerDataConnection = (data: any, opponentId: string) => {
        var conn = myPeer.connect(opponentId);
        console.log("connecting to " + opponentId)
        conn.on('open', function () {
            conn.send(data);
        })
    }

    console.log({ opponentNonMediaStreamStream, opponentStream, myStream })

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


    const handelCall = (joinedUserId: string) => {
        console.log("handel  call")
        console.log(audio, video)
        if (video || audio) {
            peerDataConnection({ type: "sending-media-stream", opponentId: userSelector?.userId }, joinedUserId);
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            getUserMedia({ video: video, audio: audio }, function (stream: MediaStream) {
                // calling to joined user
                console.log("sending stream")
                console.log(stream)
                handelOpponentStreamCall(joinedUserId, stream)
                // removing joined user id from opponentNonMediaStreamStream
                // setOpponentNonMediaStreamStream((prev: Array<String>) => {
                //     if (prev.includes(joinedUserId)) {
                //         return prev.filter(id => id !== joinedUserId)
                //     }
                //     else {
                //         return prev
                //     }
                // })
                setMyStream(stream)
            })
        } else {
            console.log("sending custom created stream")
            peerDataConnection({ type: "sending-non-custom-created-media-stream", opponentId: userSelector?.userId }, joinedUserId);
            const customAudioStream = createCustomStream()
            handelOpponentStreamCall(joinedUserId, customAudioStream)
        }
    }

    const handelJoin = (joinedUserId: string) => {
        console.log("handel  join")
        console.log(meetingSelector)
        if (video || audio) {
            handelCall(joinedUserId)
        }
    }

    const handelCallAllParticipants = (data: any) => {
        Promise.all(data?.participants?.map((participant: any, i: number) => {
            handelCall(participant?.participantId)
        }))
    }

    const notificationHandler = (data: any) => {
        console.log("handel notify", data)
        console.log(data?.type === "establish-connect")
        switch (data?.type) {
            case "establish-connect":
                setIsJoinMeetPage(false)
                // handelCallAllParticipants(data)
                break;
            // case "non-video-stream":

        }
    }

    console.log({ isJoinMeetPage, myStream })
    const startMedia = () => {
        setAudio(true)
        setVideo(true)
    }

    useEffect(() => {
        if (socket && myPeer?._id && userSelector.userId && meetingId) {
            // socket.emit("joined-meeting", { userId: userSelector.userId, meetingId })
        }
    }, [socket, myPeer?._id, userSelector.userId, meetingId, myStream])

    useEffect(() => {
        if (socket && myPeer?._id && userSelector.userId && meetingId) {
            socket.on(`${meetingId}-notify`, notificationHandler)
            socket.on(`${userSelector?.userId}-meet-join-notification`, notificationHandler)

            return () => {
                socket.off(`${meetingId}-notify`, notificationHandler)
                socket.off(`${userSelector?.userId}-meet-join-notification`, notificationHandler)
            }
        }
    }, [socket, myPeer?._id, userSelector.userId, meetingId, meetingSelector.audio, video])

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
                <div>
                    <div className='w-full flex'>
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
                    </div>
                    <video width={200} height={150} ref={ref} autoPlay controls />
                    <video width={200} height={150} ref={oppo} autoPlay controls />
                    <div id='opponentStream' >
                        <h1>Opponent stream</h1>
                    </div>
                    <button
                        onClick={() => {
                            startMedia()
                        }}
                    >Start media</button>
                    <button
                        onClick={() => {
                            setAudio(true)
                            setAudio(true)
                            handelCall(userSelector?.userId == "6522964ed4e29dd9fb7c8547" ? "651f9f640fda2143f57d4a54" : "6522964ed4e29dd9fb7c8547")
                        }}
                    >call</button>
                </div>
            }
        </>
        // <div className='w-[100vw - 50px] overflow-y-scroll'>
        //     {/* <DragableResizeDiv initPosition={{
        //         x: 0,
        //         y: 0
        //     }} containerWidth={200} containerHeight={200} containerMinWidth={200} containerMinHeight={200} containerMaxWidth={500} containerMaxHeight={500} >
        //         <div className='w-full h-full bg-red-200'></div>
        //     </DragableResizeDiv> */}

        //     <ul className='w-full px-1'>
        //         <li className='w-full mb-2'>
        //             <ul className='flex justify-between items-center'>
        //                 <li className='font-bold text-xl'>Title</li>
        //                 <li className='flex '>
        //                     <span className='mr-2'>Meeting ends in:</span>
        //                     <span className='text-red-700'>02 : 30 min</span>
        //                 </li>
        //             </ul>
        //         </li>
        //         <li className='w-full'>
        //             <ul className='flex justify-between items-center'>
        //                 <li className='flex items-center'>
        //                     <div className='flex  justify-start items-center mr-2'>
        //                         <div></div>
        //                         <div>On-Call Participants</div>
        //                         <div className='ml-2 p-1 px-1.5 bg-green-200 text-green-700 text-sm rounded-lg'>10</div>
        //                     </div>
        //                     <div className='flex  justify-start items-center'>
        //                         <div></div>
        //                         <div>Absent Participants</div>
        //                         <div>20</div>
        //                     </div>
        //                 </li>
        //                 <li>
        //                     <div>
        //                         <div></div>
        //                         <div>Absent Participants</div>
        //                     </div>
        //                 </li>
        //             </ul>
        //         </li>
        //     </ul>

        //     {/* meeting participants card */}

        //     <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-2 grid-flow-dense py-2'>
        //         <div className='min-w-[300px] min-h-[250px] border border-slate-500 p-2 '>1</div>
        //         <div className='min-w-[300px] min-h-[250px] border border-slate-500 p-2 '>2</div>
        //         <div className='min-w-[300px] min-h-[250px] border border-slate-500 p-2 '>3</div>
        //         <div className='min-w-[300px] min-h-[250px] border border-slate-500 p-2 '>4</div>
        //         <div className='min-w-[300px] min-h-[250px] border border-slate-500 p-2 '>8</div>
        //     </div>
        // </div >
    )
}

export default memo(Room)
