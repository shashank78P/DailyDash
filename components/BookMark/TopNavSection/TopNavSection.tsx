import PaginationTopSection from '@/components/GlobalComponents/PaginationTopSection'
import CardViewIco from '@/components/assets/CardViewIco'
import LeftAngularArrow from '@/components/assets/LeftAngularArrow'
import ListViewIco from '@/components/assets/ListViewIco'
import PlusIco from '@/components/assets/PlusIco'
import React, { useContext } from 'react'
import { BookMarkContextDto } from '../types'
import BookMarkContext from '../state/BookMarkContext'
import Filter from '@/components/GlobalComponents/Filter'

const TopNavSection = () => {
    const { openFilter, setOpenFilter, isCardView, setIsCardView, setRows, rows, search, setSearch, selectedTab, setSelectedTab, setCreateBookMark, setStatus, status, sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        fromDate,
        setFromDate,
        toDate,
        setToDate } = useContext<BookMarkContextDto>(BookMarkContext)
    return (
        <>
            {openFilter && <Filter
                open={openFilter}
                setOpenFilter={setOpenFilter}
                setSortBy={setSortBy}
                setSortOrder={setSortOrder}
                setFromDate={setFromDate}
                setToDate={setToDate}
                sortBy={sortBy}
                sortOrder={sortOrder}
                fromDate={fromDate}
                toDate={toDate}
                sortByList={["title", "hashTags", "link", "priority", "createdAt", "description"]}
            />}
            <div className='w-full pt-2'>
                <ul className='flex justify-between items-center'>
                    <li>
                        <span className=' mr-2 text-lg'>BookMarks</span>
                        {/* <select className='text-lg bg-transparent'
                            onClick={(e: any) => {
                                setSelectedTab(e?.target?.value)
                            }}
                        >
                            <option selected={selectedTab === "Quick Access"} value={"Quick Access"} >Quick Access</option>
                            <option selected={selectedTab === "All"} value={"All"} >All</option>
                            <option selected={selectedTab === "Category"} value={"Category"} >Category</option>
                        </select> */}
                    </li>
                    <li className='cursor-pointer p-2 flex items-center justify-center bg-gradient-to-r from-purple-400 from-10% via-purple-700 via-80% to-purple-900 rounded-md select-none mr-2 '>
                        <span className='text-base font-medium text-white'
                            onClick={() => {
                                setCreateBookMark(true)
                            }}
                        >Add BookMark</span>
                        <span className=' ml-2'>
                            <PlusIco height={13} width={13} color='white' />
                        </span>
                    </li>
                </ul>
                <PaginationTopSection setRows={setRows} setSearch={setSearch} search={search} rows={rows} isStatus={true} statusList={["All", "HIGH", "MEDIUM", "LOW"]} statuslabel='Priority' setStatus={setStatus} status={status} />
                <ul className='flex justify-between items-center p-2'>
                    <li className='flex justify-between items-center'>
                        <div className={`${!isCardView ? " bg-purple-700 " : ""}  p-2 rounded-lg ml-2 cursor-pointer transition-all ease-in-out`}
                            onClick={() => {
                                setIsCardView(false)
                            }}
                        >
                            <ListViewIco height={18} width={20} color={isCardView ? "" : "white"} />
                        </div>
                        <div className={`${isCardView ? " bg-purple-700 " : ""}  rounded-lg p-2  cursor-pointer transition-all ease-in-out`}
                            onClick={() => {
                                setIsCardView(true)
                            }}
                        >
                            <CardViewIco height={20} width={20} color={isCardView ? "white" : ""} />
                        </div>
                    </li>
                    <li className='flex justify-center items-center cursor-pointer'
                        onClick={() => {
                            setOpenFilter((prev: boolean) => !prev)
                        }}
                    >
                        <div>Filter</div>
                        <div className={` ${openFilter ? "rotate-90" : "-rotate-90"} `}>
                            <LeftAngularArrow height={20} width={20} />
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default TopNavSection
