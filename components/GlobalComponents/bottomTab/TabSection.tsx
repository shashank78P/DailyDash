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
            <div className='flex w-full h-[50px] overflow-scroll scrollTracker fixed bottom-1 sm:-right-16'>
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