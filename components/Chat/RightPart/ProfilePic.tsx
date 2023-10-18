"use client"
import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import CrossIco from '@/components/assets/CrossIco'
import PencileIco from '@/components/assets/PencileIco'
import TickMark from '@/components/assets/TickMark'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
// import EmojiPicker from 'emoji-picker-react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import SmilyFace from '@/components/assets/SmilyFace'
import api from '@/components/lib/api'
import { useSelector } from 'react-redux'
import apiFromData from '@/components/lib/apiFormData'
import { Oval } from 'react-loader-spinner'
// import "emoji-mart/css/emoji-mart.css";

const ProfilePic = ({ setRole, role, selectedChat ,setRefetchList }: any) => {
    const userSelector = useSelector((state: any) => state?.userSliceReducer);
    const [isEditDescription, setIsEditDescription] = useState<boolean>(false);
    const [isEditName, setIsEditName] = useState<boolean>(false);
    const [isEmojiOpen, setIsEmojiOpen] = useState<boolean>(false);
    const [about, setAbout] = useState<string>("")
    const [Name, setName] = useState<string>("")

    useEffect(()=>{
        setIsEditDescription(false)
        setIsEditName(false)
        setIsEmojiOpen(false)
        setAbout("")
        setName("")
    },[selectedChat?.belongsTo])
    const { data, isLoading, refetch } = useQuery(["profile", selectedChat?.belongsTo], () => {
        return api.get(`chats/getProfileDetails?belongsTo=${selectedChat?.belongsTo}&type=${selectedChat?.type}`)
    }
        , {
            onSuccess({ data }: any) {
                setAbout(data?.[0]?.description)
                if(data?.[0]?.groupName){
                    setName(data?.[0]?.groupName)
                }else{
                    setName(data?.[0]?.name)
                }
                setRole(data?.[0]?.role)
            },
            onError(err) {
            },
            refetchOnMount: true,
        });

    const { mutate: postForGroup } = useMutation((data: any) => {
        return api.put("/chats/editGroupNameDesc", data)
    }, {
        onSuccess({ data }) {
            setIsEditDescription(false)
            setIsEditName(false)
            setRefetchList((prev : boolean) => !prev)
            refetch()
        },
        onError(err: any) {
            toast.error(err?.message);
        }
    })

    const { mutate: updateProfilePic ,isLoading : isChangePicLoading} = useMutation((data: any) => {
        return api.put(`/chats/change-group-profile-pic?belongsTo=${selectedChat?.belongsTo}`, data)
    }, {
        onSuccess({ data }) {
            refetch()
        },
        onError(err: any) {
            toast.error(err?.message);
        }
    })
    const { mutate: uploadProfilePic , isLoading : isUploadLoading} = useMutation((data: any) => {
        return apiFromData.post(`/file-system/upload-and-get-url`, data)
    }, {
        onSuccess({ data }) {
            console.log(data)
            updateProfilePic({
                FileId : data?.fileId,
                url : data?.webContentLink
            })
        },
        onError(err: any) {
            toast.error(err?.message);
        }
    })
    return (
        <>
            <div className=' w-full flex justify-center items-center flex-col'>
                {/* <img src="https://lh3.googleusercontent.com/a/ACg8ocKjjoC37EmK2ndpgK6q4TKidTrIEE7VlWdmzAcEFE7X=s96-c" alt="" className='border border-black w-[150px] h-[150px] rounded-full'/> */}
                <div className='w-[150px] h-[150px] rounded-full bg-slate-500 relative mr-5'>
                    <img
                        src={ (data?.data?.[0]?.profilePic)? data?.data?.[0]?.profilePic: "images/DefaultUser2.png"}
                        alt="User" className='border-purple-500 border-2 w-[150px] h-[150px] rounded-full'
                    />
                    <input type="file" name="profilePic" id="profilePic" hidden maxLength={1}
                        onChange={(e : any) => {
                            const formData = new FormData()
                            console.log(e?.target?.files)
                            formData.append("file" , e?.target?.files?.[0])
                            console.log(formData)
                            uploadProfilePic(formData)
                        }}
                    />
                    { selectedChat?.type == "GROUP" && role === "ADMIN" && <label htmlFor='profilePic'>
                        <div className={`border ${ !(isLoading || isUploadLoading || isChangePicLoading) ? " bg-purple-700 " : " bg-white " } w-[40px] h-[40px] top-[50%] right-[10%] translate-x-[50%] rounded-full absolute flex justify-center items-center`}>
                            { 
                            !(isLoading || isUploadLoading || isChangePicLoading) ? <PencileIco width={30} height={30} color={'white'} />
                             : 
                             <Oval height={25} color='#7e22ce' strokeWidth={3}/>
                            }
                        </div>
                    </label>}
                </div>
                <div className='text-center flex flex-col items-center justify-center'>
                    <div className='flex items-center'>
                        {!isEditName && <h1 className='my-1 capitalize font-bold text-xl text-purple-700'>{Name}</h1>}
                        {!isEditName && role === "ADMIN" && selectedChat?.type == "GROUP" && <span className='cursor-pointer ml-2 flex'
                            onClick={() => {
                                setIsEditName(true)
                            }}
                        >
                            <PencileIco width={20} height={20} />
                        </span>}
                    </div>
                    {isEditName && <>
                        <div className='relative flex items-center my-2'>
                            <div className='flex items-center px-1 border'>
                                <input type="text" name="" id="" className='p-1 text-base text-slate-700'
                                    value={Name}
                                    onChange={(e: any) => {
                                        setName(e?.target?.value)
                                    }}
                                />
                                <span className='cursor-pointer'
                                    onClick={() => {
                                        setIsEmojiOpen(!isEmojiOpen)
                                    }}
                                >
                                    <SmilyFace width={25} height={25} />
                                </span>
                            </div>
                            {isEditName && <div className='ml-1 flex items-center'>
                                <span className='cursor-pointer mx-1'
                                    onClick={() => {
                                        setIsEditName(false)
                                    }}
                                ><CrossIco width={30} height={30} color={"red"} /></span>
                                <span className='cursor-pointer mx-1'
                                    onClick={() => {
                                        // setisEditName()
                                        postForGroup({
                                            belongsTo: selectedChat?.belongsTo,
                                            groupName: Name,
                                        })
                                    }}
                                ><TickMark width={20} height={20} color={"green"} /></span>
                            </div>}
                            {isEmojiOpen && <div className='absolute top-8 z-50'>
                                <Picker
                                    onEmojiSelect={(e: any) => {
                                        console.log(e?.native)
                                        setName(Name + e?.native)
                                    }}
                                />
                            </div>}
                        </div>
                    </>
                    }
                </div>
                {selectedChat?.type !== "GROUP" && <p className='my-1 font-medium text-slate-500 text-base'>{data?.data?.[0]?.email}</p>}
            </div>
            {selectedChat?.type == "GROUP" && <ul className='mx-5 mt-2 text-base text-slate-800'>
                <li className=' flex items-center'>
                    <span className='text-lg font-medium'>
                        Description
                    </span>
                    {!isEditDescription && role === "ADMIN" && selectedChat?.type == "GROUP" && <span className='cursor-pointer ml-2 flex'
                        onClick={() => {
                            setIsEditDescription(true)
                        }}
                    >
                        <PencileIco width={20} height={20} />
                    </span>}
                    {isEditDescription && <div className='ml-2 flex items-center'>
                        <span className='cursor-pointer mx-2'
                            onClick={() => {
                                setIsEditDescription(false)
                            }}
                        ><CrossIco width={30} height={30} color={"red"} /></span>
                        <span className='cursor-pointer mx-2'
                            onClick={() => {
                                postForGroup({
                                    belongsTo: selectedChat?.belongsTo,
                                    description: about
                                })
                            }}
                        ><TickMark width={20} height={20} color={"green"} /></span>
                    </div>}
                </li>
                {!isEditDescription && <li className='flex items-center text-justify indent-10'>
                    {about}
                </li>}
                {isEditDescription && <li>
                    <TextField
                        // id="filled-multiline-static"
                        // label="About"
                        multiline
                        rows={4}
                        // defaultValue="Default Value"
                        value={about}
                        onChange={(e) => {
                            setAbout(e?.target.value)
                        }}
                        style={{ width: "100%", backgroundColor: "white" }}
                    />
                </li>}
                <li className='my-2'>
                    <p>
                        Created at <span className='text-slate-500'>{data?.data?.[0]?.createdAt.slice(0, 10)}</span> by <span className='text-slate-500'>{data?.data?.[0]?.adminId === userSelector?.userId ? "you" : data?.data?.[0]?.createdBy} </span>
                    </p>
                </li>
            </ul>}
        </>
    )
}

export default ProfilePic
