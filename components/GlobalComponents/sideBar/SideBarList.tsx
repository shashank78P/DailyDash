
import React, { useEffect } from 'react'
import ChatIco from '../../assets/ChatIco'
import BookMark from '../../assets/BookMark'
import ProjectManagement from '../../assets/ProjectManagement'
import CalendarIco from '../../assets/CalendarIco'
import NoteIco from '../../assets/NoteIco'
import DynamicForm from '../../assets/DynamicForm'
import SettingsIco from '../../assets/SettingsIco'
import BellIco from '../../assets/BellIco'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import HomeIco from '../../assets/HomeIco'
import { routeAction } from "../../store/slice/router_slice"
import { usePathname, useSearchParams } from 'next/navigation'
import CameraIco from '@/components/assets/CameraIco'
import VideoICameraIco from '@/components/assets/VideoICameraIco'

const SideBarList = () => {
    const currentRoute = useSelector((state: any) => state.routeSliceReducer)
    const dispatch = useDispatch()
    const pathname = usePathname()
    const params = useSearchParams()

    useEffect(() => {
        // getting previously, stored data and storing into a db
        let x = localStorage.getItem("routerDetails")
        if (x) {
            dispatch(routeAction?.initialization(JSON.parse(x)))
        }
    }, [])

    // function change pathname automatically when we change pages
    function ChangeRouter(currentRouter: string) {
        let query = "?"
        // @ts-ignore
        for (const [key, value] of params?.entries()) {
            query = query + `${key}=${value}&`
        }
        dispatch(routeAction?.changeRouter({
            route: pathname,
            query: query,
            data: "",
        }))
    }

    // triggers at initial page render and update current path name
    useEffect(() => {
        ChangeRouter(pathname)
    }, [])

    return (
        <>
            <ul className='max-h-screen h-screen w-[50px] flex flex-col justify-between items-center text-c_black bg-white overflow-y-scroll'>
                <li className='mb-2 '>
                    <ul className='w-full flex flex-col justify-around'>
                        <li className={`w-full  p-2 my-2  ${pathname === '/' && "bg-purple-500 text-white rounded-md ease-in"}`}
                            onClick={() => {
                                ChangeRouter("home")
                            }}
                        >
                            <Link href={'/'} className='flex items-center'>
                                <HomeIco width={25} height={25} color={pathname === '/' ? "white" : "#202124"} />
                                {/* <span className='ml-2 sm:hidden text-base truncate text-ellipsis'>Home</span> */}
                            </Link>
                        </li>
                        {/* <li className={`p-2 my-2 flex items-center  ${pathname === '/project-management' && "bg-purple-500 text-white rounded-md ease-in"}`}
                            onClick={() => {
                                ChangeRouter("project-management")
                            }}
                        >
                            <Link href={'/project-management'} className='flex items-center'>
                                <ProjectManagement width={25} height={25} color={pathname === '/project-management' ? "white" : "#202124"} />
                                <span className='ml-2 sm:hidden text-base truncate text-ellipsis'>Project Management</span> 
                            </Link>
                        </li> */}
                        <li className={`p-2 my-2 flex items-center  ${pathname === '/chat' && "bg-purple-500 text-white rounded-md ease-in"}`}
                            onClick={() => {
                                ChangeRouter("chat")
                            }}
                        >
                            <Link href={'/chat'} className='flex items-center'>
                                <ChatIco width={25} height={25} color={pathname === '/chat' ? "white" : "#202124"} />
                                {/* <span className='ml-2 sm:hidden text-base truncate text-ellipsis'>Chat</span> */}
                            </Link>
                        </li>
                        <li className={`p-2 my-2 flex items-center  ${pathname === '/meet' && "bg-purple-500 text-white rounded-md ease-in"}`}
                            onClick={() => {
                                ChangeRouter("meet")
                            }}
                        >
                            <Link href={'/meet'} className='flex items-center'>
                                <VideoICameraIco width={25} height={25} color={pathname === '/meet' ? "white" : "#202124"} strokeWidth={5}/>
                                {/* <span className='ml-2 sm:hidden text-base truncate text-ellipsis'>Chat</span> */}
                            </Link>
                        </li>
                        <li className={`p-2 my-2 flex items-center  ${pathname === '/bookmark' && "bg-purple-500 text-white rounded-md ease-in"}`}
                            onClick={() => {
                                ChangeRouter("bookmark")
                            }}
                        >
                            <Link href={'/bookmark'} className='flex items-center'>
                                <BookMark width={25} height={25} color={pathname === '/bookmark' ? "white" : "#202124"} />
                                {/* <span className='ml-2 sm:hidden text-base truncate text-ellipsis'>BookMark</span> */}
                            </Link>
                        </li>
                        {/* <li className={`p-2 my-2 flex items-center  ${pathname === '/calendar' && "bg-purple-500 text-white rounded-md ease-in"}`}
                            onClick={() => {
                                ChangeRouter("calendar")
                            }}
                        >
                            <Link href={'/calendar'} className='flex items-center'>
                                <CalendarIco width={25} height={25} color={pathname === '/calendar' ? "white" : "#202124"} />
                                <span className='ml-2 sm:hidden text-base truncate text-ellipsis'>Calendar</span>
                            </Link>
                        </li>
                        <li className={`p-2 my-2 flex items-center  ${pathname === '/note' && "bg-purple-500 text-white rounded-md ease-in"}`}
                            onClick={() => {
                                ChangeRouter("note")
                            }}
                        >
                            <Link href={'/note'} className='flex items-center'>
                                <NoteIco width={25} height={25} color={pathname === '/note' ? "white" : "#202124"} />
                                <span className='ml-2 sm:hidden text-base truncate text-ellipsis'>Note</span>
                            </Link>
                        </li>
                        <li className={`p-2 my-2 flex items-center  ${pathname === '/dynamic-form' && "bg-purple-500 text-white rounded-md ease-in"}`}
                            onClick={() => {
                                ChangeRouter("dynamic-form")
                            }}
                        >
                            <Link href={'/dynamic-form'} className='flex items-center'>
                                <DynamicForm width={25} height={25} color={pathname === '/dynamic-form' ? "white" : "#202124"} />
                                <span className='ml-2 sm:hidden text-base truncate text-ellipsis'>Dynamic Form</span>
                            </Link>
                        </li> */}
                    </ul>
                </li >
                <li className='my-2 '>
                    <ul className=' flex flex-col justify-around items-center'>
                        <li
                            className={`p-2 my-2 flex items-center  ${pathname === '/notification' && "bg-purple-500 text-white rounded-md ease-in"}`}
                        >
                            <BellIco width={25} height={25} color={pathname === '/settings' ? "white" : "#202124"} />
                        </li>
                        <li
                            className={`p-2 my-2 flex items-center  ${pathname === '/settings' && "bg-purple-500 text-white rounded-md ease-in"}`}
                            onClick={() => {
                                ChangeRouter("settings")
                            }}
                        >
                            <Link href={'/settings'} className='flex items-center'>
                                <SettingsIco width={25} height={25} color={pathname === '/settings' ? "white" : "#202124"} />
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul >
        </>
    )
}

export default SideBarList