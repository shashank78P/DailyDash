// @ts-nocheck
import DragableResizeDiv from '@/components/GlobalComponents/DragableResizeDiv'
import CrossIco from '@/components/assets/CrossIco'
import UnMuteIco from '@/components/assets/UnMuteIco'
import VideoICameraIco from '@/components/assets/VideoICameraIco'
import VideoSlashIco from '@/components/assets/VideoSlashIco'
import VoiceMikeIco from '@/components/assets/VoiceMikeIco'
import React, { useContext } from 'react'
import { streamContextDto } from '../../types'
import MediaContext from '../State/MediaContext'
import PinIco from '@/components/assets/PinIco'
import UnPinIco from '@/components/assets/UnPinIco'

const ParticipantsList = ({ participants, isPresentDetails }: { participants: Array<any>, isPresentDetails: boolean }) => {

    const { pinnedParticipants, setPinnedParticipants, setShowParticipants, opponentNonMediaStreamStream, opponentStream } = useContext<streamContextDto>(MediaContext)
    console.log(participants)

    function isVideoAudioOnOrOff(participantId: string) {
        if (!opponentNonMediaStreamStream.includes(participantId) || !isPresentDetails) {
            return { isVideo: false, isAudio: false }
        }
        const stream: MediaStream = opponentStream[participantId]
        const track = stream.getTracks()
        if (track.length == 2) {
            return { isVideo: true, isAudio: true }
        }
        if (track.length == 1 && track?.[0]?.type == "audio") {
            return { isVideo: true, isAudio: false }
        }
        if (track.length == 1 && track?.[0]?.type == "video") {
            return { isVideo: false, isAudio: true }
        }
    }

    function handelPinParticipant(participantId: string) {
        console.log(pinnedParticipants.length)
        console.log(!pinnedParticipants.includes(participantId))
        if (pinnedParticipants.length < 4 && !pinnedParticipants.includes(participantId)) {
            setPinnedParticipants((prev: Array<String>) => [...prev, participantId])
        }
    }
    function handelUnPinParticipant(participantId: string) {
        if (pinnedParticipants.includes(participantId)) {
            setPinnedParticipants((prev: Array<String>) => prev.filter((id) => id !== participantId))
        }
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
                            <div className='ml-2 p-1 px-1.5 bg-purple-200 text-purple-700 text-sm rounded-lg'>{participants?.length ?? 0}</div>
                        </li>
                        <li className='cursor-pointer'
                            onClick={() => {
                                setShowParticipants("")
                            }}
                        >
                            <CrossIco height={30} width={30} color='red' />
                        </li>
                    </ul>
                    {
                        participants && Array.isArray(participants) && participants?.map((participant: any, i: number) => {
                            console.log(isPresentDetails && !pinnedParticipants?.includes(participant?.participantId))
                            const { isVideo, isAudio } = isVideoAudioOnOrOff(participant?.participantId)
                            return (
                                <ul className='w-full h-auto flex justify-between items-center py-2 border border-transparent border-b-purple-200 border-b-1' key={participant?.participantId}>
                                    <ul className='flex items-center justify-center'>
                                        <li className='w-[40px] h-[40px] mr-1 '>
                                            {/* <Image width={50} height={50} src={participant?.image} alt={participant?.name}  className='rounded-full'/> */}
                                            <img
                                                src={participant?.userPic} alt={participant?.name} className='w-full h-full rounded-lg object-cover' />
                                        </li>
                                        <li className='truncate text-base font-medium max-w-[100px] '>
                                            {
                                                participant?.userName
                                            }
                                        </li>
                                    </ul>
                                    <li className='ml-2'>
                                        <ul className='flex items-center justify-center'>
                                            {isPresentDetails && !pinnedParticipants?.includes(participant?.participantId) && <li className='cursor-pointer'
                                                onClick={() => {
                                                    handelPinParticipant(participant?.participantId)
                                                }}
                                            >
                                                <PinIco height={24} width={30} color='#202124'/>
                                            </li>}
                                            {isPresentDetails && pinnedParticipants?.includes(participant?.participantId) && <li className='cursor-pointer'
                                                onClick={() => {
                                                    handelUnPinParticipant(participant?.participantId)
                                                }}
                                            >
                                                <UnPinIco height={24} width={30} color='#202124'/>
                                            </li>}
                                            {isAudio && <li className='cursor-pointer'>
                                                <VoiceMikeIco height={24} width={30} strokeWidth={1.5} />
                                            </li>}
                                            {!isAudio && <li className='cursor-pointer'>
                                                <UnMuteIco height={24} width={30} strokeWidth={1.5}/>
                                            </li>}
                                            {!isVideo && <li className='cursor-pointer'>
                                                <VideoSlashIco height={25} width={30} strokeWidth={1.5} />
                                            </li>}
                                            {isVideo && <li className='cursor-pointer'>
                                                <VideoICameraIco height={25} width={30} strokeWidth={1.5}/>
                                            </li>}
                                        </ul>
                                    </li>
                                </ul>
                            )
                        })
                    }
                </div>
            </DragableResizeDiv>
        </>
    )
}

export default ParticipantsList
