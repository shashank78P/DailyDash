"use client"
import HorizontalThrreDot from '@/components/assets/HorizontalThrreDot'
import PinIco from '@/components/assets/PinIco'
import UnPinIco from '@/components/assets/UnPinIco'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'

const page = () => {
    const [pinnedParticipants, setPinnedParticipants] = useState<Array<String>>([])
    const [showPinSection, setShowPinSection] = useState<String>('')
    const participants = [
        {
            _id: "1",
            name: "Shashi",
            video: "video/DailyDash - Google Chrome 2023-10-25 10-30-29.mp4",
            image: "images/DefaultUser2.png",
        },
        {
            _id: "2",
            name: "Shashank",
            image: "images/car4.2.jpg",
        },
        {
            _id: "3",
            name: "Raki",
            video: "video/DailyDash - Google Chrome 2023-10-25 10-30-29.mp4",
            image: "images/DefaultUser2.png",
        },
        {
            _id: "4",
            name: "Kushi",
            image: "images/carPerchasingImage.jpg",
        },
        {
            _id: "5",
            name: "Santhosh",
            // video: "video/DailyDash - Google Chrome 2023-10-25 10-30-29.mp4",
            image: "images/DefaultUser2.png",
        },
        {
            _id: "6",
            name: "Siri",
            image: "images/lamborgjini.png",
        },
        {
            _id: "7",
            name: "Alexa",
            audio: "video/222c1ea753ac6345addeed76693fb9d2.webm",
            image: "images/DefaultUser2.png",
        },
    ]

    function handelPinParticipant(participantId: string) {
        if (pinnedParticipants.length < 4 && !pinnedParticipants.includes(participantId)) {
            setPinnedParticipants((prev) => [...prev, participantId])
        }
    }
    function handelUnPinParticipant(participantId: string) {
        if (pinnedParticipants.includes(participantId)) {
            setPinnedParticipants((prev: Array<String>) => prev.filter((id) => id !== participantId))
        }
    }

    function getContent(participant: any) {
        if (participant?.video) {
            return (
                <>
                    <video src={participant?.video} autoPlay loop className='w-full h-full select-none pointer-events-none '></video>
                </>
            );
        }
        else {
            return (
                <>
                    {
                        participant?.audio && <audio src={participant?.audio} autoPlay loop muted></audio>
                    }
                    <img src={participant?.image} className='min-w-[150px] max-w-[150px] min-h-[150px] max-h-[150px] object-cover rounded-full overflow-hidden select-none' draggable={false} />
                </>
            );
        }
    }

    function returnParticipantsCard(participant: any) {
        return (
            <div className='min-w-[300px] min-h-[250px] bg-purple-100 relative rounded-lg '
                onMouseEnter={() => {
                    setShowPinSection(participant?._id)
                }}
                onMouseLeave={
                    () => {
                        setShowPinSection("")
                    }
                }
            >
                <ul className='w-full flex justify-between items-center absolute p-1 cursor-pointer'>
                    <ul>
                        <li className="py-1 min-w-[50px] px-2 border bg-slate-500 rounded-full cursor-pointer text-white text-sm text-center truncate" >{participant?.name}</li>
                    </ul>
                    <ul className={`${showPinSection == participant?._id || pinnedParticipants.includes(participant?._id) ? " flex " : " hidden "} `}>
                        {pinnedParticipants.length < 4 && !pinnedParticipants.includes(participant?._id) && <li className="p-2 border bg-slate-500 ml-2 rounded-full cursor-pointer"
                            onClick={() => {
                                console.log("pinned participants")
                                handelPinParticipant(participant?._id)
                            }}
                        >
                            <PinIco height={15} width={15} />
                        </li>}
                        {pinnedParticipants.includes(participant?._id) && <li className="p-2 border bg-slate-500 ml-2 rounded-full cursor-pointer"
                            onClick={() => {
                                handelUnPinParticipant(participant?._id)
                            }}
                        >
                            <UnPinIco height={15} width={15} />
                        </li>}
                        <li className="p-2 border bg-slate-500 ml-2 rounded-full cursor-pointer">
                            <HorizontalThrreDot height={15} width={15} color='#F4F4F5' />
                        </li>
                    </ul>
                </ul>
                <ul className='w-full h-full flex items-center justify-center'>
                    {getContent(participant)}
                </ul>
            </div>
        )
    }

    function returnStyleForPinnedCard() {
        if (pinnedParticipants.length == 1 || participants.length == 1) {
            return " grid grid-cols-1"
        }
        else if (pinnedParticipants.length == 2 || participants.length == 2) {
            return " grid grid-cols-1 lg:grid-cols-2 "
        }
        else if (pinnedParticipants.length == 3 || participants.length == 3) {
            return " grid grid-cols-1 md:grid-cols-2 "
        }
        else if (pinnedParticipants.length == 4 || participants.length == 4) {
            return " grid grid-cols-1 md:grid-cols-2 "
        }
    }

    console.log({showPinSection , pinnedParticipants})

    return (
        <>
            <div className='w-[100hv - 50px] h-[100vw] overflow-hidden flex flex-col'>
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

                <div className={`${pinnedParticipants.length !== 0 || participants.length < 5 ? returnStyleForPinnedCard() : " grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "} w-full h-full overflow-y-scroll gap-2 grid-flow-dense p-2`}>
                    {
                        participants?.map((participant: any, i: number) => {
                            if (pinnedParticipants.length !== 0 && pinnedParticipants.includes(participant?._id)) {
                                return (
                                    returnParticipantsCard(participant)
                                )
                            }
                            else if(pinnedParticipants.length == 0) {
                                return (
                                    returnParticipantsCard(participant)
                                )
                            }
                        })
                    }
                </div>
            </div >
        </>
    )
}

export default page