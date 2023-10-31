"use client"
import ScheduledMeeting from '@/components/Meet/Meet/ScheduledMeeting'
import TopBarAction from '@/components/Meet/Meet/TopBarAction'
// import TopBarAction from '@/components/Meet/Meet/TopBarAction'
import React, { useEffect, useRef, useState } from 'react'
const page = () => {

    return (
        <>
            <div className='w-[100vw - 50px] p-2'>
                <TopBarAction />
                <ScheduledMeeting />
            </div>
        </>
    )
}

export default page
