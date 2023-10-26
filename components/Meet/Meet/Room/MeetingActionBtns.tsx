import CallEndIco from '@/components/assets/CallEndIco'
import MessageIco from '@/components/assets/MessageIco'
import RaiseHandIco from '@/components/assets/RaiseHandIco'
import ScreenShareIco from '@/components/assets/ScreenShareIco'
import SmilyFace from '@/components/assets/SmilyFace'
import UnMuteIco from '@/components/assets/UnMuteIco'
import VideoICameraIco from '@/components/assets/VideoICameraIco'
import VideoSlashIco from '@/components/assets/VideoSlashIco'
import VoiceMikeIco from '@/components/assets/VoiceMikeIco'
import React, { useContext } from 'react'
import { streamContextDto } from '../../types'
import MediaContext from '../State/MediaContext'
import { SocketContext } from '@/components/context/SocketContext'

const MeetingActionBtns = () => {
    // @ts-ignore
    const { setAudio, audio, video, setVideo, meetingId, setIsJoinMeetPage } = useContext<streamContextDto>(MediaContext)
    const { socket, myPeer }: any = useContext(SocketContext);

    const handelLeaveMeeting = async () => {
        if (meetingId) {
            socket?.emit("leaveMeet", { meetingId })
            setIsJoinMeetPage(true)
        }
    }

    return (
        <>
            <ul className='flex justify-evenly items-center fixed bottom-2 z-50 inset-x-1/2'>
                <li className='p-2 bg-[#94A3B8] bg-opacity-80 mr-2 flex items-center justify-center rounded-full'>
                    <ScreenShareIco height={25} width={25} color={"#F4F4F5"} />
                </li>
                {audio && <li
                    className='p-2 bg-[#94A3B8] bg-opacity-80 mr-2 flex items-center justify-center rounded-full'
                    onClick={() => {
                        setAudio(false)
                    }}
                >
                    <VoiceMikeIco height={25} width={25} color={"#F4F4F5"} />
                </li>}
                {!audio && <li
                    className='p-2 bg-[#94A3B8] bg-opacity-80 mr-2 flex items-center justify-center rounded-full'
                    onClick={() => {
                        setAudio(true)
                    }}
                >
                    <UnMuteIco height={25} width={25} color={"#F4F4F5"} />
                </li>}
                {video && <li
                    className='p-2 bg-[#94A3B8] bg-opacity-80 mr-2 flex items-center justify-center rounded-full'
                    onClick={() => {
                        setVideo(false)
                    }}
                >
                    <VideoICameraIco height={25} width={25} color={"#F4F4F5"} />
                </li>}
                {!video && <li
                    className='p-2 bg-[#94A3B8] bg-opacity-80 mr-2 flex items-center justify-center rounded-full'
                    onClick={() => {
                        setVideo(true)
                    }}
                >
                    <VideoSlashIco height={25} width={25} color={"#F4F4F5"} />
                </li>}
                <li
                    className='py-3 px-4 bg-[#FF0000] mr-2 flex items-center justify-center rounded-xl'
                    onClick={()=>{
                        handelLeaveMeeting()
                    }}
                >
                    <CallEndIco height={30} width={35} color={"#F4F4F5"} />
                </li>
                <li className='p-2 bg-[#94A3B8] bg-opacity-80 mr-2 flex items-center justify-center rounded-full'>
                    <RaiseHandIco height={25} width={25} color={"#F4F4F5"} />
                </li>
                <li className='p-2 bg-[#94A3B8] bg-opacity-80 mr-2 flex items-center justify-center rounded-full'>
                    <SmilyFace height={25} width={25} color={"#F4F4F5"} />
                </li>
                <li className='p-2 bg-[#94A3B8] bg-opacity-80 mr-2 flex items-center justify-center rounded-full'>
                    <MessageIco height={25} width={25} color={"#F4F4F5"} />
                </li>
            </ul>
        </>
    )
}

export default MeetingActionBtns
