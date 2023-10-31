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
            <ul className='flex flex-col justify-center items-center fixed bottom-2 z-50 inset-x-1/2'>
                {isReaction && <ul className='w-full flex flex-col'>
                    <ul className='w-full flex justify-evenly items-center mb-2'>
                        <li className={`text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 mr-2 rounded-full`}
                            onClick={() => {
                                socket.emit("meeting-emoji-reactions", { meetingId, emoji: "🤑" })
                            }}
                        >🤑</li>
                        <li className={`text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 mr-2 rounded-full`}
                            onClick={() => {
                                socket.emit("meeting-emoji-reactions", { meetingId, emoji: "😇" })
                            }}
                        >😇</li>
                        <li className={`text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 mr-2 rounded-full`}
                            onClick={() => {
                                socket.emit("meeting-emoji-reactions", { meetingId, emoji: "😅" })
                            }}
                        >😅</li>
                        <li className={`text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 mr-2 rounded-full`}
                            onClick={() => {
                                socket.emit("meeting-emoji-reactions", { meetingId, emoji: "😆" })
                            }}
                        >😆</li>
                        <li className={`text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 mr-2 rounded-full`}
                            onClick={() => {
                                socket.emit("meeting-emoji-reactions", { meetingId, emoji: "😜" })
                            }}
                        >😜</li>
                        <li className={`text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 mr-2 rounded-full`}
                            onClick={() => {
                                socket.emit("meeting-emoji-reactions", { meetingId, emoji: "😘" })
                            }}
                        >😘</li>
                        <li className={`text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 mr-2 rounded-full`}
                            onClick={() => {
                                socket.emit("meeting-emoji-reactions", { meetingId, emoji: "👋" })
                            }}
                        >👋</li>
                        <li className={`text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 mr-2 rounded-full`}
                            onClick={() => {
                                socket.emit("meeting-emoji-reactions", { meetingId, emoji: "👍" })
                            }}
                        >👍</li>
                        <li className={`text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 mr-2 rounded-full`}
                            onClick={() => {
                                socket.emit("meeting-emoji-reactions", { meetingId, emoji: "🤝" })
                            }}
                        >🤝</li>
                    </ul>
                    <ul className='w-full flex justify-evenly items-center mb-2'>
                        <li className={`text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 mr-2 rounded-full`}
                            onClick={() => {
                                socket.emit("meeting-emoji-reactions", { meetingId, emoji: "👊" })
                            }}
                        >👊</li>
                        <li className={`text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 mr-2 rounded-full`}
                            onClick={() => {
                                socket.emit("meeting-emoji-reactions", { meetingId, emoji: "🫶" })
                            }}
                        >🫶</li>
                        <li className={`text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 mr-2 rounded-full`}
                            onClick={() => {
                                socket.emit("meeting-emoji-reactions", { meetingId, emoji: "👌" })
                            }}
                        >👌</li>
                        <li className={`text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 mr-2 rounded-full`}
                            onClick={() => {
                                socket.emit("meeting-emoji-reactions", { meetingId, emoji: "🏆" })
                            }}
                        >🏆</li>
                        <li className={`text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 mr-2 rounded-full`}
                            onClick={() => {
                                socket.emit("meeting-emoji-reactions", { meetingId, emoji: "🎉" })
                            }}
                        >🎉</li>
                        <li className={`text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 mr-2 rounded-full`}
                            onClick={() => {
                                socket.emit("meeting-emoji-reactions", { meetingId, emoji: "🔥" })
                            }}
                        >🔥</li>
                        <li className={`text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 mr-2 rounded-full`}
                            onClick={() => {
                                socket.emit("meeting-emoji-reactions", { meetingId, emoji: "❤️" })
                            }}
                        >❤️</li>
                        <li className={`text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 mr-2 rounded-full`}
                            onClick={() => {
                                socket.emit("meeting-emoji-reactions", { meetingId, emoji: "💔" })
                            }}
                        >💔</li>
                        <li className={`text-xl p-2 cursor-pointer hover:bg-slate-500 bg-[#94A3B8] bg-opacity-80 mr-2 rounded-full`}
                            onClick={() => {
                                socket.emit("meeting-emoji-reactions", { meetingId, emoji: "💯" })
                            }}
                        >💯</li>
                    </ul>
                </ul>}
                <ul className='flex justify-evenly items-center'>
                    <li
                        className={`p-2  ${isScreenShare ? " bg-slate-500 " : " bg-[#94A3B8] "}  bg-opacity-80 mr-2 flex items-center justify-center rounded-full cursor-pointer`}
                        onClick={() => {
                            setIsScreenShare((prev: boolean) => !prev)
                        }}
                    >
                        <ScreenShareIco height={25} width={25} color={"#F4F4F5"} />
                    </li>
                    {audio && <li
                        className='p-2 bg-[#94A3B8] bg-opacity-80 mr-2 flex items-center justify-center rounded-full cursor-pointer'
                        onClick={() => {
                            setAudio(false)
                        }}
                    >
                        <VoiceMikeIco height={25} width={25} color={"#F4F4F5"} />
                    </li>}
                    {!audio && <li
                        className='p-2 bg-[#94A3B8] bg-opacity-80 mr-2 flex items-center justify-center rounded-full cursor-pointer'
                        onClick={() => {
                            setAudio(true)
                        }}
                    >
                        <UnMuteIco height={25} width={25} color={"#F4F4F5"} />
                    </li>}
                    {video && <li
                        className='p-2 bg-[#94A3B8] bg-opacity-80 mr-2 flex items-center justify-center rounded-full cursor-pointer'
                        onClick={() => {
                            setVideo(false)
                        }}
                    >
                        <VideoICameraIco height={25} width={25} color={"#F4F4F5"} />
                    </li>}
                    {!video && <li
                        className='p-2 bg-[#94A3B8] bg-opacity-80 mr-2 flex items-center justify-center rounded-full cursor-pointer'
                        onClick={() => {
                            setVideo(true)
                        }}
                    >
                        <VideoSlashIco height={25} width={25} color={"#F4F4F5"} />
                    </li>}
                    <li
                        className='py-3 px-4 bg-[#FF0000] mr-2 flex items-center justify-center rounded-xl cursor-pointer'
                        onClick={() => {
                            handelLeaveMeeting()
                        }}
                    >
                        <CallEndIco height={30} width={35} color={"#F4F4F5"} />
                    </li>
                    <li className={` p-2 ${isMyHandRaise ? " bg-slate-500 " : " bg-[#94A3B8] "} bg-opacity-80 mr-2 flex items-center justify-center rounded-full cursor-pointer`}
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
                            <RaiseHandIco height={25} width={25} color={"#F4F4F5"} />
                        </Badge>
                    </li>
                    <li className={`p-2 ${isReaction ? " bg-slate-500 " : " bg-[#94A3B8] "} bg-opacity-80 mr-2 flex items-center justify-center rounded-full cursor-pointer`}
                        onClick={() => {
                            setIsReaction((prev: boolean) => !prev)
                        }}
                    >
                        <SmilyFace height={25} width={25} color={"#F4F4F5"} />
                    </li>
                    <li
                        className={`p-2  ${isShowChat ? " bg-slate-500 " : " bg-[#94A3B8] "} bg-opacity-80 mr-2 flex items-center justify-center rounded-full cursor-pointer`}
                        onClick={() => {
                            setIsShowChat((prev: boolean) => !prev)
                        }}
                    >
                        <MessageIco height={25} width={25} color={"#F4F4F5"} />
                    </li>
                </ul>
            </ul>
        </>
    )
}

export default MeetingActionBtns
