"use client";

import React, { useEffect } from 'react'
import Tab from './Tab'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from '../sideBar/SideBar';
import { useSearchParams, useRouter } from 'next/navigation';
import { routeAction } from '@/components/store/slice/router_slice';
import PlusIco from '@/components/assets/PlusIco';

const TabSection = () => {
    const userSelector = useSelector((state: any) => state?.userSliceReducer);
    const { currentRouter, currentRouterIndex } = useSelector((state: any) => state.routeSliceReducer)
    const dispatch = useDispatch();
    const router = useRouter()
    const params = useSearchParams()

    // useEffect(() => {
    //     if(currentRouterIndex != 0){
    //         let { route , query } =  currentRouter?.[currentRouterIndex - 1];
    //         query = query?.slice(1)
    //         console.log({route , query})
    //         router.push(route , query)
    //     }
    // }, [currentRouter,currentRouterIndex])

    console.log(currentRouter)

    return (
        <>
            <div className='flex justify-start items-center w-full h-[50px] bg-transparent overflow-scroll scrollTracker'>
                {
                     userSelector?.userId && currentRouter?.map((tabData: any, i: number) => {
                        return (
                            <Tab tabData={tabData} i={i} />
                        )
                    })
                }
                <div
                    className={`rounded-full cursor-pointer hover:bg-gray-200 mx-2 p-1`}
                    onClick={() => {
                        dispatch(routeAction?.createNewRouter({
                            route: "/",
                            query: "",
                            isActive: true,
                            id: currentRouter?.length + 1
                        }))
                        router.push("/")
                    }}
                >
                    <PlusIco width={15} height={15} />
                </div>
            </div>
        </>
    )
}

export default TabSection