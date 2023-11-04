import PaginationBottonSection from '@/components/GlobalComponents/PaginationBottonSection'
import OpenIco from '@/components/assets/OpenIco'
import React, { useContext } from 'react'
import BookMarkContext from '../state/BookMarkContext'
import { BookMarkContextDto, bookMarkPrioirityStyle } from '../types'
import { getTimeWithAMorPM } from '@/components/GlobalComponents/FormateDate1'
import DeleteIco from '@/components/assets/DeleteIco'
import HorizontalThrreDot from '@/components/assets/HorizontalThrreDot'
import { IconButton, Menu, MenuItem } from '@mui/material'

const ListView = ({ refetch, data , deleteFile }: { refetch: Function, data: any ,deleteFile : Function }) => {
    const { setPage, isCardView, setSelectedId, rows, page, setShowInnerPage } = useContext<BookMarkContextDto>(BookMarkContext)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        // setIsOpen(false)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (Array.isArray(data?.data?.data) && data?.data?.data?.length > 0) {
        return (
            <div>
                <div className='w-[100% - 70px] overflow-x-scroll '>
                    <table className='w-full overflow-x-scroll my-2'>
                        <thead className='border border-transparent border-b-slate-50 border-b-1 mb-2'>
                            <tr className='bg-slate-50'>
                                <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>SI No.</th>
                                <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Title</th>
                                <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Hash tags</th>
                                <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>link</th>
                                <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Priority</th>
                                <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Created At</th>
                                <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Description</th>
                                <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Open</th>
                                <th className='p-2 w-auto min-w-min max-w-[100px] font-medium text-slate-700 text-center border border-x-0 border-t-0 border-b-1 truncate'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.data?.data?.map((bookMarkData: any, i: number) => {
                                    return (
                                        <>
                                            <tr className=''>
                                                <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500'>{i + 1}</td>
                                                <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500'>{bookMarkData?.title}</td>
                                                <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500'>
                                                    <span className='flex justify-center items-center flex-col'>
                                                        {
                                                            Array?.isArray(bookMarkData?.hashTags) && bookMarkData?.hashTags?.map((pri: any, i: number) => {
                                                                return (
                                                                    <span key={i} className='my-1 truncate text-blue-500 '>{pri}</span>
                                                                );
                                                            })
                                                        }
                                                    </span>
                                                </td>
                                                <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500'>
                                                    <span className='flex justify-start items-center'>
                                                        <img src={bookMarkData?.bookMarkImageLink} className='w-[30px] h-[30px] rounded-full' />
                                                        <span className=' ml-1 truncate text-slate-500'>{bookMarkData?.link}</span>
                                                    </span>
                                                </td>
                                                <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500'>
                                                    <span className={` ${bookMarkPrioirityStyle[bookMarkData?.priority]} `} >{bookMarkData?.priority}</span>
                                                </td>
                                                <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500'>{bookMarkData?.createdAt?.slice(0, 10)} {getTimeWithAMorPM(bookMarkData?.createdAt)}</td>
                                                <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500'>{bookMarkData?.description}</td>
                                                <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500 cursor-pointer'>
                                                    <span className='flex justify-center items-center'
                                                        onClick={() => {
                                                            setShowInnerPage(true)
                                                            setSelectedId(bookMarkData?._id)
                                                        }}
                                                    >
                                                        <OpenIco height={20} width={20} />
                                                    </span>
                                                </td>
                                                <td className='text-sm text-center truncate p-2 w-auto min-w-min max-w-[100px] border border-x-0 border-t-0 border-b-1 text-slate-500 cursor-pointer'>
                                                    <span className='flex justify-center items-center'>
                                                        <IconButton
                                                            aria-label="more"
                                                            id="long-button"
                                                            aria-controls={open ? 'long-menu' : undefined}
                                                            aria-expanded={open ? 'true' : undefined}
                                                            aria-haspopup="true"
                                                            onClick={handleClick}
                                                        >
                                                            <HorizontalThrreDot height={20} width={20} />
                                                        </IconButton>
                                                        <Menu
                                                            id="long-menu"
                                                            MenuListProps={{
                                                                'aria-labelledby': 'long-button',
                                                            }}
                                                            anchorEl={anchorEl}
                                                            open={open}
                                                            onClose={handleClose}
                                                            PaperProps={{
                                                                style: {
                                                                    // maxHeight: "100px",
                                                                    // width: '100px',
                                                                },
                                                            }}
                                                        >
                                                            <MenuItem key={"delete"} onClick={handleClose}>
                                                                <div className='m-2 flex justify-evenly'
                                                                 onClick={()=>{
                                                                    deleteFile({fileId : bookMarkData?.fileId, _id : bookMarkData?._id})
                                                                }}
                                                                >
                                                                    <span className='mr-2'>
                                                                        <DeleteIco width={20} height={20} />
                                                                    </span>
                                                                    Delete
                                                                </div>
                                                            </MenuItem>
                                                        </Menu>
                                                    </span>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <PaginationBottonSection setPage={setPage} totalCount={Math.ceil(data?.data?.total / Number(rows))} defaultPage={Number(page) + 1} />
            </div>
        )
    }
    else {
        return (
            <>
                <h1 className='w-full font-medium text-lg text-slate-500 text-center'>No Record Found</h1>
            </>
        )
    }
}


export default ListView
