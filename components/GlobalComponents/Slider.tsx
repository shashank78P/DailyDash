import React, { useState } from 'react'
import LeftAngularArrow from '../assets/LeftAngularArrow'
import CrossIco from '../assets/CrossIco'
import PencileIco from '../assets/PencileIco'

const Slider = ({ children, setShow, show, setIsEdit, title }: { children: any, show: boolean, setShow: Function, title: string, setIsEdit: Function }) => {
    return (
        <div className='w-full h-screen bg-transparent backdrop-brightness-50 fixed top-0 right-0 z-50 '>
            <div className={`w-1/2 h-full bg-white ml-auto translate-x-full ${show && "translate-x-0"} ease-in-out delay-100 transition-all`}>
                <ul className=''>
                    <li>
                        <ul className='flex justify-between items-center w-full bg-purple-50 py-2'>
                            <li className='cursor-pointer flex justify-center items-center'
                                onClick={() => {
                                    setShow(false)
                                }}
                            >
                                <LeftAngularArrow height={30} width={30} />
                                <span className='text-lg font-medium'>
                                    {title}
                                </span>
                            </li>
                            <li className='cursor-pointer mr-2'
                                onClick={() => {
                                    setIsEdit(true)
                                }}
                            >
                                <PencileIco height={23} width={23} />
                            </li>
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
