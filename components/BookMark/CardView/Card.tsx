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
import { timeDiffWithCurrentDate } from '@/components/GlobalComponents/FormateDate1'

const Card = ({ bookMarkData, i ,deleteFile}: { bookMarkData: any, i: number , deleteFile : Function}) => {
    const [copyTextToClipboard] = useCopyToClipboard()
    const {  handelSelectAndEdit, setSelected , setSelectedId, setIsEdit, setShowInnerPage } = useContext<BookMarkContextDto>(BookMarkContext)
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
        <div className='min-w-[150px] w-full p-2 rounded-lg shadow-lg border' key={i}>
            <ul>
                <li>
                    <div className='flex justify-between items-start'>
                        <img className=' w-[50px] h-[50px] rounded-full overflow-hidden object-fill' src={bookMarkData?.bookMarkImageLink} alt="" />
                        <ul className='flex flex-col flex-1 '>
                            <li className='w-full flex ml-1'>
                                <div className='text-lg font-medium text-purple-700 truncate max-w-[100px] capitalize'>{bookMarkData?.title}</div>
                                <div className='ml-2 cursor-pointer'
                                    onClick={() => {
                                        setSelectedId("1")
                                        setIsEdit(true)
                                        setSelected(bookMarkData)
                                    }}
                                >
                                    <PencileIco height={20} width={20} />
                                </div>
                                <div className='ml-2 cursor-pointer'
                                    onClick={() => {
                                        copyTextToClipboard(bookMarkData?.link)
                                    }}
                                >
                                    <CopyIco height={18} width={20} />
                                </div>
                            </li>
                            <li className='ml-1'>
                                <span className='text-sm'>{bookMarkData?.priority}</span>
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
                                {/* <MenuItem key={"share"} onClick={handleClose}>
                                    <div className='m-2 flex justify-evenly'>
                                        <span className='mr-2'>
                                            <ShareIco width={20} height={20} />
                                        </span>
                                        Share
                                    </div>
                                </MenuItem> */}
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
                        </div>
                    </div>
                </li>
                <li className='flex'>
                    {
                        bookMarkData?.hashTags?.map((hashTag: string, i: number) => {
                            return (
                                <>
                                    <span className='m-1 text-purple-700 cursor-pointer text-sm' key={i}>{hashTag}</span>
                                </>
                            )
                        })
                    }
                </li>
                <li className='text-sm my-1 text-slate-500'>
                    {bookMarkData?.description}
                </li>
                <li className='flex justify-between items-center'>
                    <span className='text-sm text-slate-500 font-light'>{timeDiffWithCurrentDate(bookMarkData?.createdAt)}</span>
                    <span className='cursor-pointer'
                        onClick={() => {
                            setShowInnerPage(true)
                            setSelectedId(bookMarkData?._id)
                        }
                        }
                    >
                        <OpenIco height={20} width={20} />
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Card
