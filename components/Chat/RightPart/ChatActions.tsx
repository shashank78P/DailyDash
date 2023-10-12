import AttachIco from '@/components/assets/AttachIco'
import Send from '@/components/assets/Send'
import VoiceMikeIco from '@/components/assets/VoiceMikeIco'
import React, { useState } from 'react'
import { ChatActionsDto } from '../type'
import { useSelector } from 'react-redux'

const ChatActions = ({ selectedChat , socket} : ChatActionsDto) => {
    const [ message , setMessage ] =  useState<string>("");
    const userSelector = useSelector((state : any) => state?.userSliceReducer);
    function sendMessage() {
        if(selectedChat?.type == "INDIVIDUAL"){
            socket.emit("INDIVIDUAL", {message , belongsTo : selectedChat?.belongsTo , to : selectedChat?.opponentId , userId : userSelector?.userId});
        }
        else if(selectedChat?.type == "GROUP"){
            socket.emit("GROUP", {message , belongsTo : selectedChat?.belongsTo , to : selectedChat?.opponentId , userId : userSelector?.userId});
        }
        setMessage("");
    }

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
                    className='min-w-[200px] md:w-full border p-2 text-base rounded-md '
                    value={message}
                    onChange={(e) => {
                        setMessage(e?.target?.value);
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