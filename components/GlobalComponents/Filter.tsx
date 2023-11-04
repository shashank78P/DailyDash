import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import CrossIco from '../assets/CrossIco'

interface FilterDto {
    open: boolean,
    setOpenFilter: Function,
    setSortBy: Function,
    setSortOrder: Function,
    setFromDate: Function,
    setToDate: Function,
    sortBy: string,
    sortOrder: number,
    fromDate: Date | null,
    toDate: Date | null,
    sortByList: string[]
}

const Filter = ({ open, setOpenFilter, fromDate, setFromDate, setSortBy, setSortOrder, setToDate, sortBy, sortByList, sortOrder, toDate }: FilterDto) => {
    return (
        <Dialog open={true}>
            <DialogTitle>
                <ul className='w-full flex justify-between items-center'>
                    <li className='text-lg font-medium'>Filter</li>
                    <li
                        onClick={() => {
                            setOpenFilter(false)
                        }}
                    >
                        <CrossIco height={35} width={35} color='red' />
                    </li>
                </ul>
            </DialogTitle>
            <DialogContent>
                <div className='w-full '>
                    <div className='grid grid-cols-2 gap-4'>
                        <ul className=''>
                            <li className='font-medium text-sm'>Sort By</li>
                            <li className='w-full py-2'>
                                <select className='w-full border p-2 rounded-lg capitalize'
                                    onChange={(e) => {
                                        setSortBy(e?.target?.value)
                                    }}
                                >
                                    {
                                        sortByList?.map((ele, i) => {
                                            return (
                                                <option selected={ele === sortBy} className='capitalize' value={ele} key={ele}>{ele}</option>
                                            )
                                        })
                                    }
                                </select>
                            </li>
                        </ul>
                        <ul className=''>
                            <li className='font-medium text-sm'>Sort Order</li>
                            <li className='w-full py-2'>
                                <select className='w-full border p-2 rounded-lg'
                                    onChange={(e) => {
                                        setSortOrder(Number(e?.target?.value))
                                    }}
                                >
                                    <option selected={sortOrder === -1} value={-1}>Decreasing Order</option>
                                    <option selected={sortOrder === 1} value={1}>Increasing Order</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h1 className='mt-4 mb-2 text-base font-medium'>Created At</h1>
                        <div className='grid grid-cols-2 gap-4'>
                            <ul className=''>
                                <li className='font-medium text-sm'>From</li>
                                <li className='w-full py-2'>
                                    <input type="date" name="" id="" value={fromDate?.toString()} className='w-full border p-2 rounded-lg'
                                        onChange={(e) => {
                                            setFromDate(e?.target?.value)
                                        }}
                                    />
                                </li>
                            </ul>
                            <ul className=''>
                                <li className='font-medium text-sm'>To</li>
                                <li className='w-full py-2'>
                                    <input type="date" name="" id="" value={toDate?.toString()} className='w-full border p-2 rounded-lg'
                                        onChange={(e) => {
                                            setToDate(e?.target?.value)
                                        }}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <div>
                    <button className='text-red-500 mr-2'
                        onClick={() => {
                            setSortBy("createdAt")
                            setSortOrder(-1)
                            setFromDate("")
                            setToDate("")
                        }}
                    >Reset</button>
                    <button className='bg-gradient-to-r from-purple-400 from-10% via-purple-700 via-80% to-purple-900 p-2 rounded-lg text-whi ml-2 text-white'
                        onClick={()=>{
                            setOpenFilter(false)
                        }}
                    >Apply</button>
                </div>
            </DialogActions>
        </Dialog>
    )
}

export default Filter
