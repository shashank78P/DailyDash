"use client"
import ChatLeftTopNav from '@/components/Chat/LeftPart/ChatLeftTopNav'
import ChatOptions from '@/components/Chat/LeftPart/ChatOptions'
import ChatUserList from '@/components/Chat/LeftPart/ChatUserList'
import ChatActions from '@/components/Chat/RightPart/ChatActions'
import ChatMessage from '@/components/Chat/RightPart/ChatMessage'
import ChatTopNav from '@/components/Chat/RightPart/ChatTopNav'
import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
// /polls
// const socket = io("ws://localhost:3001");
const socket = io("http://localhost:3001/polls");

const index = () => {
    const [messages, setMessages] = useState<Array<string>>([]);
    const [newMessages, setNewMessage] = useState("");


    useEffect(() => {
        socket.on("hello", (msg) => {
            console.log(msg);
        });
        socket.on("receiveMessage", (msg) => {
            receiveMessage(msg);
        });

        return () => {
            socket.disconnect();
        };

        // getInitialMessages();
    }, []);

    socket.on('connect', () => {
        console.log("connected = " + socket.id);
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

    function sendMessage() {
        console.log("send messages called");
        console.log(messages);
        socket.emit("sendMessage", newMessages);
        setNewMessage("");
    }
    return (
        <>
            <div className='flex justify-start items-start'>
                <div className='mainFrame min-w-[340px] overflow-y-scroll w-full lg:w-1/4 border'>
                    <div className='h-1/6  flex flex-col justify-evenly items-center'>
                        <ChatLeftTopNav />
                        {/* <OnLineNow /> */}
                        <ChatOptions />
                    </div>
                    <div className='h-5/6 overflow-y-scroll'>
                        <ChatUserList />
                    </div>
                </div>
                <div className='mainFrame hidden sm:flex chatActions   lg:w-3/4 border flex-col justify-between items-start '>
                    <ChatTopNav />
                    <div className='grow'>
                        <ChatMessage />
                    </div>
                    <ChatActions sendMessage={sendMessage} setNewMessage={setNewMessage} />
                </div>
            </div>
        </>
    )
}

export default index