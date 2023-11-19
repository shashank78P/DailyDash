import CallIco from '@/components/assets/CallIco'
import VideoICameraIco from '@/components/assets/VideoICameraIco'
import React, { useState } from 'react'
import { selecteChatDto } from '../type'
import DeleteIco from '@/components/assets/DeleteIco'
import HorizontalThrreDot from '@/components/assets/HorizontalThrreDot'
import { IconButton, Menu, MenuItem } from '@mui/material'
import SearchIco from '@/components/assets/SearchIco'
import CreateMeetingForm from '@/components/Meet/Meet/CreateMeetingForm'
import CreateMeeting from './CreateMeeting'

type ChatTopNavDto = {
    selectedChat: selecteChatDto,
    setIsViewProfile: any,
    setIsSearch: Function,
    createMeeting: boolean,
    setCreateMeeting: Function,
    typingMessage: string,
    setTypingMessage: Function,
}

const ChatTopNav = ({ selectedChat, setIsViewProfile, setIsSearch, createMeeting, setCreateMeeting, setTypingMessage, typingMessage }: ChatTopNavDto) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        // setIsOpen(false)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <ul className='w-full h-[70px] flex justify-start items-center p-2  border-b-slate-100 border-b-2 cursor-pointer'
            >
                <li
                    onClick={() => {
                        setIsViewProfile(true)
                    }}
                >
                    <img
                        src={selectedChat?.opponentPic || "images/DefaultUser2.png"}
                        alt=""
                        className='w-[50px] h-[50px] min-w-[50px] border rounded-full bg-slate-100 object-fit aspect-square'
                    />
                </li>
                <li className='w-full ml-2'
                    onClick={() => {
                        setIsViewProfile(true)
                    }}
                >
                    <ul>
                        <li className='mb-[2px]'>{selectedChat?.opponentName}</li>
                        <li className='flex items-center'>
                            {selectedChat?.isOnline && <span className='text-xs text-green-500 font-light mr-2 border-r border-transparent border-slate-500'>{"Online"}</span>}
                            {typingMessage !== "" && <span className='text-xs text-purple-500 font-light mr-2'>{typingMessage}</span>}
                        </li>
                    </ul>
                </li>
                <li>
                    <ul className='flex justify-center items-center'>
                        {/* <li className='ml-3'
                        onClick={() => {
                            
                        }}
                    >
                        <CallIco width={25} height={25} />
                    </li> */}
                        <li className='ml-3'
                            onClick={() => {
                                setCreateMeeting(true)
                            }}
                        >
                            <VideoICameraIco width={25} height={25} />
                        </li>
                        <li className='ml-3'>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <HorizontalThrreDot height={25} width={25} />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    style: {
                                        // maxHeight: "100px",
                                        // width: '100px',
                                    },
                                }}
                            >
                                <MenuItem key={"delete"} onClick={handleClose}>
                                    <div className='m-1 flex justify-evenly items-center'
                                        onClick={() => {
                                            setIsSearch(true)
                                        }}
                                    >
                                        <span className='mr-2'>
                                            <SearchIco width={20} height={20} />
                                        </span>
                                        Search
                                    </div>
                                </MenuItem>
                            </Menu>
                        </li>
                    </ul>
                </li>
            </ul>
        </>
    )
}

export default ChatTopNav