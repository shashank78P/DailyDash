import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const ChatGroupList = () => {
    const onLineUser = [
        {
            name: "Kushi",
            message: "hii",
            isSenderI: 0,
            time: "20-07-2023",
            unReadMesagesCount: 0,
            url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
        },
        {
            name: "Kushi",
            message: "hii",
            isSenderI: 0,
            time: "20-07-2023",
            unReadMesagesCount: 0,
            url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
        },
        {
            name: "Kushi",
            message: "hii",
            isSenderI: 0,
            time: "20-07-2023",
            unReadMesagesCount: 0,
            url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
        },
        {
            name: "Kushi",
            message: "hii",
            isSenderI: 0,
            time: "20-07-2023",
            unReadMesagesCount: 0,
            url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
        },
        {
            name: "Kushi",
            message: "hii",
            isSenderI: 0,
            time: "20-07-2023",
            unReadMesagesCount: 0,
            url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
        },
        {
            name: "Kushi",
            message: "hii",
            isSenderI: 0,
            time: "20-07-2023",
            unReadMesagesCount: 0,
            url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
        },
        {
            name: "Kushi",
            message: "hii",
            isSenderI: 0,
            time: "20-07-2023",
            unReadMesagesCount: 0,
            url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
        },
        {
            name: "Kushi",
            message: "hii",
            isSenderI: 0,
            time: "20-07-2023",
            unReadMesagesCount: 0,
            url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
        },
        {
            name: "Surja",
            message: "How are u",
            isSenderI: 1,
            time: "15-07-2023",
            unReadMesagesCount: 0,
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUs73Mz3FqhV8uy2F5TGw_jGvFdzGirConJA&usqp=CAU"
        },
        {
            name: "Surja",
            message: "How are u",
            isSenderI: 1,
            time: "15-07-2023",
            unReadMesagesCount: 0,
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUs73Mz3FqhV8uy2F5TGw_jGvFdzGirConJA&usqp=CAU"
        },
        {
            name: "Surja",
            message: "How are u",
            isSenderI: 1,
            time: "15-07-2023",
            unReadMesagesCount: 0,
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUs73Mz3FqhV8uy2F5TGw_jGvFdzGirConJA&usqp=CAU"
        },
        {
            name: "Surja",
            message: "How are u",
            isSenderI: 1,
            time: "15-07-2023",
            unReadMesagesCount: 0,
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUs73Mz3FqhV8uy2F5TGw_jGvFdzGirConJA&usqp=CAU"
        },
        {
            name: "Surja",
            message: "How are u",
            isSenderI: 1,
            time: "15-07-2023",
            unReadMesagesCount: 0,
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUs73Mz3FqhV8uy2F5TGw_jGvFdzGirConJA&usqp=CAU"
        },
        {
            name: "Surja",
            message: "How are u",
            isSenderI: 1,
            time: "15-07-2023",
            unReadMesagesCount: 0,
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUs73Mz3FqhV8uy2F5TGw_jGvFdzGirConJA&usqp=CAU"
        },
        {
            name: "Surja",
            message: "How are u",
            isSenderI: 1,
            time: "15-07-2023",
            unReadMesagesCount: 0,
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUs73Mz3FqhV8uy2F5TGw_jGvFdzGirConJA&usqp=CAU"
        },
        {
            name: "Surja",
            message: "How are u",
            isSenderI: 1,
            time: "15-07-2023",
            unReadMesagesCount: 0,
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUs73Mz3FqhV8uy2F5TGw_jGvFdzGirConJA&usqp=CAU"
        },
    ]
    const [t, setT] = useState(onLineUser)

    function fun() {
        setT([...t, ...onLineUser])
    }
    return (
        <>
            <div className='overflow-y-scroll'>
                <InfiniteScroll
                    dataLength={onLineUser.length}
                    next={() => {
                        fun()
                    }}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="id"
                    inverse={true}
                >
                    {

                        onLineUser.map((ele, i) => {
                            return (
                                <ul className='w-full h-full flex justify-start items-center p-2 hover:bg-slate-100 border-b-slate-100 border-b-2'>
                                    <li >
                                        <img src={ele.url} alt="" className='w-[50px] h-[50px] min-w-[50px] border rounded-full bg-slate-100 object-fit aspect-square' />
                                    </li>
                                    <li className='w-full h-16 flex justify-between items-start ml-2'>
                                        <ul className='w-full flex flex-col justify-evenly h-16'>
                                            <li className='flex justify-between items-start'>
                                                <span className='text-lg font-medium'>{ele?.name}</span>
                                                <span className='text-xs font-light text-slate-600'>{ele?.time}</span>
                                            </li>
                                            <li className='flex justify-between items-start truncate'>
                                                <span className='truncate w-48 text-sm font-normal text-slate-600'>{ele?.isSenderI == 1 && 'you: '}{ele?.message}</span>
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

export default ChatGroupList