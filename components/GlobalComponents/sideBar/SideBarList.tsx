
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
import { payloadType } from '@/components/store/types/routerTypes'
import UserPic from '../UserPic'

const SideBarList = () => {
    const currentRoute = useSelector((state: any) => state.routeSliceReducer)
    const userSelector = useSelector((state: any) => state?.userSliceReducer);
    const dispatch = useDispatch()
    const pathname = usePathname()
    const params = useSearchParams()



    // console.log(pathname)
    // console.log(params.forEach((value, key) => {
    //     console.log({ key, value })
    // }))

    // function change pathname automatically when we change pages
    function ChangeRouter(route: string) {
        // const currRouter: payloadType = currentRoute?.currentRouter
        // const currActiveIndex = currentRoute.currentRouterIndex
        dispatch(routeAction?.changeCurrentRouter({
            route: route,
            query: "",
            isActive: true,
            id: 1
        }
        ))
    }

    // triggers at initial page render and update current path name
    // useEffect(() => {
    //     ChangeRouter(pathname)
    // }, [])

    return (
        <>
            <ul className='max-h-screen h-screen w-[50px] flex flex-col justify-between items-center text-c_black bg-white overflow-y-scroll'>
                <li className='mb-2 '>
                    <ul className='w-full flex flex-col justify-around'>
                        <li className={`w-full  p-2 my-2  ${pathname === '/' && "bg-purple-500 text-white rounded-md ease-in"}`}
                            onClick={() => {
                                ChangeRouter("/")
                            }}
                        >
                            <Link href={'/'} className='flex items-center cursor-pointer'>
                                <HomeIco width={25} height={25} color={pathname === '/' ? "white" : "#202124"} />
                                {/* <span className='ml-2 sm:hidden text-base truncate text-ellipsis'>Home</span> */}
                            </Link>
                        </li>
                        <li className={`p-2 my-2 flex items-center  ${pathname === '/chat' && "bg-purple-500 text-white rounded-md ease-in"}`}
                            onClick={() => {
                                ChangeRouter("/chat")
                            }}
                        >
                            <Link href={'/chat'} className='flex items-center cursor-pointer'>
                                <ChatIco width={25} height={25} color={pathname === '/chat' ? "white" : "#202124"} />
                            </Link>
                        </li>
                        <li className={`p-2 my-2 flex items-center  ${pathname === '/meet' && "bg-purple-500 text-white rounded-md ease-in"}`}
                            onClick={() => {
                                ChangeRouter("/meet")
                            }}
                        >
                            <Link href={'/meet'} className='flex items-center cursor-pointer'>
                                <VideoICameraIco width={25} height={25} color={pathname === '/meet' ? "white" : "#202124"} strokeWidth={5} />
                            </Link>
                        </li>
                        <li className={`p-2 my-2 flex items-center  ${pathname === '/bookmark' && "bg-purple-500 text-white rounded-md ease-in"}`}
                            onClick={() => {
                                ChangeRouter("/bookmark")
                            }}
                        >
                            <Link href={'/bookmark'} className='flex items-center cursor-pointer'>
                                <BookMark width={25} height={25} color={pathname === '/bookmark' ? "white" : "#202124"} />
                                {/* <span className='ml-2 sm:hidden text-base truncate text-ellipsis'>BookMark</span> */}
                            </Link>
                        </li>
                    </ul>
                </li >
                <li className='my-2 '>
                    <ul className=' flex flex-col justify-around items-center'>
                        <li
                            className={`p-2 my-2 flex items-center  ${pathname === '/profile' && "bg-purple-500 text-white rounded-md ease-in"}`}
                            onClick={() => {
                                ChangeRouter("/profile")
                            }}
                        >
                            <Link href={'/profile'} className='flex items-center cursor-pointer'>
                                <UserPic userId={userSelector?.userId} width={25} height={25} />
                                {/* <SettingsIco width={25} height={25} color={pathname === '/profile' ? "white" : "#202124"} /> */}
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul >
        </>
    )
}

export default SideBarList