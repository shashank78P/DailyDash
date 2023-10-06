"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { personalInfoDto } from './types';
import PencileIco from '../assets/PencileIco';
import CrossIco from '../assets/CrossIco';

const PersonalInfo = () => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<personalInfoDto>({
        defaultValues: {
            firstName: "shashi",
            lastName: "p"
        }
    });
    const onSubmit = async (data: any) => {

    }
    return (
        <div className='border-2 border-slate-400 border-dashed  rounded-xl m-4 p-4'>
            <section className='flex justify-between items-center mb-2'>
                <h1 className='font-bold text-xl text-purple-700'>Personal Information</h1>
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
                    <div className=' w-full flex justify-start gap-5 items-center mb-4'>
                        <div className="w-full " >
                            <label className=' font-light text-slate-500' >First Name</label><br />
                            <input
                                type='text'
                                readOnly={!isEdit}
                                className={`w-full  mt-1 p-2 border border-slate-300   rounded-lg ${isEdit ? "" : " cursor-pointer "}`}
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
                            <label className=' font-light text-slate-500'>Last Name</label><br />
                            <input
                                type='text'
                                readOnly={!isEdit}
                                className={`w-full  mt-1 p-2 border border-slate-300   rounded-lg ${isEdit ? "" : " cursor-pointer "} `}
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
                    <div className=' w-full flex justify-start gap-5 items-center mb-4'>
                        <div className="w-full " >
                            <label className=' font-light text-slate-500' >Email</label><br />
                            <input
                                type='email'
                                readOnly={!isEdit}
                                className={`w-full  mt-1 p-2 border border-slate-300   rounded-lg ${isEdit ? "" : " cursor-pointer "}`}
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
                            <label className=' font-light text-slate-500'>DOB</label><br />
                            <input
                                type='text'
                                readOnly={!isEdit}
                                placeholder='mm/dd/yyyy'
                                className={`w-full  mt-1 p-2 border border-slate-300   rounded-lg ${isEdit ? "" : " cursor-pointer "}`}

                                {...register(
                                    "DOB",
                                )}
                            />
                            {errors.DOB && (
                                <p className="text-sm text-red-500 mt-2">
                                    {errors.DOB.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* row */}
                    <div className=' w-full flex justify-start gap-5 items-center mb-4'>
                        <div className="w-full " >
                            <label className=' font-light text-slate-500' >Address</label><br />
                            <textarea
                                readOnly={!isEdit}
                                className={`w-full  mt-1 p-2 border border-slate-300   rounded-lg ${isEdit ? "" : " cursor-pointer "}`}

                                {...register(
                                    "address",
                                )}
                            />
                        </div>
                    </div>

                    {isEdit && <div className=' w-full flex justify-start gap-5 items-center mb-4'>
                        <input
                            className='ml-[auto] border bg-purple-700 p-2 rounded-lg text-white px-4'
                            type="submit"
                            value="Save"
                        />
                    </div>}
                </section>
            </form>
        </div>
    )
}

export default PersonalInfo
