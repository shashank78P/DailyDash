import React from 'react'
import LinkIco from '@/components/assets/LinkIco'
import { Pagination } from '@mui/material'
import CallIco from '@/components/assets/CallIco'
import IncomingIco from '@/components/assets/IncomingIco'
import OutGoing from '@/components/assets/OutGoingIco'

const CallList = () => {
    return (
        <>
            <button className='w-full font-medium text-base flex '>
                <LinkIco width={20} height={20} />
                <span className='ml-2'>
                    Create meeting link
                </span>
            </button>
            <h2 className='my-2  font-semibold'>
                Call History
            </h2>
            <ul className='w-full flex justify-start items-center p-2 hover:bg-purple-100 border-b-slate-100 border-b-2'>
                <li >
                    <img src={"ele.url"} alt="" className='w-[50px] h-[50px] min-w-[50px] border rounded-full bg-slate-100 object-fit aspect-square' />
                </li>
                <li className='w-full h-16 flex justify-between items-start ml-2'>
                    <ul className='w-full flex flex-col justify-evenly h-16'>
                        <li className=''>
                            Shashi
                        </li>
                        <li>
                            <IncomingIco width={20} height={20} color='red' />
                            <OutGoing width={20} height={20} color='green' />
                        </li>
                    </ul>
                </li>
                <li className='cursor-pointer'>
                    <CallIco width={20} height={20} />
                </li>
            </ul>
        </>
    )
}

export default CallList
