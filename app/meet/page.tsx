"use client"
import MeetState from '@/components/Meet/Meet/State/meetState'
import TopBarAction from '@/components/Meet/Meet/TopBarAction'
// import TopBarAction from '@/components/Meet/Meet/TopBarAction'
import React, { useEffect, useRef, useState } from 'react'
const page = () => {

    return (
        <>
            <div className='w-[100vw - 50px] p-2'>
                <MeetState>
                    <TopBarAction />
                </MeetState>
            </div>
        </>
    )
}

export default page
