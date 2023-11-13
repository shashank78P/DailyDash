"use client"
import api from "@/components/lib/api";
import Link from "next/link";
import { useSearchParams,useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

type ResetPasswordType = {
    password: string,
    confirmPassword: string
}

const ResetPassword = () => {
    const router = useRouter();
    const params = useSearchParams();

    const { mutate: passwordReset, isLoading } = useMutation(async (data: any) => await api.put("/log-in-details/reset-password", data));

    const [ message , setMessage ] = useState<String>("");
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<ResetPasswordType>({});
    const onSubmit = (data: ResetPasswordType) => {
        const { confirmPassword , password } = data;

        if(password != confirmPassword){
            setMessage("Password mis-match");
        }
        else if(!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&(){}[\]:;<>,.?/~_+-=|\\]).{8,32}$/.test(password)){
            setMessage("message");
        }
        Object.assign(data , {token : params.get("token")})
        console.log(data);
        passwordReset(data , {
            onSuccess(data) {
                console.log(data)
                toast.success(data?.data)
                router.replace('/');   
            },
            onError(err : any) {
                console.log({err})
                toast.error(err?.message)
            },
        });
    }

    return (
        <div
            className='flex justify-center items-center h-[100%] backgroundeImage'
        >
            <div className='w-[90%] sm:w-[500px] border border-slate-500  p-5 text-white rounded-md backdrop-blur-md'>
                <div className='mb-5 font-semibold text-xl sm:text-2xl text-center text-white'>Reset Password</div>
                <form onSubmit={handleSubmit(onSubmit)} className='mb-5 sm:text-xl'>
                    <div className=''>
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
                        <div
                            className='flex flex-col mb-2'
                        >
                            {/* <label className='text-lg text-white font-semibold'>Password:</label> */}
                            <input
                                type='password'
                                placeholder='Confirm Password'
                                className='bg-transparent mt-5 full px-1 py-1 border border-transparent border-y-2  border-b-purple-700 placeholder:text-white text-white text-base'
                                {...register(
                                    "confirmPassword",
                                    { required: "confirm password is required" })}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm mt-2 text-red-500">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                        <div className=' text-red-500  text-sm mt-5'>
                                {message !== "message" ? message : <ul className=" list-disc ml-4">
                                <li>At least one digit [0-9]</li>
                                <li>At least one lowercase character [a-z]</li>
                                <li>At least one uppercase character [A-Z] </li>
                                <li>{"At least one special character [*.!@#$%^&(){}[]:;<>,.?/~_+-=|\]"}</li>
                                <li>At least 8 characters in length, but no more than 32.</li>
                                </ul> }
                        </div>
                        { !isLoading && <input
                            className='w-full mt-5 full rounded-md p-2 bg-purple-700 font-semibold cursor-pointer text-white'
                            type="Submit"
                            value="Reset Password"
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

export default ResetPassword