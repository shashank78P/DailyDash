"use client"
import React from 'react'
import Image from 'next/image'
import PencileIco from '../assets/PencileIco'

const UserPic = () => {
    return (
        <div className=' w-full flex justify-center items-center'>
            {/* <img src="https://lh3.googleusercontent.com/a/ACg8ocKjjoC37EmK2ndpgK6q4TKidTrIEE7VlWdmzAcEFE7X=s96-c" alt="" className='border border-black w-[150px] h-[150px] rounded-full'/> */}
            <div className='w-[150px] h-[150px] rounded-full bg-slate-500 relative'>
                <img
                    src="images/DefaultUser2.png"
                    alt="User" className='border-purple-500 border-2 w-[150px] h-[150px] rounded-full'
                />
                <input type="file" name="profilePic" id="profilePic" hidden maxLength={1}
                    onChange={(e)=>{
                        console.log(e?.target?.files)
                        console.log(e?.target)
                    }}
                />
                <label htmlFor='profilePic'>
                    <div className='border bg-purple-700 w-[45px] h-[45px] top-[50%] right-[10%] translate-x-[50%] rounded-full absolute flex justify-center items-center'>
                        <PencileIco width={30} height={30} color={'white'} />
                    </div>
                </label>
            </div>
        </div>
    )
}

export default UserPic
