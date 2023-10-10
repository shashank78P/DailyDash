import CallIco from '@/components/assets/CallIco'
import VideoICameraIco from '@/components/assets/VideoICameraIco'
import React from 'react'
import { selecteChatDto } from '../type'

type ChatTopNavDto = {
    selectedChat : selecteChatDto
}

const ChatTopNav = ({selectedChat} : ChatTopNavDto) => {
    return (
        <ul className='w-full h-[70px] flex justify-start items-center p-2  border-b-slate-100 border-b-2 cursor-pointer'>
            <li >
                <img
                    src={selectedChat?.oponentPic || "images/DefaultUser2.png"}
                    alt=""
                    className='w-[50px] h-[50px] min-w-[50px] border rounded-full bg-slate-100 object-fit aspect-square'
                />
            </li>
            <li className='w-full ml-2'>
                <ul>
                    <li className='mb-[2px]'>{selectedChat?.oponentName}</li>
                    <li className='text-xs text-green-500 font-light'>Online</li>
                </ul>
            </li>
            <li>
                <ul className='flex '>
                    <li className='ml-3'>
                        <CallIco width={25} height={25} />
                    </li>
                    <li className='ml-3'>
                        <VideoICameraIco width={25} height={25} />
                    </li>
                </ul>
            </li>
        </ul>
    )
}

export default ChatTopNav