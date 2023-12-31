"use client"
import Google from '@/components/SocailMedia/Google';
import api from '@/components/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import platform from 'platform';
import { useForm } from "react-hook-form";
import { Oval } from 'react-loader-spinner';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { philosopher } from '../philosopher';
import useRedirectToActiveTab from '@/components/GlobalComponents/useRedirectToActiveTab';

type SignUpType = {
    firstName: string,
    lastName: string,
    email: string,
}

const SignUp = () => {
    const router = useRouter();
    const [ redirect ] = useRedirectToActiveTab()
    const { mutate: sigup, isLoading } = useMutation(async (data: SignUpType) => await api.post("/log-in-details/signin", data));
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<SignUpType>({});
    const onSubmit = (data: any) => {
        data = { ...data, os: platform?.os?.family, browser: platform.name }
        console.log(data);
        sigup(data, {
            onSuccess({ data }) {
                toast.success(data)
                router.replace("/login")
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            }
        });
    }

    return (
        <>
            <div
                className='flex justify-center items-center h-[100%] backgroundeImage'
            >
                <div className='w-[90%] sm:w-[500px] border border-slate-500  p-5 text-white rounded-md backdrop-blur-md'>
                    <div className={`mb-5 font-semibold text-xl sm:text-2xl text-center text-white ${philosopher?.className}`}>Sign Up</div>
                    <form onSubmit={handleSubmit(onSubmit)} className='mb-5 sm:text-xl'>
                        <div className=''>
                            <div
                                className='flex flex-col mb-2'
                            >
                                {/* <label className='text-lg text-white font-semibold'>Password:</label> */}
                                <input
                                    type='text'
                                    placeholder='Enter first name'
                                    className='bg-transparent full px-1 py-1 border border-transparent border-y-2  border-b-purple-700 placeholder:text-white text-white text-base'
                                    {...register(
                                        "firstName",
                                        { required: "firstName is required" })}
                                />
                                {errors.firstName && (
                                    <p className="text-sm mt-2 text-red-500">
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>
                            <div
                                className='flex flex-col mb-2'
                            >
                                {/* <label className='text-lg text-white font-semibold'>Password:</label> */}
                                <input
                                    type='text'
                                    placeholder='Enter last name'
                                    className='bg-transparent mt-5 full px-1 py-1 border border-transparent border-y-2  border-b-purple-700 placeholder:text-white text-white text-base'
                                    {...register(
                                        "lastName",
                                        { required: "lastName is required" })}
                                />
                                {errors.lastName && (
                                    <p className="text-sm mt-2 text-red-500">
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                            <div
                                className='flex flex-col mb-3'
                            >
                                {/* <label className='text-lg font-semibold'>Email:</label> */}
                                <input
                                    type='email'
                                    placeholder='E-mail'
                                    className='bg-transparent mt-5 full px-1 py-1 border border-transparent border-y-2  border-b-purple-700 placeholder:text-white text-white text-base'
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
                            {!isLoading && <input
                                className='w-full mt-5 full rounded-md p-2 bg-purple-700 font-semibold cursor-pointer text-white'
                                type="submit"
                                value="Sign Up"
                            />}
                            {
                                isLoading && <Oval color='#7e22ce' secondaryColor='#7e22ce' width={20} height={20} />
                            }
                        </div>
                    </form>
                    <div className='h-8 relative flex items-center justify-center my-10'>
                        <div className=' h-[.5px] w-full bg-slate-400'></div>
                        <div className=' border border-slate-400 bg-white text-slate-500 p-1 rounded-md absolute font-medium'>OR</div>
                    </div>
                    <div className=' my-10 flex justify-center items-center'>
                        <Google />
                    </div>
                    <div className=' text-right mt-5 text-lg text-gray-300'>
                        Already have an account
                        <Link href='/login' className='text-purple-700 underline-offset font-semibold ml-2'> Log In</Link>
                    </div>
                </div>
            </div >
        </>
    )
}

export default SignUp