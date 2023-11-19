"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import ReduxProvider from '../components/Provider/reduxProvider'
import SideBar from '../components/GlobalComponents/sideBar/SideBar'
import TabSection from '@/components/GlobalComponents/bottomTab/TabSection'
import ReactQueryProvider from '../components/Provider/reactQueryProvider'
import { usePathname } from 'next/navigation';
import GoogleProvider from '../components/Provider/GoogleProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import AuthMe from '../components/Provider/AuthMe';
import SocketProvider from '@/components/context/SocketProvider';
import DndProvider from '../components/Provider/DndProvider';
import RouteStateHandler from '@/components/RouteStateHandler/routeStateHandler';

const inter = Inter({ subsets: ['latin'] })
// export const metadata = {
//   title: 'Daily Dash',
//   description: 'next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const router = useRouter();


  console.log(pathname);
  const restriction_SideBar__Tab = ["/login", "/reset-password", "/forget-password", "/block", "/signup", "/chat/joinGroup" , "/meet/room"];
  const restriction__Tab = ["/trial"];
  return (
    <html lang="en">
      <title>DailyDash</title>
      <ReduxProvider>
        <SocketProvider>
          <GoogleProvider>
            <DndProvider>
              <ReactQueryProvider>
                <AuthMe />
                <RouteStateHandler />
                <body className={inter.className}>
                  <div className='flex w-[100vw] h-screen max-h-screen justify-center items-center overflow-hidden'>
                    <ToastContainer />
                    {!restriction_SideBar__Tab.includes(pathname) &&
                      <div className='w-[50px]'>
                        <SideBar />
                      </div>
                    }
                    {/* <div className='flex w-full flex-col'> */}
                    <div className='h-full flex flex-col justify-between' style={{ "width": `${restriction_SideBar__Tab.includes(pathname) ? " 100% " : "calc(100% - 50px)"}` }}>
                      {children}
                      {!restriction_SideBar__Tab.includes(pathname) && !restriction__Tab.includes(pathname) && <TabSection />}
                    </div>
                    {/* </div> */}
                  </div>
                </body>
              </ReactQueryProvider>
            </DndProvider>
          </GoogleProvider>
        </SocketProvider>
      </ReduxProvider>
    </html>
  )
}
