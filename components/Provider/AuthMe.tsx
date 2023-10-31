import React, { useEffect } from 'react'
import { userAction } from '@/components/store/slice/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const AuthMe = () => {

    
  let dispatch = useDispatch();

    useEffect(()=> {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/authme`, { withCredentials: true })
        .then(({data} : any)=>{
          console.log(data)
          dispatch(userAction?.setuser(data))
        })
        .catch(err => {
          // router.replace("/login")
        })
      },[])
  return (
    <>
    </>
  )
}

export default AuthMe
