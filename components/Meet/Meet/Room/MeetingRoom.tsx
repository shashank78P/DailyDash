import MeetinTopSection from '@/components/Meet/Meet/Room/MeetinTopSection'
import MeetingActionBtns from '@/components/Meet/Meet/Room/MeetingActionBtns'
import ParticipantCard from '@/components/Meet/Meet/Room/ParticipantCard'
import React, { useContext, useEffect, useRef } from 'react'
import { streamContextDto } from '../../types'
import MediaContext from '../State/MediaContext'
import Message from './Message'
import { useSelector } from 'react-redux'

const MeetingRoom = ({ myVideoRef }: { myVideoRef: any }) => {
    const userSelector = useSelector((state: any) => state?.userSliceReducer);
    // @ts-ignore
    const { myStream, isScreenShare, opponentScreenShareStream, pinnedType, isShowChat, participantsDetails, pinnedParticipants, showParticipants } = useContext<streamContextDto>(MediaContext)
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

    function returnMineCard() {
        if (pinnedParticipants?.length !== 0) {
            if(pinnedParticipants?.includes(userSelector?.userId)){
                if (pinnedType?.[userSelector?.userId] === "screen-share") {
                    return (<ParticipantCard participant={{
                        userName: `${userSelector?.firstName ?? ""} ${userSelector?.lastName ?? ""} (You)`,
                        participantId: userSelector?.userId,
                        userPic: userSelector?.profilePic
                    }} key={userSelector?.userId} isParticpantsScreenShare={true} isMycard={true} />)
                }
                else {
                    return (
                        <ParticipantCard participant={{
                            userName: `${userSelector?.firstName ?? ""} ${userSelector?.lastName ?? ""} (You)`,
                            participantId: userSelector?.userId,
                            userPic: userSelector?.profilePic
                        }} key={userSelector?.userId} isParticpantsScreenShare={false} isMycard={true} />
                    )
                }
            }
        } else {
            return (
                <>
                    {
                        <ParticipantCard participant={{
                            userName: `${userSelector?.firstName ?? ""} ${userSelector?.lastName ?? ""} (You)`,
                            participantId: userSelector?.userId,
                            userPic: userSelector?.profilePic
                        }} key={userSelector?.userId} isParticpantsScreenShare={false} isMycard={true} />
                    }
                    {
                        isScreenShare && <ParticipantCard participant={{
                            userName: `${userSelector?.firstName ?? ""} ${userSelector?.lastName ?? ""} (You)`,
                            participantId: userSelector?.userId,
                            userPic: userSelector?.profilePic
                        }} key={userSelector?.userId} isParticpantsScreenShare={true} isMycard={true} />
                    }
                </>
            )
        }
    }

    return (
        <>
            <MeetinTopSection />
            <div className='text-4xl border bg-white absolute bottom-10 z-50 '>
            </div>
            {isShowChat && <Message />}
            {/* meeting participants card */}
            {/* don't remove this video tag */}
            {<video width={0} height={0} id="video" ref={myVideoRef} className=''/>}
            <MeetingActionBtns />
            <div className={`${pinnedParticipants.length !== 0 || Object.keys(participantsDetails).length < 5 ? returnStyleForPinnedCard() : " grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "} w-full h-full overflow-scroll gap-2 grid-flow-dense p-2 relative`}>
                {
                    returnMineCard()
                }
                {
                    // for pinned particpantts
                    Object.values(participantsDetails)?.map((participant: any, i: number) => {
                        if (pinnedParticipants.length !== 0 && pinnedParticipants.includes(participant?.participantId)) {
                            const isParticipantsScreenShare = pinnedType?.[participant?.participantId] === "screen-share"
                            return (
                                <ParticipantCard participant={participant} key={participant?.participantId} isParticpantsScreenShare={isParticipantsScreenShare} isMycard={false} />
                            )
                        }
                        else if (pinnedParticipants.length == 0) {
                            if (opponentScreenShareStream?.[`${participant?.participantId}-screen-share`]) {
                                console.log("setting card of screen share")
                                return (
                                    <>
                                        <ParticipantCard participant={participant} key={`${participant?.participantId}-screen-share`} isParticpantsScreenShare={true} isMycard={false} />
                                        <ParticipantCard participant={participant} key={participant?.participantId} isParticpantsScreenShare={false} isMycard={false} />
                                    </>
                                )
                            } else {
                                return (
                                    <ParticipantCard participant={participant} key={participant?.participantId} isParticpantsScreenShare={false} isMycard={false} />
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
