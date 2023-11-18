import React from 'react'
import { useQuery } from 'react-query'
import api from '../lib/api'

const UserPic = ({ userId , height ,width}: { userId: string , width :number , height : number}) => {
    const { data , isLoading } = useQuery(["userProfilePic", userId] , ()=>{
        return api?.get(`/users/get-user-profile-pic?_id=${userId}`)
    },
    {
        keepPreviousData : true,
        refetchOnMount : true,
        refetchOnWindowFocus : false
    }
    )
    return (
        <>
            <img src={data?.data?.profilePic ?? "images/DefaultUser2.png" } width={width} height={height}  alt="" className={` w-[${width}px] h-[${height}px] rounded-full`}/>
        </>
    )
}

export default UserPic
