"use-client"
import PlusIco from '@/components/assets/PlusIco'
import api from '@/components/lib/api'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useQuery } from "react-query"
import { useSelector } from 'react-redux'
import { ChatUserListDto } from '../../type'


const ChatUserList = ({ selectedChat, setSelectedChat }: ChatUserListDto) => {
    const {data, error, isLoading} = useQuery(['userList'], ()=>{
        return api.get("/chats/getAllInitiatedChatUserList")
    });

    const userSelector = useSelector((state : any) => state?.userSliceReducer);

    console.log(data)
    let onLineUser = [
        {
            name: "Lisha",
            message: "1",
            isSenderI: 1,
            time: "12:30 AM",
            unReadMesagesCount: 100,
            url: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg"
        },
        {
            name: "Arjun",
            message: "2",
            isSenderI: 0,
            time: "11:27 AM",
            unReadMesagesCount: 200,
            url: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
        },
        {
            name: "Arjun",
            message: "3",
            isSenderI: 0,
            time: "11:27 AM",
            unReadMesagesCount: 200,
            url: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
        },
        {
            name: "Arjun",
            message: "4",
            isSenderI: 0,
            time: "11:27 AM",
            unReadMesagesCount: 200,
            url: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
        },
        {
            name: "Ajay",
            message: "5",
            isSenderI: 1,
            time: "Yesturday",
            unReadMesagesCount: 0,
            url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
        },
        {
            name: "Ajay",
            message: "6",
            isSenderI: 1,
            time: "Yesturday",
            unReadMesagesCount: 0,
            url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
        },
        {
            name: "Ajay",
            message: "7",
            isSenderI: 1,
            time: "Yesturday",
            unReadMesagesCount: 0,
            url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
        },
        {
            name: "Ajay",
            message: "8",
            isSenderI: 1,
            time: "Yesturday",
            unReadMesagesCount: 0,
            url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
        },
        {
            name: "Ajay",
            message: "9",
            isSenderI: 1,
            time: "Yesturday",
            unReadMesagesCount: 0,
            url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
        },
    ]

    
    const [online, setOnline] = useState<any>(onLineUser);
    const [height, setHeight] = useState<number>();

    useEffect(() => {
        setHeight(window.outerHeight - 160)
        addEventListener("resize", () => {
            setHeight(window.outerHeight - 160)
            console.log("resize" + window.outerHeight)
        })
    }, [])

    function fun() {
        // setOnline()
        setTimeout(() => {
            setOnline([
                {
                    name: "Arjun",
                    message: "4",
                    isSenderI: 0,
                    time: "11:27 AM",
                    unReadMesagesCount: 2000,
                    url: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
                },
                ...online, 
            ]);
            console.log(online)
        }, 1500);
    }


    return (
        <>
            <div className={`overflow-y-scroll mb-5 relative `} id="id" style={{ "height": `${height}px` }}>
                <InfiniteScroll
                    dataLength={online.length}
                    next={() => {
                        // fun()
                    }}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="id"
                    // inverse={true}

                >
                    {
                        Array.isArray(data?.data) && data?.data?.map((ele: any, i: number) => {
                            return (
                                <ul
                                    onClick={() => {
                                        setSelectedChat({
                                            oponentId:ele?.oponentId,
                                            oponentPic : ele?.oponentPic,
                                            oponentName : ele?.oponentName,
                                            belongsTo : ele?.belongsTo
                                        })
                                    }}
                                    className='w-full h-full flex justify-start items-center p-2 hover:bg-slate-100 border-b-slate-100 border-b-2'
                                >
                                    <li >
                                        <img src={ele?.oponentPic || "images/DefaultUser2.png"} alt="" className='w-[50px] h-[50px] min-w-[50px] border rounded-full bg-slate-100 object-fit aspect-square' />
                                    </li>
                                    <li className='w-full h-16 flex justify-between items-start ml-2'>
                                        <ul className='w-full flex flex-col justify-evenly h-16'>
                                            <li className='flex justify-between items-start'>
                                                <span className='text-lg font-medium'>{ele?.oponentName}</span>
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