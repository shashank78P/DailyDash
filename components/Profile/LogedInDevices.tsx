"use client"
import React from 'react'
import MobileChromeIco from '../assets/MobileChromeIco'
import MobileOperaIco from '../assets/MobileOperaIco'
import MobileFireFoxIco from '../assets/MobileFireFoxIco'
import ComputerOperaIco from '../assets/ComputerOperaIco'
import ComputerFireFoxIco from '../assets/ComputerFireFoxIco'
import ComputerChromeIco from '../assets/ComputerChromeIco'
import ComputerEdgeIco from '../assets/ComputerEdgeIco'
import ComputerSafariIco from '../assets/ComputerSafariIco'
import MobileEdgeIco from '../assets/MobileEdgeIco'
import MobileSafariIco from '../assets/MobileSafariIco'
import { useQuery } from 'react-query'
import api from '../lib/api'
import CrossIco from '../assets/CrossIco'
import { timeDiffWithCurrentDate } from '../GlobalComponents/FormateDate1'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import ComputerIco from '../assets/ComputerIco'
import MobileIco from '../assets/MobileIco'
import { philosopher } from '@/app/philosopher'

export function returnIco(os: string, browser: string) {
  os = os?.toUpperCase()
  browser = browser?.toUpperCase()

  if (os == "WINDOWS" || os == "LINUX" || os == "MACOS") {
    if (browser == "CHROME") {
      return <ComputerChromeIco height={50} width={50} color='' />
    }
    if (browser == "EDGE") {
      return <ComputerEdgeIco height={50} width={50} color='' />
    }
    if (browser == "FIREFOX") {
      return <ComputerFireFoxIco height={50} width={50} color='' />
    }
    if (browser == "OPERA") {
      return <ComputerOperaIco height={50} width={50} color='' />
    }
    if (browser == "SAFARI") {
      return <ComputerSafariIco height={50} width={50} color='' />
    }
    return <ComputerIco width={50} height={50} />
  }
  if (os == "ANDROID" || os == "IOS") {
    if (browser == "CHROME" || browser == "CHROME MOBILE") {
      return <MobileChromeIco height={50} width={50} color='' />
    }
    if (browser == "EDGE") {
      return <MobileEdgeIco height={50} width={50} color='' />
    }
    if (browser == "FIREFOX") {
      return <MobileFireFoxIco height={50} width={50} color='' />
    }
    if (browser == "OPERA") {
      return <MobileOperaIco height={50} width={50} color='' />
    }
    if (browser == "SAFARI") {
      return <MobileSafariIco height={50} width={50} color='' />
    }
    return <MobileIco width={50} height={50} />
  }
}

const LogedInDevices = () => {
  const userSelector = useSelector((state: any) => state?.userSliceReducer);

  const { data, isLoading } = useQuery(["loggedInActiveDevice"], () => {
    return api.get("log-in-details/get-all-active-logged-in-devices")
  },
    {
      keepPreviousData: true
    }
  )

  return (
    <>
      <div className='border-2 border-slate-400 border-dashed  rounded-xl m-2 p-2 sm:m-4 sm:p-4'>
        <section className='flex justify-start flex-col items-start mb-2'>
          <h1 className={`font-bold text-xl text-purple-700 ${philosopher?.className}`}>Logged in devices Info</h1>
          <ul className='w-full'>
            {
              data?.data?.map((ele: any, i: number) => {
                return (
                  <li key={i} className='border w-full my-4 p-3 rounded-lg shadow-lg'>
                    <ul className='w-full p-2 flex items-center justify-between  rounded-lg'>
                      <li className='flex flex-col sm:flex-row justify-start sm:items-center'>
                        <div className='sm:mr-2 mb-2'>
                          {returnIco(ele?.os, ele?.browser)}
                        </div>
                        <div className='flex flex-col items-start justify-center'>
                          <div className='text-xs text-slate-500 mb-2'>
                            {timeDiffWithCurrentDate(ele?.createdAt)}
                          </div>
                          <div>
                            {
                              `${ele?.os}  ${ele?.browser}`
                            }
                          </div>
                        </div>
                      </li>
                      <li>
                        <Link href={`${process.env.NEXT_PUBLIC_FRONT_END_URL}/block?email=${userSelector.email}&logInId=${ele?.logInId}`}>
                          <CrossIco height={30} width={30} color='red' />
                        </Link>
                      </li>
                    </ul>
                  </li>
                )
              })
            }
          </ul>

        </section>
      </div>
    </>
  )
}

export default LogedInDevices
