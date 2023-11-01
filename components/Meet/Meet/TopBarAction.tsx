import PlusIco from '@/components/assets/PlusIco'
import React, { useContext, useState } from 'react'
import CreateMeetingForm from './CreateMeetingForm'
import MeetContext from './State/MeetContext'
import { MeetingContext } from '../types'

export interface meetingDto {
    createMeeting: boolean,
    setCreateMeeting: any
}

const TopBarAction = () => {

    const { setCreateMeeting, selectedTab, setSelectedTab, createMeeting , isEdit , selectedId } = useContext<MeetingContext>(MeetContext)
    return (
        <>
            {
                <CreateMeetingForm />
            }
            <ul className='w-full flex justify-between items-center bg-slate-50 py-2 mb-2'>
                <li>
                    <ul className='w-full flex items-center flex-wrap'>
                        <li className={`text-base font-medium cursor-pointer ${selectedTab === 0 && 'border-b-purple-700'} p-2 select-none ease-in transition-all ml-2 border border-b-2 border-transparent`}
                            onClick={() => {
                                setSelectedTab(0)
                            }}
                        >
                            <span className={`${selectedTab === 0 ? " text-slate-700 " : "text-slate-500"} font-medium `}>
                                Home
                            </span>
                            <span className='ml-1 p-1  rounded-md bg-gradient-to-br from-purple-400 from-10% via-purple-700 via-80% to-purple-900 text-xs text-white font-light'>01</span>
                        </li>
                        <li className={`text-base font-medium cursor-pointer ${selectedTab === 1 && 'border-b-purple-700'} p-2 select-none ease-in transition-all ml-2 border border-b-2 border-transparent`}
                            onClick={() => {
                                setSelectedTab(1)
                            }}
                        >
                            <span className={`${selectedTab === 1 ? " text-slate-700 " : "text-slate-500"} `}>
                                History
                            </span>
                            <span className='ml-1 p-1  rounded-md bg-gradient-to-br from-purple-400 from-10% via-purple-700 via-80% to-purple-900 text-xs text-white font-light'>02</span>
                        </li>
                    </ul>
                </li>
                <li className='cursor-pointer p-2 flex items-center justify-center bg-gradient-to-r from-purple-400 from-10% via-purple-700 via-80% to-purple-900 rounded-md select-none mr-2 '>
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
