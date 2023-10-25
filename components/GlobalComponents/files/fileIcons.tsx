import CopyIco from '@/components/assets/CopyIco';
import CrossIco from '@/components/assets/CrossIco';
import DeleteIco from '@/components/assets/DeleteIco';
import DownloadIco from '@/components/assets/DownloadIco';
import EyeIco from '@/components/assets/EyeIco';
import ShareIco from '@/components/assets/ShareIco';
import React from 'react'
import { FileIcon, defaultStyles } from 'react-file-icon';

const FileIcons = ({ acceptedFiles }: { acceptedFiles: File[] }) => {
    // {...defaultStyles[fileType] }
    return (
        <>
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
                                </div>
                                <span className='text-xl capitalize'>djkfhskdj.json</span>
                            </li>
                            <li>
                                <ul className='flex justify-start items-center'>
                                    <li className='m-2'>
                                        <DeleteIco width={30} height={30} />
                                    </li>
                                    <li className='m-2'>
                                        <EyeIco width={30} height={30} />
                                    </li>
                                    <li className='m-2'>
                                        <ShareIco width={30} height={30} />
                                    </li>
                                    <li className='m-2'>
                                        <CopyIco width={30} height={30} />
                                    </li>
                                    <li className='m-2'>
                                        <DownloadIco width={30} height={30} />
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    )
                })
            }
        </>
    )
}

export default FileIcons