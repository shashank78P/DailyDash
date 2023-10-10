"use client"
import React from 'react'
import PencileIco from '@/components/assets/PencileIco'

const ProfilePic = () => {
    return (
        <div className=' w-full flex justify-center items-center flex-col'>
            {/* <img src="https://lh3.googleusercontent.com/a/ACg8ocKjjoC37EmK2ndpgK6q4TKidTrIEE7VlWdmzAcEFE7X=s96-c" alt="" className='border border-black w-[150px] h-[150px] rounded-full'/> */}
            <div className='w-[150px] h-[150px] rounded-full bg-slate-500 relative mr-5'>
                <img
                    src="images/DefaultUser2.png"
                    alt="User" className='border-purple-500 border-2 w-[150px] h-[150px] rounded-full'
                />
                <input type="file" name="profilePic" id="profilePic" hidden maxLength={1}
                    onChange={(e) => {
                        console.log(e?.target?.files)
                        console.log(e?.target)
                    }}
                />
                <label htmlFor='profilePic'>
                    <div className='border bg-purple-700 w-[40px] h-[40px] top-[50%] right-[10%] translate-x-[50%] rounded-full absolute flex justify-center items-center'>
                        <PencileIco width={30} height={30} color={'white'} />
                    </div>
                </label>
            </div>
            <div className='text-center'>
                <h1 className='my-1 capitalize font-bold text-xl text-purple-700'>Shashank</h1>
                <p className='my-1 font-medium text-slate-500 text-base'>19.shashank.p@gmail.com</p>
            </div>
        </div>
    )
}

export default ProfilePic
