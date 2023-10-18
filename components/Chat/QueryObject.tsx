"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const QueryObject = ({ selectedTab,
    setSelectedTab,
    ThreeDotIsOpen,
    setThreeDotIsOpen,
    ThreeDotActionResult,
    setThreeDotActionResult,
    isViewProfile,
    setIsViewProfile,
    refetchList,
    setRefetchList, }: any) => {

    const router = useSearchParams()
    
    // useEffect(() => {
    //     router.forEach((key,value)=>{
    //         switch(key){
    //             case "selectedTab":
    //                 setSelectedTab(value);
    //                 break;
    //             case "ThreeDotIsOpen":
    //                 setThreeDotIsOpen(Boolean(value))
    //                 break;
    //             case "ThreeDotActionResult":
    //                 setThreeDotActionResult(value)
    //                 break;
    //             case "isViewProfile":
    //                 setIsViewProfile(Boolean(value))
    //                 break;
    //             case "refetchList":
    //                 setRefetchList(Boolean(value))
    //                 break;
    //         }
    //     })
    // }, [])
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
