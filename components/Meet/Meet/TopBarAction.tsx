import PlusIco from '@/components/assets/PlusIco'
import React, { useContext, useState } from 'react'
import CreateMeetingForm from './CreateMeetingForm'

export interface meetingDto {
    createMeeting: boolean,
    setCreateMeeting: any
}

const TopBarAction = () => {

    const [selectedTab , setSelectedTab] = useState(0);
    const [createMeeting , setCreateMeeting] = useState(false);
    return (
        <>
            {
                createMeeting && <CreateMeetingForm createMeeting={createMeeting} setCreateMeeting={setCreateMeeting} />
            }
            <ul className='w-full flex justify-between items-center'>
                <li>
                    <ul className='w-full flex items-center '>
                        <li className={`text-base font-medium cursor-pointer ${ selectedTab === 0 && 'border-b-purple-700'} p-2 select-none ease-in transition-all mr-2 border border-b-2 border-transparent`}
                            onClick={()=>{
                                setSelectedTab(0)
                            }}
                        >
                            <span className={`${ selectedTab === 0 ? " text-slate-700 ":   "text-slate-500" } `}>
                                Scheduled Metting
                            </span>
                            <span className='ml-1 p-1  rounded-md bg-purple-700 text-xs text-white font-light'>01</span>
                        </li>
                        <li className={`text-base font-medium cursor-pointer ${ selectedTab === 1 && 'border-b-purple-700'} p-2 select-none ease-in transition-all border border-b-2 border-transparent`}
                            onClick={()=>{
                                setSelectedTab(1)
                            }}
                        >
                            <span className={`${ selectedTab === 1 ? " text-slate-700 ":   "text-slate-500" } `}>
                                Metting History
                            </span>
                            <span className='ml-1 p-1  rounded-md bg-purple-700 text-xs text-white font-light'>02</span>
                        </li>
                    </ul>
                </li>
                <li className='cursor-pointer p-2 flex items-center justify-center bg-purple-700 rounded-md select-none'>
                    <span className='text-base font-medium text-white'
                        onClick={() => {
                            setCreateMeeting(true)
                        }}
                    >Create Meeting</span>
                    <span className=' ml-2'>
                        <PlusIco height={13} width={13} color='white' />
                    </span>
                </li>
            </ul>
        </>
    )
}

export default TopBarAction
