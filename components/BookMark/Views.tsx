import React, { useContext } from 'react'
import CardView from './CardView/CardView'
import ListView from './ListView/ListView'
import BookMarkContext from './state/BookMarkContext'
import { BookMarkContextDto } from './types'
import BookMarkForm from './Form/BookMarkForm'
import api from '../lib/api'
import { useMutation, useQuery } from 'react-query'
import InnerPage from './InnerPage'
import { toast } from 'react-toastify'

const Views = () => {
    const {
        showInnerPage,
        openFilter,
        isCardView,
        isEdit,
        createBookMark,
        selectedId,
        page,
        rows,
        search,
        status,
        selected,
        fromDate,
        toDate,
        sortOrder,
        sortBy
    } = useContext<BookMarkContextDto>(BookMarkContext)

    const { data, isLoading, refetch } = useQuery(["book-mark-pagination", rows, page, search, status, openFilter, fromDate, toDate, sortBy, sortOrder], () => {
        return api.get(`/book-marks/book-mark-pagination?limit=${rows}&page=${page}&search=${search}&status=${status}&sortBy=${sortBy}&sortOrder=${sortOrder}&from=${fromDate}&to=${toDate}`)
    },
        {
            enabled: !openFilter,
            keepPreviousData: true
        }
    )

    const { mutate: deleteFile, isLoading: isDeleteFileLoading } = useMutation((data: any) => {
        api.delete(`/file-system/delete?fileId=${data?.fileId}`)
        return  data
    },
        {
            onSuccess(data: any) {
                toast.success("deleted previous file")
                deleteBookMark(data)
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            }
        }
    )
    
    const { mutate: deleteBookMark, isLoading: isDeleteBookMarkLoadingLoading } = useMutation((data: any) => {
        return api.delete(`/book-marks/delete?_id=${data?._id}`)
    },
        {
            onSuccess(data: any) {
                refetch()
                toast.success("deleted Bookmark")
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            }
        }
    )
    return (
        <>
            {(createBookMark || (isEdit && selectedId != null)) && <BookMarkForm defaultValue={selected} refetch={refetch} />}
            {showInnerPage && <InnerPage />}
            {isCardView && <CardView refetch={refetch} data={data}  deleteFile={deleteFile}/>}
            {!isCardView && <ListView refetch={refetch} data={data} deleteFile={deleteFile} />}
        </>
    )
}

export default Views
