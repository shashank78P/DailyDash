"use client"
import React from 'react'
import Image from 'next/image'
import PencileIco from '../assets/PencileIco'
import { useMutation, useQuery } from 'react-query'
import api from '../lib/api'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import apiFromData from '../lib/apiFormData'
import { Oval } from 'react-loader-spinner'

const UserPic = () => {
    const userSelector = useSelector((state: any) => state?.userSliceReducer);

    const { data, isLoading, refetch } = useQuery(["userPic", userSelector?.userId], () => {
        return api?.get(`/users/get-user-profile-pic?_id=${userSelector?.userId}`)
    },
        {
            keepPreviousData: true,
            refetchOnMount: true,
            refetchOnWindowFocus: false
        })

    const { mutate: updateProfilePic, isLoading: updateProfilePicIsLoading } = useMutation((data: any) => {
        return api?.put(`/users/change-profile-pic?_id=${userSelector?.userId}`, data)
    },
        {
            onSuccess({ data }) {
                toast.success("Updated successfully")
                refetch()
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            }
        })

    const { mutate: uploadImageAndGetUrl, isLoading: uploadImageAndGetUrlIsLoading } = useMutation((data: any) => {
        return apiFromData?.post(`/file-system/upload-and-get-url`, data)
    },
        {
            onSuccess({ data }) {
                updateProfilePic({
                    FileId: data?.fileId,
                    url: data?.webContentLink
                })
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            }
        })

    return (
        <div className=' w-full flex justify-center items-center'>
            <div className='w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] rounded-full bg-slate-500 relative'>
                <img
                    src={data?.data?.profilePic ?? "images/DefaultUser2.png"}
                    alt="User" className='border-purple-500 border-2 w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] rounded-full'
                />
                <input type="file" name="profilePic" id="profilePic" hidden maxLength={1} accept='image/*'
                    onChange={(e) => {
                        if (e?.target?.files && e?.target?.files?.length > 0) {
                            const formData = new FormData()
                            formData?.append("file", e?.target.files?.[0])
                            uploadImageAndGetUrl(formData)
                        }
                    }}
                />
                <label htmlFor='profilePic'>
                    {
                        (isLoading || uploadImageAndGetUrlIsLoading || updateProfilePicIsLoading) ?
                            <div className='border bg-purple-700 w-[45px] h-[45px] top-[50%] right-[10%] translate-x-[50%] rounded-full absolute hidden sm:flex justify-center items-center'>
                                <Oval color='white' secondaryColor='white' width={20} height={20} />
                            </div>
                            :
                            <>
                                <div className='border bg-purple-700 w-[45px] h-[45px] top-[50%] right-[10%] translate-x-[50%] rounded-full absolute hidden sm:flex justify-center items-center'>
                                    <PencileIco width={30} height={30} color={'white'} />
                                </div>
                                <div className='border bg-purple-700 w-[35px] h-[35px] top-[50%] right-[10%] translate-x-[50%] rounded-full absolute flex sm:hidden justify-center items-center'>
                                    <PencileIco width={20} height={20} color={'white'} />
                                </div>
                            </>}
                </label>
            </div>
        </div>
    )
}

export default UserPic
