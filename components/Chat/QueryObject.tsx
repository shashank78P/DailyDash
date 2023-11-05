"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

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
    setSelectedChat
}: any) => {

    const router = useSearchParams()
    const router2 = useRouter()

    useEffect(() => {
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
        router2.replace(`/chat?${constructQueryString}`);
    }, [selectedChat?.opponentId, selectedChat?.belongsTo, router2, ThreeDotIsOpen, ThreeDotActionResult, isViewProfile, refetchList ,selectedTab]);

    useEffect(() => {
        router.forEach((value, key) => {
            console.log({ key, value })
            let prevSelectedChat = localStorage.getItem("selectedChat")
            if (prevSelectedChat) {
                prevSelectedChat = JSON.parse(prevSelectedChat)
                setSelectedChat(prevSelectedChat)
            }
            console.log({ prevSelectedChat })
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
                case "opponentId":
                    setSelectedChat((prev: any) => { return { ...prev, opponentId: value } })
                    break;
                case "belongsTo":
                    setSelectedChat((prev: any) => { return { ...prev, belongsTo: value } })
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
