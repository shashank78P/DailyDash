import PaginationBottonSection from '@/components/GlobalComponents/PaginationBottonSection'
import OpenIco from '@/components/assets/OpenIco'
import React, { useContext } from 'react'
import BookMarkContext from '../state/BookMarkContext'
import { BookMarkContextDto } from '../types'

const ListView = () => {
    const { setPage, isCardView } = useContext<BookMarkContextDto>(BookMarkContext)

    return (
        <div>
            <div className='w-[100% - 70px] overflow-x-scroll '>
                <table className='w-full overflow-x-scroll my-2'>
                    <thead className='border border-transparent border-b-slate-50 border-b-1 mb-2'>
                        <tr className='bg-slate-50'>
                            <th className='p-2 w-auto min-w-min max-w-[100px] text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>SI No.</th>
                            <th className='p-2 w-auto min-w-min max-w-[100px] text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Title</th>
                            <th className='p-2 w-auto min-w-min max-w-[100px] text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Meeting Date</th>
                            <th className='p-2 w-auto min-w-min max-w-[100px] text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Meeting Time</th>
                            <th className='p-2 w-auto min-w-min max-w-[100px] text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Meeting length</th>
                            <th className='p-2 w-auto min-w-min max-w-[100px] text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Meeting Created By</th>
                            <th className='p-2 w-auto min-w-min max-w-[100px] text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Description</th>
                            <th className='p-2 w-auto min-w-min max-w-[100px] text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Open</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className=''>
                            <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-700'>1</td>
                            <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-700'>Leadership</td>
                            <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-700'>20/02/2023</td>
                            <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-700'>7:30 AM</td>
                            <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-700'>45 min</td>
                            <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-700'>Shashank P</td>
                            <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-700'>This meeting on leadership</td>
                            <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-700 cursor-pointer'>
                                <span className='flex justify-center items-center'
                                    onClick={() => {
                                        // setShow(true)
                                        // setSelectedId("1")
                                    }}
                                >
                                    <OpenIco height={20} width={20} />
                                </span>
                            </td>
                        </tr>
                        <tr className='bg-slate-50'>
                            <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-700'>1</td>
                            <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-700'>Leadership</td>
                            <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-700'>20/02/2023</td>
                            <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-700'>7:30 AM</td>
                            <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-700'>45 min</td>
                            <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-700'>Shashank P</td>
                            <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-700'>This meeting on leadership</td>
                            <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-700 cursor-pointer'>
                                <span className='flex justify-center items-center'
                                    onClick={() => {
                                        // setShow(true)
                                        // setSelectedId("2")
                                    }}
                                >
                                    <OpenIco height={20} width={20} />
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <PaginationBottonSection setPage={setPage} totalCount={10} defaultPage={1} />
        </div>
    )
}


export default ListView
