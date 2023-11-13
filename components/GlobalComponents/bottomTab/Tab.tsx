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
import { routeAction } from '@/components/store/slice/router_slice'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

const Tab = ({ tabData, i }: { tabData: any, i: number }) => {
    const { currentRouter, currentRouterIndex } = useSelector((state: any) => state.routeSliceReducer)
    const [title, setTitle] = useState<String>("");
    const [icon, setIcon] = useState<any>("");
    const dispatch = useDispatch()
    const router = useRouter()
    const setValue = (title: String, icon?: any) => {
        setTitle(title);
        setIcon(icon);
    }

    const returnicons = useCallback((isActive: boolean, endPoint: string) => {
        if (endPoint == "/" || title === "Home") {
            return <HomeIco width={20} height={20} color={isActive ? "white" : ""} />
        }
        if (endPoint == "/chat" || title === "Chat") {
            return <ChatIco width={20} height={20} color={isActive ? "white" : ""} />
        }
        if (endPoint == "/meet" || title === "Meet") {
            return <VideoICameraIco width={20} height={25} color={isActive ? "white" : ""} />
        }
        if (endPoint == "/bookmark" || title === "Bookmark") {
            return <BookMark width={20} height={20} color={isActive ? "white" : ""} />
        }
        // if (title === "Note") {
        //     return <NoteIco width={20} height={20} color={''} />
        // }
        // if (title === "Calendar") {
        //     return <CalendarIco width={20} height={20} color={''} />
        // }
        // if (title === "Dynamic Form") {
        //     return <DynamicForm width={20} height={20} color={''} />
        // }
    }, [])

    // useEffect(() => {
    //     if (tabData?.route == "/") {
    //         setValue("Home")
    //     }
    //     if (tabData?.route == "/project-management") {
    //         setValue("Project Management")
    //     }
    //     if (tabData?.route == "/chat") {
    //         setValue("Chat")
    //     }
    //     if (tabData?.route == "/meet") {
    //         setValue("Meet")
    //     }
    //     if (tabData?.route == "/bookmark") {
    //         setValue("Bookmark")
    //     }
    //     // if (tabData?.route === "/calendar") {
    //     //     setValue("Calendar")
    //     // }
    //     // if (tabData?.route === "/note") {
    //     //     setValue("Note")
    //     // }
    //     // if (tabData?.route === "/dynamic-form") {
    //     //     setValue("Dynamic Form")
    //     // }
    // }, [tabData])

    return (
        <>
            <div
                key={i}
                className={`h-[90%] rounded-lg mx-1 border border-c_black flex justify-between items-center  cursor-default ${tabData?.isActive && "bg-c_black"} `}>
                <div className='flex justify-start items-center truncate text-ellipsis pl-2'
                    onClick={() => {
                        dispatch(routeAction?.changeRouter({ to: i + 1 }))
                        const { route , query } = currentRouter?.[i]
                        console.log({route , query})
                        if(route){
                            router.push(route + query);
                        }
                    }}
                >
                    <span>
                        {returnicons(tabData?.isActive, tabData?.route)}
                    </span>
                </div>
                <div
                    onClick={() => {
                        dispatch(routeAction?.deleteRouter({ to: i + 1 }))
                    }}
                    className={`rounded-full cursor-pointer hover:bg-gray-400 mx-2`}
                >
                    <CrossIco width={20} height={20} color={tabData?.isActive ? " white " : " black "} />
                </div>

            </div>
        </>
    )
}

export default Tab