"use client"
import DragableResizeDiv from '@/components/GlobalComponents/DragableResizeDiv'
import MeetinTopSection from '@/components/Meet/Meet/Room/MeetinTopSection'
import MeetingActionBtns from '@/components/Meet/Meet/Room/MeetingActionBtns'
import ParticipantCard from '@/components/Meet/Meet/Room/ParticipantCard'
import ParticipantsList from '@/components/Meet/Meet/Room/ParticipantsList'
import CallEndIco from '@/components/assets/CallEndIco'
import ChatIco from '@/components/assets/ChatIco'
import CrossIco from '@/components/assets/CrossIco'
import HorizontalThrreDot from '@/components/assets/HorizontalThrreDot'
import MessageIco from '@/components/assets/MessageIco'
import PinIco from '@/components/assets/PinIco'
import PlusIco from '@/components/assets/PlusIco'
import RaiseHandIco from '@/components/assets/RaiseHandIco'
import ScreenShareIco from '@/components/assets/ScreenShareIco'
import SmilyFace from '@/components/assets/SmilyFace'
import UnMuteIco from '@/components/assets/UnMuteIco'
import UnPinIco from '@/components/assets/UnPinIco'
import VideoICameraIco from '@/components/assets/VideoICameraIco'
import VideoSlashIco from '@/components/assets/VideoSlashIco'
import VoiceMikeIco from '@/components/assets/VoiceMikeIco'
import Image from 'next/image'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'

export default function Page(prop: any) {
    const [pinnedParticipants, setPinnedParticipants] = useState<Array<String>>([])
    const [showPinSection, setShowPinSection] = useState<String>('')
    const [showParticipants, setShowParticipants] = useState<String>('')
    const participants = [
        {
            _id: "1",
            name: "Shashi",
            // video: "video/DailyDash - Google Chrome 2023-10-25 10-30-29.mp4",
            image: "images/DefaultUser2.png",
        },
        {
            _id: "1",
            name: "Shashi",
            // video: "video/DailyDash - Google Chrome 2023-10-25 10-30-29.mp4",
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
            // video: "video/DailyDash - Google Chrome 2023-10-25 10-30-29.mp4",
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

    // console.log({showPinSection , pinnedParticipants})

    return (
        <>
            <div className='w-[100hv - 50px] h-[100vw] overflow-hidden flex flex-col'>
                {showParticipants !== "" && <ParticipantsList participants={[]} />}

                <MeetinTopSection />

                {/* meeting participants card */}
                <div className={`${pinnedParticipants.length !== 0 || participants.length < 5 ? returnStyleForPinnedCard() : " grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "} w-full h-full overflow-y-scroll gap-2 grid-flow-dense p-2 relative`}>
                    <MeetingActionBtns />
                    {
                        participants?.map((participant: any, i: number) => {
                            if (pinnedParticipants.length !== 0 && pinnedParticipants.includes(participant?._id)) {
                                return (
                                    <ParticipantCard participant={participant} key={i} />
                                )
                            }
                            else if (pinnedParticipants.length == 0) {
                                return (
                                    <ParticipantCard participant={participant} key={i} />
                                )
                            }
                        })
                    }
                </div>
            </div >
        </>
    )
}

