import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const useRedirectToActiveTab = () => {

    const router = useRouter();
    const pathname = usePathname()
    const restriction_for_routing = ["/login", "/reset-password", "/forget-password", "/block", "/signup" , "/chat/joinGroup" , "/meet/room"];

    async function redirect(skip? : boolean) {
        console.log("pathname")
        console.log(pathname)
        if ((!restriction_for_routing.includes(pathname)) || skip === true) {
            let x = localStorage.getItem("routerDetails")
            x = x ? JSON.parse(x) : [];
            let currentRouterIndex = localStorage.getItem("currentRouterIndex")
            const data: any = (currentRouterIndex && Number(currentRouterIndex) >= 1) ? x?.[Number(currentRouterIndex) - 1] : { route: "/", query: "" }
            await router.push(`${data?.route}${data?.query}`);
        }
    }

    return [redirect]
}

export default useRedirectToActiveTab
