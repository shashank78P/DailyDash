import PlusIco from '@/components/assets/PlusIco'
import React, { useContext } from 'react'
import { meetingContext } from './State/meetState'
import CreateMeetingForm from './CreateMeetingForm'

export interface meetingDto {
    createMeeting: boolean,
    setCreateMeeting: any
}

const TopBarAction = () => {

    const { createMeeting, setCreateMeeting } = useContext<meetingDto>(meetingContext)
    console.log({ createMeeting, setCreateMeeting })
    return (
        <>
            {
                createMeeting && <CreateMeetingForm />
            }
            <ul className='w-full flex justify-between items-center'>
                <li>
                    <ul className='w-full flex items-center '>
                        <li className='text-base font-medium cursor-pointer border border-transparent border-b-purple-700 p-2 border-b-2 select-none'>
                            <span>
                                Scheduled Metting
                            </span>
                            <span className='ml-1 p-1  rounded-md bg-purple-700 text-xs text-white font-light'>01</span>
                        </li>
                        <li className='text-base font-medium cursor-pointer border border-transparent border-b-purple-700 p-2 border-b-2 select-none'>
                            <span className='text-slate-500'>
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
