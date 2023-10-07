"use-client"
import BookMark from '@/components/assets/BookMark'
import CallIco from '@/components/assets/CallIco'
import UserIco from '@/components/assets/UserIco'
import UsersGroup from '@/components/assets/UsersGroupIco'
import { Badge, Typography } from '@mui/material'
import "@emotion/react"
import React, { useState } from 'react'

const ChatOptions = ({ setSelectedTab ,selectedTab} : {setSelectedTab : any , selectedTab : string}) => {

    return (
        <ul className='w-full flex justify-between items-center'>
            <li className={`p-2 flex justify-center flex-grow items-center ${selectedTab == "chat" && "border-0 border-b-2 border-purple-700"} cursor-pointer`}
                onClick={() => {
                    setSelectedTab("chat")
                }}
                >
                <Badge badgeContent={<Typography style={{ color: "#7e22ce", fontWeight: "900", marginLeft: "5px" }}>4</Typography>} >
                    <UserIco width={20} height={20} />
                </Badge>
            </li>
            <li className={`p-2 flex justify-center flex-grow items-center ${selectedTab == "group_chat" && "border-0 border-b-2 border-purple-700"} cursor-pointer`}
                onClick={() => {
                    setSelectedTab("group_chat")
                }}
            >
                <Badge badgeContent={<Typography style={{ color: "#7e22ce", fontWeight: "900", marginLeft: "5px" }}>4</Typography>} >
                    <UsersGroup width={20} height={20} />
                </Badge>
            </li>
            <li className={`p-2 flex justify-center flex-grow items-center ${selectedTab == "call" && "border-0 border-b-2 border-purple-700 cursor-pointer"}`}
                onClick={() => {
                    setSelectedTab("call")
                }}
            >
                <Badge badgeContent={<Typography style={{ color: "#7e22ce", fontWeight: "900", marginLeft: "5px" }}>4</Typography>} >
                    <CallIco width={20} height={20} />
                </Badge>
            </li>
        </ul>
    )
}

export default ChatOptions