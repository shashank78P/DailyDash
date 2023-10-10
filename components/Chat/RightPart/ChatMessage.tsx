import React, { useEffect, useState } from 'react'
import { ChatMessageDto } from '../type'
import { useQuery } from 'react-query'
import api from '@/components/lib/api'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { toast } from 'react-toastify'
import { Circles, Oval, InfinitySpin, ThreeDots } from "react-loader-spinner"
const ChatMessage = ({ selectedChat, socket }: ChatMessageDto) => {
    const [limit, setLimit] = useState(50)
    const [skip, setSkip] = useState(0)
    const [messages, setMessages] = useState<Array<any>>([]);
    const [socketMsg, setSocketMsg] = useState<Array<any>>([]);
    const [previousBelongsTo, setPreviousBelongsTo] = useState<string | null>(null);

    const { refetch: reSetReadMesssages } = useQuery(["readMessages"], () => {
        return api.get(`/chats/setReadmessages?belongsTo=${selectedChat?.belongsTo}`)
    })

    const { data, isLoading, refetch } = useQuery(["chat", skip, selectedChat], () => {
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
            refetchOnMount: false,
        }
    )

    useEffect(() => {

        if (previousBelongsTo) {
            socket?.off(previousBelongsTo);
        }

        if (selectedChat?.belongsTo) {
            socket?.on(selectedChat?.belongsTo, (msg: any) => {
                console.log(msg);
                setSocketMsg([...socketMsg, msg]);
                reSetReadMesssages()
            });
        }

        setPreviousBelongsTo(selectedChat?.belongsTo);

    }, [selectedChat?.belongsTo])
    useEffect(() => {
        if(previousBelongsTo != null && previousBelongsTo != selectedChat?.belongsTo){
            setMessages([]);
            setSkip(0)
            setSocketMsg([])
            refetch()
        }
    }, [selectedChat?.belongsTo])
    const userSelector = useSelector((state: any) => state?.userSliceReducer);

    function getPreviousChat() {
        console.log("refetch start", data?.data?.total >= 20, messages.length >= data?.data?.total)
        if (!(skip >= data?.data?.total)) {
            setSkip(skip + limit);
        }
    }

    const getTime = (hour: number, minute: number) => {
        let date = 2360;
        let temp: any = Number(hour + "" + minute) - 630
        if (temp < 0) {
            temp = date + temp
        }
        else if (temp == 0) {
            temp = 100
        }
        temp = temp.toString();
        let min: number = temp.slice(temp.length - 2)
        let hrs: number = temp.slice(0, temp.length - 2)
        if (min == 60) {
            temp = hrs + 1 + ":00"
        } else {
            temp = hrs + ":" + min
        }
        return temp;
    }

    return (
        <div className=' w-[100%] h-[100%] flex flex-col-reverse overflow-y-scroll p-2 px-4' id="chat">
            <InfiniteScroll
                dataLength={messages.length}
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
                                    <li className='text-end text-xs my-1 text-slate-600 '>{getTime(ele?.createdAt?.slice(11, 13), ele?.createdAt?.slice(14, 16))}</li>
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
                                                        <li className='text-end text-xs my-1 text-slate-600 '>{getTime(chat?.hours, chat?.minute)}</li>
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