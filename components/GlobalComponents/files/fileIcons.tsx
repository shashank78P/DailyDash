import CopyIco from '@/components/assets/CopyIco';
import CrossIco from '@/components/assets/CrossIco';
import DeleteIco from '@/components/assets/DeleteIco';
import DownloadIco from '@/components/assets/DownloadIco';
import HorizontalThrreDot from '@/components/assets/HorizontalThrreDot';
import ShareIco from '@/components/assets/ShareIco';
import { Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react'
import { FileIcon, defaultStyles } from 'react-file-icon';

const FileIcons = ({ acceptedFiles, link }: { acceptedFiles: string, link: string }) => {
    // {...defaultStyles[fileType] }
    // const [isOpen, setIsOpen] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        // setIsOpen(false)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const fileType = acceptedFiles?.split("/")?.[1]

    return (
        <>
<<<<<<< HEAD
            {
                acceptedFiles?.map((file, i) => {
                    const fileType = acceptedFiles?.[0]?.["type"].split("/")?.[1]
                    return (
                        <ul key={i} className=' border bg-slate-100 p-2 flex justify-between items-center rounded-lg'>
                            <li className='flex justify-center items-center'>
                                <div className='w-10 h-10 m-2'>
                                    {
                                        // @ts-ignore
                                        <FileIcon extension={fileType} labelColor='red' {...defaultStyles?.[fileType]} labelUppercase={true} radius={5} />
                                    }
=======
            <div className=' rounded-lg mb-2 w-full border bg-slate-100 p-2'>
                <ul className=' flex justify-between items-center'>
                    <li className='w-10 h-10 flex justify-center items-center'>
                        {
                            // @ts-ignore
                            <FileIcon extension={fileType} labelTextColor='white' {...defaultStyles?.[fileType]} labelUppercase={true} radius={5} />
                        }
                    </li>
                    <li>
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
                            <MenuItem key={"download"} onClick={handleClose}>
                                <a href={link} download>
                                    <div className='m-2 flex justify-evenly'>
                                        <span className='mr-2'>
                                            <DownloadIco width={20} height={20} />
                                        </span>
                                        Download
                                    </div>
                                </a>
                            </MenuItem>
                            <MenuItem key={"share"} onClick={handleClose}>
                                <div className='m-2 flex justify-evenly'>
                                    <span className='mr-2'>
                                        <ShareIco width={20} height={20} />
                                    </span>
                                    Share
>>>>>>> ff663f61da62dcfdc0869439d85d36a6bd9d67c8
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
                    </li>
                </ul>
                {/* <div className='mt-2 text-sm text-slate-5 capitalize'>
                    dsjfhsdfjksdf.pdf
                </div> */}
            </div>
        </>
    )
}

export default FileIcons