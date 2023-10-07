'use client';
import React, { useState } from 'react'
import BurgerMenu from '../../assets/BurgerMenu'
import SideBarList from './SideBarList';

const SideBar = () => {
    const [openNav, setOpenNav] = useState(true);
    return (
        <>
            <SideBarList />
        </>
    )
}

export default SideBar