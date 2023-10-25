import api from '@/components/lib/api';
import React, { useContext, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Oval } from 'react-loader-spinner'
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { ChatUserListDto } from '../../type';
import { FormateDate1 } from '@/components/GlobalComponents/FormateDate1';
import { SocketContext } from '@/components/context/SocketContext';
import VideoICameraIco from '@/components/assets/VideoICameraIco';
import VoiceMikeIco from '@/components/assets/VoiceMikeIco';
import NoteIco from '@/components/assets/NoteIco';

const ChatGroupList = ({ selectedChat, setSelectedChat, refetchList, refetchUnReadMessages }: ChatUserListDto) => {
    const limit = 50;
    const [skip, setSkip] = useState(0)
    const { socket }: any = useContext(SocketContext);
    const { data, error, isLoading, refetch } = useQuery(['groupList', refetchList, selectedChat?.belongsTo], () => {
        return api.get("/chats/getAllInitiatedChatGroupList")
    },
        {
            refetchOnMount: true
        }
    );

    function getFileTypeMessage(fileType: string) {
        if (fileType) {
            const file = fileType.split("/")[0]

            if (file.toLowerCase() === "audio") {
                return <>
                    <VoiceMikeIco height={15} width={15} />
                    <span className='ml-0.5'>{file}</span>
                </>
            }
            else if (file.toLowerCase() === "video") {
                return <>
                    <VideoICameraIco height={15} width={15} />
                    <span className='ml-0.5'>{file}</span>
                </>
            }
            else {
                return <>
                    <NoteIco height={15} width={15} color={''} />
                    <span className='ml-2'>{file}</span>
                </>
            }
        }
    }

    useEffect(() => {
        if (data?.data && Array.isArray(data?.data)) {
            data?.data?.map((ele, i) => {
                socket?.on(`${ele?.groupId}ChatNotification`, (msg: any) => {
                    refetch()
                    refetchUnReadMessages()
                });
            })
        }
    }, [data])
    const userSelector = useSelector((state: any) => state?.userSliceReducer);

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
            <div className='overflow-y-scroll' style={{ "height": `${height}px` }}>
                <InfiniteScroll
                    dataLength={10}
                    next={() => {

                    }}
                    hasMore={true}
                    loader={<div className='m-2'><Oval height={20} width={20} color='#7e22ce' /></div>}
                    scrollableTarget="id"
                // inverse={true}
                >
                    {
                        Array.isArray(data?.data) && data?.data?.map((ele: any, i: number) => {
                            return (
                                <ul
                                    key={i}
                                    onClick={() => {
                                        setSelectedChat({
                                            opponentId: ele?.belongsTo,
                                            opponentPic: ele?.groupProfilePic,
                                            opponentName: ele?.groupName,
                                            belongsTo: ele?.belongsTo,
                                            type: "GROUP"
                                        })
                                    }}
                                    className='w-full h-full flex justify-start items-center p-2 hover:bg-slate-100 border-b-slate-100 border-b-2'
                                >
                                    <li >
                                        <img src={ele?.groupProfilePic || "images/DefaultUser2.png"} alt="" className='w-[50px] h-[50px] min-w-[50px] border rounded-full bg-slate-100 object-fit aspect-square' />
                                    </li>
                                    <li className='w-full h-16 flex justify-between items-start ml-2'>
                                        <ul className='w-full flex flex-col justify-evenly h-16'>
                                            <li className='flex justify-between items-start'>
                                                <span className='text-lg font-medium'>{ele?.groupName}</span>
                                                <span className='text-xs font-light text-slate-600'>{FormateDate1(ele?.createdAt)}</span>
                                            </li>
                                            <li className='flex justify-between items-start truncate'>
                                                <span className='truncate w-48 text-sm font-normal text-slate-600 flex items-center'>{ele?.from == userSelector?.userId && 'you: '}{ele?.message || ele?.eventMessage || getFileTypeMessage(ele?.fileType)}</span>
                                                {ele?.unReadMessageCount !== 0 && <span className='text-base font-semibold text-purple-500'>{ele?.unReadMessageCount > 100 ? "100+" : ele?.unReadMessageCount}</span>}
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