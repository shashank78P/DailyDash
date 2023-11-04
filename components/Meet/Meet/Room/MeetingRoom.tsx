import MeetinTopSection from '@/components/Meet/Meet/Room/MeetinTopSection'
import MeetingActionBtns from '@/components/Meet/Meet/Room/MeetingActionBtns'
import ParticipantCard from '@/components/Meet/Meet/Room/ParticipantCard'
import React, { useContext, useEffect, useRef } from 'react'
import { streamContextDto } from '../../types'
import MediaContext from '../State/MediaContext'
import Message from './Message'

const MeetingRoom = ({ myVideoRef }: { myVideoRef: any }) => {
    // @ts-ignore
    const { myStream, isScreenShare, opponentScreenShareStream , pinnedType, isShowChat, participantsDetails, pinnedParticipants, showParticipants } = useContext<streamContextDto>(MediaContext)
    useEffect(() => {
        if (myVideoRef?.current) {
            myVideoRef.current.srcObject = myStream
            console.log(myVideoRef?.current?.srcObject)
        }
    }, [myStream])

    function returnStyleForPinnedCard() {
        if (pinnedParticipants.length == 1 || Object.keys(participantsDetails).length == 1) {
            return " grid grid-cols-1"
        }
        else if (pinnedParticipants.length == 2 || Object.keys(participantsDetails).length == 2) {
            return " grid grid-cols-1 lg:grid-cols-2 "
        }
        else if (pinnedParticipants.length == 3 || Object.keys(participantsDetails).length == 3) {
            return " grid grid-cols-1 md:grid-cols-2 "
        }
        else if (pinnedParticipants.length == 4 || Object.keys(participantsDetails).length == 4) {
            return " grid grid-cols-1 md:grid-cols-2 "
        }
    }

    return (
        <>
            <MeetinTopSection />
            <div className='text-4xl border bg-white absolute bottom-10 z-50 '>
            </div>
            {isShowChat && <Message />}
            {/* meeting participants card */}
            {!false && <video width={200} height={200} id="video" ref={myVideoRef} autoPlay />}
            <MeetingActionBtns />
            <div className={`${pinnedParticipants.length !== 0 || Object.keys(participantsDetails).length < 5 ? returnStyleForPinnedCard() : " grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "} w-full h-full overflow-scroll gap-2 grid-flow-dense p-2 relative`}>
                {
                    // isScreenShare &&  <ParticipantCard participant={participant} key={participant?.participantId} isScreenShare={isScreenShare} />
                }
                {
                    Object.values(participantsDetails)?.map((participant: any, i: number) => {
                        if (pinnedParticipants.length !== 0 && pinnedParticipants.includes(participant?.participantId)) {
                            const isScreenShare = pinnedType?.[participant?.participantId] === "screen-share"
                            return (
                                <ParticipantCard participant={participant} key={participant?.participantId} isScreenShare={isScreenShare} />
                            )
                        }
                        else if (pinnedParticipants.length == 0) {
                            if (opponentScreenShareStream?.[`${participant?.participantId}-screen-share`]) {
                                console.log("setting card of screen share")
                                return (
                                    <>
                                        <ParticipantCard participant={participant} key={`${participant?.participantId}-screen-share`} isScreenShare={true} />
                                        <ParticipantCard participant={participant} key={participant?.participantId} isScreenShare={false} />
                                    </>
                                )
                            } else {
                                return (
                                    <ParticipantCard participant={participant} key={participant?.participantId} isScreenShare={false} />
                                )
                            }
                        }
                    })
                }
            </div>
        </>
    )
}

export default MeetingRoom
