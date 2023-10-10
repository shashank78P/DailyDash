import React, { useEffect, useState } from 'react'
import { ChatMessageDto } from '../type'
import { useQuery } from 'react-query'
import api from '@/components/lib/api'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { toast } from 'react-toastify'
import { Circles, Oval, InfinitySpin, ThreeDots } from "react-loader-spinner"
const ChatMessage = ({ selectedChat, socket ,refetch : refetchChatsNotification}: ChatMessageDto) => {
    const [limit, setLimit] = useState(50)
    const [skip, setSkip] = useState(0)
    const [messages, setMessages] = useState<Array<any>>([]);
    const [socketMsg, setSocketMsg] = useState<Array<any>>([]);
    const [previousBelongsTo, setPreviousBelongsTo] = useState<string | null>(null);

    const { refetch: reSetReadMesssages } = useQuery(["readMessages"], () => {
        return api.get(`/chats/setReadmessages?belongsTo=${selectedChat?.belongsTo}&type=${selectedChat?.type}`,
        )
    },
    {
        onSuccess(){
            refetchChatsNotification()
        },
    }
    )

    const { data, isLoading, refetch : refetchChat } = useQuery(["chat", skip, selectedChat ], () => {
        return api.get(`/chats/getAllchat?belongsTo=${selectedChat?.belongsTo}&limit=${limit}&skip=${skip}`)
    },
        {
            onSuccess({ data }: any) {
                console.log(data)
                setMessages([...messages, ...data?.chats]);
                setSocketMsg([])
            },
            onError(err: any) {
                toast.error(err);
            },
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        }
    )

    useEffect(() => {

        if (previousBelongsTo) {
            socket?.off(previousBelongsTo);
        }

        if (selectedChat?.belongsTo) {
            socket?.on(selectedChat?.belongsTo, (msg: any) => {
                console.log(msg);
                console.log(socketMsg);
                setSocketMsg((prevMsg) => [msg,...prevMsg]);
                reSetReadMesssages()
            });
        }
        refetchChatsNotification()

        setPreviousBelongsTo(selectedChat?.belongsTo);

    }, [selectedChat?.belongsTo])
    useEffect(() => {
        if(previousBelongsTo != null && previousBelongsTo != selectedChat?.belongsTo){
            setMessages([]);
            setSkip(0)
            setSocketMsg([])
            refetchChat()
        }
    }, [selectedChat?.belongsTo])
    const userSelector = useSelector((state: any) => state?.userSliceReducer);

    function getPreviousChat() {
        console.log("refetch start", data?.data?.total >= 20, messages.length >= data?.data?.total)
        if (!(skip >= data?.data?.total)) {
            setSkip(skip + limit);
        }
    }

    console.log(socketMsg)

    const getTime = (createdAt : string) => {
        let date = new Date(createdAt)
        return `${date?.getHours()}:${date?.getMinutes()}`
    }

    return (
        <div className=' w-[100%] h-[100%] flex flex-col-reverse overflow-y-scroll p-2 px-4' id="chat">
            <InfiniteScroll
                dataLength={messages.length || 10}
                next={() => {
                    getPreviousChat()
                }}
                hasMore={!(skip >= data?.data?.total)}
                loader={<div className='m-2'><Oval height={20} width={20} color='#7e22ce' /></div>}
                scrollableTarget="chat"
                inverse={true}
                style={{ "display": "flex", "flexDirection": "column-reverse" }}
            >
                {
                    socketMsg?.map((ele, i) => {
                        return (
                            <div className={`w-full mb-2 flex ${userSelector?.userId == ele?.from ? " justify-end" : " justify-start "} items-center`}>
                                <ul className={`min-w-[100px] border p-2 rounded ${userSelector?.userId == ele?.from ? " bg-purple-300 " : " bg-purple-100 "}`}>
                                    <li>
                                        <div id={i.toString()}>{ele?.message}</div>
                                    </li>
                                    <li className='text-end text-xs my-1 text-slate-600 '>{getTime(ele?.createdAt)}</li>
                                </ul>
                            </div>
                        )
                    })
                }
                {
                    messages?.map((ele: any, i) => {
                        return (
                            <>
                                {
                                    ele?.chats?.map((chat: any, j: number) => {
                                        return (
                                            <>
                                                <div className={`w-full mb-2 flex ${userSelector?.userId == chat?.from ? " justify-end" : " justify-start "} items-center`}>
                                                    <ul className={`min-w-[100px] border p-2 rounded ${userSelector?.userId == chat?.from ? " bg-purple-300 " : " bg-purple-100 "}`}>
                                                        <li>
                                                            <div id={j.toString()}>{chat?.message}</div>
                                                        </li>
                                                        <li className='text-end text-xs my-1 text-slate-600 '>{getTime(chat?.createdAt)}</li>
                                                    </ul>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                                {ele?._id && <div className='text-center my-2'>
                                    <span>{ele?._id?.date + " / " + ele?._id?.month + " / " + ele?._id?.year}</span>
                                </div>}
                            </>
                        )
                    })
                }
            </InfiniteScroll>
        </div>
    )
}

export default ChatMessage