import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { meetingDto } from './TopBarAction'
import CrossIco from '@/components/assets/CrossIco'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import api from '@/components/lib/api'
import { useRouter } from "next/navigation";
import { TagsInput } from 'react-tag-input-component'

type createMeetingFormDto = {
    title: string,
    description: string,
    meetingLength: string,
    participantsEmail: string[],
    whoCanJoin: string,
    meetingDate: Date
}

const CreateMeetingForm = ({createMeeting, setCreateMeeting} : meetingDto) => {
    const { register, handleSubmit, formState: { errors, }, getValues, unregister , setValue } = useForm<createMeetingFormDto>({ defaultValues: { whoCanJoin: "ANY_ONE_WITH_MEET_LINK" } });
    const [selected, setSelected] = useState([])
    const [whoCanJoin, setWhoCanJoin] = useState("")
    const router = useRouter()

    useEffect(() => {
        if (whoCanJoin !== "MANUALLY_ADDED") {
            unregister("participantsEmail")
        } else {
            register("participantsEmail")
        }
    }, [whoCanJoin])
    const { mutate: postCreateMeeting, isLoading } = useMutation((data: any) => {
        return api.post("/meet/create-meeting", data)
    },
        {
            onSuccess({ data }) {
                console.log(data?.[0]?._id)
                router?.push(`/meet/room?id=${data?.[0]?._id}`)
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            }
        }
    )

    const onSubmit = (data: any) => {
        console.log(data)
        postCreateMeeting(data)
    }
    return (
        <Dialog
            open={createMeeting}
            style={{
                padding: "2px",
                minWidth: "300px",
            }}
        >
            <DialogTitle>
                <ul className='w-full flex justify-between items-center'>
                    <li className='font-semibold '>Create Meeting</li>
                    <li
                        className='cursor-pointer'
                        onClick={() => {
                            setCreateMeeting(false)
                        }}>
                        <CrossIco height={30} width={30} color='red' />
                    </li>
                </ul>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} className='mb-5 sm:text-xl'>
                    <div className=''>
                        <div
                            className='flex flex-col mb-3'
                        >
                            <label className='text-lg mb-1 '>Title:</label>
                            <input
                                type='text'
                                className='p-2.5 border border-1 min-w-[350px]  border-gray-300 rounded-lg text-base'
                                {...register(
                                    "title",
                                    { required: "title is required" })}
                            />
                            {errors.title && (
                                <p className="text-sm mt-2 text-red-500">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>
                        <div
                            className='flex flex-col mb-4'
                        >
                            <label className='text-lg mb-1 '>Meeting length:</label>
                            <select
                                className='p-2.5 border border-1 min-w-[350px]  border-gray-300 rounded-lg text-base'
                                {...register(
                                    "meetingLength",
                                    {
                                        required: "meetingLength is required"
                                    })}
                            >
                                <option value={"15 min"} >15 min</option>
                                <option value={"30 min"} >30 min</option>
                                <option value={"45 min"} selected>45 min</option>
                                <option value={"1 hr"} >1 hrs</option>
                                <option value={"2 hr"} >2 hrs</option>
                                <option value={"6 hr"} >6 hrs</option>
                                <option value={"1 day"} >1 day</option>
                            </select>
                            {errors.meetingLength && (
                                <p className="text-sm text-red-500 mt-2">
                                    {errors.meetingLength.message}
                                </p>
                            )}
                        </div>

                        <div
                            className='flex flex-col mb-4'
                        >
                            <label className='text-lg mb-1 '>Who can join meeting:</label>
                            <select
                                className='p-2.5 border border-1 min-w-[350px]  border-gray-300 rounded-lg text-base'
                                {...register(
                                    "whoCanJoin",
                                    {
                                        required: "whoCanJoin is required"
                                    })}
                                onChange={(e) => {
                                    setWhoCanJoin(e?.target?.value)
                                }}
                            >
                                <option
                                    selected value="ANY_ONE_WITH_MEET_LINK" >Any one with meet link</option>
                                <option
                                    value="ONLY_OF_MY_CONTACT">Only of my contact</option>
                                <option
                                    value="MANUALLY_ADDED">Manually Add</option>
                            </select>
                            {errors.whoCanJoin && (
                                <p className="text-sm text-red-500 mt-2">
                                    {errors.whoCanJoin.message}
                                </p>
                            )}
                        </div>
                        {whoCanJoin === "MANUALLY_ADDED" && <div
                            className='flex flex-col mb-4'
                        >
                            <label className='text-lg mb-1 '>Add users email:</label>
                            <TagsInput
                                value={selected}
                                {...register(
                                    "participantsEmail",
                                    { required: "participants email is required"  }
                                )
                                }
                                onChange={(e: any) => {
                                    setSelected(e)
                                    setValue("participantsEmail" , e)                                    
                                }}
                            // placeHolder="enter email"
                            // className='p-2.5 border border-1 min-w-[350px]  border-gray-300 rounded-lg text-base'
                            />
                            {errors.participantsEmail && (
                                <p className="text-sm mt-2 text-red-500">
                                    {errors.participantsEmail.message}
                                </p>
                            )}
                        </div>}
                        <div
                            className='flex flex-col mb-4'
                        >
                            <label className='text-lg mb-1 '>Meeting date:</label>
                            <input
                                type='datetime-local'
                                className='p-2.5 border border-1 min-w-[350px]  border-gray-300 rounded-lg text-base'
                                {...register(
                                    "meetingDate",
                                    { required: "meeting date is required" })}
                            />
                            {errors.meetingDate && (
                                <p className="text-sm mt-2 text-red-500">
                                    {errors.meetingDate.message}
                                </p>
                            )}
                        </div>
                        <div
                            className='flex flex-col mb-4'
                        >
                            <label className='text-lg mb-1 '>Description:</label>
                            <textarea
                                className='min-h-[100px] p-2.5 border border-1  border-gray-300 rounded-lg text-base'
                                {...register(
                                    "description",
                                    {  })}
                            />
                            {errors.description && (
                                <p className="text-sm mt-2 text-red-500">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                        <input
                            className='w-full mt-5 full rounded-md p-2.5 bg-purple-700 font-semibold cursor-pointer text-white'
                            type="submit"
                            value="Create Meeting"
                        />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateMeetingForm
