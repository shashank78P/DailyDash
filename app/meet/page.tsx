"use client"
import ScheduledMeeting from '@/components/Meet/Meet/ScheduledMeeting'
import MeetState from '@/components/Meet/Meet/State/MeetState'
import TopBarAction from '@/components/Meet/Meet/TopBarAction'
// import TopBarAction from '@/components/Meet/Meet/TopBarAction'
import React, { useEffect, useRef, useState } from 'react'
const page = () => {

    return (
        <>
            <MeetState>
                <div className='w-full h-screen'>
                    <TopBarAction />
                    <ScheduledMeeting />
                </div>
            </MeetState>
        </>
    )
}

export default page
