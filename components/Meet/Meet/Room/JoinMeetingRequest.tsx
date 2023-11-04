"use client"
import { FormateDate1, isGivenDateTimeIsInLimit, timeDiffWithCurrentDate } from '@/components/GlobalComponents/FormateDate1'
import VideoStreamer from '@/components/Meet/Meet/JoinMeet/VideoStream'
import { SocketContext } from '@/components/context/SocketContext'
import api from '@/components/lib/api'
import { meetingAction } from '@/components/store/slice/meetingSlice'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { streamContextDto } from '../../types'
import MediaContext from '../State/MediaContext'
const JoinMeetingRequest = ({ handleJoinMeet }: any) => {
  const param = useSearchParams();
  const dispatch = useDispatch()
  const userSelector = useSelector((state: any) => state?.userSliceReducer);
  const { socket, myPeer }: any = useContext(SocketContext);
  const meetingSelector = useSelector((state: any) => state?.meetingSliceReducer);
  const { meetingId, setMeetingId, meetingDetails, setMeetingDetails } = useContext<streamContextDto>(MediaContext)
  const router = useRouter()
  useEffect(() => {
    setMeetingId(param?.get("id"))
  }, [])
  const { data, isLoading } = useQuery(["join-meet", meetingId], () => {
    return api.get(`/meet/get-meeting-details?meetingId=${meetingId}`)
  },
    {
      onSuccess({ data }) {
        // console.log(data);
        if (data && Array.isArray(data) && data?.[0]) {
          setMeetingDetails(data?.[0])
        }
      },
      onError(err: any) {
        toast?.error(err?.response?.data?.message)
        if (err?.response?.data?.message == "You don't have a access for his meeting") {
          router.push("/")
        }
      },
      enabled: Boolean(meetingId),
      keepPreviousData : true
    }
  )

  const meetingStatusStyle = {
    "On Going": "text-green-700 bg-green-200 p-2 rounded-lg",
    "Completed": "text-red-700 bg-red-200 p-2 rounded-lg",
    "Not Started": "text-yellow-700 bg-yellow-200 p-2 rounded-lg"
  }

  return (
    <>
      <div className='p-2 h-screen w-full grid grid-cols-1 sm:grid-cols-2 place-content-center'>

        {/* left side */}
        <ul className='w-full flex items-center justify-center flex-col'>
          <VideoStreamer />
        </ul>

        {/* right side */}
        <ul className='pl-2 w-full  flex items-start justify-center flex-col'>
          {!isLoading && <ul className=''>
            <li >
              <h1 className='my-2 font-bold text-2xl'>
                {data?.data?.[0]?.title}
              </h1>
            </li>
            <li>
              <p className='text-gray-500 my-2 text-base first-line:ml-2'>{data?.data?.[0]?.description}</p>
            </li>
            <li className=''>
              <p className='text-gray-500 my-2 text-base'>
                <span className='text-slate-700'>{data?.data?.[0]?.meetingStatus === "Completed" || data?.data?.[0]?.meetingStatus === "Not Started" ? "Meeting started at : " : "Meeting timings : "}</span>
                {data?.data?.[0]?.meetingDate ? `${timeDiffWithCurrentDate(data?.data?.[0]?.meetingDate)} by ${data?.data?.[0]?.createrName}` : ""}
              </p>
              <p className='text-gray-500 my-2 text-base'><span className='text-slate-700'>Meeting Length :</span> {(data?.data?.[0]?.meetingLength && data?.data?.[0]?.meetingLengthPararmeter) ? (data?.data?.[0]?.meetingLength + " " + data?.data?.[0]?.meetingLengthPararmeter) : ""}</p>
              <p className='text-gray-500 my-2 text-base'><span className='text-slate-700'>Total participants :</span> {data?.data?.[0]?.participantsCount}</p>
              <p className='text-gray-500 my-2 text-base'><span className='text-slate-700'>Meeting status :</span> <span className={` ${
                // @ts-ignore
                data?.data?.[0]?.meetingStatus && meetingStatusStyle?.[data?.data?.[0]?.meetingStatus]
                } `}>{data?.data?.[0]?.meetingStatus}</span></p>
            </li>
            <li className='my-2 w-full '>
              {data?.data?.[0]?.meetingStatus === "On Going" && <button className='p-2 px-4 bg-gradient-to-r from-purple-400 from-10% via-purple-700 via-80% to-purple-900 text-white rounded-lg font-bold text-base ml-auto'
                onClick={() => {
                  handleJoinMeet()
                  // router?.push(`/meet/room?id=${meetingId}`)
                }}
              >Join Now</button>}
            </li>
          </ul>}
          {
            isLoading && <Oval color='#7e22ce' width={20} height={20} />
          }
        </ul>
      </div>

    </>
  )
}

export default JoinMeetingRequest
