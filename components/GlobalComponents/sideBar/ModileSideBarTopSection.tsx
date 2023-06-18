import React from 'react'
import BellIco from '../../assets/BellIco'
import DafaultUser from "/../../../public/DefaultUser.png"
import Image from 'next/image'

const ModileSideBarTopSection = () => {
    return (
        <ul className='w-full sm:hidden bg-white flex p-2 pr-4 justify-between items-center'>
            <li className='flex max-[300px]:block'>
                {/* image */}
                <img
                    src={"images/DefaultUser.png"}
                    alt="Detault user Pic"
                    width={50}
                    height={50}
                />
                <div className='max-[300px]:p-0 pl-2 mt-1'>
                    <h1 className=' text-xl truncate'>Michal </h1>
                    <p className='text-slate-500 text-sm mt-1'>Michal@gmail.com</p>
                </div>
            </li>
            <li>
                <BellIco width={25} height={30} color={"#202124"} />
            </li>
        </ul>
    )
}

export default ModileSideBarTopSection