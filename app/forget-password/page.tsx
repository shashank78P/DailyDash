"use client"
import api from '@/components/lib/api';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { Oval } from 'react-loader-spinner';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

type ForgetPasswordType = {
    email: string
}
const ForgetPassword = () => {
    const router = useRouter();
    const { mutate: forgetPassword, isLoading } = useMutation(async (data: any) => await api.post("/log-in-details/forget-password", data));
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<ForgetPasswordType>({});
    const onSubmit = (data: any) => {
        forgetPassword(data, {
            onSuccess({ data }) {
                toast.success(data);
                router.replace("/");
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            }
        })
    }
    return (
        <div
            className='flex justify-center items-center h-[100%] backgroundeImage'
        >
            <div className='w-[90%] sm:w-[500px] border border-slate-500  p-5 text-white rounded-md backdrop-blur-md'>
                <div className='mb-5 font-semibold text-xl sm:text-2xl text-center text-white'>Forget Password</div>
                <form onSubmit={handleSubmit(onSubmit)} className='mb-5 sm:text-xl'>
                    <div className=''>
                        <div
                            className='flex flex-col mb-3'
                        >
                            {/* <label className='text-lg font-semibold'>Email:</label> */}
                            <input
                                type='email'
                                placeholder='E-mail'
                                className='bg-transparent full px-1 py-1 border border-transparent border-y-2  border-b-purple-700 placeholder:text-white text-white text-base'
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
                            {
                                !isLoading && <input
                                    className='w-full mt-5 full rounded-md p-2 bg-purple-700 font-semibold cursor-pointer text-white'
                                    type="submit"
                                    value="Send Password re-set mail"
                                />
                            }
                            {
                                isLoading && <Oval color='#7e22ce' secondaryColor='#7e22ce' width={20} height={20} />
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default ForgetPassword