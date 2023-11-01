import React, { useContext } from 'react'
import Card from './Card'
import { BookMarkContextDto } from '../types'
import BookMarkContext from '../state/BookMarkContext'
import PaginationBottonSection from '@/components/GlobalComponents/PaginationBottonSection'

const CardView = () => {
  const { isCardView, setPage } = useContext<BookMarkContextDto>(BookMarkContext)
  return (
    <>
      <>
        <div className=" grid lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-3 xs:grid-cols-2 gap-2 m-2">
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((ele, i) => {
              return (
                <>
                  <Card />
                </>
              )
            })
          }
        </div>
        <PaginationBottonSection setPage={setPage} totalCount={10} defaultPage={1} />
      </>
    </>
  )
}

export default CardView
