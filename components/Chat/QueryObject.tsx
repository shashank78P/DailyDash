"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { routeAction } from '../store/slice/router_slice';

const QueryObject = ({ selectedTab,
    setSelectedTab,
    ThreeDotIsOpen,
    setThreeDotIsOpen,
    ThreeDotActionResult,
    setThreeDotActionResult,
    isViewProfile,
    setIsViewProfile,
    refetchList,
    setRefetchList,
    selectedChat,
    setSelectedChat,
    isSearch, setIsSearch,
    chatLeftSearch, setChatLeftSearch,
    isEmojiOpen, setIsEmojiOpen,
    typingMessage , setTypingMessage
}: any) => {

    const router = useSearchParams()
    const router2 = useRouter()
    const { currentRouter, currentRouterIndex } = useSelector((state: any) => state.routeSliceReducer)
    const dispatch = useDispatch();
    const [isMountFirst, setIsMountFirst] = useState(true)


    function setAllBooleanValueToFalse() {
        setThreeDotIsOpen(false)
        setIsViewProfile(false)
        setRefetchList(false)
        setIsSearch(false)
        setChatLeftSearch("")
        setIsEmojiOpen(false)
    }

    function setValue(key: string, value: string) {
        switch (key) {
            case "selectedTab":
                setSelectedTab(value);
                break;
            case "ThreeDotIsOpen":
                setThreeDotIsOpen(Boolean(value))
                break;
            case "ThreeDotActionResult":
                setThreeDotActionResult(value)
                break;
            case "isViewProfile":
                setIsViewProfile(Boolean(value))
                break;
            case "refetchList":
                setRefetchList(Boolean(value))
                break;
            case "isSearch":
                setIsSearch(Boolean(value))
                break;
            case "":
                setSelectedChat((prev: any) => { return { ...prev, opponentId: value } })
                break;
            case "belongsTo":
                setSelectedChat((prev: any) => { return { ...prev, belongsTo: value } })
                break;
            case "chatLeftSearch":
                setChatLeftSearch(value)
                break;
            case "isEmojiOpen":
                setIsEmojiOpen(value)
                break; 
            case "typingMessage":
                setTypingMessage(value)
                break;
        }
    }

    function constructUrl() {
        console.log("constructing query")
        console.log("fetching data from url")
        let constructQueryString = "";
        if (selectedChat?.opponentId) {
            constructQueryString = constructQueryString + `&opponentId=${selectedChat?.opponentId}`
        }
        if (selectedChat?.belongsTo) {
            constructQueryString = constructQueryString + `&belongsTo=${selectedChat?.belongsTo}`
        }
        if (selectedTab) {
            constructQueryString = constructQueryString + `&selectedTab=${selectedTab}`
        }
        if (Boolean(ThreeDotActionResult)) {
            constructQueryString = constructQueryString + `&ThreeDotActionResult=${ThreeDotActionResult}`
        }
        if (Boolean(ThreeDotIsOpen)) {
            constructQueryString = constructQueryString + `&ThreeDotIsOpen=${ThreeDotIsOpen}`
        }
        if (Boolean(isViewProfile)) {
            constructQueryString = constructQueryString + `&isViewProfile=${isViewProfile}`
        }
        if (Boolean(refetchList)) {
            constructQueryString = constructQueryString + `&refetchList=${refetchList}`
        }
        if (Boolean(isSearch)) {
            constructQueryString = constructQueryString + `&isSearch=${isSearch}`
        }
        if (Boolean(chatLeftSearch)) {
            constructQueryString = constructQueryString + `&chatLeftSearch=${chatLeftSearch}`
        }
        if (Boolean(isEmojiOpen)) {
            constructQueryString = constructQueryString + `&isEmojiOpen=${isEmojiOpen}`
        }
        if (Boolean(typingMessage)) {
            constructQueryString = constructQueryString + `&typingMessage=${typingMessage}`
        }

        dispatch(routeAction?.changeCurrentRouter({
            route: "/chat",
            query: `?${constructQueryString}`,
            isActive: true
        }))

        router2.replace(`/chat?${constructQueryString}`);
        console.log(constructQueryString)
    }

    useEffect(() => {
        console.log({ currentRouter, currentRouterIndex })
        if (currentRouterIndex == 0) {
            return ()=>{} ;
        }
        let { route, query } = currentRouter?.[currentRouterIndex - 1];
        console.log({ route, query })

        if (route != "/chat") {
            return ()=>{};
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
            setValue(key, value)
        })
    }, [])

    useEffect(() => {
        if (isMountFirst) {
            return ()=>{} ;
        }
        else {
            constructUrl();
            setIsMountFirst(false)
        }
    }, [selectedChat?.opponentId, selectedChat?.belongsTo, chatLeftSearch, router2, isEmojiOpen, ThreeDotIsOpen, ThreeDotActionResult, isViewProfile, refetchList, selectedTab, isSearch , typingMessage]);

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