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
import CreateMeeting from '@/components/Chat/RightPart/CreateMeeting'
import Profile from '@/components/Chat/RightPart/profile'
import { selecteChatDto } from '@/components/Chat/type'
import { SocketContext } from '@/components/context/SocketContext'
import api from '@/components/lib/api'
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

// /polls
// const socket = io("ws://localhost:3001");
// const socket = io("http://localhost:3001/polls",{ auth : { userId : "123" } });

// chatLeftSearch, setChatLeftSearch

const Page = () => {
    const userSelector = useSelector((state: any) => state?.userSliceReducer);
    const { socket }: any = useContext(SocketContext);
    const [selectedTab, setSelectedTab] = useState<string>("chat");
    const [typingMessage, setTypingMessage] = useState<string>("");
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [chatLeftSearch, setChatLeftSearch] = useState<string>("");
    const [ThreeDotIsOpen, setThreeDotIsOpen] = useState<boolean>(false);
    const [ThreeDotActionResult, setThreeDotActionResult] = useState<String>("");
    const [isViewProfile, setIsViewProfile] = useState<Boolean>(false)
    const [refetchList, setRefetchList] = useState<Boolean>(false)
    const [createMeeting, setCreateMeeting] = useState<boolean>(false);
    const [isEmojiOpen, setIsEmojiOpen] = useState(false);

    const [unReadMsg, setUnReadMsg] = useState({
        chat: 0,
        group: 0
    })

    // chat
    const [selectedChat, setSelectedChat] = useState<selecteChatDto>({ opponentId: "", opponentPic: "", opponentName: "", belongsTo: "", type: "", isOnline: false });
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

    useEffect(() => {
        socket?.on(`${userSelector?.userId}ChatNotification`, (msg: any) => {
            refetchUnReadMessages()
        });

        return socket?.off(`${userSelector?.userId}ChatNotification`, (msg: any) => {
            refetchUnReadMessages()
        });
    }, [refetchUnReadMessages, userSelector?.userId])



    useEffect(() => {
        socket?.on('connect', () => {
            console.log("connected = " + socket.id);
        })

        return () => {
            socket?.off('connect', () => {
            })
        }
    }, [])

    useEffect(() => {
        socket?.on(`${userSelector?.userId}typing`, (data: { type: string, status: string }) => {
            if (data?.status === "STARTED") {
                setTypingMessage(`typing...`)
            } else {
                setTypingMessage("")
            }
        })

        socket?.on(`${selectedChat?.belongsTo?.toString()}typing`, (data: { type: string, status: string }) => {
            console.log("typing group")
            if(data?.type != "GROUP"){
                return;
            }
            if (data?.status === "STARTED") {
                setTypingMessage(`Some one typing...`)
            } else {
                setTypingMessage("")
            }
        })
        
        return () => {
            socket?.off(`${userSelector?.userId}typing`, () => {
                setTypingMessage("")
            })
            socket?.off(`${selectedChat?.belongsTo}typing`, () => {
                setTypingMessage("")
            })
        }
    }, [selectedChat?.belongsTo, userSelector?.userId])

    useEffect(() => {
        refetchUnReadMessages()
    }, [selectedChat?.belongsTo, refetchList]);

    QueryObject(
        {
            selectedTab,
            setSelectedTab,
            ThreeDotIsOpen,
            setThreeDotIsOpen,
            ThreeDotActionResult,
            setThreeDotActionResult,
            isViewProfile,
            setIsViewProfile,
            refetchList,
            setRefetchList,
            selectedChat,
            setSelectedChat,
            isSearch, setIsSearch,
            chatLeftSearch, setChatLeftSearch,
            isEmojiOpen, setIsEmojiOpen,
            typingMessage, setTypingMessage
        }
    )

    return (
        <>
            <div className='w-full overflow-x-scroll h-full'>
                <div className='min-w-[800px] w-full bg-white overflow-x-scroll md:overflow-hidden h-full flex justify-start items-start '>
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
                                setChatLeftSearch={setChatLeftSearch} chatLeftSearch={chatLeftSearch} />
                            <ChatOptions
                                setSelectedTab={setSelectedTab}
                                selectedTab={selectedTab}
                                unReadMsg={unReadMsg}
                            />
                        </div>
                        <div className='h-[50%] overflow-y-scroll' style={{ "height": "calc( 100% - 120px )" }}>
                            {selectedTab == "chat" && <ChatUserList selectedChat={selectedChat} setSelectedChat={setSelectedChat} refetchList={refetchList} isViewProfile={isViewProfile} chatLeftSearch={chatLeftSearch} setTypingMessage={setTypingMessage} />}
                            {selectedTab == "group_chat" && <ChatGroupList selectedChat={selectedChat} setSelectedChat={setSelectedChat} refetchList={refetchList} refetchUnReadMessages={refetchUnReadMessages} isViewProfile={isViewProfile} chatLeftSearch={chatLeftSearch} setTypingMessage={setTypingMessage} />}
                            {/* {selectedTab == "call" && <CallList />} */}
                        </div>
                    </div>
                    <div className={`h-[100%] flex chatActions w-full min-w-[400px] border flex-col justify-between items-start 
                    ${selectedChat?.opponentId == "" && " backgroundeImage "}
                `}>
                        {createMeeting && <CreateMeeting createMeeting={createMeeting} opponentId={selectedChat?.belongsTo} setCreateMeeting={setCreateMeeting} selectedChat={selectedChat} />}
                        {selectedChat.opponentId != "" &&
                            (!isViewProfile) && <>
                                <ChatTopNav
                                    selectedChat={selectedChat}
                                    setIsViewProfile={setIsViewProfile}
                                    setIsSearch={setIsSearch}
                                    createMeeting={createMeeting}
                                    setCreateMeeting={setCreateMeeting}
                                    typingMessage={typingMessage}
                                    setTypingMessage={setTypingMessage}
                                />
                                <div className='grow w-full max-h-full overflow-y-scroll'>
                                    <ChatMessage
                                        selectedChat={selectedChat}
                                        socket={socket}
                                        refetch={refetchUnReadMessages}
                                        setRefetchList={setRefetchList}
                                        setIsSearch={setIsSearch}
                                        isSearch={isSearch}
                                    // isViewProfile= {isViewProfile}
                                    />
                                </div>
                                <ChatActions
                                    selectedChat={selectedChat}
                                    socket={socket}
                                    isEmojiOpen={isEmojiOpen}
                                    setIsEmojiOpen={setIsEmojiOpen}
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
                                    setCreateMeeting={setCreateMeeting}
                                    setIsSearch={setIsSearch}
                                />
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page