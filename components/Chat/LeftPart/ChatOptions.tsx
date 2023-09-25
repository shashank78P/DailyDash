import BookMark from '@/components/assets/BookMark'
import CallIco from '@/components/assets/CallIco'
import UserIco from '@/components/assets/UserIco'
import UsersGroup from '@/components/assets/UsersGroupIco'
import React from 'react'

const ChatOptions = () => {
    return (
        <ul className='w-full flex justify-between items-center'>
            <li className='p-2 flex justify-center flex-grow items-center'>
                <UserIco width={30} height={30} />
                <div className='text-[16px]  font-semibold'>
                    100+
                </div>
            </li>
            <li className='p-2 flex justify-center flex-grow items-center'>
                <UsersGroup width={30} height={30} />
                <div className='text-[16px]  font-semibold'>
                    100+
                </div>
            </li>
            <li className='p-2 flex justify-center flex-grow items-center '>
                <CallIco width={30} height={30} />
                <div className='text-[16px]  font-semibold'>
                    100+
                </div>
            </li>
        </ul>
    )
}

export default ChatOptions