"use client"
import ScheduledMeeting from '@/components/Meet/Meet/ScheduledMeeting'
import MeetState from '@/components/Meet/Meet/State/MeetState'
import TopBarAction from '@/components/Meet/Meet/TopBarAction'
// import TopBarAction from '@/components/Meet/Meet/TopBarAction'
const page = () => {
    return (
        <>
            <MeetState>
                <div className='w-full overflow-y-scroll' style={{"height" : "calc( 100vh - 50px )"}}>
                    <TopBarAction />
                    <ScheduledMeeting />
                </div>
            </MeetState>
        </>
    )
}

export default page
