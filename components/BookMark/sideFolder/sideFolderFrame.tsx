"use client"
import { useState } from 'react'
import BookMark from '../../assets/BookMark'
import SideBarFilter from './SideBarFilter'

const SideFolderFrame = () => {
    const [showFilters, setShowFilters] = useState(false)
    const [showBookMark, setShowBookMark] = useState(false)
    return (
        <div className='border border-black w-[200px] h-[100%] overflow-scroll'>
            <div className='mb-2'>
                <div className=' text-slate-700 flex items-center justify-between px-1 border'>
                    <span className='flex items-center'>
                        <BookMark width={16} height={16} color={''} />
                        <span className='ml-1'>All Bookmarks</span>
                    </span>
                    {/* <div className='w-[20px] h-[20px] grid place-items-center text-sm bg-purple-700 text-white rounded-full'>2</div> */}
                </div>
                <ul className='pl-2'>
                    <li className='border py-1 flex'>
                        <div className='flex'>
                            <span className='mr-1'>[]</span>
                            <span>BookMark1</span>
                        </div>
                        <div></div>
                    </li>
                    <li className='border py-1 flex'>
                        <div className='flex'>
                            <span className='mr-1'>[]</span>
                            <span>BookMark2</span>
                        </div>
                        <ul>
                            <li>
                                <span className='mr-1'>^</span>
                                <span>File1</span>
                            </li>
                            <li>
                                <span className='mr-1'>^</span>
                                <span>File1</span>
                            </li>
                        </ul>
                    </li>
                    <li className='border py-1 flex'>
                        <div className='flex'>
                            <span className='mr-1'>[]</span>
                            <span>BookMark3</span>
                        </div>
                        <div></div>
                    </li>
                    <li className='border py-1 flex'>
                        <div className='flex'>
                            <span className='mr-1'>[]</span>
                            <span>BookMark4</span>
                        </div>
                        <div></div>
                    </li>
                    <li className='border py-1 flex'>
                        <div className='flex'>
                            <span className='mr-1'>[]</span>
                            <span>BookMark5</span>
                        </div>
                        <div></div>
                    </li>
                </ul>
            </div>
            <h3
                onClick={() => {
                    setShowFilters(!showFilters)
                }}
                className={`mb-2 pl-2 ${showFilters ? ' text-slate-400' : 'text-slate-700'}`}
            >Filters</h3>
            {showFilters && <SideBarFilter
                setShowFilters={setShowFilters}
                showFilters={showFilters}
            />}
        </div>
    )
}

export default SideFolderFrame