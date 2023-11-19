import { scheduledMeetingDto } from "../../types";
import MeetContext from "./MeetContext";
import React, { ReactNode, useState } from 'react'
interface Props {
    children: ReactNode
}
const MeetState = ({ children }: Props) => {
    const defaultValue = {
        participantsEmail: [],
        createdAt: "",
        createdBy: "",
        createrName: "",
        description: "",
        meetingDate: "",
        meetingEndingAt: "",
        meetingId: "",
        meetingLength: "",
        meetingLengthPararmeter: "",
        meetingStatus: "",
        participantsCount: 0,
        title: "",
        whoCanJoin: "",
        _id: "",
    }
    const [show, setShow] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [createMeeting, setCreateMeeting] = useState<boolean>(false);
    const [selected, setSelected] = useState<scheduledMeetingDto | null>(defaultValue);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [search, setSearch] = useState<string | null>("")
    const [rows, setRows] = useState<string | number | null>(10)
    const [page, setPage] = useState<string | number | null>(0)
    const [status, setStatus] = useState<string | null>("All")

    function handelClearSelectedData() {
        console.log("handelClearSelectedData")
        setSelectedId("")
        setSelected(defaultValue)
    }

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
            selected, setSelected,
            status, setStatus,
            handelClearSelectedData
        }}>
            {children}
        </MeetContext.Provider>
    )
}

export default MeetState
