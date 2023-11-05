import ChatLogo from '@/components/assets/ChatLogo'
import HorizontalThrreDot from '@/components/assets/HorizontalThrreDot'
import SearchIco from '@/components/assets/SearchIco'
import React from 'react'

type ThreeDotActionDto = {
    setOpen: any,
    open: boolean,
    setChatLeftSearch: Function
}

const ChatLeftTopNav = ({ open, setOpen, setChatLeftSearch  }: ThreeDotActionDto) => {
    return (
        <ul className='w-full p-2 flex justify-between items-center'>
            <li><ChatLogo width={40} height={40} /></li>
            <li className='flex flex-grow justify-start items-center border border-slate-200 p-2 rounded-lg mx-2'>
                <input
                    type='text'
                    onChange={(e) => {
                        setChatLeftSearch(e?.target?.value)
                    }}
                    placeholder='Search...' className='w-full placeholder:text-slate-500 placeholder:text-sm' />
                <SearchIco width={20} height={20} />
            </li>
            <li>
                <span onClick={() => {
                    setOpen(!open)
                }}>
                    <HorizontalThrreDot width={20} height={20} />
                </span>
            </li>
        </ul>
    )
}

export default ChatLeftTopNav