'use client';
import ModileSideBarTopSection from './sideBar/ModileSideBarTopSection'
import SideBarList from './sideBar/SideBarList'

const MobileSideBar = ({ openNav, setOpenNav }: { openNav: boolean, setOpenNav: Function }) => {
    return (
        <>
            <div className={`h-screen absolute top-0 z-40 bg-purple-100 sm:hidden ${openNav ? "w-[100%]" : "w-[0] hidden"} delay-400`}
                onClick={() => {
                    console.log("outside now")
                    setOpenNav(false);
                }}
            >
            </div>
            <div
                className={`absolute sm:relative top-0 z-50 w-[90%] h-screen sm:pt-0 overflow-hidden ${openNav ? "translate-x-0" : "translate-x-[-1000px]"} sm:translate-x-0 duration-200 ease-in`}
            >
                <ModileSideBarTopSection />
                <SideBarList />
            </div>
        </>
    )
}

export default MobileSideBar