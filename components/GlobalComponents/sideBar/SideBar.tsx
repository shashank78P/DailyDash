'use client';
import React, { useState } from 'react'
import MobileSideBar from '../MobileSideBar'
import BurgerMenu from '../../assets/BurgerMenu'

const SideBar = () => {
    const [openNav, setOpenNav] = useState(false);
    return (
        <>
            <div className=' h-[50px] sm:hidden p-2 cursor-pointer absolute left-0 top-0'>
                <BurgerMenu width={30} height={30} actionHandler={() => { setOpenNav(true) }} />
            </div>
            <MobileSideBar
                openNav={openNav}
                setOpenNav={setOpenNav}
            />
        </>
    )
}

export default SideBar