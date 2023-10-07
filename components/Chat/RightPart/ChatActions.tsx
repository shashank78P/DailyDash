import AttachIco from '@/components/assets/AttachIco'
import Send from '@/components/assets/Send'
import VoiceMikeIco from '@/components/assets/VoiceMikeIco'
import React from 'react'

const ChatActions = ({ sendMessage, setNewMessage }: { sendMessage: any, setNewMessage: any }) => {
    return (
        <ul className='w-full flex justify-between items-center'>
            <li className='mx-2 cursor-pointer'>
                <AttachIco width={25} height={25} />
            </li>
            <li className='grow'>
                <textarea
                    placeholder='Type here to message...'
                    style={
                        {
                            "height" : "60px",
                            "resize" : "none"
                        }
                    }
                    className='w-full border p-2 text-base rounded-md '
                    onChange={(e) => {
                        setNewMessage(e?.target?.value);
                    }}
                />
            </li>
            <li className='m-2 cursor-pointer'>
                <VoiceMikeIco width={25} height={25} />
            </li>
            <li
                className='m-2 cursor-pointer'
                onClick={(e) => {
                    sendMessage()
                }}
            >
                <Send width={25} height={25} color='#7e22ce'/>
            </li>
        </ul>
    )
}

export default ChatActions