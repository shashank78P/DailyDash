import LogedInDevices from '@/components/Profile/LogedInDevices'
import PersonalInfo from '@/components/Profile/PersonalInfo'
import UserPic from '@/components/Profile/UserPic'
import React from 'react'

const Page = () => {
  return (
    <div className='w-full '>
        <h1 className='font-bold text-2xl m-2 mt-4 text-purple-700'>My Profile</h1>
        <UserPic />
        <PersonalInfo />
        <LogedInDevices />
    </div>
  )
}

export default Page
