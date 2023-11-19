import LogedInDevices from '@/components/Profile/LogedInDevices'
import PersonalInfo from '@/components/Profile/PersonalInfo'
import UserPic from '@/components/Profile/UserPic'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className='w-full h-full overflow-y-scroll'>
        <h1 className='font-bold text-2xl m-2 mt-4 text-purple-700'>My Profile</h1>
        <UserPic />
        <PersonalInfo />
        <div className='m-4 p-4'>
          <Link href="/forget-password" className=' p-4 border bg-red-500 rounded-lg text-white font-medium'>Change Password</Link>
        </div>
        <LogedInDevices />
    </div>
  )
}

export default Page
