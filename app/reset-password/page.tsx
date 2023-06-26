"use client"
import { useForm } from "react-hook-form";

type ResetPasswordType = {
    password: string,
    confirmPassword: string
}

const ResetPassword = () => {

    const { register, handleSubmit, formState: { errors }, getValues } = useForm<ResetPasswordType>({});
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
                                value="Reset Password"
                            />
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}

export default ResetPassword