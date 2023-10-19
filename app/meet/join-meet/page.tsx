import VideoICameraIco from '@/components/assets/VideoICameraIco'
import VoiceMikeIco from '@/components/assets/VoiceMikeIco'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className='flex justify-center items-center'>
        <ul className='w-1/2 h-screen  flex items-center justify-center flex-col'>
          <li>
            <video src='' className='min-w-[200px] min-h-[250px] bg-slate-400' />
          </li>
          <li className='flex justify-center items-center'>
            <div className='m-2 border border-slate-500 cursor-pointer rounded-full p-2'>
              <VideoICameraIco height={25} width={25} />
            </div>
            <div className='m-2 border border-slate-500 cursor-pointer rounded-full p-2'>
              <VoiceMikeIco height={25} width={25} />
            </div>
          </li>
        </ul>
        <ul className='w-1/2 h-screen flex items-start justify-center flex-col'>
          <ul className=''>
            <li >
              <h1 className='my-2 font-bold text-2xl'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h1>
            </li>
            <li className=''>
              <p className='text-gray-500 my-2 text-base'>Meeting started at : 9 : 00 AM by Shashank P</p>
              <p className='text-gray-500 my-2 text-base'>Total participants : 2</p>
            </li>
            <li className='my-2'>
              <button className='p-2 px-4 border bg-purple-700 text-white rounded-lg font-bold text-base'>Join Now</button>
            </li>
          </ul>
        </ul>
      </div>

    </div>
  )
}

export default page
