"use client"
import NewContact from '@/components/Chat/LeftPart/Actions/NewContact'
import NewGroup from '@/components/Chat/LeftPart/Actions/NewGroup'
import ThreeDotAction from '@/components/Chat/LeftPart/Actions/ThreeDotAction'
import ChatLeftTopNav from '@/components/Chat/LeftPart/ChatLeftTopNav'
import ChatOptions from '@/components/Chat/LeftPart/ChatOptions'
import CallList from '@/components/Chat/LeftPart/options/callsOptions/CallList'
import ChatGroupList from '@/components/Chat/LeftPart/options/ChatGroupList'
import ChatUserList from '@/components/Chat/LeftPart/options/ChatUserList'
import ChatActions from '@/components/Chat/RightPart/ChatActions'
import ChatMessage from '@/components/Chat/RightPart/ChatMessage'
import ChatTopNav from '@/components/Chat/RightPart/ChatTopNav'
import { selecteChatDto } from '@/components/Chat/type'
import { SocketContext } from '@/components/context/SocketContext'
import React, { useContext, useEffect, useState } from 'react';
import io from "socket.io-client";

// /polls
// const socket = io("ws://localhost:3001");
// const socket = io("http://localhost:3001/polls",{ auth : { userId : "123" } });

const index = () => {
    const socket: any = useContext(SocketContext);
    const [messages, setMessages] = useState<Array<string>>([]);
    const [newMessages, setNewMessage] = useState("");
    const [selectedTab, setSelectedTab] = useState<string>("chat");
    const [ThreeDotIsOpen, setThreeDotIsOpen] = useState<boolean>(false);
    const [ThreeDotActionResult, setThreeDotActionResult] = useState<String>("");
    
    // chat
    
    const [selectedChat, setSelectedChat] = useState<selecteChatDto>({ oponentId: "", oponentPic: "", oponentName: "", belongsTo: "" });
    
    
    
    useEffect(() => {
        
        // getInitialMessages();
    }, []);
    socket?.on("hello", (msg : any) => {
        console.log(msg);
    });
    socket?.on("receiveMessage", (msg : any) => {
        receiveMessage(msg);
    });

    console.log("socket.auth")
    console.log(socket)

    // return () => {
    //     socket.disconnect();
    // };

    socket?.on('connect', () => {
        console.log("connected = " + socket.id);
        console.log()
    })

    function getInitialMessages() {
        fetch("http://localhost:3000/messages")
            .then((res) => res.json())
            .then((data) => {
                setMessages(data);
            });
    }

    function receiveMessage(msg: string) {
        console.log("receive messages called");
        console.log(messages);
        const newMessages = [...messages, msg];
        console.log(newMessages);
        setMessages(newMessages);
    }

    return (
        <>
            <div className=' w-[100vw - 50px] overflow-x-scroll md:overflow-hidden h-screen flex justify-start items-start  grid-cols-2'>
                <NewGroup setThreeDotActionResult={setThreeDotActionResult} ThreeDotActionResult={ThreeDotActionResult} />
                <NewContact
                    setThreeDotActionResult={setThreeDotActionResult}
                    ThreeDotActionResult={ThreeDotActionResult}
                    setSelectedChat={setSelectedChat}
                />
                <ThreeDotAction open={ThreeDotIsOpen} setOpen={setThreeDotIsOpen} setThreeDotActionResult={setThreeDotActionResult} />
                <div className='h-full w-[300px] md:w-[400px] '>
                    <div className=' h-[120px] flex flex-col justify-evenly items-center'>
                        <ChatLeftTopNav open={ThreeDotIsOpen} setOpen={setThreeDotIsOpen} />
                        <ChatOptions setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
                    </div>
                    <div className='h-[50%] overflow-y-scroll' style={{ "height": "calc( 100% - 120px )" }}>
                        {selectedTab == "chat" && <ChatUserList selectedChat={selectedChat} setSelectedChat={setSelectedChat} />}
                        {selectedTab == "group_chat" && <ChatGroupList />}
                        {selectedTab == "call" && <CallList />}
                    </div>
                </div>
                {/* <div className='h-[100%] w-full bg-slate-600'></div> */}
                {/* <div className='min-w-[340px] overflow-y-scroll w-full lg:w-1/4 border'>
                    
                </div> */}
                <div className={`h-[100%] flex chatActions w-full border flex-col justify-between items-start ${selectedChat?.oponentId == "" && " backgroundeImage "}`}>
                    {selectedChat.oponentId != "" &&
                        <>
                            <ChatTopNav
                                selectedChat={selectedChat}
                            />
                            <div className='grow w-full max-h-full overflow-y-scroll'>
                                <ChatMessage
                                    selectedChat={selectedChat}
                                    socket={socket}
                                />
                            </div>
                            <ChatActions
                                selectedChat={selectedChat}
                                socket={socket}
                            />
                        </>}
                </div>
            </div>
        </>
    )
}

export default index