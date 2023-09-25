import ChatLogo from '@/components/assets/ChatLogo'
import HorizontalThrreDot from '@/components/assets/HorizontalThrreDot'
import SearchIco from '@/components/assets/SearchIco'
import React from 'react'

const ChatLeftTopNav = () => {
    return (
        <ul className='w-full p-2 flex justify-between items-center'>
            <li><ChatLogo width={50} height={50} /></li>
            <li className='flex flex-grow justify-start items-center border border-slate-200 p-2 rounded-lg mx-2'>
                <input type='text' placeholder='Search...' className='w-full placeholder:text-black' />
                <SearchIco width={20} height={20} />
            </li>
            <li><HorizontalThrreDot width={30} height={30} /></li>
        </ul>
    )
}

export default ChatLeftTopNav