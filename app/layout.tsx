"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import ReduxProvider from './reduxProvider'
import SideBar from '../components/GlobalComponents/sideBar/SideBar'
import TabSection from '@/components/GlobalComponents/bottomTab/TabSection'
import ReactQueryProvider from './reactQueryProvider'
import { usePathname } from 'next/navigation';
import GoogleProvider from './GoogleProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Daily Dash',
  description: 'next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const router = useRouter();
  const restriction_SideBar__Tab = ["/login","/reset-password","/forget-password","/block","/signup"];
  console.log(pathname);

  useEffect(()=> {
    axios.get("http://localhost:3001/users/authme", { withCredentials: true })
    .then((data)=>{
      console.log(data)
    })
    .catch(err => {
      // router.replace("/login")
    })
  },[])
  return (
    <html lang="en">
      <title>DailyDash</title>
      <GoogleProvider>
        <ReduxProvider>
          <ReactQueryProvider>
            <body className={inter.className}>
              <div className='flex w-full'>
              <ToastContainer />
                {!restriction_SideBar__Tab.includes(pathname) && <SideBar />}
                {/* <div className='flex w-full flex-col'> */}
                <div className='w-full  h-screen flex flex-col justify-between '>
                  {children}
                  {/* {!restriction_SideBar__Tab.includes(pathname) && <TabSection />} */}
                </div>
                {/* </div> */}
              </div>
            </body>
          </ReactQueryProvider>
        </ReduxProvider>
      </GoogleProvider>
    </html>
  )
}
