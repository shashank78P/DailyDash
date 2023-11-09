"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

const QueryObject = ({
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
    sortBy, setSortBy,
    sortOrder, setSortOrder,
    fromDate, setFromDate,
    toDate, setToDate,
}: any) => {

    const router = useSearchParams()
    const router2 = useRouter()

    useEffect(() => {
        let constructQueryString = "";
        if (Boolean(showInnerPage)) {
            constructQueryString = constructQueryString + `&showInnerPage=${showInnerPage}`
        }
        if (Boolean(isEdit)) {
            constructQueryString = constructQueryString + `&isEdit=${isEdit}`
        }
        if (Boolean(isCardView)) {
            constructQueryString = constructQueryString + `&isCardView=${isCardView}`
        }
        if (Boolean(createBookMark)) {
            constructQueryString = constructQueryString + `&createBookMark=${createBookMark}`
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
        if (Boolean(openFilter)) {
            constructQueryString = constructQueryString + `&openFilter=${openFilter}`
        }
        if (Boolean(sortBy)) {
            constructQueryString = constructQueryString + `&sortBy=${sortBy}`
        }
        if (Boolean(sortOrder)) {
            constructQueryString = constructQueryString + `&sortOrder=${sortOrder}`
        }
        if (Boolean(fromDate)) {
            constructQueryString = constructQueryString + `&fromDate=${fromDate}`
        }
        if (Boolean(toDate)) {
            constructQueryString = constructQueryString + `&toDate=${toDate}`
        }
        router2.replace(`/bookmark?${constructQueryString}`);
    }, [showInnerPage, isEdit, isCardView, createBookMark, selectedId, search, rows, page, status, openFilter, sortBy, sortOrder, fromDate, toDate]);

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
                case "showInnerPage":
                    setShowInnerPage(Boolean(value));
                    break;
                case "isEdit":
                    setIsEdit(Boolean(value));
                    break;
                case "isCardView":
                    setIsCardView(Boolean(value));
                    break;
                case "createBookMark":
                    setCreateBookMark(Boolean(value));
                    break;
                case "selectedId":
                    setSelectedId(value);
                    break;
                case "search":
                    setSearch(value);
                    break;
                case "rows":
                    setRows(Number(value));
                    break;
                case "page":
                    setPage(Number(value));
                    break;
                case "status":
                    setStatus(value);
                    break;
                case "openFilter":
                    setOpenFilter(Boolean(value));
                    break;
                case "sortBy":
                    setSortBy(value);
                    break;
                case "sortOrder":
                    setSortOrder(value);
                    break;
                case "fromDate":
                    setFromDate(value);
                    break;
                case "toDate":
                    setToDate(value);
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
