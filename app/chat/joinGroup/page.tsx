"use client"
import api from '@/components/lib/api'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useContext } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify';
import { Dialog, DialogContent, DialogActions } from '@mui/material'
import { Oval } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { SocketContext } from '@/components/context/SocketContext';

const page = () => {
    const userSelector = useSelector((state: any) => state?.userSliceReducer);
    const router = useRouter();
    const {socket}: any = useContext(SocketContext);
    const defaultUserPic = "/public/images/DefaultUser2.png"
    const params = useSearchParams();
    const { data, isLoading } = useQuery("joinGroup", () => {
        return api.get(`/chats/group-details-from-invite-link?token=${params?.get("token")}`)
    },
        {
            onSuccess({ data }) {
            },
            onError(err : any) {
                toast.error(err?.response?.data?.message)
                router.replace("/chat")
            }
        }
    )

    const { mutate: joinGroup, isLoading: joinIsLoading } = useMutation(async () => {
        return await api.post(`chats/join-group-from-invite-link?token=${params.get("token")}`)
    },
        {
            onSuccess({ data }) {
                console.log(data)
                if (data) {
                    const { userName } = data
                    socket.emit("GROUP", { event: { type: "JOIN", message: `${userName.toString()} is join a group via link ` }, messageType: "TEXT", belongsTo: data?._doc?.groupId, to: data?._doc?.groupId, userId: userSelector?.userId });
                    toast.success("Joined successfully")
                    router.replace("/chat")
                }
            },
            onError(err : any) {
                toast.error(err?.response?.data?.message)
                router.replace("/chat")
            }
        }
    )
    return (
        <div className='min-w-[800px] w-[100vw - 50px] overflow-x-scroll md:overflow-hidden h-screen backgroundeImage'>
            <Dialog open={true}>
                <DialogContent>
                    <ul>
                        <li className='flex items-center flex-col'>
                            <img
                                src={(data?.data?.groupProfilePic) ? data?.data?.groupProfilePic : defaultUserPic}
                                alt="image"
                                className='w-[100px] h-[100px] border rounded-full object-cover'
                            />
                            <h1 className='font-semibold capitalize'>{data?.data?.groupName}</h1>
                        </li>
                        <li className='flex '>
                            <span className='mr-2'>Description: </span>
                            <span>{data?.data?.description}</span>
                        </li>
                    </ul>
                </DialogContent>
                <DialogActions>
                    {isLoading ? <Oval color='#7e22ce' secondaryColor='#7e22ce' width={20} height={20} /> :
                        <button
                        onClick={()=>{
                            joinGroup()
                        }}
                            className='mx-2 p-2 px-4 rounded-lg text-white border border-blue-700 bg-blue-700 text-base'
                        >Join Group</button>}
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default page
