import React, { useContext } from 'react'
import Slider from '../GlobalComponents/Slider'
import { getTimeWithAMorPM, timeDiffWithCurrentDate } from '../GlobalComponents/FormateDate1'
import UserPic from '../GlobalComponents/UserPic'
import { meetingStatusStyle } from '../Meet/types'
import BookMarkContext from './state/BookMarkContext'
import { BookMarkContextDto, bookMarkPrioirityStyle } from './types'
import { useQuery } from 'react-query'
import api from '../lib/api'
import { Oval } from 'react-loader-spinner'
import CopyIco from '../assets/CopyIco'
import useCopyToClipboard from '../GlobalComponents/useCopyToClipboard'

const InnerPage = () => {
    const [copyTextToClipboard] = useCopyToClipboard()
    const { showInnerPage, setIsEdit, setSelected, setShowInnerPage, selectedId, isEdit } = useContext<BookMarkContextDto>(BookMarkContext)
    const { data, isLoading } = useQuery(["individualBookmark", isEdit], () => {
        return api.get(`book-marks/book-mark-by-id?id=${selectedId}`)
    },
        {
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            enabled: Boolean(selectedId)
        }
    )
    function handelClose() {
        setShowInnerPage(false)
        setSelected(null)
    }

    function handelEdit() {
        setIsEdit(true)
        setSelected(data?.data?.[0])
    }

    return (
        <Slider show={showInnerPage} handelEdit={handelEdit} title={data?.data?.[0]?.title} handelClose={handelClose} isShowEdit={true} isShowPic={true} picUrl={data?.data?.[0]?.bookMarkImageLink}>
            {/* rows */}
            {
                !isLoading && <div className='my-2 items-center'>
                    <div className='flex items-center'>
                        <div className='text-base w-1/3 font-medium mr-2 text-slate-900 '>Title: </div>
                        <div className='text-sm w-full text-slate-700 font-light capitalize'>{data?.data?.[0]?.title}</div>
                    </div>
                    <div className='my-3 justify-start items-center flex'>
                        <div className={`text-base w-1/3 font-medium mr-2 text-slate-900 `}>Status: </div>
                        <div className={`text-sm w-full text-slate-700 font-light`}>{
                            <span className={`${bookMarkPrioirityStyle?.[data?.data?.[0]?.priority]}`}>
                                {data?.data?.[0]?.priority}
                            </span>
                        }</div>
                    </div>
                    <div className='my-2 items-center flex'>
                        <div className='text-base w-1/3 font-medium mr-2 text-slate-900'>Created At: </div>
                        <div className='text-sm w-full text-slate-700 font-light'>{timeDiffWithCurrentDate(data?.data?.[0]?.createdAt)}</div>
                    </div>
                    <div className='my-2 items-center flex'>
                        <div className='text-base w-1/3 font-medium mr-2 text-slate-900'>Link: </div>
                        <div className='text-sm w-full text-slate-700 font-light flex'>
                            <span>{data?.data?.[0]?.link}</span>
                            <span
                                className='ml-2 cursor-pointer'
                                onClick={() => {
                                    copyTextToClipboard(data?.data?.[0]?.link)
                                }}
                            >
                                <CopyIco height={18} width={20} />
                            </span>
                        </div>
                    </div>
                    <div className='my-2 items-center flex'>
                        <div className='text-base w-1/3 font-medium mr-2 text-slate-900'>Description: </div>
                        <div className='text-sm w-full text-slate-700 font-light'>{data?.data?.[0]?.description}</div>
                    </div>
                </div>
            }
            {
                isLoading && <div className='w-full h-max flex justify-center items-center'>
                    <Oval height={50} width={50} color='#7e22ce' secondaryColor='gray' />
                </div>
            }

        </Slider>
    )
}

export default InnerPage
