import PaginationBottonSection from '@/components/GlobalComponents/PaginationBottonSection'
import PaginationTopSection from '@/components/GlobalComponents/PaginationTopSection'
import Slider from '@/components/GlobalComponents/Slider'
import HorizontalThrreDot from '@/components/assets/HorizontalThrreDot'
import OpenIco from '@/components/assets/OpenIco'
import React, { useContext, useState, useCallback } from 'react'
import { MeetingContext, meetingStatusStyle } from '../types'
import MeetContext from './State/MeetContext'
import CreateMeetingForm from './CreateMeetingForm'
import { useQuery } from 'react-query'
import api from '@/components/lib/api'
import { FormateDate1, getTimeWithAMorPM, timeDiffWithCurrentDate } from '@/components/GlobalComponents/FormateDate1'
import UserPic from '@/components/GlobalComponents/UserPic'
import InnerPage from './InnerPage'

const ScheduledMeeting = () => {
    const { selected, setSelected, isEdit, setIsEdit, show, setShow, createMeeting, setCreateMeeting, selectedTab, selectedId, setSelectedId, setStatus, status, rows, setRows, page, setPage, setSearch, search } = useContext<MeetingContext>(MeetContext)
    const { data, isLoading }: { data: any, isLoading: any } = useQuery(["scheduledMeeting", rows, page, search, status, setIsEdit, selected], () => {
        return api.get(`/meet/get-scheduled-meeting-list-of-mine?limit=${rows}&search=${search}&page=${page}&status=${status}`)
    },
        {
            keepPreviousData: true,
            enabled: rows != null && page != null && search != null && status != null,
            onSuccess: (data) => {
                console.log(data)
            }
        }
    )

    console.log(process.env.FRONT_END_URL)

    return (
        <>
            {
                show && <InnerPage />
            }
            <PaginationTopSection setStatus={setStatus} status={status} setRows={setRows} setSearch={setSearch} search={search} rows={rows} isStatus={true} />
            <div className='w-[100% - 70px] overflow-x-scroll'>
                <table className='w-full overflow-x-scroll my-2'>
                    <thead className='border border-transparent border-b-slate-50 border-b-1 mb-2'>
                        <tr className='bg-slate-50'>
                            <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>SI No.</th>
                            <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Title</th>
                            <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Created By</th>
                            <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Status</th>
                            <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Meeting Date</th>
                            <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Meeting Time</th>
                            <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Who Can Join</th>
                            {/* <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Link</th> */}
                            <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Meeting length</th>
                            <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Description</th>
                            <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Open</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.data?.data?.map((ele: any, i: number) => {
                                return (<tr className={` ${(i % 2 !== 0) && "bg-slate-50"} `} key={i}>
                                    <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500'>{i + 1}</td>
                                    <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500'>{ele?.title}</td>
                                    <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500'>
                                        <span className='w-full  flex justify-center items-center'>
                                            <span><UserPic userId={ele?.createdBy} width={30} height={30} /></span>
                                            <span className=' ml-2 text-slate-500'>{ele?.createrName}</span>
                                        </span>
                                    </td>
                                    <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500'>
                                        <span className={` ${meetingStatusStyle?.[ele?.meetingStatus]} `}>{ele?.meetingStatus}</span>
                                    </td>
                                    <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500'>{ele?.meetingDate?.slice(0, 10)}</td>
                                    <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500'>{getTimeWithAMorPM(ele?.meetingDate)}</td>
                                    <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500'>{ele?.whoCanJoin?.replaceAll("_"," ")}</td>
                                    {/* <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500'>{`${process.env.FRONT_END_URL}/meet/room?id=${ele?._id}`}</td> */}
                                    <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500'>{ele?.meetingLength} {ele?.meetingLengthPararmeter}</td>
                                    <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500'>{ele?.description}</td>
                                    <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500 cursor-pointer'>
                                        <span className='flex justify-center items-center'
                                            onClick={() => {
                                                setShow(true)
                                                setSelectedId(ele?._id)
                                                console.log(setSelected)
                                                setSelected(ele)

                                            }}
                                        >
                                            <OpenIco height={20} width={20} />
                                        </span>
                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
            {!isLoading && <PaginationBottonSection setPage={setPage} totalCount={Math.ceil(data?.data?.total / Number(rows))} defaultPage={Number(page) + 1} />}
        </>
    )
}

export default ScheduledMeeting
