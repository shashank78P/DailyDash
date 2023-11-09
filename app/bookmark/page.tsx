"use client"
import BookMarkState from "@/components/BookMark/state/BookMarkState"
import TopNavSection from "@/components/BookMark/TopNavSection/TopNavSection"
import Views from "@/components/BookMark/Views"
const Page = () => {
    return (
        <>
            <BookMarkState>
                <div className='w-full h-full overflow-y-scroll' style={{"height" : "calc( 100vh - 50px )"}}>
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