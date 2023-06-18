'use client';
import React, { useState } from 'react'
import MobileSideBar from '../MobileSideBar'
import BurgerMenu from '../../assets/BurgerMenu'

const SideBar = () => {
    const [openNav, setOpenNav] = useState(false);
    return (
        <>
            <div className='sm:hidden p-2 cursor-pointer'>
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