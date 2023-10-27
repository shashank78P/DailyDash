"use client"
import Google from '@/components/SocailMedia/Google';
import api from '@/components/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import platform from 'platform';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

type LogInType = {
    email: string,
    password: string
}
const Login = () => {
    const router = useRouter();
    const { mutate: login, isLoading } = useMutation(async (data: any) => await api.post("/log-in-details/login", data));
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<LogInType>({});
    const onSubmit = async (data: any) => {
        console.log(data);
        data = {...data , os : platform?.os?.family, browser :platform.name}
        login(data, {
            onSuccess({ data }) {
                console.log(data);
                router.replace('/');
                toast.success("Login Sucessfull")
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            },
        });
    }
    return (
        <div
            className='flex justify-center items-center h-[100%] backgroundeImage'
        >
            <div className='w-[90%] sm:w-[500px] border border-slate-500  p-5 text-white rounded-md backdrop-blur-md'>
                <div className='mb-5 font-semibold text-xl sm:text-2xl text-center'>Log In</div>
                <form onSubmit={handleSubmit(onSubmit)} className='mb-5 sm:text-xl'>
                    <div className=''>
                        <div
                            className='flex flex-col mb-3'
                        >
                            {/* <label className='text-lg font-semibold'>Email:</label> */}
                            <input
                                type='email'
                                placeholder='E-mail'
                                className='bg-transparent full px-1 py-1 border border-transparent border-y-2  border-b-purple-700 placeholder:text-white'
                                {...register(
                                    "email",
                                    {
                                        required: "Email is required"
                                    })}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-2">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div
                            className='flex flex-col mb-2'
                        >
                            {/* <label className='text-lg text-white font-semibold'>Password:</label> */}
                            <input
                                type='password'
                                placeholder='Password'
                                className='bg-transparent mt-5 full px-1 py-1 border border-transparent border-y-2  border-b-purple-700 placeholder:text-white'
                                {...register(
                                    "password",
                                    { required: "Password is required" })}
                            />
                            {errors.password && (
                                <p className="text-sm mt-2 text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div className='text-right text-red-500 font-semibold mt-5'>
                            <Link href="/forget-password">Forget Password</Link>
                        </div>
                        <input
                            className='w-full mt-5 full rounded-md px-2 py-1 bg-purple-700 font-semibold cursor-pointer'
                            type="submit"
                            value="Log In"
                        />
                    </div>
                </form>
                <div className='h-8 relative flex items-center justify-center my-10'>
                    <div className=' h-[.5px] w-full bg-slate-400'></div>
                    <div className=' border border-slate-400 bg-white text-slate-500 p-1 rounded-md absolute font-medium'>OR</div>
                </div>
                <div className=' my-10 flex justify-center items-center'>
                    <Google />
                </div>
                <div className=' text-right mt-5 sm:text-xl text-gray-300'>
<<<<<<< HEAD
                    {"Don't have a account"}
=======
                   {"Don't have a account"}
>>>>>>> ff663f61da62dcfdc0869439d85d36a6bd9d67c8
                    <Link href='/signup' className='text-purple-700 underline-offset font-semibold ml-2'> Sign Up</Link>
                </div>
            </div>
        </div >
    )
}

export default Login