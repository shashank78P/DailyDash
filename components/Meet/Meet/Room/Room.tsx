import { streamContext } from '@/components/Meet/Meet/State/MediaState';
import { streamContextDto } from '@/components/Meet/types';
import { SocketContext } from '@/components/context/SocketContext';
import api from '@/components/lib/api';
import { meetingAction } from '@/components/store/slice/meetingSlice';
import { useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Room = () => {
    const param = useSearchParams();
    useEffect(() => {
        setMeetingId(param?.get("id"))
    }, [])

    let dispatch = useDispatch();
    const [meetingId, setMeetingId] = useState<String | null>(null)
    const userSelector = useSelector((state: any) => state?.userSliceReducer);
    const meetingSelector = useSelector((state: any) => state?.meetingSliceReducer);
    const { socket, myPeer }: any = useContext(SocketContext);


    const { data } = useQuery(["getAllParticipants", meetingId],
        () => {
            return api.get(`/meet/get-all-participants?meetingId=${meetingId}`)
        },
        {
            onSuccess(data) {
                if (Array.isArray(data?.data) && myPeer && socket) {
                    data?.data?.map((participant: any, i) => {
                        console.log(participant)
                        if (userSelector?.userId == "651f9f640fda2143f57d4a54") {
                            return;
                        }
                        console.log(myPeer)
                        var call = myPeer.call("651f9f640fda2143f57d4a54", { participantId: participant?.participantId, stream: myStream });


                        call.on(`${meetingId}-stream`, function (remoteStream: { participantId: string, stream: MediaStream }) {
                            console.log("opponent stream via makecall", remoteStream)
                            dispatch(meetingAction.setParticipantsStream({
                                // @ts-ignore
                                payload: remoteStream,
                                type: "meeting"
                            }))
                        });
                    })
                }
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            },
            enabled: Boolean(meetingId),
            keepPreviousData: true,
        }
    )

    useEffect(() => {
        console.log("myPeer")
        console.log(myPeer)
    }, [])

    // useEffect(() => {
    // }, [myPeer ,socket, data,meetingId,userSelector?.userId])

    // useEffect(() => {
    //     if (socket && myPeer && meetingId) {
    //         myPeer.on('call', function (call: any) {
    //             call.answer({ participantId: userSelector?.usetId, stream: myStream });
    //             call.on(`${meetingId}-stream`, function (remoteStream: { participantId: string, stream: MediaStream }) {
    //                 console.log("opponent stream via makecall", remoteStream)
    //                 dispatch(meetingAction.setParticipantsStream({
    //                     // @ts-ignore
    //                     payload: remoteStream,
    //                     type: "meeting"
    //                 }))
    //             });
    //         }, function (err: any) {
    //             console.log('Failed to get local stream', err);
    //         });
    //     }
    // }, [socket, myPeer, meetingId])

    useEffect(() => {
        console.log({ meetingSelector, userSelector })
    }, [meetingSelector, userSelector])

    return (
        <div className='w-[100vw - 50px] overflow-y-scroll'>
            {/* <DragableResizeDiv initPosition={{
                x: 0,
                y: 0
            }} containerWidth={200} containerHeight={200} containerMinWidth={200} containerMinHeight={200} containerMaxWidth={500} containerMaxHeight={500} >
                <div className='w-full h-full bg-red-200'></div>
            </DragableResizeDiv> */}

            <ul className='w-full px-1'>
                <li className='w-full mb-2'>
                    <ul className='flex justify-between items-center'>
                        <li className='font-bold text-xl'>Title</li>
                        <li className='flex '>
                            <span className='mr-2'>Meeting ends in:</span>
                            <span className='text-red-700'>02 : 30 min</span>
                        </li>
                    </ul>
                </li>
                <li className='w-full'>
                    <ul className='flex justify-between items-center'>
                        <li className='flex items-center'>
                            <div className='flex  justify-start items-center mr-2'>
                                <div></div>
                                <div>On-Call Participants</div>
                                <div className='ml-2 p-1 px-1.5 bg-green-200 text-green-700 text-sm rounded-lg'>10</div>
                            </div>
                            <div className='flex  justify-start items-center'>
                                <div></div>
                                <div>Absent Participants</div>
                                <div>20</div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <div></div>
                                <div>Absent Participants</div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>

            {/* meeting participants card */}

            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-2 grid-flow-dense py-2'>
                <div className='min-w-[300px] min-h-[250px] border border-slate-500 p-2 '>1</div>
                <div className='min-w-[300px] min-h-[250px] border border-slate-500 p-2 '>2</div>
                <div className='min-w-[300px] min-h-[250px] border border-slate-500 p-2 '>3</div>
                <div className='min-w-[300px] min-h-[250px] border border-slate-500 p-2 '>4</div>
                <div className='min-w-[300px] min-h-[250px] border border-slate-500 p-2 '>8</div>
            </div>
        </div >
    )
}

export default Room
