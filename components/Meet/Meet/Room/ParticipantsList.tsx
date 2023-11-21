// @ts-nocheck
import DragableResizeDiv from '@/components/GlobalComponents/DragableResizeDiv'
import CrossIco from '@/components/assets/CrossIco'
import UnMuteIco from '@/components/assets/UnMuteIco'
import VideoICameraIco from '@/components/assets/VideoICameraIco'
import VideoSlashIco from '@/components/assets/VideoSlashIco'
import VoiceMikeIco from '@/components/assets/VoiceMikeIco'
import React, { useContext, useEffect, useState } from 'react'
import { streamContextDto } from '../../types'
import MediaContext from '../State/MediaContext'
import PinIco from '@/components/assets/PinIco'
import UnPinIco from '@/components/assets/UnPinIco'
import { useSelector } from 'react-redux'
import RaiseHandIco from '@/components/assets/RaiseHandIco'

const ParticipantsList = ({ participants, isPresentDetails }: { participants: Array<any>, isPresentDetails: boolean }) => {

    const { HandRaisedUser, participantsDetails, pinnedParticipants, setPinnedParticipants, audio, video, setShowParticipants, opponentNonMediaStreamStream, opponentStream } = useContext<streamContextDto>(MediaContext)
    console.log(participants)
    const userSelector = useSelector((state: any) => state?.userSliceReducer);
    const [me, setMe] = useState({})
    useEffect(() => {
        if (userSelector && userSelector?.userId) {
            console.log(userSelector)
            setMe({
                userPic: userSelector?.profilePic,
                userName: userSelector?.firstName + " " + userSelector?.lastName + " (You)",
                participantId: userSelector?.userId,
            })
        }
    }, [userSelector])

    function isVideoAudioOnOrOff(participantId: string) {
        if (!opponentNonMediaStreamStream?.includes(participantId) || !isPresentDetails) {
            return { isVideo: false, isAudio: false }
        }
        const stream: MediaStream = opponentStream?.[participantId]
        if (!stream) {
            return;
        }
        const track = stream?.getTracks()
        if (track?.length == 2) {
            return { isVideo: true, isAudio: true }
        }
        if (track?.length == 1 && track?.[0]?.type == "audio") {
            return { isVideo: true, isAudio: false }
        }
        if (track?.length == 1 && track?.[0]?.type == "video") {
            return { isVideo: false, isAudio: true }
        } else {
            return { isVideo: false, isAudio: false }
        }
    }

    function handelPinParticipant(participantId: string) {
        console.log(pinnedParticipants?.length)
        console.log(!pinnedParticipants?.includes(participantId))
        if (pinnedParticipants?.length < 4 && !pinnedParticipants?.includes(participantId)) {
            setPinnedParticipants((prev: Array<String>) => [...prev, participantId])
        }
    }
    function handelUnPinParticipant(participantId: string) {
        if (pinnedParticipants?.includes(participantId)) {
            setPinnedParticipants((prev: Array<String>) => prev?.filter((id) => id !== participantId))
        }
    }

    function participantRow(participant: any, isVideo: boolean, isAudio: boolean) {
        return (
            <ul className='w-full h-auto flex justify-between items-center py-2 border border-transparent border-b-purple-200 border-b-1' key={participant?.participantId}>
                <ul className='flex items-center justify-center'>
                    <li className='w-[40px] h-[40px] mr-1 '>
                        {/* <Image width={50} height={50} src={participant?.image} alt={participant?.name}  className='rounded-full'/> */}
                        <img
                            src={participant?.userPic} alt={participant?.userName} className='w-full h-full rounded-lg object-cover' />
                    </li>
                    <li className='truncate text-base font-medium min-w-[80px] '>
                        {
                            participant?.userName
                        }
                    </li>
                </ul>
                <li className='ml-2'>
                    <ul className='flex items-center justify-center'>
                        {isPresentDetails && !pinnedParticipants?.includes(participant?.participantId) && <li className='cursor-pointer mr-1.5'
                            onClick={() => {
                                handelPinParticipant(participant?.participantId)
                            }}
                        >
                            <PinIco height={20} width={20} color='#202124' />
                        </li>}
                        {isPresentDetails && pinnedParticipants?.includes(participant?.participantId) && <li className='cursor-pointer mr-1.5'
                            onClick={() => {
                                handelUnPinParticipant(participant?.participantId)
                            }}
                        >
                            <UnPinIco height={20} width={20} color='#202124' />
                        </li>}
                        {HandRaisedUser?.includes(participant?.participantId) && <li className='cursor-pointer mr-1.5'>
                            <RaiseHandIco height={20} width={20} color='#202124' />
                        </li>}
                        {isAudio && <li className='cursor-pointer mr-1.5'>
                            <VoiceMikeIco height={25} width={20} strokeWidth={1.5} />
                        </li>}
                        {!isAudio && <li className='cursor-pointer mr-1.5'>
                            <UnMuteIco height={25} width={20} strokeWidth={1.5} />
                        </li>}
                        {!isVideo && <li className='cursor-pointer mr-1.5'>
                            <VideoSlashIco height={25} width={20} strokeWidth={1.5} />
                        </li>}
                        {isVideo && <li className='cursor-pointer mr-1.5'>
                            <VideoICameraIco height={25} width={20} strokeWidth={1.5} />
                        </li>}
                    </ul>
                </li>
            </ul>
        )
    }

    return (
        <>
            <DragableResizeDiv initPosition={{
                x: 50,
                y: 70
            }}
                // style={{
                //     overflowY: "scroll"
                // }}
                containerWidth={300} containerHeight={250} containerMinWidth={300} containerMinHeight={200} containerMaxWidth={500} containerMaxHeight={500}
            >
                <div className='w-full h-full overflow-y-scroll bg-slate-50 p-2 rounded-lg shadow-2xl'>
                    <ul className='w-full flex justify-between items-center border border-transparent border-b-purple-200 border-b-1 pb-2'>
                        <li className=' flex '>
                            <span>{(isPresentDetails) ? "Participants" : "Absentice"}</span>
                            <div className='ml-2 p-1 px-1.5 bg-purple-200 text-purple-700 text-sm rounded-lg'>{participants?.length + 1 ?? 1}</div>
                        </li>
                        <li className='cursor-pointer mr-1.5'
                            onClick={() => {
                                setShowParticipants("")
                            }}
                        >
                            <CrossIco height={30} width={30} color='red' />
                        </li>
                    </ul>
                    {/* showing me as a participant */}
                    {
                        isPresentDetails && me && participantRow(me, video, audio)
                    }
                    {/* showing all hand raise user top  */}
                    {
                        HandRaisedUser && HandRaisedUser?.length >= 1 && HandRaisedUser?.map((id: string) => {
                            console.log("printing handraised user")
                            console.log({id , HandRaisedUser})
                            if (userSelector?.userId == id) {
                                return;
                            }
                            const { isVideo, isAudio } = isVideoAudioOnOrOff(id)
                            const participant = participantsDetails?.[id]
                            return (
                                participantRow(participant, isVideo, isAudio)
                            )
                        })
                    }
                    {
                        participants && Array.isArray(participants) && participants?.map((participant: any, i: number) => {
                            if (HandRaisedUser.length >= 1 && HandRaisedUser?.includes(participant?.participantId)) {
                                return;
                            } else {
                                console.log(participant)
                                const { isVideo, isAudio } = isVideoAudioOnOrOff(participant?.participantId)
                                return (
                                    participantRow(participant, isVideo, isAudio)
                                )
                            }
                        })
                    }
                </div>
            </DragableResizeDiv>
        </>
    )
}

export default ParticipantsList
