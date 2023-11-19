import LogedInDevices from '@/components/Profile/LogedInDevices'
import PersonalInfo from '@/components/Profile/PersonalInfo'
import Tiltle from '@/components/Profile/Tiltle'
import UserPic from '@/components/Profile/UserPic'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className='w-full h-full overflow-y-scroll'>
      <Tiltle />
      <UserPic />
      <PersonalInfo />
      <div className='m-2 p-2 mb-4 sm:m-4 sm:p-4'>
        <Link href="/forget-password" className=' p-4 border bg-red-500 rounded-lg text-white font-medium'>Change Password</Link>
      </div>
      <LogedInDevices />
    </div>
  )
}

export default Page
