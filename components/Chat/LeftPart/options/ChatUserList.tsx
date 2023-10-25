"use-client"
import PlusIco from '@/components/assets/PlusIco'
import api from '@/components/lib/api'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useQuery } from "react-query"
import { useSelector } from 'react-redux'
import { ChatUserListDto } from '../../type'
import { Oval } from 'react-loader-spinner'


const ChatUserList = ({ selectedChat, setSelectedChat }: ChatUserListDto) => {
    const {data, error, isLoading} = useQuery(['userList'], ()=>{
        return api.get("/chats/getAllInitiatedChatUserList")
    });

    const userSelector = useSelector((state : any) => state?.userSliceReducer);

    const [height, setHeight] = useState<number>();

    useEffect(() => {
        setHeight(window.outerHeight - 160)
        addEventListener("resize", () => {
            setHeight(window.outerHeight - 160)
            // console.log("resize" + window.outerHeight)
        })
    }, [])

    return (
        <>
            <div className={`overflow-y-scroll mb-5 relative `} id="id" style={{ "height": `${height}px` }}>
                <InfiniteScroll
                    dataLength={data?.data?.length || 10}
                    next={() => {
                        // fun()
                    }}
                    hasMore={true}
                    loader={<div className='m-2'><Oval height={20} width={20} color='#7e22ce' /></div>}
                    scrollableTarget="id"
                    // inverse={true}

                >
                    {
                        Array.isArray(data?.data) && data?.data?.map((ele: any, i: number) => {
                            return (
                                <ul key={i}
                                    onClick={() => {
                                        setSelectedChat({
                                            opponentId:ele?.opponentId,
                                            opponentPic : ele?.opponentPic,
                                            opponentName : ele?.opponentName,
                                            belongsTo : ele?.belongsTo,
                                            type : "INDIVIDUAL"
                                        })
                                    }}
                                    className='w-full h-full flex justify-start items-center p-2 hover:bg-slate-100 border-b-slate-100 border-b-2'
                                >
                                    <li >
                                        <img src={ele?.opponentPic || "images/DefaultUser2.png"} alt="" className='w-[50px] h-[50px] min-w-[50px] border rounded-full bg-slate-100 object-fit aspect-square' />
                                    </li>
                                    <li className='w-full h-16 flex justify-between items-start ml-2'>
                                        <ul className='w-full flex flex-col justify-evenly h-16'>
                                            <li className='flex justify-between items-start'>
                                                <span className='text-lg font-medium'>{ele?.opponentName}</span>
                                                <span className='text-xs font-light text-slate-600'>{ele?.sendAt}</span>
                                            </li>
                                            <li className='flex justify-between items-start truncate'>
                                                <span className='truncate w-48 text-sm font-normal text-slate-600'>{ele?.messageSentBy == userSelector?.userId && 'you: '}{ele?.message}</span>
                                                {ele?.unReadMesagesCount !== 0 && <span className='text-base font-semibold text-purple-500'>{ele?.unReadMesagesCount > 100 ? "100+" : ele?.unReadMesagesCount}</span>}
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            )
                        })
                    }
                </InfiniteScroll>
            </div></>
    )
}

export default ChatUserList