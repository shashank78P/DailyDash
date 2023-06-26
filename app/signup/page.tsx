"use client"
import Link from 'next/link';
import { useForm } from "react-hook-form";

type SignUpType = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}

const SignUp = () => {

    const { register, handleSubmit, formState: { errors }, getValues } = useForm<SignUpType>({});
    const onSubmit = (data: any) => {
        console.log(data);
    }

    return (
        <>
            <div className='flex justify-center items-center h-[100%] border-red-900 border'>
                <div className='w-[90%] sm:w-[500px] border border-red-900 p-3 mb-5 rounded-md'>
                    <div className='mb-5 text-purple-700 font-semibold'>SIGN UP</div>
                    <form onSubmit={handleSubmit(onSubmit)} className='mb-5'>
                        <div className=''>
                            <div
                                className='flex flex-col mb-3'
                            >
                                <label>First Name:</label>
                                <input
                                    className='border border-slate-500 mt-1 full rounded-md px-2 py-1'
                                    placeholder='Jahn Deo'
                                    {...register(
                                        "firstName",
                                        {
                                            required: "First name is required", minLength: {
                                                value: 3,
                                                message: "minimum length of Fist name must be 3"
                                            }
                                        })}
                                />
                                {errors.firstName && (
                                    <p className="text-xs text-red-500">
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>
                            <div
                                className='flex flex-col mb-3'
                            >
                                <label>Last Name:</label>
                                <input
                                    className='border border-slate-500 mt-1 full rounded-md px-2 py-1'
                                    {...register(
                                        "lastName",
                                        {
                                            required: "Last name is required", minLength: {
                                                value: 1,
                                                message: "minimum length of last name must be 1"
                                            }
                                        })}
                                />
                                {errors.lastName && (
                                    <p className="text-xs text-red-500">
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
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
                                className='flex flex-col mb-3'
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
                            <div
                                className='flex flex-col mb-3'
                            >
                                <label>Confirm Password:</label>
                                <input
                                    type='password'
                                    className='border border-slate-500 mt-1 full rounded-md px-2 py-1'
                                    {...register(
                                        "confirmPassword",
                                        {
                                            required: "confirm password is required ", validate: (value) => {
                                                const enteredPassword = getValues("password")
                                                return value === enteredPassword
                                            }
                                        })}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-xs text-red-500">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                                {errors.confirmPassword?.type === "validate" && (
                                    <p className="text-xs text-red-500">
                                        password mismatch
                                    </p>
                                )}
                            </div>
                            <input
                                className='w-full border mt-4 full rounded-md px-2 py-1 bg-purple-700 text-white shadow-sm font-bold'
                                type="submit"
                                value="Sign Up"
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
                        Already a user?
                        <Link href='/login' className='text-purple-700 underline-offset font-semibold'> LOGIN</Link>
                    </div>
                </div>
            </div >
        </>
    )
}

export default SignUp