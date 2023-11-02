import React, { useState } from 'react'
import LeftAngularArrow from '../assets/LeftAngularArrow'
import CrossIco from '../assets/CrossIco'
import PencileIco from '../assets/PencileIco'

const Slider = ({ children, handelEdit, show, handelClose, title, isShowEdit }: { children: any, show: boolean, handelEdit: Function, title: string, handelClose: Function, isShowEdit: boolean }) => {
    console.log({ show })
    return (
        <div className='w-full h-screen bg-transparent backdrop-brightness-50 fixed top-0 right-0 z-50 '>
            <div className={`w-1/2 h-full bg-white ml-auto ${show ? "-translate-x-0" : "translate-x-full"} ease-in-out delay-100 transition-all overflow-y-scroll`}>
                <ul className=''>
                    <li className=' w-full sticky top-0'>
                        <ul className='flex justify-between items-center w-full bg-gradient-to-r from-purple-400 from-10% via-purple-700 via-80% to-purple-900 py-2'>
                            <li className='cursor-pointer flex justify-center items-center'
                                onClick={() => {
                                    handelClose()
                                }}
                            >
                                <LeftAngularArrow height={30} width={30} color='white' />
                                <span className='text-lg font-medium text-white'>
                                    {title}
                                </span>
                            </li>
                            {!isShowEdit && <li className='cursor-pointer mr-2'
                                onClick={() => {
                                    handelEdit(true)
                                }}
                            >
                                <PencileIco height={23} width={23} color='white' />
                            </li>}
                        </ul>
                    </li>
                    <li className='p-2 px-4'>
                        {
                            children
                        }
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Slider
