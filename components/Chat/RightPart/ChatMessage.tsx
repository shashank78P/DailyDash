import React, { useEffect, useState } from 'react'
import { ChatMessageDto } from '../type'
import { useQuery } from 'react-query'
import api from '@/components/lib/api'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { toast } from 'react-toastify'
import { Oval } from "react-loader-spinner"
import FileIcons from '@/components/GlobalComponents/files/fileIcons'
import CrossIco from '@/components/assets/CrossIco'
import { getTime } from '@/components/GlobalComponents/FormateDate1'
const ChatMessage = ({ selectedChat, socket, refetch: refetchChatsNotification, setRefetchList, setIsSearch, isSearch }: ChatMessageDto) => {
    const [limit, setLimit] = useState(50)
    const [skip, setSkip] = useState(0)
    const [messages, setMessages] = useState<Array<any>>([]);
    const [searchMessages, setSearchMessages] = useState<Array<any>>([]);
    const [search, setSearch] = useState<string>("");
    const [socketMsg, setSocketMsg] = useState<Array<any>>([]);
    const [previousBelongsTo, setPreviousBelongsTo] = useState<string | null>(null);

    const { refetch: reSetReadMesssages } = useQuery(["readMessages", setRefetchList, selectedChat], () => {
        return api.get(`/chats/setReadmessages?belongsTo=${selectedChat?.belongsTo}&type=${selectedChat?.type}`,
        )
    },
        {
            onSuccess() {
                refetchChatsNotification()
                setRefetchList((prev: boolean) => !prev)
            },
            refetchOnMount: true
        }
    )

    const { data, isLoading, refetch: refetchChat } = useQuery(["chat", skip, selectedChat, search], () => {
        return api.get(`/chats/getAllchat?belongsTo=${selectedChat?.belongsTo}&limit=${limit}&skip=${skip}&search=${search}`)
    },
        {
            onSuccess({ data }: any) {
                if (!(isSearch && search)) {
                    setMessages([...messages, ...data?.chats]);
                } else {
                    setSearchMessages([...searchMessages, ...data?.chats]);
                }
                setSocketMsg([])
                refetchChatsNotification()
            },
            onError(err: any) {
                toast.error(err);
            },
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        }
    )

    useEffect(() => {

        if (selectedChat?.belongsTo && socket) {
            if (previousBelongsTo) {
                socket?.off(previousBelongsTo);
            }

            socket?.on(selectedChat?.belongsTo, (msg: any) => {
                console.log("setting socket message")
                setSocketMsg((prevMsg) => {
                    if(prevMsg?.[0]?._id !== msg?._id){
                        return [msg, ...prevMsg]
                    }
                    else{
                        return prevMsg
                    }
                }
                );
                reSetReadMesssages()
            });
            refetchChatsNotification()

            setPreviousBelongsTo(selectedChat?.belongsTo);

            return () => {
                console.log("setting socket message off")
                socket?.off(selectedChat?.belongsTo, (msg: any) => {
                });
            }
        }

    }, [selectedChat?.belongsTo, socket])
    useEffect(() => {
        if (previousBelongsTo != null && previousBelongsTo != selectedChat?.belongsTo) {
            setMessages([]);
            setSkip(0)
            setSocketMsg([])
            refetchChat()
        }
    }, [selectedChat?.belongsTo, socket])
    const userSelector = useSelector((state: any) => state?.userSliceReducer);

    function getPreviousChat() {
        if (!(skip >= data?.data?.total)) {
            setSkip(skip + limit);
        }
    }

    console.log(socketMsg)

    const getFileMessage = (file: any) => {
        file = file?.[0]
        return (
            <FileIcons acceptedFiles={file?.mimeType} link={file?.link} />
        )
    }

    function getMessage(chat: any, j: number) {
        return (
            <>
                {
                    <>
                        {
                            chat?.event?.type ?
                                <>
                                    <div className='w-full p-1 bg-purple-100 text-center text-slate-600 text-sm rounded-md my-2'>
                                        {/* {userSelector?.userId !== chat?.from ? `~${chat?.sender}: ` : "~you: "} */}
                                        {chat?.event?.message}
                                    </div>
                                </>
                                :
                                <div className={`w-full mb-2 flex ${userSelector?.userId == chat?.from ? " justify-end" : " justify-start "} items-center`}>
                                    <ul className={`min-w-[100px] h-auto border p-2 rounded ${userSelector?.userId == chat?.from ? " bg-purple-300 " : " bg-purple-100 "}`}>
                                        {userSelector?.userId !== chat?.from && <li className='text-xs my-1 text-slate-600 '>~{chat?.sender}</li>}
                                        <li className='pl-2 w-full'>
                                            {
                                                chat?.messageType === "TEXT" ?
                                                    <div id={j.toString()} className='w-full break-words'>{chat?.message}</div>
                                                    :
                                                    getFileMessage(chat?.file)
                                            }
                                        </li>
                                        <li className='text-end text-xs my-1 text-slate-600 '>{getTime(chat?.createdAt)}</li>
                                    </ul>
                                </div>
                        }
                    </>
                }
            </>
        )
    }

    return (
        <div className=' w-[100%] h-[100%] flex flex-col-reverse overflow-y-scroll p-2 px-4 relative' id="chat">
            {isSearch && <ul className='border flex justify-between items-center fixed top-20 right-0 rounded-lg overflow-hidden bg-purple-50'>
                <li>
                    <input
                        type="text"
                        name="" id=""
                        className=' p-2 text-xs bg-transparent'
                        onChange={(e) => {
                            setSearch(e?.target?.value)
                        }} />
                </li>
                <li
                    onClick={() => {
                        setIsSearch(false)
                    }}
                >
                    <CrossIco height={20} width={20} color='red' />
                </li>
            </ul>}
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
                            <>
                                {
                                    // ele?.event?.type ?
                                    //     <>
                                    //         <div className='w-full p-1 bg-purple-100 text-center text-slate-600 rounded-md my-2 text-sm'>
                                    //             {/* {userSelector?.userId !== ele?.from ? `~${ele?.sender}: ` : "~you: "} */}
                                    //             {ele?.event?.message}
                                    //         </div>
                                    //     </>
                                    //     :
                                    //     <div className={`w-full mb-2 flex ${userSelector?.userId == ele?.from ? " justify-end" : " justify-start "} items-center`}>
                                    //         <ul className={`min-w-[100px] border p-2 rounded ${userSelector?.userId == ele?.from ? " bg-purple-300 " : " bg-purple-100 "}`}>
                                    //             {/* {userSelector?.userId !== ele?.from && <li className='text-xs my-1 text-slate-600 '>~{ele?.sender}</li>} */}
                                    //             <li className='pl-2 w-full'>
                                    //                 {
                                    //                     ele.messageType === "TEXT" ?
                                    //                         <div className="w-full  break-words" id={i.toString()}>{ele?.message}</div>
                                    //                         :
                                    //                         getFileMessage(ele?.file)
                                    //                 }
                                    //             </li>
                                    //             <li className='text-end text-xs my-1 text-slate-600 '>{getTime(ele?.createdAt)}</li>
                                    //         </ul>
                                    //     </div>
                                    getMessage(ele, i)
                                }
                            </>
                        )
                    })
                }
                {
                    !(isSearch && search) && messages?.map((ele: any, i) => {
                        return (
                            <>
                                {
                                    ele?.chats?.map((chat: any, j: number) => {
                                        return (
                                            // <>
                                            //     {
                                            //         chat?.event?.type ?
                                            //             <>
                                            //                 <div className='w-full p-1 bg-purple-100 text-center text-slate-600 text-sm rounded-md my-2'>
                                            //                     {/* {userSelector?.userId !== chat?.from ? `~${chat?.sender}: ` : "~you: "} */}
                                            //                     {chat?.event?.message}
                                            //                 </div>
                                            //             </>
                                            //             :
                                            //             <div className={`w-full mb-2 flex ${userSelector?.userId == chat?.from ? " justify-end" : " justify-start "} items-center`}>
                                            //                 <ul className={`min-w-[100px] h-auto border p-2 rounded ${userSelector?.userId == chat?.from ? " bg-purple-300 " : " bg-purple-100 "}`}>
                                            //                     {userSelector?.userId !== chat?.from && <li className='text-xs my-1 text-slate-600 '>~{chat?.sender}</li>}
                                            //                     <li className='pl-2 w-full'>
                                            //                         {
                                            //                             chat.messageType === "TEXT" ?
                                            //                                 <div id={j.toString()} className='w-full break-words'>{chat?.message}</div>
                                            //                                 :
                                            //                                 getFileMessage(chat?.file)
                                            //                         }
                                            //                     </li>
                                            //                     <li className='text-end text-xs my-1 text-slate-600 '>{getTime(chat?.createdAt)}</li>
                                            //                 </ul>
                                            //             </div>
                                            //     }
                                            // </>
                                            getMessage(chat, j)
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
                {
                    (isSearch && search) && searchMessages?.map((ele: any, i) => {
                        return (
                            <>
                                {
                                    ele?.chats?.map((chat: any, j: number) => {
                                        return (
                                            getMessage(chat, j)
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