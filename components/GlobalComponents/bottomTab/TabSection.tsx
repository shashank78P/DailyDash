"use client";

import React from 'react'
import Tab from './Tab'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from '../sideBar/SideBar';

const TabSection = () => {
    const { currentRouter } = useSelector((state: any) => state.routeSliceReducer)
    const dispatch = useDispatch();
    // console.log(currentRoute?.currentRouter)
    return (
        <>
            <div className='flex justify-start items-center w-full h-[50px] bg-transparent overflow-scroll scrollTracker'>
                {
                    currentRouter?.map((tabData: any, i: number) => {
                        return (
                            <Tab tabData={tabData} key={i} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default TabSection