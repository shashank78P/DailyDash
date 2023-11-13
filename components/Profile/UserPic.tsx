"use client"
import React from 'react'
import Image from 'next/image'
import PencileIco from '../assets/PencileIco'

const UserPic = () => {
    return (
        <div className=' w-full flex justify-center items-center'>
            {/* <img src="https://lh3.googleusercontent.com/a/ACg8ocKjjoC37EmK2ndpgK6q4TKidTrIEE7VlWdmzAcEFE7X=s96-c" alt="" className='border border-black w-[150px] h-[150px] rounded-full'/> */}
            <div className='w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] rounded-full bg-slate-500 relative'>
                <img
                    src="images/DefaultUser2.png"
                    alt="User" className='border-purple-500 border-2 w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] rounded-full'
                />
                <input type="file" name="profilePic" id="profilePic" hidden maxLength={1}
                    onChange={(e)=>{
                        console.log(e?.target?.files)
                        console.log(e?.target)
                    }}
                />
                <label htmlFor='profilePic'>
                    <div className='border bg-purple-700 w-[45px] h-[45px] top-[50%] right-[10%] translate-x-[50%] rounded-full absolute hidden sm:flex justify-center items-center'>
                        <PencileIco width={30} height={30} color={'white'} />
                    </div>
                    <div className='border bg-purple-700 w-[35px] h-[35px] top-[50%] right-[10%] translate-x-[50%] rounded-full absolute flex sm:hidden justify-center items-center'>
                        <PencileIco width={20} height={20} color={'white'} />
                    </div>
                </label>
            </div>
        </div>
    )
}

export default UserPic
