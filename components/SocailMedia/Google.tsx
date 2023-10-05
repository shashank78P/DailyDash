import React from 'react'

import { GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { useMutation, useQuery } from 'react-query';
import api from '../lib/api';
import { data } from 'autoprefixer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Google = () => {
    const router = useRouter();
    const { userSliceReducer } = useSelector((state: any) => state.routeSliceReducer)
    const dispatch = useDispatch();

    const { mutate: googleLogIn, isLoading } = useMutation(async (data: any) => await api.post("/log-in-details/google-log-in-details", data));
    // useGoogleOneTapLogin({
    //     onSuccess: credentialResponse => {
    //         console.log(credentialResponse);
    //     },
    //     onError: () => {
    //         console.log('Login Failed');
    //     },

    // });
    console.log(dispatch)
    // console.log(userSliceReducer.email, userSliceReducer.firstName)
    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
                googleLogIn(credentialResponse, {
                    onSuccess: (data : any) => {
                        console.log(data);
                        if(data?.isEmailVerified){
                            toast.success("Login success!!! , password reset link has been send to email")
                        }else{
                            toast.success("Login success!!!")
                        }
                     router.replace('/');   

                    },
                    onError:()=>{
                        toast.error("Login failed!!!")
                    }
                });
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    )
}

export default Google