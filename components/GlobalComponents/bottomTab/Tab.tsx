import BookMark from '@/components/assets/BookMark'
import CalendarIco from '@/components/assets/CalendarIco'
import ChatIco from '@/components/assets/ChatIco'
import CrossIco from '@/components/assets/CrossIco'
import DynamicForm from '@/components/assets/DynamicForm'
import HomeIco from '@/components/assets/HomeIco'
import NoteIco from '@/components/assets/NoteIco'
import PlusIco from '@/components/assets/PlusIco'
import ProjectManagement from '@/components/assets/ProjectManagement'
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
            return <HomeIco width={16} height={16} color={''} />
        }
        if (title === "Project Management") {
            return <ProjectManagement width={16} height={16} color={''} />
        }
        if (title === "Chat") {
            return <ChatIco width={16} height={16} color={''} />
        }
        if (title === "Bookmark") {
            return <BookMark width={16} height={16} color={''} />
        }
        if (title === "Note") {
            return <NoteIco width={16} height={16} color={''} />
        }
        if (title === "Calendar") {
            return <CalendarIco width={16} height={16} color={''} />
        }
        if (title === "Dynamic Form") {
            return <DynamicForm width={16} height={16} color={''} />
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
            <div className='mx-2 sm:w-[150px] p-1 rounded-lg border border-c_black flex justify-between items-center  cursor-default'>
                <div className='flex justify-start items-center truncate text-ellipsis pl-1'>
                    <span>
                        {/* <HomeIco width={16} height={16} color={''} /> */}
                        {returnicons()}
                    </span>
                    <span className='text-base ml-1 hidden md:block truncate'>{title}</span>
                </div>
                <div
                    className={` p-[1px] rounded-full cursor-pointer hover:bg-gray-200 
                    `}
                >
                    {/*${tabData?.isActive} ? "sm:block " : "hidden"*/}
                    <CrossIco width={27} height={27} />
                </div>
                {/* <BookMark width={18} height={18} color={''} /> */}
                {/* BookMark */}
            </div>
        </>
    )
}

export default Tab