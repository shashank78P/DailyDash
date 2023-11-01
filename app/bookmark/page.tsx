"use client"
import BookMarkState from "@/components/BookMark/state/BookMarkState"

import TopNavSection from "@/components/BookMark/TopNavSection/TopNavSection"
import CardView from "@/components/BookMark/CardView/CardView"
import ListView from "@/components/BookMark/ListView/ListView"
import Views from "@/components/BookMark/Views"
const Page = () => {
    return (
        <>
            <BookMarkState>
                <div className='w-full h-full overflow-y-scroll'>
                    {/* <h1>BookMark</h1> */}
                    <TopNavSection />
                    <div className="">
                        <Views />
                    </div>
                </div>
            </BookMarkState>
        </>
    )
}

export default Page