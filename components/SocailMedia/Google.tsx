import React from 'react'

import { GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { useMutation, useQuery } from 'react-query';
import api from '../lib/api';

const Google = () => {

    const { mutate: googleLogIn, isLoading } = useMutation(async (data: any) => {
        api.post("/log-in-details/google-log-in-details", data)
        console.log(data);
    }, {
        onSuccess: (res) => {

        },
        onError: (error) => {

        }
    });
    // useGoogleOneTapLogin({
    //     onSuccess: credentialResponse => {
    //         console.log(credentialResponse);
    //     },
    //     onError: () => {
    //         console.log('Login Failed');
    //     },

    // });
    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
                googleLogIn(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    )
}

export default Google