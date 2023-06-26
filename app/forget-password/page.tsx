"use client"
import Link from 'next/link';
import { useForm } from "react-hook-form";

type ForgetPasswordType = {
    email: string,
}
const ForgetPassword = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<ForgetPasswordType>({});
    const onSubmit = (data: any) => {
        console.log(data);
    }
    return (
        <div className='flex justify-center items-center h-[100%] border-red-900 border'>
            <div className='w-[90%] sm:w-[500px] border border-red-900 p-3 mb-5 rounded-md'>
                <div className='mb-5 text-purple-700 font-semibold'>Forget Password</div>
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
                        <input
                            className='w-full border mt-4 full rounded-md px-2 py-1 bg-purple-700 text-white shadow-sm font-bold'
                            type="submit"
                            value="Request For mail"
                        />
                        <p className='text-slate-400 mt-2 text-justify'>link will be send to above mentioned email to re-set your password</p>
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