import React from 'react'
import ChatIco from '../../assets/ChatIco'
import BookMark from '../../assets/BookMark'
import ProjectManagement from '../../assets/ProjectManagement'
import CalendarIco from '../../assets/CalendarIco'
import NoteIco from '../../assets/NoteIco'
import DynamicForm from '../../assets/DynamicForm'
import SettingsIco from '../../assets/SettingsIco'
import BellIco from '../../assets/BellIco'
import BurgerMenu from '../../assets/BurgerMenu'

const DesktopSideBar = () => {
    return (
        <ul className='hidden sm:w-[70px] sm:flex flex-col justify-between items-center h-screen border border-red-300 bg-white '>
            <li className='my-2 '>
                <ul className=' flex flex-col justify-around items-center'>
                    <li className='my-3'>
                        <ProjectManagement width={30} height={30} />
                    </li>
                    <li className='my-3'>
                        <ChatIco width={30} height={30} />
                    </li>
                    <li className='my-3'>
                        <BookMark width={30} height={30} />
                    </li>
                    <li className='my-3'>
                        <CalendarIco width={30} height={30} />
                    </li>
                    <li className='my-3'>
                        <NoteIco width={30} height={30} />
                    </li>
                    <li className='my-3'>
                        <DynamicForm width={30} height={30} />
                    </li>
                </ul>
            </li>
            <li className='my-2'>
                <ul className=' flex flex-col justify-around items-center'>
                    <li></li>
                    <li className='my-3'>
                        <BellIco width={30} height={30} />
                    </li>
                    <li className='my-3'>
                        <SettingsIco width={30} height={30} />
                    </li>
                </ul>
            </li>
        </ul>
    )
}

export default DesktopSideBar