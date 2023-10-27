// @ts-nocheck
import PlusIco from '@/components/assets/PlusIco'
import React, { useContext } from 'react'
import { streamContextDto } from '../../types'
import MediaContext from '../State/MediaContext'
import ParticipantsList from './ParticipantsList'

const MeetinTopSection = () => {

    const { meetingDetails, setShowParticipants, showParticipants, participantsDetails, absentParticipantsDetails } = useContext<streamContextDto>(MediaContext)

    return (
        <>
            {showParticipants === "On-Call Participants" && <ParticipantsList participants={Object.values(participantsDetails)} isPresentDetails={true} />}
            {showParticipants == "Absent Participants" && <ParticipantsList participants={absentParticipantsDetails} isPresentDetails={false} />}
            <ul className='w-full p-1'>
                <li className='w-full mb-2'>
                    <ul className='flex justify-between items-center'>
                        <li className='font-bold text-xl'>{meetingDetails?.title}</li>
                        <li className='flex '>
                            <span className='mr-2'>Meeting ends in:</span>
                            <span className='text-red-700'>02 : 30 min</span>
                        </li>
                    </ul>
                </li>
                <li className='w-full'>
                    <ul className='flex justify-between items-center'>
                        <li className='flex items-center'>
                            <div className='flex  justify-start items-center mr-2 cursor-pointer'
                                onClick={() => {
                                    if(showParticipants === "On-Call Participants"){
                                        setShowParticipants("")
                                    }else{
                                        setShowParticipants("On-Call Participants")
                                    }
                                }}
                            >
                                <div></div>
                                <div>On-Call Participants</div>
                                <div className='ml-2 p-1 px-1.5 bg-green-200 text-green-700 text-sm rounded-lg'>{Object.keys(participantsDetails)?.length ? Object.keys(participantsDetails)?.length + 1 : 1}</div>
                            </div>
                            <div className='flex  justify-start items-center cursor-pointer mr-2'
                                onClick={() => {
                                    if(showParticipants === "Absent Participants"){
                                        setShowParticipants("")
                                    }else{
                                        setShowParticipants("Absent Participants")
                                    }
                                }}
                            >
                                <div></div>
                                <div>Absent Participants</div>
                                <div className='ml-2 p-1 px-1.5 bg-red-200 text-red-700 text-sm rounded-lg'>{absentParticipantsDetails.length ?? 0}</div>
                            </div>
                        </li>
                        <li>
                            <div className='flex  justify-start items-center cursor-pointer '>
                                <div className='mr-2 p-2 bg-green-200 text-green-700  rounded-lg'>
                                    <PlusIco height={12} width={12} color='green' />
                                </div>
                                <div>Invite Participant</div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </>
    )
}

export default MeetinTopSection
