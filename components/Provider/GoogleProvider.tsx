import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';

interface Props {
    children: React.ReactNode;
}


const GoogleProvider = ({ children }: Props) => {
    return (
        // @ts-ignore
        <GoogleOAuthProvider
            clientId={"1057854466520-poqu2mlfoi018fmo1p3c1c8hgjim0le9.apps.googleusercontent.com"}
        // clientId={"1057854466520-poqu2mlfoi018fmo1p3c1c8hgjim0le9.apps.googleusercontent.com"}
        >
            {children}
        </GoogleOAuthProvider>
    )
}

export default GoogleProvider