"use client"
import api from '@/components/lib/api';
import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Oval } from 'react-loader-spinner';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { philosopher } from '../philosopher';
import { returnIco } from '@/components/Profile/LogedInDevices';
import { timeDiffWithCurrentDate } from '@/components/GlobalComponents/FormateDate1';
import useRedirectToActiveTab from '@/components/GlobalComponents/useRedirectToActiveTab';

const Page = () => {

    type blockType = {
        password: string,
    }

    const router = useRouter();
    const params = useSearchParams();
    const [ redirect ] = useRedirectToActiveTab()


    const { mutate: block, isLoading } = useMutation(async (data: any) => await api.put("/log-in-details/block-log-in-device", data));

    const { data, isLoading: getDeviceDetailsIsLoading } = useQuery(["getDeviceDetails"], () => {
        return api.get(`/log-in-details/get-log-in-device-details?email=${params.get("email")}&logInId=${params.get("logInId")}`)
    })

    const { register, handleSubmit, formState: { errors }, getValues } = useForm<blockType>({});
    const onSubmit = (data: blockType) => {
        Object.assign(data, { email: params.get("email"), logInId: params.get("logInId") })
        console.log(data);
        block(data, {
            onSuccess({ data }) {
                console.log(data)
                toast.success(data)
                redirect(true)
            },
            onError(err: any) {
                console.log(err?.response?.data?.message)
                toast.error(err?.response?.data?.message)
            },
        });
    }
    return (
        <div
            className='flex justify-center items-center h-[100%] backgroundeImage'
        >
            <div className='w-[90%] sm:w-[500px] border border-slate-500  p-5 text-white rounded-md backdrop-blur-md'>
                <div className={`mb-5 font-semibold text-xl sm:text-2xl text-center text-white ${philosopher?.className}`}>Block</div>
                <form onSubmit={handleSubmit(onSubmit)} className='mb-5 sm:text-xl'>
                    <div className=''>
                        <ul className='w-full p-2 flex items-center justify-between  rounded-lg bg-slate-100 my-4'>
                            <li className='flex flex-col sm:flex-row justify-start sm:items-center'>
                                <div className='sm:mr-2 mb-2'>
                                    {returnIco(data?.data?.os, data?.data?.browser)}
                                </div>
                                <div className='flex flex-col items-start justify-center'>
                                    <div className='text-xs text-slate-500 mb-2'>
                                        {timeDiffWithCurrentDate(data?.data?.createdAt)}
                                    </div>
                                    <div className=' text-sm'>
                                        {
                                            `${data?.data?.os}  ${data?.data?.browser}`
                                        }
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div
                            className='flex flex-col mb-3'
                        >
                            {/* <label className='text-lg font-semibold'>Email:</label> */}
                            <input
                                type='password'
                                placeholder='Password'
                                className='bg-transparent full px-1 py-1 border border-transparent border-y-2  border-b-purple-700 placeholder:text-white text-white text-base'
                                {...register(
                                    "password",
                                    {
                                        required: "Password is required"
                                    })}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-2">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        {!isLoading && <input
                            className='w-full mt-5 full rounded-md p-2 bg-red-700 font-medium cursor-pointer text-white'
                            type="Submit"
                            value="Confirm"
                        />}
                        {
                            isLoading && <Oval color='#7e22ce' secondaryColor='#7e22ce' width={20} height={20} />
                        }
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Page
