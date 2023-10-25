"use client"
import TabSection from "@/components/GlobalComponents/bottomTab/TabSection";
import SideBar from "@/components/GlobalComponents/sideBar/SideBar";
import axios from "axios";
// const fs = require("fs");
import { createReadStream } from "fs"
import { useState, useRef } from "react";
import platform from 'platform';
export default function Home() {

  const [showOptions, setShowOptions] = useState<number>(-1)
  const [isMouseOut, setIsMouseOut] = useState<boolean>(false)
  let quickAcessData = [
    {
      title: "What's Up",
    },
    {
      title: "Linked In",
    },
    {
      title: "FaceBook",
    },
    {
      title: "Twitter",
    },
    {
      title: "Figma",
    },
    {
      title: "Internshala",
    },
    {
      title: "Nowkari",
    },
  ]
  return (
    <>
      <div className="w-full h-screen flex overflow-hidden">
        <div className="w-full h-screen flex items-center flex-col justify-center overflow-y-scroll"
          onClick={(e) => {
            // for closing over overlay
            if (showOptions !== -1 && isMouseOut) { setShowOptions(-1); setIsMouseOut(false) }
          }}
        >
          <div className=" w-full sm:w-[500px] lg:w-[700px] ">
            <h1 className="text-center my-2 text-2xl font-bold text-purple-700 mb-4">Daily Dash</h1>
            <div className="w-full">
              <form
                className="w-full flex items-center justify-center"
                onSubmit={(e) => { e?.preventDefault(); }}
              >
                <input
                  autoFocus
                  className="w-[85%] sm:w-[100%] p-2 px-4 rounded-l-lg shadow-lg shadow-purple-200 placeholder-slate-500"
                  type="text"
                  placeholder="Type here to search" />
                <input
                  className=" bg-purple-700 text-white p-2 rounded-r-lg shadow-lg shadow-purple-200 cursor-pointer"
                  type="submit" value={"GO"}
                />
              </form>
            </div>
          </div>

          {/* recent bookmarks */}
          <div className="p-2 mt-5 overflow-y-scroll">
            <h1 className="pl-5 sm:p-0  text-xl font-normal text-slate-700">Quick Acess</h1>
            <div className="w-full sm:w-[500px] lg:w-[700px] flex justify-center items-center flex-wrap">

              {
                quickAcessData.map((ele, i) => {
                  return (
                    <>
                      <div key={i} className="relative flex justify-start items-start rounded-md cursor-pointer pr-2 parentHover">
                        <ul className={` absolute ${showOptions === i ? ' block ' : ' hidden '} w-full bg-red-300`}
                          onMouseLeave={() => {
                            setIsMouseOut(true)
                          }}
                        >
                          <li
                            onClick={() => { console.log(">1___") }}
                          >1___</li>
                          <li
                            onClick={() => { console.log("2...") }}
                          >2...</li>
                          <li
                            onClick={() => { console.log("3===") }}
                          >3===</li>
                        </ul>
                        <div
                          className="w-[100px] h-[100px] m-2 flex flex-col items-center justify-center"
                        >
                          <div className="w-[50px] h-[50px] bg-slate-100 rounded-full"></div>
                          <h3 className="mt-2 text-slate-500">{ele?.title}</h3>
                        </div>
                        <div className="text-xl text-start mt-2 childDisplay"
                          onClick={() => {
                            setShowOptions(i)
                          }}
                        >
                          :
                        </div>
                      </div>
                    </>
                  )
                })
              }

              {/* add button */}
              <div className="w-[100px] h-[100px] pr-2 m-3.5 flex flex-col items-center justify-center cursor-pointer">
                <div className="w-[50px] h-[50px] grid place-items-center text-3xl text-slate-500 rounded-full bg-slate-100">+</div>
                <h3 className="text-start mt-2 text-slate-500">Add</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


// export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   console.log("context here ==>", ctx)
//   const queries = ctx.query;
//   console.log("queries", queries)
//   return {
//     props: {
//       queries: queries
//     }
//   }
// }
