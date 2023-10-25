"use client"
import api from '@/components/lib/api';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query';

type LogInType = {
    email: string,
    password: string
}
const Login = () => {
    const [refetchQuery, setRefetchQuery] = useState(true)
    const query = useQuery(['todos', refetchQuery], () => {
        console.log("calling")
        api.get("/log-in-details")
    },
        {
            onSuccess: (data) => {
                console.log("sucess", data)
            },
            onError: (err) => {
                console.log("sucess", err)
            }
        })
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<LogInType>({});
    const onSubmit = async (data: any) => {
    }
    return (
        <div
            className='flex justify-center items-center h-[100%] border-red-900 border'
            onClick={() => {
                setRefetchQuery(!refetchQuery);
            }}
        >
            <div className='w-[90%] sm:w-[500px] border border-red-900 p-3 mb-5 rounded-md'>
                <div className='mb-5 text-purple-700 font-semibold'>Log In</div>
                <form onSubmit={handleSubmit(onSubmit)} className='mb-5'>
                    <div className=''>
                        <div
                            className='flex flex-col mb-3'
                        >
                            <label>Email:</label>
                            <input
                                type='email'
                                className='border border-slate-500 mt-1 full rounded-md px-2 py-1'
                                {...register(
                                    "email",
                                    {
                                        required: "Email is required"
                                    })}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div
                            className='flex flex-col mb-2'
                        >
                            <label>Password:</label>
                            <input
                                type='password'
                                className='border border-slate-500 mt-1 full rounded-md px-2 py-1'
                                {...register(
                                    "password",
                                    { required: "Password is required" })}
                            />
                            {errors.password && (
                                <p className="text-xs text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div className='text-right text-purple-700 font-medium'>
                            <Link href="/forget-password">Forget Password</Link>
                        </div>
                        <input
                            className='w-full border mt-4 full rounded-md px-2 py-1 bg-purple-700 text-white shadow-sm font-bold'
                            type="submit"
                            value="Log In"
                        />
                    </div>
                </form>
                <div className='h-8 relative flex items-center justify-center mb-5'>
                    <div className=' h-[.5px] w-full bg-slate-400'></div>
                    <div className=' border border-slate-400 bg-white text-slate-500 p-1 rounded-md absolute'>OR</div>
                </div>
                <div className='border border-slate-500 mb-5'>
                    Google
                </div>
                <div className=' text-right'>
                    {"Don't have a account"}
                    <Link href='/signup' className='text-purple-700 underline-offset font-semibold'> SIGN UP</Link>
                </div>
            </div>
        </div >
    )
}

export default Login