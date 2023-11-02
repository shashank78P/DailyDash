import CopyIco from '@/components/assets/CopyIco'
import DeleteIco from '@/components/assets/DeleteIco'
import DownloadIco from '@/components/assets/DownloadIco'
import HorizontalThrreDot from '@/components/assets/HorizontalThrreDot'
import OpenIco from '@/components/assets/OpenIco'
import PencileIco from '@/components/assets/PencileIco'
import ShareIco from '@/components/assets/ShareIco'
import { Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useCopyToClipboard from "@/components/GlobalComponents/useCopyToClipboard"
import React, { useContext } from 'react'
import BookMarkContext from '../state/BookMarkContext'
import { BookMarkContextDto } from '../types'

const Card = () => {
    const [copyTextToClipboard] = useCopyToClipboard()
    const { handelSelectAndEdit , setSelectedId , setIsEdit} = useContext<BookMarkContextDto>(BookMarkContext)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        // setIsOpen(false)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div className='min-w-[150px] w-full p-2 rounded-lg shadow-lg border'>
            <ul>
                <li>
                    <div className='flex justify-between items-start'>
                        <img className=' w-[50px] h-[50px] rounded-full overflow-hidden object-fill' src="/images/car4.2.jpg" alt="" />
                        <ul className='flex flex-col flex-1 '>
                            <li className='w-full flex ml-1'>
                                <div className='text-lg font-medium text-purple-700 truncate max-w-[80px]'>Twitter</div>
                                <div className='ml-2 cursor-pointer'
                                    onClick={()=>{
                                        setSelectedId("1")
                                        setIsEdit(true)
                                    }}
                                >
                                    <PencileIco height={20} width={20} />
                                </div>
                                <div className='ml-2 cursor-pointer'
                                    onClick={()=>{
                                        copyTextToClipboard("123")
                                    }}
                                >
                                    <CopyIco height={18} width={20} />
                                </div>
                            </li>
                            <li className='ml-1'>
                                <span className='text-sm'>sddsu</span>
                            </li>
                        </ul>
                        <div className='cursor-pointer'>
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
                                <MenuItem key={"share"} onClick={handleClose}>
                                    <div className='m-2 flex justify-evenly'>
                                        <span className='mr-2'>
                                            <ShareIco width={20} height={20} />
                                        </span>
                                        Share
                                    </div>
                                </MenuItem>
                                <MenuItem key={"delete"} onClick={handleClose}>
                                    <div className='m-2 flex justify-evenly'>
                                        <span className='mr-2'>
                                            <DeleteIco width={20} height={20} />
                                        </span>
                                        Delete
                                    </div>
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                </li>
                <li className='flex'>
                    <span className='m-1 text-purple-700 cursor-pointer text-sm'>#first</span>
                    <span className='m-1 text-purple-700 cursor-pointer text-sm'>#second</span>
                    <span className='m-1 text-purple-700 cursor-pointer text-sm'>#third</span>
                </li>
                <li className='text-sm my-1 text-slate-500'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </li>
                <li className='flex justify-between items-center'>
                    <span className='text-sm text-slate-500 font-light'>04 Dec 2022</span>
                    <span className='cursor-pointer'>
                        <OpenIco height={20} width={20} />
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Card
