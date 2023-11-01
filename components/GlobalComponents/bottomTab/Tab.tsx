import BookMark from '@/components/assets/BookMark'
import CalendarIco from '@/components/assets/CalendarIco'
import ChatIco from '@/components/assets/ChatIco'
import CrossIco from '@/components/assets/CrossIco'
import DynamicForm from '@/components/assets/DynamicForm'
import HomeIco from '@/components/assets/HomeIco'
import NoteIco from '@/components/assets/NoteIco'
import PlusIco from '@/components/assets/PlusIco'
import ProjectManagement from '@/components/assets/ProjectManagement'
import VideoICameraIco from '@/components/assets/VideoICameraIco'
import React, { useEffect, useState } from 'react'

const Tab = (props: { tabData: any, key: number }) => {
    const { tabData, key } = props;
    const [title, setTitle] = useState<String>("");
    const [icon, setIcon] = useState<any>("");

    const setValue = (title: String, icon?: any) => {
        setTitle(title);
        setIcon(icon);
    }
    function returnicons() {
        if (title === "Home") {
            return <HomeIco width={20} height={20} color={''} />
        }
        if (title === "Project Management") {
            return <ProjectManagement width={20} height={20} color={''} />
        }
        if (title === "Chat") {
            return <ChatIco width={20} height={20} color={''} />
        }
        if (title === "Meet") {
            return <VideoICameraIco width={20} height={25} color={''} />
        }
        if (title === "Bookmark") {
            return <BookMark width={20} height={20} color={''} />
        }
        if (title === "Note") {
            return <NoteIco width={20} height={20} color={''} />
        }
        if (title === "Calendar") {
            return <CalendarIco width={20} height={20} color={''} />
        }
        if (title === "Dynamic Form") {
            return <DynamicForm width={20} height={20} color={''} />
        }
    }
    useEffect(() => {
        if (tabData?.route === "/") {
            setValue("Home")
        }
        if (tabData?.route === "/project-management") {
            setValue("Project Management")
        }
        if (tabData?.route === "/chat") {
            setValue("Chat")
        }
        if (tabData?.route === "/meet") {
            setValue("Meet")
        }
        if (tabData?.route === "/bookmark") {
            setValue("Bookmark")
        }
        if (tabData?.route === "/calendar") {
            setValue("Calendar")
        }
        if (tabData?.route === "/note") {
            setValue("Note")
        }
        if (tabData?.route === "/dynamic-form") {
            setValue("Dynamic Form")
        }
    }, [props])

    return (
        <>
            <div className='h-[90%] rounded-lg mx-1 border border-c_black flex justify-between items-center  cursor-default'>
                <div className='flex justify-start items-center truncate text-ellipsis pl-1'>
                    <span>
                        {returnicons()}
                    </span>
                </div>
                <div
                    className={`rounded-full cursor-pointer hover:bg-gray-200 mx-2
                    `}
                >
                    <CrossIco width={20} height={20} />
                </div>
                
            </div>
        </>
    )
}

export default Tab