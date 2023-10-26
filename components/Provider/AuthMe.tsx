import React, { useEffect } from 'react'
import { userAction } from '@/components/store/slice/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const AuthMe = () => {

    
  let dispatch = useDispatch();

    useEffect(()=> {
        axios.get("http://localhost:3001/users/authme", { withCredentials: true })
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
