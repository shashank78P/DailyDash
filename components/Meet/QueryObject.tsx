"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { routeAction } from '../store/slice/router_slice';

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
    const { currentRouter, currentRouterIndex } = useSelector((state: any) => state.routeSliceReducer)
    const dispatch = useDispatch();
    const [isMountFirst, setIsMountFirst] = useState(true)

    function setAllBooleanValueToFalse(){
        setShow(false)
        setIsEdit(false)
        setCreateMeeting(false)
    }

    function setValue(key: string, value: string){
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
    }

    function constructUrl(){
        console.log("constructing query")
        console.log("fetching data from url")
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
        dispatch(routeAction?.changeCurrentRouter({
            route: "/meet",
            query: `?${constructQueryString}`,
            isActive: true
        }))
        
        router2.replace(`/meet?${constructQueryString}`);
    }

    useEffect(() => {
        console.log({ currentRouter, currentRouterIndex })
        if (currentRouterIndex == 0) {
            return;
        }
        let { route, query } = currentRouter?.[currentRouterIndex - 1];
        console.log({ route, query })

        if (route != "/meet") {
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

    useEffect(() => {
        router.forEach((value, key) => {
            console.log({ key, value })
            setValue(key , value)
            
        })
    }, [])

    useEffect(() => {
        console.log("state changed" , isMountFirst)
        if (isMountFirst) {
            return;
        }
        else {
            constructUrl();
            setIsMountFirst(false)
        }
    }, [show, isEdit, selectedTab, createMeeting, selected, selectedId, search, rows, page, status , isMountFirst]);
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
