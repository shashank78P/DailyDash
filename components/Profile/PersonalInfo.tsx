"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { personalInfoDto } from './types';
import PencileIco from '../assets/PencileIco';
import CrossIco from '../assets/CrossIco';
import { useMutation, useQuery } from 'react-query';
import api from '../lib/api';
import { toast } from 'react-toastify';
import { ExtractDateParamenters } from '../GlobalComponents/FormateDate1';
import { Oval } from 'react-loader-spinner';
import { philosopher } from '@/app/philosopher';

const PersonalInfo = () => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, getValues, setValue, reset } = useForm<personalInfoDto>({ defaultValues: {} });

    const { mutate: updateMineDetails  , isLoading : isUpdateLoading} = useMutation((data) => {
        return api.put("/users/updateMineDetails", data)
    },
        {
            onSuccess({ data }) {
                toast.success("Updated successfully")
                refetch()
                setIsEdit(false)
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            }
        }
    )

    const { refetch , isLoading} = useQuery(["mineDetails"], () => {
        return api.get("/users/getMineDetails")
    },
        {
            onSuccess({ data }) {
                setValue("firstName", data?.firstName ?? "")
                setValue("lastName", data?.lastName ?? "")
                const { givenDate, givenMonth, givenYear }: any = ExtractDateParamenters(data?.dob)
                // @ts-ignore
                setValue("dob", `${givenYear}-${givenMonth}-${givenDate}`)
                setValue("email", data?.email ?? "")
                setValue("address", data?.address ?? "")
            }
        }
    )


    const onSubmit = async (data: any) => {
        updateMineDetails(data)
    }

    return (
        <div className='border-2 border-slate-400 border-dashed  rounded-xl m-4 p-4'>
            <section className='flex justify-between items-center mb-2'>
                <h1 className={`font-bold text-xl text-purple-700 ${philosopher?.className} `}>Personal Info</h1>
                {
                    !isEdit ?
                        <div className='border border-purple-600 p-1 px-2 rounded-lg cursor-pointer'
                            onClick={() => {
                                setIsEdit(true)
                            }}
                        >
                            <PencileIco width={20} height={20} color={'rgb(147 51 234)'} />
                        </div>
                        :
                        <div className='border border-red-400 p-1 px-2 rounded-lg cursor-pointer'
                            onClick={() => {
                                setIsEdit(false)
                                reset()
                            }}
                        >
                            <CrossIco width={20} height={20} color={"red"} />
                        </div>
                }
            </section>
            <form onSubmit={handleSubmit(onSubmit)}>
                <section className=' p-2 text-lg'>
                    {/* row */}
                    <div className=' w-full grid grid-cols-1 sm:grid-cols-2  gap-4 items-center mb-4'>
                        <div className="w-full " >
                            <label className='text-lg font-light text-slate-600' >First Name</label><br />
                            <input
                                type='text'
                                readOnly={!isEdit}
                                className={`w-full  mt-1 p-2 border border-slate-300 text-base   rounded-lg ${isEdit ? "" : " cursor-pointer "}`}
                                {...register(
                                    "firstName",
                                    {
                                        required: "firstName is required"
                                    })}
                            />
                            {errors.firstName && (
                                <p className="text-sm text-red-500 mt-2">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>
                        <div className="w-full ">
                            <label className='text-lg font-light text-slate-600'>Last Name</label><br />
                            <input
                                type='text'
                                readOnly={!isEdit}
                                className={`w-full  mt-1 p-2 border border-slate-300 text-base   rounded-lg ${isEdit ? "" : " cursor-pointer "} `}
                                {...register(
                                    "lastName",
                                    {
                                        required: "lastName is required"
                                    })}
                            />
                            {errors.lastName && (
                                <p className="text-sm text-red-500 mt-2">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* row */}
                    <div className=' w-full grid grid-cols-1 sm:grid-cols-2  gap-4 items-center mb-4'>
                        <div className="w-full " >
                            <label className='text-lg font-light text-slate-600' >Email</label><br />
                            <input
                                type='email'
                                readOnly={!isEdit}
                                className={`w-full  mt-1 p-2 border border-slate-300 text-base   rounded-lg ${isEdit ? "" : " cursor-pointer "}`}
                                {...register(
                                    "email",
                                    {
                                        required: "email is required"
                                    })}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-2">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="w-full ">
                            <label className='text-lg font-light text-slate-600'>DOB</label><br />
                            <input
                                type='date'
                                readOnly={!isEdit}
                                // placeholder='mm/dd/yyyy'
                                className={`w-full  mt-1 p-2 border border-slate-300 text-base   rounded-lg ${isEdit ? "" : " cursor-pointer "}`}

                                {...register(
                                    "dob",
                                )}
                            />
                            {errors.dob && (
                                <p className="text-sm text-red-500 mt-2">
                                    {errors.dob.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* row */}
                    <div className=' w-full flex justify-start gap-5 items-center mb-4'>
                        <div className="w-full " >
                            <label className='text-lg font-light text-slate-600' >Address</label><br />
                            <textarea
                                readOnly={!isEdit}
                                className={`w-full  mt-1 p-2 border border-slate-300 text-base   rounded-lg ${isEdit ? "" : " cursor-pointer "}`}

                                {...register(
                                    "address",
                                )}
                            />
                        </div>
                    </div>

                    {isEdit && <div className=' w-full flex justify-start gap-5 items-center mb-4'>
                        {
                            (isUpdateLoading || isLoading) ? <Oval  color='#7e22ce' secondaryColor='#7e22ce' width={20} height={20}/> :
                            <input
                                className='ml-[auto] border bg-purple-700 p-2 rounded-lg text-white px-4 cursor-pointer'
                                type="submit"
                                value="Save"
                            />
                        }
                    </div>}
                </section>
            </form>
        </div>
    )
}

export default PersonalInfo
