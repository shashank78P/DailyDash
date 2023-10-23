"use client"
import { FormateDate1 } from '@/components/GlobalComponents/FormateDate1'
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

const JoinMeetingRequest = ({handleJoinMeet} : any) => {
  const param = useSearchParams();
  const dispatch = useDispatch()
  const [meetingId, setMeetingId] = useState<String | null>(null)
  const userSelector = useSelector((state: any) => state?.userSliceReducer);
  const { socket, myPeer }: any = useContext(SocketContext);
  const meetingSelector = useSelector((state: any) => state?.meetingSliceReducer);

  useEffect(() => {
    setMeetingId(param?.get("id"))
  }, [])
  const { data, isLoading } = useQuery(["join-meet", meetingId], () => {
    return api.get(`/meet/get-meeting-details?meetingId=${meetingId}`)
  },
    {
      onSuccess({ data }) {
        // console.log(data)
      },
      onError(err: any) {
        toast?.error(err?.response?.data?.message)
      },
      enabled: Boolean(meetingId)
    }
  )

  return (
    <>
      <div className='h-full w-full flex justify-center items-center'>

        {/* left side */}
        <ul className='w-1/2  flex items-center justify-center flex-col'>
          <VideoStreamer />
        </ul>

        {/* right side */}
        <ul className='ml-2 w-1/2 flex items-start justify-center flex-col'>
          {<ul className=''>
            <li >
              <h1 className='my-2 font-bold text-2xl'>
                {data?.data?.[0]?.title}
              </h1>
            </li>
            <li>
              <p className='text-gray-500 my-2 text-base first-line:ml-2'>{data?.data?.[0]?.description}</p>
            </li>
            <li className=''>
              <p className='text-gray-500 my-2 text-base'>Meeting started at : {data?.data?.[0]?.meetingDate?.slice(0, 10)} {FormateDate1(data?.data?.[0]?.meetingDate)} by {data?.data?.[0]?.createrName}</p>
              <p className='text-gray-500 my-2 text-base'>Total participants : {data?.data?.[0]?.participantsCount}</p>
            </li>
            <li className='my-2'>
              <button className='p-2 px-4 border bg-purple-700 text-white rounded-lg font-bold text-base'
                onClick={() => {
                  handleJoinMeet()
                  // router?.push(`/meet/room?id=${meetingId}`)
                }}
              >Join Now</button>
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
