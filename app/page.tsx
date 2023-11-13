"use client"
import TabSection from "@/components/GlobalComponents/bottomTab/TabSection";
import SideBar from "@/components/GlobalComponents/sideBar/SideBar";
import axios from "axios";
// const fs = require("fs");
import { createReadStream } from "fs"
import { useState, useRef } from "react";
import platform from 'platform';
import DeleteIco from "@/components/assets/DeleteIco";
import HorizontalThrreDot from "@/components/assets/HorizontalThrreDot";
import { IconButton, Menu, MenuItem } from "@mui/material";
export default function Home() {

  const [showOptions, setShowOptions] = useState<number>(-1)
  const [isMouseOut, setIsMouseOut] = useState<boolean>(false)
  const inptRef = useRef<HTMLInputElement>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    // setIsOpen(false)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
            <h1 className="text-center my-2 text-5xl font-bold text-purple-700 mb-4">Daily Dash</h1>
            {/* <div className="w-full">
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
            </div> */}
          </div>

          {/* recent bookmarks */}
          <div className="p-2 mt-5 overflow-y-scroll">
            <h1 className="pl-5 sm:p-0  text-xl font-normal text-slate-700">Quick Acess</h1>
            <div className="min-w-[200px] w-[200px] sm:w-[500px] lg:w-[700px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 my-2 place-content-center">
              {
                quickAcessData.map((ele, i) => {
                  return (
                    <>
                      <div key={i} className="w-full h-[100px] relative flex justify-center items-center rounded-md cursor-pointer pr-2 parentHover bg-slate-300">
                        <div
                          className="w-auto h-auto sm:w-[100px] sm:h-[100px] m-2 flex flex-col items-center justify-center"
                        >
                          <div className="w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] bg-slate-100 rounded-full"></div>
                          <h3 className="mt-2 text-xs sm:text-sm text-slate-500">{ele?.title}</h3>
                        </div>
                        <div className="text-xl text-start mt-2 absolute top-1 right-1 childDisplay"
                          onClick={() => {
                            setShowOptions(i)
                          }}
                        >
                          <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                          >
                            <HorizontalThrreDot height={15} width={15} />
                          </IconButton>
                          <Menu
                            id="long-menu"
                            MenuListProps={{
                              'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                              style: {
                                // maxHeight: "100px",
                                // width: '100px',
                              },
                            }}
                          >
                            <MenuItem key={"delete"} onClick={handleClose}>
                              <div className='m-2 flex justify-evenly'
                                onClick={() => {
                                }}
                              >
                                <span className='mr-2'>
                                  <DeleteIco width={20} height={20} />
                                </span>
                                Delete
                              </div>
                            </MenuItem>
                          </Menu>
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