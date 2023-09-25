"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import ReduxProvider from './reduxProvider'
import SideBar from '../components/GlobalComponents/sideBar/SideBar'
import TabSection from '@/components/GlobalComponents/bottomTab/TabSection'
import ReactQueryProvider from './reactQueryProvider'
import { usePathname } from 'next/navigation';
import GoogleProvider from './GoogleProvider';

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
  const restriction_SideBar__Tab = ["/login"];
  console.log(pathname);
  return (
    <html lang="en">
      <GoogleProvider>
        <ReduxProvider>
          <ReactQueryProvider>
            <body className={inter.className}>
              <div className='flex w-full'>
                {!restriction_SideBar__Tab.includes(pathname) && <SideBar />}
                {/* <div className='flex w-full flex-col'> */}
                <div className='w-full  h-screen flex flex-col justify-between '>
                  {children}
                  {!restriction_SideBar__Tab.includes(pathname) && <TabSection />}
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
