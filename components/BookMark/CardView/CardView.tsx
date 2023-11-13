import React, { useContext } from 'react'
import Card from './Card'
import { BookMarkContextDto } from '../types'
import BookMarkContext from '../state/BookMarkContext'
import PaginationBottonSection from '@/components/GlobalComponents/PaginationBottonSection'

const CardView = ({ refetch, data, deleteFile , togglePinBookmark }: { refetch: Function, data: any, deleteFile: Function , togglePinBookmark:Function }) => {
  const { isCardView, setPage, rows, page } = useContext<BookMarkContextDto>(BookMarkContext)

  if (Array.isArray(data?.data?.data) && data?.data?.data?.length > 0) {
    return (
      <>
        <>
          <div className=" grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 m-2">
            {
              // data?.data?.result?.map((bookMarkData: any, i: number) => {
              data?.data?.data?.map((bookMarkData: any, i: number) => {
                return (
                  <>
                    <Card bookMarkData={bookMarkData} i={i} deleteFile={deleteFile} togglePinBookmark={togglePinBookmark}/>
                  </>
                )
              })
            }
          </div>
          <PaginationBottonSection setPage={setPage} totalCount={Math.ceil(data?.data?.total / Number(rows)) ?? 1} defaultPage={Number(page) + 1} />
        </>
      </>
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

export default CardView
