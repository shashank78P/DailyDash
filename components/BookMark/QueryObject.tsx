"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
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
    const [ isMountFirst , setIsMountFirst] = useState(true)

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
    console.log({ isCardView, rows, status })

    function setAllBooleanValueToFalse() {
        setShowInnerPage(false)
        setIsCardView(false)
        setIsEdit(false)
        setOpenFilter(false)
        setCreateBookMark(false)
    }

    function constructUrl(){
        console.log("state changed")
        console.log("building query")
        let constructQueryString = "";
        console.log(constructQueryString)
        if (Boolean(showInnerPage)) {
            constructQueryString = constructQueryString + `&showInnerPage=${showInnerPage}`
        }
        console.log(constructQueryString)
        if (Boolean(isEdit)) {
            constructQueryString = constructQueryString + `&isEdit=${isEdit}`
        }
        console.log(constructQueryString)
        if (Boolean(isCardView)) {
            console.log("isCardView")
            console.log(isCardView)
            constructQueryString = constructQueryString + `&isCardView=${isCardView}`
        }
        console.log(constructQueryString)
        if (Boolean(createBookMark)) {
            constructQueryString = constructQueryString + `&createBookMark=${createBookMark}`
        }
        console.log(constructQueryString)
        if (Boolean(selectedId)) {
            constructQueryString = constructQueryString + `&selectedId=${selectedId}`
        }
        console.log(constructQueryString)
        if (Boolean(search)) {
            constructQueryString = constructQueryString + `&search=${search}`
        }
        console.log(constructQueryString)
        if (Boolean(rows)) {
            constructQueryString = constructQueryString + `&rows=${rows}`
        }
        console.log(constructQueryString)
        if (Boolean(page)) {
            constructQueryString = constructQueryString + `&page=${page}`
        }
        console.log(constructQueryString)
        if (Boolean(status)) {
            constructQueryString = constructQueryString + `&status=${status}`
        }
        console.log(constructQueryString)
        if (Boolean(openFilter)) {
            constructQueryString = constructQueryString + `&openFilter=${openFilter}`
        }
        console.log(constructQueryString)
        if (Boolean(sortBy)) {
            constructQueryString = constructQueryString + `&sortBy=${sortBy}`
        }
        console.log(constructQueryString)
        if (Boolean(sortOrder)) {
            constructQueryString = constructQueryString + `&sortOrder=${sortOrder}`
        }
        console.log(constructQueryString)
        if (Boolean(fromDate)) {
            constructQueryString = constructQueryString + `&fromDate=${fromDate}`
        }
        console.log(constructQueryString)
        if (Boolean(toDate)) {
            constructQueryString = constructQueryString + `&toDate=${toDate}`
        }
        console.log(constructQueryString)

        dispatch(routeAction?.changeCurrentRouter({
            route: "/bookmark",
            query: `?${constructQueryString}`,
            isActive: true
        }))

        router2.replace(`/bookmark?${constructQueryString}`);
    }

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
        setIsMountFirst(false)
    }, [currentRouter, currentRouterIndex])

    // useEffect(() => {
    //     console.log("getting data from url")
    //     router.forEach((value, key) => {
    //         console.log({ key, value })
    //         setValue(key, value)
    //     })
    // }, [])


    useEffect(() => {

        if(isMountFirst){
            return;
        }
        else{
            constructUrl();
            setIsMountFirst(false)
        }
        
    }, [showInnerPage, isEdit, isCardView, createBookMark, selectedId, search, rows, page, status, openFilter, sortBy, sortOrder, fromDate, toDate]);
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
