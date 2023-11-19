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

const LogedInDevices = () => {
  const userSelector = useSelector((state: any) => state?.userSliceReducer);

  const { data, isLoading } = useQuery(["loggedInActiveDevice"], () => {
    return api.get("log-in-details/get-all-active-logged-in-devices")
  },
    {
      keepPreviousData: true
    }
  )

  function returnIco(os: string, browser: string) {
    os = os?.toUpperCase()
    browser = browser?.toUpperCase()
    console.log({os})

    if (os == "WINDOWS") {
      if (browser == "CHROME") {
        return <ComputerChromeIco height={30} width={30} color='' />
      }
      if (browser == "EDGE") {
        return <ComputerEdgeIco height={30} width={30} color='' />
      }
      if (browser == "FIREFOX") {
        return <ComputerFireFoxIco height={30} width={30} color='' />
      }
      if (browser == "OPERA") {
        return <ComputerOperaIco height={30} width={30} color='' />
      }
      if (browser == "SAFARI") {
        return <ComputerSafariIco height={30} width={30} color='' />
      }
    }
    if (os == "ANDROID") {
      if (browser == "CHROME") {
        return <MobileChromeIco height={30} width={30} color='' />
      }
      if (browser == "EDGE") {
        return <MobileEdgeIco height={30} width={30} color='' />
      }
      if (browser == "FIREFOX") {
        return <MobileFireFoxIco height={30} width={30} color='' />
      }
      if (browser == "OPERA") {
        return <MobileOperaIco height={30} width={30} color='' />
      }
      if (browser == "SAFARI") {
        return <MobileSafariIco height={30} width={30} color='' />
      }
    }
  }

  return (
    <>
      <div className='border-2 border-slate-400 border-dashed  rounded-xl m-4 p-4'>
        <section className='flex justify-start flex-col items-start mb-2'>
          <h1 className='font-bold text-xl text-purple-700'>Logged in devices Info</h1>


          <ul className='w-full'>
            {
              data?.data?.map((ele: any, i: number) => {
                console.log(ele?.os, ele?.browser)
                return (
                  <li key={i} className='w-full my-2 rounded-lg'>
                    <ul className='w-full border p-2 flex items-center justify-between  rounded-lg'>
                      <li className='flex'>
                        <div className='mr-2'>
                          {returnIco(ele?.os, ele?.browser)}
                        </div>
                        <div>
                          {timeDiffWithCurrentDate(ele?.createdAt)}
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
