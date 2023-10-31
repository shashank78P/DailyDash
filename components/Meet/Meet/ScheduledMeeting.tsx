import React from 'react'

const ScheduledMeeting = () => {
    return (
        <div className='w-full overflow-x-scroll'>
            <table className='w-full overflow-x-scroll my-2'>
                <thead className='border border-transparent border-b-gray-200 border-b-1 mb-2'>
                    <tr>
                        <th className='p-2 w-auto min-w-min max-w-[100px] text-gray-700 text-center border border-transparent border-b-gray-200 border-b-1 truncate'>SI No.</th>
                        <th className='p-2 w-auto min-w-min max-w-[100px] text-gray-700 text-center border border-transparent border-b-gray-200 border-b-1 truncate'>Title</th>
                        <th className='p-2 w-auto min-w-min max-w-[100px] text-gray-700 text-center border border-transparent border-b-gray-200 border-b-1 truncate'>Meeting Date</th>
                        <th className='p-2 w-auto min-w-min max-w-[100px] text-gray-700 text-center border border-transparent border-b-gray-200 border-b-1 truncate'>Meeting Time</th>
                        <th className='p-2 w-auto min-w-min max-w-[100px] text-gray-700 text-center border border-transparent border-b-gray-200 border-b-1 truncate'>Meeting length</th>
                        <th className='p-2 w-auto min-w-min max-w-[100px] text-gray-700 text-center border border-transparent border-b-gray-200 border-b-1 truncate'>Meeting Created By</th>
                        <th className='p-2 w-auto min-w-min max-w-[100px] text-gray-700 text-center border border-transparent border-b-gray-200 border-b-1 truncate'>Description</th>
                        <th className='p-2 w-auto min-w-min max-w-[100px] text-gray-700 text-center border border-transparent border-b-gray-200 border-b-1 truncate'></th>
                    </tr>
                </thead>
                <tbody>
                    <tr className=''>
                        <td className='text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-transparent border-b-gray-200 border-b-1 text-gray-600'>1</td>
                        <td className='text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-transparent border-b-gray-200 border-b-1 text-gray-600'>Leadership</td>
                        <td className='text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-transparent border-b-gray-200 border-b-1 text-gray-600'>20/02/2023</td>
                        <td className='text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-transparent border-b-gray-200 border-b-1 text-gray-600'>7:30 AM</td>
                        <td className='text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-transparent border-b-gray-200 border-b-1 text-gray-600'>45 min</td>
                        <td className='text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-transparent border-b-gray-200 border-b-1 text-gray-600'>Shashank P</td>
                        <td className='text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-transparent border-b-gray-200 border-b-1 text-gray-600'>This meeting on leadership</td>
                        <td className='text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-transparent border-b-gray-200 border-b-1 text-gray-600'>open</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ScheduledMeeting
