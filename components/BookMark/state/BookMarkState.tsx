import BookMarkContext from "./BookMarkContext";
import React, { ReactNode, useState } from 'react'
interface Props {
    children: ReactNode
}
const BookMarkState = ({ children }: Props) => {
    const [show, setShow] = useState<boolean>(false)
    const [isCardView, setIsCardView] = useState<boolean>(true)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [openFilter, setOpenFilter] = useState<boolean>(false)
    const [selectedTab, setSelectedTab] = useState<string>("Quick Access");
    const [createBookMark, setCreateBookMark] = useState<boolean>(false);
    const [search, setSearch] = useState<string | null>("")
    const [selected, setSelected] = useState<any>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [rows, setRows] = useState<string | number | null>("")
    const [page, setPage] = useState<string | number | null>("")
    const [status, setStatus] = useState<string | null>("All")

    function handelSelectAndEdit(data: any) {
        setIsEdit(true)
        setSelected(data)
    }
    return (
        <BookMarkContext.Provider value={{
            show, setShow,
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
            handelSelectAndEdit,
            selected , setSelected
        }}>
            {children}
        </BookMarkContext.Provider>
    )
}

export default BookMarkState
