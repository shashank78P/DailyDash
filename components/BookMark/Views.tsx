import React, { useContext } from 'react'
import CardView from './CardView/CardView'
import ListView from './ListView/ListView'
import BookMarkContext from './state/BookMarkContext'
import { BookMarkContextDto } from './types'
import BookMarkForm from './Form/BookMarkForm'

const Views = () => {
    const { isCardView } = useContext<BookMarkContextDto>(BookMarkContext)

    return (
        <>
            <BookMarkForm />
            {isCardView && <CardView />}
            {!isCardView && <ListView />}
        </>
    )
}

export default Views
