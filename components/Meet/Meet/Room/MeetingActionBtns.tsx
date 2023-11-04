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
import Picker from '@emoji-mart/react'
import Badge from '@mui/material/Badge'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'

const MeetingActionBtns = () => {
    // @ts-ignore
    const { setIsScreenShare, isScreenShare, isShowChat, setIsShowChat, isMyHandRaise, HandRaisedUser, setIsMyHandRaise, isReaction, setIsReaction, setAudio, audio, video, setVideo, meetingId, setIsJoinMeetPage } = useContext<streamContextDto>(MediaContext)
    const { socket, myPeer }: any = useContext(SocketContext);
    const userSelector = useSelector((state: any) => state?.userSliceReducer);

    const handelLeaveMeeting = async () => {
        if (meetingId) {
            socket?.emit("leaveMeet", { meetingId })
            setIsJoinMeetPage(true)
        }
    }

    return (
        <>
            <ul className='w-auto h-auto flex flex-col justify-center items-center ml-[25px] fixed z-50 bottom-[60px] inset-x-1/2 '>
                {isReaction && <ul className='w-[200px] sm:w-[500px] sm:grid-cols-6 place-content-center h-full grid grid-cols-3 bg-white-200'>
                    <li className={`w-[50px] h-[50px] grid place-content-center text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 m-2 rounded-full`}
                        onClick={() => {
                            socket.emit("meeting-emoji-reactions", { meetingId, emoji: "🤑" })
                        }}
                    >🤑</li>
                    <li className={`w-[50px] h-[50px] grid place-content-center text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 m-2 rounded-full`}
                        onClick={() => {
                            socket.emit("meeting-emoji-reactions", { meetingId, emoji: "😇" })
                        }}
                    >😇</li>
                    <li className={`w-[50px] h-[50px] grid place-content-center text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 m-2 rounded-full`}
                        onClick={() => {
                            socket.emit("meeting-emoji-reactions", { meetingId, emoji: "😅" })
                        }}
                    >😅</li>
                    <li className={`w-[50px] h-[50px] grid place-content-center text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 m-2 rounded-full`}
                        onClick={() => {
                            socket.emit("meeting-emoji-reactions", { meetingId, emoji: "😆" })
                        }}
                    >😆</li>
                    <li className={`w-[50px] h-[50px] grid place-content-center text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 m-2 rounded-full`}
                        onClick={() => {
                            socket.emit("meeting-emoji-reactions", { meetingId, emoji: "😜" })
                        }}
                    >😜</li>
                    <li className={`w-[50px] h-[50px] grid place-content-center text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 m-2 rounded-full`}
                        onClick={() => {
                            socket.emit("meeting-emoji-reactions", { meetingId, emoji: "😘" })
                        }}
                    >😘</li>
                    <li className={`w-[50px] h-[50px] grid place-content-center text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 m-2 rounded-full`}
                        onClick={() => {
                            socket.emit("meeting-emoji-reactions", { meetingId, emoji: "👋" })
                        }}
                    >👋</li>
                    <li className={`w-[50px] h-[50px] grid place-content-center text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 m-2 rounded-full`}
                        onClick={() => {
                            socket.emit("meeting-emoji-reactions", { meetingId, emoji: "👍" })
                        }}
                    >👍</li>
                    <li className={`w-[50px] h-[50px] grid place-content-center text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 m-2 rounded-full`}
                        onClick={() => {
                            socket.emit("meeting-emoji-reactions", { meetingId, emoji: "🤝" })
                        }}
                    >🤝</li>
                    <li className={`w-[50px] h-[50px] grid place-content-center text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 m-2 rounded-full`}
                        onClick={() => {
                            socket.emit("meeting-emoji-reactions", { meetingId, emoji: "👊" })
                        }}
                    >👊</li>
                    <li className={`w-[50px] h-[50px] grid place-content-center text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 m-2 rounded-full`}
                        onClick={() => {
                            socket.emit("meeting-emoji-reactions", { meetingId, emoji: "🫶" })
                        }}
                    >🫶</li>
                    <li className={`w-[50px] h-[50px] grid place-content-center text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 m-2 rounded-full`}
                        onClick={() => {
                            socket.emit("meeting-emoji-reactions", { meetingId, emoji: "👌" })
                        }}
                    >👌</li>
                    <li className={`w-[50px] h-[50px] grid place-content-center text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 m-2 rounded-full`}
                        onClick={() => {
                            socket.emit("meeting-emoji-reactions", { meetingId, emoji: "🏆" })
                        }}
                    >🏆</li>
                    <li className={`w-[50px] h-[50px] grid place-content-center text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 m-2 rounded-full`}
                        onClick={() => {
                            socket.emit("meeting-emoji-reactions", { meetingId, emoji: "🎉" })
                        }}
                    >🎉</li>
                    <li className={`w-[50px] h-[50px] grid place-content-center text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 m-2 rounded-full`}
                        onClick={() => {
                            socket.emit("meeting-emoji-reactions", { meetingId, emoji: "🔥" })
                        }}
                    >🔥</li>
                    <li className={`w-[50px] h-[50px] grid place-content-center text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 m-2 rounded-full`}
                        onClick={() => {
                            socket.emit("meeting-emoji-reactions", { meetingId, emoji: "❤️" })
                        }}
                    >❤️</li>
                    <li className={`w-[50px] h-[50px] grid place-content-center text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 m-2 rounded-full`}
                        onClick={() => {
                            socket.emit("meeting-emoji-reactions", { meetingId, emoji: "💔" })
                        }}
                    >💔</li>
                    <li className={`w-[50px] h-[50px] grid place-content-center text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 m-2 rounded-full`}
                        onClick={() => {
                            socket.emit("meeting-emoji-reactions", { meetingId, emoji: "💯" })
                        }}
                    >💯</li>
                </ul>}
                <ul className='flex justify-evenly items-center'>
                    <li
                        className={`p-2  ${isScreenShare ? " bg-slate-500 " : " bg-[#94A3B8] "}  bg-opacity-80 mr-1 sm:mr-2 flex items-center justify-center rounded-full cursor-pointer`}
                        onClick={() => {
                            setIsScreenShare((prev: boolean) => !prev)
                        }}
                    >
                        <span className='block sm:hidden'>
                            <ScreenShareIco height={20} width={20} color={"#F4F4F5"} />
                        </span>
                        <span className='hidden sm:block'>
                            <ScreenShareIco height={25} width={25} color={"#F4F4F5"} />
                        </span>
                    </li>
                    {audio && <li
                        className='p-2 bg-[#94A3B8] bg-opacity-80 mr-1 sm:mr-2 flex items-center justify-center rounded-full cursor-pointer'
                        onClick={() => {
                            setAudio(false)
                        }}
                    >
                        <span className='block sm:hidden'>
                            <VoiceMikeIco height={20} width={20} color={"#F4F4F5"} />
                        </span>
                        <span className='hidden sm:block'>
                            <VoiceMikeIco height={25} width={25} color={"#F4F4F5"} />
                        </span>
                    </li>}
                    {!audio && <li
                        className='p-2 bg-[#94A3B8] bg-opacity-80 mr-1 sm:mr-2 flex items-center justify-center rounded-full cursor-pointer'
                        onClick={() => {
                            setAudio(true)
                        }}
                    >
                        <span className='block sm:hidden'>
                            <UnMuteIco height={20} width={20} color={"#F4F4F5"} />
                        </span>
                        <span className='hidden sm:block'>
                            <UnMuteIco height={25} width={25} color={"#F4F4F5"} />
                        </span>
                    </li>}
                    {video && <li
                        className='p-2 bg-[#94A3B8] bg-opacity-80 mr-1 sm:mr-2 flex items-center justify-center rounded-full cursor-pointer'
                        onClick={() => {
                            setVideo(false)
                        }}
                    >
                        <span className='block sm:hidden'>
                            <VideoICameraIco height={20} width={20} color={"#F4F4F5"} />
                        </span>
                        <span className='hidden sm:block'>
                            <VideoICameraIco height={25} width={25} color={"#F4F4F5"} />
                        </span>
                    </li>}
                    {!video && <li
                        className='p-2 bg-[#94A3B8] bg-opacity-80 mr-1 sm:mr-2 flex items-center justify-center rounded-full cursor-pointer'
                        onClick={() => {
                            setVideo(true)
                        }}
                    >
                        <span className='block sm:hidden'>
                            <ScreenShareIco height={20} width={20} color={"#F4F4F5"} />
                        </span>
                        <span className='hidden sm:block'>
                            <VideoSlashIco height={25} width={25} color={"#F4F4F5"} />
                        </span>
                    </li>}
                    <li
                        className={` p-2 sm:py-3 sm:px-4 bg-[#FF0000] mr-1 sm:mr-2 flex items-center justify-center rounded-xl cursor-pointer`}
                        onClick={() => {
                            handelLeaveMeeting()
                        }}
                    >
                        <span className='block sm:hidden'>
                            <CallEndIco height={25} width={25} color={"#F4F4F5"} />
                        </span>
                        <span className='hidden sm:block'>
                            <CallEndIco height={30} width={35} color={"#F4F4F5"} />
                        </span>
                    </li>
                    <li className={` p-2 ${isMyHandRaise ? " bg-slate-500 " : " bg-[#94A3B8] "} bg-opacity-80 mr-1 sm:mr-2 flex items-center justify-center rounded-full cursor-pointer`}
                        onClick={() => {
                            if (isMyHandRaise) {
                                socket.emit("is-raise-my-hand", { meetingId, isRaiseMyHand: false })
                                setIsMyHandRaise(false)
                            } else {
                                socket.emit("is-raise-my-hand", { meetingId, isRaiseMyHand: true })
                                setIsMyHandRaise(true)
                            }
                        }}
                    >
                        <Badge badgeContent={<Typography style={{ color: `${(HandRaisedUser.length == 0) ? "transparent" : "#7e22ce"}`, fontWeight: "700", marginLeft: "5px" }}>{HandRaisedUser.length}</Typography>} >
                            <span className='block sm:hidden'>
                                <RaiseHandIco height={20} width={20} color={"#F4F4F5"} />
                            </span>
                            <span className='hidden sm:block'>
                                <RaiseHandIco height={25} width={25} color={"#F4F4F5"} />
                            </span>
                        </Badge>
                    </li>
                    <li className={`p-2 ${isReaction ? " bg-slate-500 " : " bg-[#94A3B8] "} bg-opacity-80 mr-1 sm:mr-2 flex items-center justify-center rounded-full cursor-pointer`}
                        onClick={() => {
                            setIsReaction((prev: boolean) => !prev)
                        }}
                    >
                        <span className='block sm:hidden'>
                            <SmilyFace height={20} width={20} color={"#F4F4F5"} />
                        </span>
                        <span className='hidden sm:block'>
                            <SmilyFace height={25} width={25} color={"#F4F4F5"} />
                        </span>
                    </li>
                    <li
                        className={`p-2  ${isShowChat ? " bg-slate-500 " : " bg-[#94A3B8] "} bg-opacity-80 mr-1 sm:mr-2 flex items-center justify-center rounded-full cursor-pointer`}
                        onClick={() => {
                            setIsShowChat((prev: boolean) => !prev)
                        }}
                    >
                        <span className='block sm:hidden'>
                            <MessageIco height={20} width={20} color={"#F4F4F5"} />
                        </span>
                        <span className='hidden sm:block'>
                            <MessageIco height={25} width={25} color={"#F4F4F5"} />
                        </span>
                    </li>
                </ul>
            </ul>
        </>
    )
}

export default MeetingActionBtns
