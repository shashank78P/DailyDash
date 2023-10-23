import { streamContext } from '@/components/Meet/Meet/State/MediaState';
import api from '@/components/lib/api';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { streamContextDto } from '@/components/Meet/types';
import { SocketContext } from '@/components/context/SocketContext';
import { meetingAction } from '@/components/store/slice/meetingSlice';
import { useSearchParams } from 'next/navigation';
import { memo, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import JoinMeetingRequest from './JoinMeetingRequest';


const Room = () => {
    const [meetingId, setMeetingId] = useState<String | null>(null)
    const { socket, myPeer }: any = useContext(SocketContext);
    const userSelector = useSelector((state: any) => state?.userSliceReducer);
    const meetingSelector = useSelector((state: any) => state?.meetingSliceReducer);
    const param = useSearchParams();
    let dispatch = useDispatch();
    const ref = useRef<HTMLVideoElement>(null)
    const oppo = useRef<HTMLVideoElement>(null)
    const {opponentStream, setOpponentStream, isJoinMeetPage, setIsJoinMeetPage, MediaActions, myStream, setMyStream, video, setVideo, audio, setAudio } = useContext<streamContextDto>(streamContext)

    console.log({opponentStream})
    useEffect(() => {
        setMeetingId(param?.get("id"))
        console.log("mounted  =============")
    }, [])
    useEffect(() => {
        console.log("called to set stream to oppo video tag")
        console.log(opponentStream)
        if (oppo.current && opponentStream?.active) {
            console.log("setting stream to oppo video tag")
            console.log(opponentStream)
            console.log(opponentStream?.getTracks())
            oppo.current.srcObject = opponentStream
        }
    }, [opponentStream])

    useEffect(() => {
        if (ref.current && myStream?.active) {
            console.log("setting stream to video tag")
            ref.current.srcObject = myStream
        }
    }, [myStream, ref, isJoinMeetPage])

    const handelStreamCall = (joinedUserId: string) => {
        // var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        // getUserMedia({ video: video, audio: audio }, function (stream: MediaStream) {
        //     setMyStream(stream)
        const call = myPeer.call(joinedUserId, myStream);
        call.on("stream", function (remoteStream: MediaStream) {
            setOpponentStream(remoteStream)
            console.log("recieved stream from ")
            console.log(remoteStream)
        })
        // })
    }

    const handelWithOutStreamCall = (joinedUserId: string) => {
        const call = myPeer.call(joinedUserId, new MediaStream());
        call.on("stream", function (remoteStream: MediaStream) {
            setOpponentStream(remoteStream)
            console.log("recieved stream from new")
            console.log(remoteStream)
        })
    }

    const handelCall = (joinedUserId: string) => {
        console.log("handel  call")
        // if (myStream && myPeer) {
        console.log("calling " + joinedUserId);
        console.log(audio, video)
        if ((audio || video) && myStream) {
            console.log("calling handelStreamCall");
            handelStreamCall(joinedUserId)
        } 
        // else {
        //     console.log("calling handelWithOutStreamCall");
        //     handelWithOutStreamCall(joinedUserId)
        // }
        // }
    }

    const handelJoin = (joinedUserId: string) => {
        console.log("handel  join")
        console.log(meetingSelector)
        if (video || audio) {
            handelCall(joinedUserId)
        }
    }

    const notificationHandler = (data: any) => {
        console.log("handel notify", data)
        console.log(data?.type === "establish-connect")

        if (data?.type === "establish-connect") {
            setIsJoinMeetPage(false)
            Promise.all(data?.participants?.map((participant: any, i: number) => {
                handelCall(participant?.participantId)
            }))
        }
    }

    console.log({ isJoinMeetPage, myStream })
    const startMedia = () => {
        setAudio(true)
        setVideo(true)
    }

    useEffect(() => {
        if (socket && myPeer) {
            myPeer.on("call", function (call: any) {
                console.log("recieved call")
                console.log({audio, video,call})
                console.log(call?.peer)
                call.on('stream', function (remoteStream: MediaStream) {
                    console.log("opponent stream");
                    setOpponentStream(remoteStream)
                });
                if(myStream?.active){
                    console.log("answering active stream")
                    console.log(myStream)
                    call.answer(myStream)
                }
                console.log(audio , video , myStream)
                // if ((audio || video)) {
                //     console.log("answering call mystream")
                // } 
                // else {
                //     console.log("answering call new MediaStream")
                //     call.answer(new MediaStream())
                // }
                // var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                // getUserMedia({ video: true, audio: true, screen: true }, async function (stream: MediaStream) {
                // })
            })
        }
    }, [socket, myPeer, userSelector?.userId, audio, video, myStream])


    useEffect(() => {
        if (socket && myPeer?._id && userSelector.userId && meetingId) {
            // socket.emit("joined-meeting", { userId: userSelector.userId, meetingId })
        }
    }, [socket, myPeer?._id, userSelector.userId, meetingId , myStream])

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
                    <video width={200} height={150} ref={ref} autoPlay controls />
                    <video width={200} height={150} ref={oppo} autoPlay controls />
                    <div className='opponentStream' >
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
                </div>}
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
