import React, { useState } from 'react'
import ProfilePic from './ProfilePic'
import CallIco from '@/components/assets/CallIco'
import VideoICameraIco from '@/components/assets/VideoICameraIco'
import UserPlusIco from '@/components/assets/UserPlusIco'
import SearchIco from '@/components/assets/SearchIco'
import DeleteIco from '@/components/assets/DeleteIco'
import ChatSettings from './ChatSettings'
import SettingsIco from '@/components/assets/SettingsIco'
import MoreDetailed from './MoreDetailed'
import LeftAngularArrow from '@/components/assets/LeftAngularArrow'

const profile = ({ setIsViewProfile, selectedChat ,setRefetchList }: any) => {
    const [role, setRole] = useState("MEMBER")

    return (
        <>
            <div className='py-2 w-full overflow-x-scroll'>
                <div
                    className='w-[40px] h-[40px] rounded-full ml-2 cursor-pointer'
                    onClick={() => {
                        setIsViewProfile((prev: boolean) => !prev)
                    }}
                >
                    <LeftAngularArrow width={40} height={40} color='#7e22ce' />
                </div>
                <ProfilePic setRole={setRole} role={role} selectedChat={selectedChat} setRefetchList={setRefetchList} />

                {/* action */}
                <ul className='p-2 w-full flex items-center justify-evenly m-auto'>
                    <li className='p-4 flex items-center justify-center flex-col cursor-pointer'>
                        <CallIco height={30} width={30} color='#7e22ce' />
                        <span className='pt-2 text-purple-700'>Call</span>
                    </li>
                    <li className='p-4 flex items-center justify-center flex-col cursor-pointer'>
                        <VideoICameraIco height={30} width={30} color='#7e22ce' />
                        <span className='pt-2 text-purple-700'>Video call</span>
                    </li>
                    <li className='p-4 flex items-center justify-center flex-col cursor-pointer'>
                        <UserPlusIco height={30} width={30} color='#7e22ce' />
                        <span className='pt-2 text-purple-700'>Add members</span>
                    </li>
                    <li className='p-4 flex items-center justify-center flex-col cursor-pointer'>
                        <SearchIco height={30} width={30} color='#7e22ce' />
                        <span className='pt-2 text-purple-700'>Search</span>
                    </li>
                    <li className='p-4 flex items-center justify-center flex-col cursor-pointer'>
                        <SettingsIco height={30} width={30} color='#7e22ce' />
                        <span className='pt-2 text-purple-700'>Settings</span>
                    </li>
                    <li className='p-4 flex items-center justify-center flex-col cursor-pointer'>
                        <DeleteIco height={30} width={30} color='#7e22ce' />
                        <span className='pt-2 text-purple-700'>Delete</span>
                    </li>
                </ul>
                <ChatSettings />
                <MoreDetailed />
            </div>
        </>
    )
}

export default profile
