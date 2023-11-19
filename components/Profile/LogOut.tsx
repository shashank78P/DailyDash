"use client"
import React from 'react'
import { useMutation } from 'react-query'
import api from '../lib/api'
import { useRouter } from 'next/navigation'

const LogOut = () => {
    const router = useRouter()
    const { mutate : logOut , isLoading } = useMutation(()=>{
        return api.delete("log-in-details/log-out")
    },
    {
        onSuccess(){
            router.replace("/login")
        }
    }
    )
    return (
        <div className='m-2 p-2 mb-4 sm:m-4 sm:p-4 cursor-pointer'
            onClick={() => {
                logOut()
            }}
        >
            <span className='w-auto p-4 border bg-purple-500 rounded-lg text-white font-medium'>Log Out</span>
        </div>
    )
}

export default LogOut
