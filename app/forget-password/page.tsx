"use client"
import api from '@/components/lib/api';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useMutation } from 'react-query';

type ForgetPasswordType = {
    file: File[],
    fileName: string
}
const ForgetPassword = () => {
    const [selectedFile, setSelectedFile] = useState<any>([])
    const { mutate: uploandImages, isLoading: imageUploadLoading } =
        useMutation((data: any) => {
            console.log(data)
            return api.post(`file-system`, data);
        }, {
            onSuccess: (res) => {
                console.log(res)
            },
            onError: ({ response }) => {
                console.log(response.data);
            }
        });
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<ForgetPasswordType>({});
    const onSubmit = (data: any) => {
        const formdata = new FormData();
        formdata.append("file", selectedFile[0]);
        console.log(selectedFile[0])
        uploandImages(formdata)
    }
    return (
        <div className='flex justify-center items-center h-[100%] border-red-900 border'>
            <div className='w-[90%] sm:w-[500px] border border-red-900 p-3 mb-5 rounded-md'>
                <div className='mb-5 text-purple-700 font-semibold'>Forget Password</div>
                <form onSubmit={handleSubmit(onSubmit)} className='mb-5' encType="multipart/form-data">
                    <div className=''>
                        <div
                            className='flex flex-col mb-3'
                        >
                            <label>file:</label>
                            <input
                                type='file'
                                className='border border-slate-500 mt-1 full rounded-md px-2 py-1'
                                {...register(
                                    "file",
                                    {
                                        required: "file is required"
                                    })}
                                onChange={(e) => {
                                    setSelectedFile(e.target.files)
                                    console.log(e?.target.files)
                                }}
                            />
                            {errors.file && (
                                <p className="text-xs text-red-500">
                                    {errors.file.message}
                                </p>
                            )}
                        </div>
                        {/* <div
                            className='flex flex-col mb-3'
                        >
                            <label>name:</label>
                            <input
                                type='text'
                                className='border border-slate-500 mt-1 full rounded-md px-2 py-1'
                                {...register(
                                    "fileName",
                                    {
                                        required: "file is required"
                                    })}
                            />
                            {errors.file && (
                                <p className="text-xs text-red-500">
                                    {errors.file.message}
                                </p>
                            )}
                        </div> */}
                        <input
                            className='w-full border mt-4 full rounded-md px-2 py-1 bg-purple-700 text-white shadow-sm font-bold'
                            type="submit"
                            value="Request For mail"
                        />
                        <p className='text-slate-400 mt-2 text-justify'>link will be send to above mentioned file to re-set your password</p>
                        <div className=' text-right'>
                            Back to
                            <Link href='/login' className='text-purple-700 underline-offset font-semibold'> LOGIN</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default ForgetPassword