import { getTimeWithAMorPM, timeDiffWithCurrentDate } from '@/components/GlobalComponents/FormateDate1'
import UserPic from '@/components/GlobalComponents/UserPic'
import api from '@/components/lib/api'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { MeetingContext, meetingStatusStyle, } from '../types'
import MeetContext from './State/MeetContext'
import Slider from '@/components/GlobalComponents/Slider'

const InnerPage = () => {
    const {  setSelected,handelClearSelectedData, isEdit, setIsEdit, show, setShow, createMeeting, setCreateMeeting, selectedId, setSelectedId } = useContext<MeetingContext>(MeetContext)

    const { data: participantsDetails, isLoading: isParticipantsDetailsLoading } = useQuery(["addedparticipantsDetails", selectedId], () => {
        return api.get(`/meet/get-added-participants?meetingId=${selectedId}`)
    },
        {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            enabled: (show && Boolean(selectedId)),
            onSuccess: (data) => {
                console.log(data)
            }
        }
    )
    
    const { data: selected, isLoading } = useQuery(["get-individual-meeting-details", selectedId], () => {
        return api.get(`/meet/get-individual-meeting-details?meetingId=${selectedId}`)
    },
        {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            enabled: (show && Boolean(selectedId)),
            onSuccess: (data) => {
                console.log(data)
            }
        }
    )

    function handelClose() {
        setShow(false)
        handelClearSelectedData()
    }

    function handelEdit() {
        setShow(false)
        const pEmail = participantsDetails?.data?.addParticipants?.map((participant: any, i: number) => {
            return participant?.emial
        })
        const InvitedEmail = participantsDetails?.data?.invitedParticipants?.map((participant: any, i: number) => {
            return participant?.email
        })
        const participantsEmail = [...pEmail, ...InvitedEmail]
        setSelected({ ...selected?.data, participantsEmail })
        setIsEdit(true)
    }

    return (
        <>
            <Slider show={show} handelEdit={handelEdit} title={selected?.data?.title} handelClose={handelClose} isShowEdit={!["Completed", "On Going"].includes(selected?.data?.meetingStatus)} isShowPic={false} >
                {/* rows */}
                <div className='my-2 items-center'>
                    <div className='flex items-center'>
                        <div className='text-base w-1/3 font-medium mr-2 text-slate-900 '>Title: </div>
                        <div className='text-sm w-full text-slate-700 font-light'>{selected?.data?.title}</div>
                    </div>
                    <div className='my-3 items-center flex'>
                        <div className='text-base w-1/3 font-medium mr-2 text-slate-900'>Created By: </div>
                        <div className='text-sm w-full text-slate-700 font-light'>
                            <span className=' flex justify-start items-center'>
                                <span><UserPic userId={selected?.data?.createdBy} width={30} height={30} /></span>
                                <span className=' ml-2'>{selected?.data?.createrName}</span>
                            </span>
                        </div>
                    </div>
                    <div className='my-3 justify-start items-center flex'>
                        <div className={`text-base w-1/3 font-medium mr-2 text-slate-900 `}>Status: </div>
                        <div className={`text-sm w-full text-slate-700 font-light`}>{
                            <span className={`${meetingStatusStyle?.[selected?.data?.meetingStatus]}`}>
                                {selected?.data?.meetingStatus}
                            </span>
                        }</div>
                    </div>
                    <div className='my-2 items-center flex'>
                        <div className='text-base w-1/3 font-medium mr-2 text-slate-900'>Meeting Date: </div>
                        <div className='text-sm w-full text-slate-700 font-light'>{selected?.data?.meetingDate?.slice(0, 10)}</div>
                    </div>
                    <div className='my-2 items-center flex'>
                        <div className='text-base w-1/3 font-medium mr-2 text-slate-900'>Meeting Time: </div>
                        <div className='text-sm w-full text-slate-700 font-light'>{getTimeWithAMorPM(selected?.data?.meetingDate)}</div>
                    </div>
                    <div className='my-2 items-center flex'>
                        <div className='text-base w-1/3 font-medium mr-2 text-slate-900'>Meeting Length: </div>
                        <div className='text-sm w-full text-slate-700 font-light'>{selected?.data?.meetingLength} {selected?.data?.meetingLengthPararmeter}</div>
                    </div>
                    <div className='my-2 items-center flex'>
                        <div className='text-base w-1/3 font-medium mr-2 text-slate-900'>Who can join: </div>
                        <div className='text-sm w-full text-slate-700 font-light'>{selected?.data?.whoCanJoin?.replaceAll("_", " ")}</div>
                    </div>
                    <div className='my-2 items-center flex'>
                        <div className='text-base w-1/3 font-medium mr-2 text-slate-900'>Participants count: </div>
                        <div className='text-sm w-full text-slate-700 font-light'>{selected?.data?.participantsCount}</div>
                    </div>
                    <div className='my-2 items-center flex'>
                        <div className='text-base w-1/3 font-medium mr-2 text-slate-900'>Link: </div>
                        <div className='text-sm w-full text-slate-700 font-light'>{`${process.env.NEXT_FRONT_END_URL}/meet/room?id=${selected?.data?.meetingId}`}</div>
                    </div>
                    <div className='my-2 items-center flex'>
                        <div className='text-base w-1/3 font-medium mr-2 text-slate-900'>Description: </div>
                        <div className='text-sm w-full text-slate-700 font-light'>{selected?.data?.description}</div>
                    </div>
                </div>
                <div className=' my-2 '>
                    <ul>
                        <li>
                            <div className='text-lg font-medium my-2 mt-3 text-purple-700 capitalize'>Participants list</div>
                            <ul>
                                {
                                    Array.isArray(participantsDetails?.data?.addParticipants) && participantsDetails?.data?.addParticipants?.length === 0 && <div className='text-base font-medium my-2 text-slate-500 text-center w-full'>No Participants found</div>
                                }
                                {
                                    participantsDetails?.data?.addParticipants?.map((participant: any, i: number) => {
                                        return (<ul className='w-full border p-2 my-2 flex rounded-lg shadow-sm' key={i}>
                                            <li>
                                                <img src={participant?.userPic} width={50} height={50} alt="" className={` w-[${50}px] h-[${50}px] rounded-full`} />
                                            </li>
                                            <li>
                                                <ul className='flex items-center ml-2'>
                                                    <li className='flex text-base'>
                                                        {
                                                            participant?.userName
                                                        }
                                                    </li>
                                                    <li className='text-sm text-slate-500 ml-2'>
                                                        ({
                                                            participant?.emial
                                                        })
                                                    </li>
                                                </ul>
                                                <div className='ml-2'>
                                                    <span>
                                                        Attended
                                                    </span>
                                                    <span className={`ml-2 ${participant?.isAttended ? " text-green-500 " : " text-red-500 "}`}>
                                                        {participant?.isAttended ? "Yes" : "No"}
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>)
                                    })
                                }
                            </ul>
                        </li>
                        <li >
                            <div className='text-lg font-medium my-2 mt-4 text-purple-700 capitalize'>Invited Participants list</div>
                            {
                                Array.isArray(participantsDetails?.data?.invitedParticipants) && participantsDetails?.data?.invitedParticipants?.length === 0 && <div className='text-base font-medium my-2 text-slate-500 text-center w-full'>No Invitations found</div>
                            }
                            {
                                participantsDetails?.data?.invitedParticipants?.map((participant: any, i: number) => {
                                    return (
                                        <ul className='w-full border p-2 my-2 flex flex-col rounded-lg shadow-sm' key={i}>
                                            <li className='flex justify-between w-full'>
                                                <span className='text-base'>{participant?.email}</span>
                                                <span className='text-sm text-slate-500'>{timeDiffWithCurrentDate(participant?.createdAt)}</span>
                                            </li>
                                            <li className='my-2'>
                                                <span>Accepted</span>
                                                <span className={`ml-2 ${participant?.invitationAccepted ? " text-green-500 " : " text-red-500 "}`}>
                                                    {participant?.invitationAccepted ? "Yes" : "No"}
                                                </span>
                                            </li>
                                        </ul>
                                    )
                                })
                            }
                        </li>
                    </ul>
                </div>
            </Slider>
        </>
    )
}

export default InnerPage
