import React, { useEffect } from 'react'
import { routeAction } from '../store/slice/router_slice'
import { useDispatch } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import useRedirectToActiveTab from '../GlobalComponents/useRedirectToActiveTab';

const RouteStateHandler = () => {
    const dispatch = useDispatch();
    const [ redirect ] = useRedirectToActiveTab()

    useEffect(() => {
        // getting previously, stored data and storing
        console.log("initializing router details from localstorage")
        let x = localStorage.getItem("routerDetails")
        x = x ? JSON.parse(x) : [];
        let currentRouterIndex = localStorage.getItem("currentRouterIndex")
        console.log({ x, currentRouterIndex })
        if (Array.isArray(x) && x.length > 0 && currentRouterIndex) {
            dispatch(routeAction?.initialization({
                currentRouter: x,
                currentRouterIndex: JSON.parse(currentRouterIndex)
            }))
        } else {
            console.log("else part")
            dispatch(routeAction?.initialization({
                currentRouter: [{
                    route: "/",
                    query: "",
                    isActive: true
                }],
                currentRouterIndex: 1
            }))
            // redirect("/", "");
        }
        // redirect();

    }, [])
    return (
        <>

        </>
    )
}

export default RouteStateHandler
