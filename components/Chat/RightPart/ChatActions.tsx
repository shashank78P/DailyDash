import AttachIco from '@/components/assets/AttachIco'
import Send from '@/components/assets/Send'
import VoiceMikeIco from '@/components/assets/VoiceMikeIco'
import React from 'react'

const ChatActions = ({ sendMessage, setNewMessage }: { sendMessage: any, setNewMessage: any }) => {
    return (
        <ul className='w-full flex justify-between items-center p-2'>
            <li className='m-2 cursor-pointer'>
                <AttachIco width={30} height={30} />
            </li>
            <li className='grow'>
                <input
                    type='text'
                    placeholder='Type here to message...'
                    className='w-full border p-2 text-lg rounded-md '
                    onChange={(e) => {
                        setNewMessage(e?.target?.value);
                    }}
                />
            </li>
            <li className='m-2 cursor-pointer'>
                <VoiceMikeIco width={30} height={30} />
            </li>
            <li
                className='m-2 cursor-pointer'
                onClick={(e) => {
                    sendMessage()
                }}
            >
                <Send width={30} height={30} />
            </li>
        </ul>
    )
}

export default ChatActions