"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { routeAction } from '../store/slice/router_slice';

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
    const { currentRouter, currentRouterIndex } = useSelector((state: any) => state.routeSliceReducer)
    const dispatch = useDispatch();

    function setValue(key: string, value: string) {
        console.log({ key, value })
        switch (key) {
            case "showInnerPage":
                setShowInnerPage(Boolean(value));
                break;
            case "isEdit":
                setIsEdit(Boolean(value));
                break;
            case "isCardView":
                console.log("isCardView")
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
    }
    console.log({isCardView , rows , status})

    function setAllBooleanValueToFalse() {
        setShowInnerPage(false)
        setIsCardView(false)
        setIsEdit(false)
        setOpenFilter(false)
        setCreateBookMark(false)
    }

    useEffect(() => {
        console.log("getting data from url")
        router.forEach((value, key) => {
            console.log({ key, value })
            setValue(key, value)
        })
    }, [])

    useEffect(() => {
        console.log("state changed")
        console.log("building query")
        let constructQueryString = "";
        if (Boolean(showInnerPage)) {
            constructQueryString = constructQueryString + `&showInnerPage=${showInnerPage}`
        }
        if (Boolean(isEdit)) {
            constructQueryString = constructQueryString + `&isEdit=${isEdit}`
        }
        if (Boolean(isCardView)) {
            console.log("isCardView")
            console.log(isCardView)
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

        dispatch(routeAction?.changeCurrentRouter({
            route: "/bookmark",
            query: `?${constructQueryString}`,
            isActive: true
        }))

        router2.replace(`/bookmark?${constructQueryString}`);
        console.log(constructQueryString)
    }, [showInnerPage, isEdit, isCardView, createBookMark, selectedId, search, rows, page, status, openFilter, sortBy, sortOrder, fromDate, toDate]);
    // useEffect(() => {

    // }, [
    //     ThreeDotIsOpen,
    //     ThreeDotActionResult,
    //     isViewProfile,
    //     refetchList
    // ])

    useEffect(() => {
        console.log({ currentRouter, currentRouterIndex })
        if (currentRouterIndex == 0) {
            return;
        }
        let { route, query } = currentRouter?.[currentRouterIndex - 1];
        console.log({ route, query })

        if (route != "/bookmark") {
            return;
        }
        console.log("getting data fom redux store")
        console.log(currentRouterIndex)

        query = query.slice(1);
        console.log(query)
        query = query.split("&");
        console.log(query)
        setAllBooleanValueToFalse()

        query.map((ele: string, i: number) => {
            console.log(ele)
            if (ele != "") {
                const temp = ele?.split("=");
                setValue(temp[0], temp[1])
            }
        })
    }, [currentRouter, currentRouterIndex])
    return (
        <>

        </>
    )
}

export default QueryObject
