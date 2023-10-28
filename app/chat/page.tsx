"use client"
import NewContact from '@/components/Chat/LeftPart/Actions/NewContact'
import NewGroup from '@/components/Chat/LeftPart/Actions/NewGroup'
import ThreeDotAction from '@/components/Chat/LeftPart/Actions/ThreeDotAction'
import ChatLeftTopNav from '@/components/Chat/LeftPart/ChatLeftTopNav'
import ChatOptions from '@/components/Chat/LeftPart/ChatOptions'
import CallList from '@/components/Chat/LeftPart/options/callsOptions/CallList'
import ChatGroupList from '@/components/Chat/LeftPart/options/ChatGroupList'
import ChatUserList from '@/components/Chat/LeftPart/options/ChatUserList'
import QueryObject from '@/components/Chat/QueryObject'
import ChatActions from '@/components/Chat/RightPart/ChatActions'
import ChatMessage from '@/components/Chat/RightPart/ChatMessage'
import ChatTopNav from '@/components/Chat/RightPart/ChatTopNav'
import Profile from '@/components/Chat/RightPart/profile'
import { selecteChatDto } from '@/components/Chat/type'
import { SocketContext } from '@/components/context/SocketContext'
import api from '@/components/lib/api'
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import io from "socket.io-client";

// /polls
// const socket = io("ws://localhost:3001");
// const socket = io("http://localhost:3001/polls",{ auth : { userId : "123" } });

const Page = () => {
    const userSelector = useSelector((state: any) => state?.userSliceReducer);
    const { socket }: any = useContext(SocketContext);
    const [selectedTab, setSelectedTab] = useState<string>("chat");
    const [ThreeDotIsOpen, setThreeDotIsOpen] = useState<boolean>(false);
    const [ThreeDotActionResult, setThreeDotActionResult] = useState<String>("");
    const [isViewProfile, setIsViewProfile] = useState<Boolean>(false)
    const [refetchList, setRefetchList] = useState<Boolean>(false)

    const [unReadMsg, setUnReadMsg] = useState({
        chat: 0,
        group: 0
    })

    // chat
    const [selectedChat, setSelectedChat] = useState<selecteChatDto>({ opponentId: "", opponentPic: "", opponentName: "", belongsTo: "", type: "" });

    const { data, isLoading, refetch: refetchUnReadMessages } = useQuery(["getUnReadMessagesCount"], () => {
        return api.get(`/chats/getUnReadMessagesCount`)
    },
        {
            onSuccess({ data }: any) {
                setUnReadMsg({
                    group: (data?.group) ? data?.group : 0,
                    chat: (data?.chat) ? data?.chat : 0,
                })
            },
            onError(err: any) {
                toast.error(err);
            },
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        }
    )
    socket?.on(`${userSelector?.userId}ChatNotification`, (msg: any) => {
        refetchUnReadMessages()
    });
    socket?.on('connect', () => {
        console.log("connected = " + socket.id);
        console.log()
    })

    useEffect(() => {
        refetchUnReadMessages()
    }, [selectedChat?.belongsTo, refetchList]);

    // QueryObject(
    //     {
    //         selectedTab,
    //         setSelectedTab,
    //         ThreeDotIsOpen,
    //         setThreeDotIsOpen,
    //         ThreeDotActionResult,
    //         setThreeDotActionResult,
    //         isViewProfile,
    //         setIsViewProfile,
    //         refetchList,
    //         setRefetchList,
    //     }
    // )

    return (
        <>
            <div className='min-w-[800px] w-[100vw - 50px] overflow-x-scroll md:overflow-hidden h-screen flex justify-start items-start  grid-cols-2'>
                {ThreeDotActionResult == "CreateGroup" && <NewGroup
                    setThreeDotActionResult={setThreeDotActionResult}
                    ThreeDotActionResult={ThreeDotActionResult}
                />}
                {ThreeDotActionResult == "AddUser" && <NewContact
                    setThreeDotActionResult={setThreeDotActionResult}
                    ThreeDotActionResult={ThreeDotActionResult}
                    setSelectedChat={setSelectedChat}
                />}
                {ThreeDotIsOpen && <ThreeDotAction open={ThreeDotIsOpen} setOpen={setThreeDotIsOpen} setThreeDotActionResult={setThreeDotActionResult} />}
                <div className='h-full w-[300px] md:w-[400px] '>
                    <div className=' h-[120px] flex flex-col justify-evenly items-center'>
                        <ChatLeftTopNav
                            open={ThreeDotIsOpen}
                            setOpen={setThreeDotIsOpen}
                        />
                        <ChatOptions
                            setSelectedTab={setSelectedTab}
                            selectedTab={selectedTab}
                            unReadMsg={unReadMsg}
                        />
                    </div>
                    <div className='h-[50%] overflow-y-scroll' style={{ "height": "calc( 100% - 120px )" }}>
                        {selectedTab == "chat" && <ChatUserList selectedChat={selectedChat} setSelectedChat={setSelectedChat} refetchList={refetchList} />}
                        {selectedTab == "group_chat" && <ChatGroupList selectedChat={selectedChat} setSelectedChat={setSelectedChat} refetchList={refetchList} refetchUnReadMessages={refetchUnReadMessages} />}
                        {selectedTab == "call" && <CallList />}
                    </div>
                </div>
                <div className={`h-[100%] flex chatActions w-full min-w-[400px] border flex-col justify-between items-start 
                    ${selectedChat?.opponentId == "" && " backgroundeImage "}
                `}>
                    {selectedChat.opponentId != "" &&
                        (!isViewProfile) && <>
                            <ChatTopNav
                                selectedChat={selectedChat}
                                setIsViewProfile={setIsViewProfile}
                            />
                            <div className='grow w-full max-h-full overflow-y-scroll'>
                                <ChatMessage
                                    selectedChat={selectedChat}
                                    socket={socket}
                                    refetch={refetchUnReadMessages}
                                    setRefetchList={setRefetchList}
                                // isViewProfile= {isViewProfile}
                                />
                            </div>
                            <ChatActions
                                selectedChat={selectedChat}
                                socket={socket}
                            />
                        </>
                    }
                    {
                        selectedChat.opponentId != "" && isViewProfile && <>
                            <Profile
                                setIsViewProfile={setIsViewProfile}
                                selectedChat={selectedChat}
                                setSelectedChat={setSelectedChat}
                                setRefetchList={setRefetchList}
                            />
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Page