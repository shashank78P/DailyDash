"use client";

import React from 'react'
import Tab from './Tab'
import { useDispatch, useSelector } from 'react-redux'

const TabSection = () => {
    const { currentRouter } = useSelector((state: any) => state.routeSliceReducer)
    const dispatch = useDispatch();
    // console.log(currentRoute?.currentRouter)
    return (
        <>
            <div className='flex w-[100% - 70px] h-[50px] overflow-scroll scrollTracker'>
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