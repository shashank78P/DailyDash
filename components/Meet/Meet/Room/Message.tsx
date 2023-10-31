import DragableResizeDiv from '@/components/GlobalComponents/DragableResizeDiv'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { messageDto, streamContextDto } from '../../types';
import Send from '@/components/assets/Send';
import { SocketContext } from '@/components/context/SocketContext';
import MediaContext from '../State/MediaContext';

const Message = () => {
    const userSelector = useSelector((state: any) => state?.userSliceReducer);
    const { socket, myPeer }: any = useContext(SocketContext);
    const { setMessages, messages, meetingId } = useContext<streamContextDto>(MediaContext)
    const [localMessage, setLocalMessage] = useState("")
    const messageEndRef : any = useRef()
    const ref = useRef()

    const getTime = (createdAt: Date) => {
        let date = new Date(createdAt)
        return `${date?.getHours()}:${date?.getMinutes()}`
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messageEndRef && messageEndRef?.current) {
            messageEndRef?.current?.scrollIntoView({ behavior: "smooth" });
        }
    };
    console.log(messageEndRef)

    return (
        <>
            <DragableResizeDiv initPosition={{
                x: 50,
                y: 70
            }}
                // style={{
                // overflowY: "scroll"
                // }}
                containerWidth={300} containerHeight={400} containerMinWidth={300} containerMinHeight={200} containerMaxWidth={500} containerMaxHeight={700}
            >
                <div className='w-full h-full bg-white rounded-lg shadow-2xl flex flex-col p-0 overflow-hidden'>
                    <ul className=' w-full mb-1 bg-purple-100 sticky top-0 p-2'>
                        <li className='font-medium text-lg text-purple-700 '>Messages</li>
                        <li></li>
                    </ul>
                    <div className='w-full h-full overflow-y-scroll p-2'>
                        {
                            messages?.map((msg: messageDto, i: number) => {
                                return <>
                                    <div
                                        key={i}
                                        className={`w-full mb-2 flex ${userSelector?.userId == msg?.userId ? " justify-end" : " justify-start "} items-center`}
                                        ref={messages.length - 1 === i ? messageEndRef : ref}
                                    >
                                        <ul className={`min-w-[100px] border p-2 rounded ${userSelector?.userId == msg?.userId ? " bg-purple-300 " : " bg-purple-100 "}`}>
                                            {userSelector?.userId !== msg?.userId && <li className='text-xs my-1 text-slate-600 '>~{msg?.createdBy}</li>}
                                            <li className='pl-2'>
                                                {msg?.message}
                                            </li>
                                            <li className='text-end text-xs my-1 text-slate-600 '>{getTime(msg?.createdAt)}</li>
                                        </ul>
                                    </div>
                                </>
                            })
                        }
                    </div>
                    <div className='w-full h-auto flex justify-center items-center p-2'>
                        <textarea
                            placeholder='Type here to message...'
                            style={
                                {
                                    "height": "60px",
                                    "resize": "none"
                                }
                            }
                            className='w-full border p-2 text-base rounded-md placeholder:text-base'
                            value={localMessage}
                            onChange={(e) => {
                                setLocalMessage(e?.target?.value);
                            }}
                        />
                        <div
                            className='m-2 cursor-pointer'
                            onClick={(e) => {
                                const myMessage: messageDto = {
                                    message: localMessage,
                                    createdAt: new Date(),
                                    createdBy: userSelector?.firstName ?? " " + " " + userSelector?.lastName ?? " ",
                                    userId: userSelector?.userId,
                                    meetingId: meetingId
                                }
                                socket.emit("meeting-message", myMessage)
                                const temp = [...messages , myMessage]
                                temp?.sort((a, b) => (new Date(a.createdAt) === new Date(b.createdAt)) ? 0 : (new Date(a.createdAt) > new Date(b.createdAt)) ? -1 : 1);
                                setMessages(temp.reverse())
                                setLocalMessage("")
                            }}
                        >
                            <Send width={25} height={25} color='#7e22ce' />
                        </div>
                    </div>
                </div>
            </DragableResizeDiv>
        </>
    )
}

export default Message
