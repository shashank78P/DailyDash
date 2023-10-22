import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React, { useContext } from 'react'
import { meetingContext } from './State/meetState'
import { useForm } from 'react-hook-form'
import { meetingDto } from './TopBarAction'
import CrossIco from '@/components/assets/CrossIco'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import api from '@/components/lib/api'
import { useRouter } from "next/navigation";

type createMeetingFormDto = {
    title: string,
    description: string,
    meetingLength: string,
    whoCanJoin: string[],
    meetingDate: Date
}

const CreateMeetingForm = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<createMeetingFormDto>({});
    const router = useRouter()
    const { mutate : postCreateMeeting , isLoading } = useMutation((data: any)=>{
        return api.post("/meet/create-meeting",data)
    },
    {
        onSuccess({data}){
            console.log(data?.[0]?._id)
            router?.push(`/meet/join-meet?id=${data?.[0]?._id}`)
        },
        onError(err : any){
            toast.error(err?.response?.data?.message)
        }
    }
    )

    const onSubmit = (data: any) => {
        console.log(data)
        postCreateMeeting(data)
    }
    const { createMeeting, setCreateMeeting } = useContext<meetingDto>(meetingContext)
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
                    <li className='font-medium'>Create Meeting</li>
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
                            className='flex flex-col mb-2'
                        >
                            <label className='text-lg mb-1 '>Title:</label>
                            <input
                                type='text'
                                className='p-2 border border-1 min-w-[350px]  border-slate-400 rounded-lg text-base'
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
                            className='flex flex-col mb-3'
                        >
                            <label className='text-lg mb-1 '>Meeting length:</label>
                            <select
                                className='p-2 border border-1 min-w-[350px]  border-slate-400 rounded-lg text-base'
                                {...register(
                                    "meetingLength",
                                    {
                                        required: "meetingLength is required"
                                    })}
                            >
                                <option>15 min</option>
                                <option>30 min</option>
                                <option selected>45 min</option>
                                <option>1 hrs</option>
                                <option>2 hrs</option>
                                <option>6 hrs</option>
                                <option>1 day</option>
                            </select>
                            {errors.meetingLength && (
                                <p className="text-sm text-red-500 mt-2">
                                    {errors.meetingLength.message}
                                </p>
                            )}
                        </div>

                        <div
                            className='flex flex-col mb-3'
                        >
                            <label className='text-lg mb-1 '>Who can join meeting:</label>
                            <select
                                className='p-2 border border-1 min-w-[350px]  border-slate-400 rounded-lg text-base'
                                {...register(
                                    "whoCanJoin",
                                    {
                                        required: "whoCanJoin is required"
                                    })}
                            >
                                <option selected value="ANY_ONE_WITH_MEET_LINK" >Any one with meet link</option>
                                <option value="ONLY_OF_MY_CONTACT">Only of my contact</option>
                                <option value="MANUALLY_ADDED">Manually Add</option>
                            </select>
                            {errors.whoCanJoin && (
                                <p className="text-sm text-red-500 mt-2">
                                    {errors.whoCanJoin.message}
                                </p>
                            )}
                        </div>
                        <div
                            className='flex flex-col mb-2'
                        >
                            <label className='text-lg mb-1 '>Meeting date:</label>
                            <input
                                type='datetime-local'
                                className='p-2 border border-1 min-w-[350px]  border-slate-400 rounded-lg text-base'
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
                            className='flex flex-col mb-2'
                        >
                            <label className='text-lg mb-1 '>Description:</label>
                            <textarea
                                className='min-h-[100px] p-2 border border-1  border-slate-400 rounded-lg text-base'
                                {...register(
                                    "description",
                                    { required: "description is required" })}
                            />
                            {errors.description && (
                                <p className="text-sm mt-2 text-red-500">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                        <input
                            className='w-full mt-5 full rounded-md px-2 py-1 bg-purple-700 font-semibold cursor-pointer text-white'
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
