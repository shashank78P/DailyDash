"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

const QueryObject = ({
    show,
    setShow,
    isEdit,
    setIsEdit,
    selectedTab,
    setSelectedTab,
    createMeeting,
    setCreateMeeting,
    selected,
    setSelected,
    selectedId,
    setSelectedId,
    search,
    setSearch,
    rows,
    setRows,
    page,
    setPage,
    status,
    setStatus
}: any) => {

    const router = useSearchParams()
    const router2 = useRouter()

    useEffect(() => {
        let constructQueryString = "";
        if (Boolean(show)) {
            constructQueryString = constructQueryString + `&show=${show}`
        }
        if (Boolean(isEdit)) {
            constructQueryString = constructQueryString + `&isEdit=${isEdit}`
        }
        if (selectedTab) {
            constructQueryString = constructQueryString + `&selectedTab=${selectedTab}`
        }
        if (Boolean(createMeeting)) {
            constructQueryString = constructQueryString + `&createMeeting=${createMeeting}`
        }
        if (Boolean(selectedId)) {
            constructQueryString = constructQueryString + `&selectedId=${selectedId}`
        }
        if (Boolean(search)) {
            constructQueryString = constructQueryString + `&search=${search}`
        }
        if (Boolean(rows)) {
            constructQueryString = constructQueryString + `&rows=${rows}`
        }
        if (Boolean(page)) {
            constructQueryString = constructQueryString + `&page=${page}`
        }
        if (Boolean(status)) {
            constructQueryString = constructQueryString + `&status=${status}`
        }
        router2.replace(`/meet?${constructQueryString}`);
    }, [show, isEdit, selectedTab, createMeeting, selected, selectedId, search, rows, page, status]);

    useEffect(() => {
        router.forEach((value, key) => {
            console.log({ key, value })
            // let prevSelectedChat = localStorage.getItem("selectedChat")
            // if (prevSelectedChat) {
            //     prevSelectedChat = JSON.parse(prevSelectedChat)
            //     setSelectedChat(prevSelectedChat)
            // }
            // console.log({ prevSelectedChat })
            switch (key) {
                case "selectedTab":
                    setSelectedTab(value);
                    break;
                case "show":
                    setShow(Boolean(value))
                    break;
                case "show":
                    setShow(Boolean(value))
                    break;
                case "isEdit":
                    setIsEdit(Boolean(value))
                    break;
                case "createMeeting":
                    setCreateMeeting(Boolean(value))
                    break;
                case "selectedId":
                    setSelectedId(value)
                    break;
                case "page":
                    setPage(Number(value))
                    break;
                case "rows":
                    setRows(Number(value))
                    break;
                case "status":
                    setStatus(value)
                    break;
                case "search":
                    setSearch(value)
                    break;
            }
        })
    }, [])
    // useEffect(() => {

    // }, [
    //     ThreeDotIsOpen,
    //     ThreeDotActionResult,
    //     isViewProfile,
    //     refetchList
    // ])
    return (
        <>

        </>
    )
}

export default QueryObject
