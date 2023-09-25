import React from 'react'

const ChatTopNav = () => {
    return (
        <ul className='w-full chatActions h-[70px] px-2 flex justify-between items-center'>
            <li className='min-w-[60px] min-h-[60px] rounded-full bg-slate-200'></li>
            <li className='h-full grow ml-2'>
                <ul className='h-full flex flex-col justify-evenly items-start'>
                    <li className='w-20 p-2 bg-slate-200'></li>
                    <li className='w-10 p-2 bg-slate-200'></li>
                </ul>
            </li>
            <li className='min-w-[150px] h-full ml-2'>
                <ul className='h-full flex justify-evenly items-center'>
                    <li className='min-w-[30px] min-h-[30px] p-2 bg-slate-200'></li>
                    <li className='min-w-[30px] min-h-[30px] p-2 bg-slate-200'></li>
                    <li className='min-w-[30px] min-h-[30px] p-2 bg-slate-200'></li>
                </ul>
            </li>
        </ul>
    )
}

export default ChatTopNav