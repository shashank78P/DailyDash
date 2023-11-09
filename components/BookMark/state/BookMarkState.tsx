import QueryObject from "../QueryObject";
import BookMarkContext from "./BookMarkContext";
import React, { ReactNode, useState } from 'react'
interface Props {
    children: ReactNode
}
const BookMarkState = ({ children }: Props) => {
    const [showInnerPage, setShowInnerPage] = useState<boolean>(false)
    const [isCardView, setIsCardView] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [openFilter, setOpenFilter] = useState<boolean>(false)
    const [selectedTab, setSelectedTab] = useState<string>("Quick Access");
    const [createBookMark, setCreateBookMark] = useState<boolean>(false);
    const [search, setSearch] = useState<string | null>("")
    const [selected, setSelected] = useState<any>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [rows, setRows] = useState<string | number | null>(10)
    const [page, setPage] = useState<string | number | null>(0)
    const [status, setStatus] = useState<string | null>("All")
    const [sortBy, setSortBy] = useState<string>("createdAt")
    const [sortOrder, setSortOrder] = useState<number>(-1)
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()

    function handelSelectAndEdit(data: any) {
        setIsEdit(true)
        setSelected(data)
    }

    QueryObject({
        showInnerPage, setShowInnerPage,
        isEdit, setIsEdit,
        isCardView, setIsCardView,
        createBookMark, setCreateBookMark,
        selectedId, setSelectedId,
        search, setSearch,
        rows, setRows,
        page, setPage,
        status, setStatus,
        openFilter, setOpenFilter,
        selected, setSelected,
        sortBy, setSortBy,
        sortOrder, setSortOrder,
        fromDate, setFromDate,
        toDate, setToDate,
    })
    return (
        <BookMarkContext.Provider value={{
            showInnerPage, setShowInnerPage,
            isEdit, setIsEdit,
            isCardView, setIsCardView,
            selectedTab, setSelectedTab,
            createBookMark, setCreateBookMark,
            selectedId, setSelectedId,
            search, setSearch,
            rows, setRows,
            page, setPage,
            status, setStatus,
            openFilter, setOpenFilter,
            selected, setSelected,
            sortBy, setSortBy,
            sortOrder, setSortOrder,
            fromDate, setFromDate,
            toDate, setToDate,
            handelSelectAndEdit,
        }}>
            {children}
        </BookMarkContext.Provider>
    )
}

export default BookMarkState
