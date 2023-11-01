import MeetContext from "./MeetContext";
import React, { ReactNode, useState } from 'react'
interface Props {
    children: ReactNode
}
const MeetState = ({ children }: Props) => {
    const [show, setShow] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [createMeeting, setCreateMeeting] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [search, setSearch] = useState<string | null>("")
    const [rows, setRows] = useState<string | number | null>("")
    const [page, setPage] = useState<string | number | null>("")
    const [status, setStatus] = useState<string | null>("All")
    return (
        <MeetContext.Provider value={{
            show, setShow,
            isEdit, setIsEdit,
            selectedTab, setSelectedTab,
            createMeeting, setCreateMeeting,
            selectedId, setSelectedId,
            search, setSearch,
            rows, setRows,
            page, setPage,
            status, setStatus,
        }}>
            {children}
        </MeetContext.Provider>
    )
}

export default MeetState
