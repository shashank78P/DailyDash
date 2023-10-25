import React, { useContext, useState } from 'react'
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
import AddUser from './Profile/AddUser'
import GroupMembersList from './Profile/GroupMembersList'
import ExitIco from '@/components/assets/ExitIco'
import api from '@/components/lib/api'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import { SocketContext } from '@/components/context/SocketContext'
import { toast } from 'react-toastify'

const Profile = ({ setIsViewProfile, selectedChat, setRefetchList ,setSelectedChat}: any) => {
    const [role, setRole] = useState("MEMBER")
    const [options, setOptions] = useState("")
    const userSelector = useSelector((state: any) => state?.userSliceReducer);
    const {socket}: any = useContext(SocketContext);

    const { mutate: leaveGroup, isLoading: isLeaveGroupLoading } = useMutation(async (data: any) => {
        return api.delete(`/chats/leaveGroup?belongsTo=${data?.belongsTo}`)
    }, {
        onSuccess({ data }) {
            socket.emit("GROUP", { event: { type: "LEAVE", message: `${data?.name} left a group` }, messageType: "TEXT", belongsTo: selectedChat?.belongsTo, to: selectedChat?.opponentId, userId: userSelector?.userId });
            setSelectedChat({opponentId: "", opponentPic: "", opponentName: "", belongsTo: "", type: "" })
            toast.success("Group Left sucessfully")
        },
        onError(err : any) {
            toast.error(err?.response?.data?.message)
        }
    })

    return (
        <>
            <div className='py-2 w-full overflow-x-scroll'>
                {options === "Add Members" && <AddUser setOptions={setOptions} selectedChat={selectedChat} />}
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
                        <CallIco height={25} width={25} color='#7e22ce' />
                        <span className='text-sm pt-2 text-purple-700'>Call</span>
                    </li>
                    <li className='p-4 flex items-center justify-center flex-col cursor-pointer'>
                        <VideoICameraIco height={25} width={25} color='#7e22ce' />
                        <span className='text-sm pt-2 text-purple-700'>Video call</span>
                    </li>
                    {selectedChat?.type == "GROUP" && role != "MEMBER" && <li className='p-4 flex items-center justify-center flex-col cursor-pointer'
                        onClick={() => {
                            setOptions("Add Members")
                        }}
                    >
                        <UserPlusIco height={25} width={25} color='#7e22ce' />
                        <span className='text-sm pt-2 text-purple-700'>Add members</span>
                    </li>}
                    <li className='p-4 flex items-center justify-center flex-col cursor-pointer'>
                        <SearchIco height={25} width={25} color='#7e22ce' />
                        <span className='text-sm pt-2 text-purple-700'>Search</span>
                    </li>
                    <li className='p-4 flex items-center justify-center flex-col cursor-pointer'>
                        <SettingsIco height={25} width={25} color='#7e22ce' />
                        <span className='text-sm pt-2 text-purple-700'>Settings</span>
                    </li>
                    <li className='p-4 flex items-center justify-center flex-col cursor-pointer'>
                        <DeleteIco height={25} width={25} color='#7e22ce' />
                        <span className='text-sm pt-2 text-purple-700'>Delete</span>
                    </li>
                </ul>
                <ChatSettings />
                {selectedChat?.type == "GROUP" && <GroupMembersList selectedChat={selectedChat} role={role} options={options} />}
                {selectedChat?.type == "GROUP" && <div className='w-full bg-red-50 flex items-center p-2 cursor-pointer'
                    onClick={() => {
                        leaveGroup({
                            belongsTo : selectedChat?.belongsTo
                        })
                    }}
                >
                    <ExitIco height={25} width={25} color='red' />
                    <span className='text-sm pt-2 text-red-500 ml-2'>Leave Group</span>
                </div>}
                {/* <MoreDetailed /> */}
            </div>
        </>
    )
}

export default Profile
