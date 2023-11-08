import React, { useContext, useState } from 'react'
import { selecteChatDto } from '../../type'
import { useMutation, useQuery } from 'react-query'
import api from '@/components/lib/api'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Oval } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import DeleteIco from '@/components/assets/DeleteIco'
import DownloadIco from '@/components/assets/DownloadIco'
import HorizontalThrreDot from '@/components/assets/HorizontalThrreDot'
import ShareIco from '@/components/assets/ShareIco'
import { IconButton, Menu, MenuItem } from '@mui/material'
import link from 'next/link'
import AdminIco from '@/components/assets/AdminIco'
import UserIco from '@/components/assets/UserIco'
import { useSelector } from 'react-redux'
import { SocketContext } from '@/components/context/SocketContext'

type GroupMembersListDto = {
    selectedChat: selecteChatDto,
    role: any,
    options: any,
}

const GroupMembersList = ({ selectedChat, role, options }: GroupMembersListDto) => {
    const [skip, setSkip] = useState(0)
    const userSelector = useSelector((state: any) => state?.userSliceReducer);
    const { socket }: any = useContext(SocketContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [index, setIndex] = useState<number>(-1);
    ;
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        // setIsOpen(false)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const colorList = {
        "ADMIN": " border-green-700 p-1 text-green-700 ",
        "CO_ADMIN": " border-yellow-700 p-1 text-yellow-700 ",
        "MEMBER": " border-orange-700 p-1 text-orange-700 ",
    }

    const { data, error, isLoading, refetch: refetchGroupMembersList } = useQuery(['GroupMembersList', selectedChat?.belongsTo, options], () => {
        return api.get(`/chats/getAllMemebersOfGroup?limit=50&skip=${skip}&belongsTo=${selectedChat?.belongsTo}`)
    },
        {
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            },
            refetchOnMount: true,
            keepPreviousData: true
        }
    );

    const { mutate: postChangeRole } = useMutation((data: any) => {
        return api.put("/chats/change-role-of-user", data)
    }, {
        onSuccess({ data }) {
            socket.emit("GROUP", { event: { type: "MODIFIED", message: ` ${data?.name} made ${data?.opponentName} as ${data?.role}` }, messageType: "TEXT", belongsTo: selectedChat?.belongsTo, to: selectedChat?.opponentId, userId: userSelector?.userId });
            toast.success("Successfully done")
            refetchGroupMembersList()
            handleClose()
            setIndex(-1)
            setSkip(0)
        },
        onError(err: any) {
            handleClose()
            setIndex(-1)
            toast.error(err?.message)
        }
    })

    const { mutate: removeUser } = useMutation((data: any) => {
        return api.delete(`/chats/remove-user-from-group?belongsTo=${selectedChat?.belongsTo}&userId=${data?.userId}&opponentName=${data?.opponentName}`)
    }, {
        onSuccess({ data }) {
            socket.emit("GROUP", { event: { type: "REMOVED", message: `${data?.opponentName} is removed by ${data?.name}` }, messageType: "TEXT", belongsTo: selectedChat?.belongsTo, to: selectedChat?.opponentId, userId: userSelector?.userId });
            refetchGroupMembersList()
            handleClose()
            setIndex(-1)
            setSkip(0)
            toast.success("Successfully done")
        },
        onError(err: any) {
            toast.error(err?.message)
            setIndex(-1)
            handleClose()
        }
    })

    return (
        <div className={`overflow-y-scroll mb-5 relative `} id="GroupMembersList" style={{ "height": `300px` }}>
            <InfiniteScroll
                dataLength={data?.data?.total || 10}
                next={() => {
                    setSkip(prev => prev + 50)
                }}
                hasMore={skip + 50 < data?.data?.total}
                loader={<div className='m-2'><Oval height={20} width={20} color='#7e22ce' /></div>}
                scrollableTarget="GroupMembersList"
            // inverse={true}

            >
                {
                    Array.isArray(data?.data?.data) && data?.data?.data?.map((ele: any, i: number) => {
                        // @ts-ignore
                        const color = (colorList[ele?.role]) ? colorList[ele?.role] : ""
                        return (
                            <ul
                                key={i}
                                onClick={() => {
                                }}
                                className='w-full h-full flex justify-start items-center p-2 px-4 hover:bg-slate-100 border-b-slate-100 border-b-2'
                            >
                                <li >
                                    <img src={ele?.profilePic || "images/DefaultUser2.png"} alt="" className='w-[50px] h-[50px] min-w-[50px] border rounded-full bg-slate-100 object-fit aspect-square' />
                                </li>
                                <li className='w-full h-16 flex justify-between items-start ml-2'>
                                    <ul className='w-full flex flex-col justify-evenly h-16'>
                                        <li className='flex justify-between items-start flex-col'>
                                            <span className='text-lg font-medium capitalize'>{userSelector?.userId == ele?.memeberId ? "you" : ele?.name}</span>
                                            <span className='text-xs font-light text-slate-600'>{ele?.email}</span>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <span className={`border  bg-slate-100 rounded-lg text-xs  ${color}`}>{ele?.role}</span>
                                </li>
                                {userSelector?.userId !== ele?.memeberId && <li>
                                    <IconButton
                                        aria-label={`more ${i}`}
                                        id={`groupMember ${i}`}
                                        aria-controls={index == i ? `groupMember-menu ${i}` : undefined}
                                        aria-expanded={index == i ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={(e) => {
                                            setIndex(i)
                                            handleClick(e)
                                        }}
                                    >
                                        <HorizontalThrreDot height={20} width={20} />
                                    </IconButton>
                                    <Menu
                                        id={`groupMember-menu ${i}`}
                                        MenuListProps={{
                                            'aria-labelledby': `groupMember ${i}`
                                        }}
                                        anchorEl={anchorEl}
                                        open={index == i}
                                        onClose={(e) => {
                                            handleClose()
                                            setIndex(-1)

                                        }}
                                        PaperProps={{
                                            style: {
                                                // maxHeight: "100px",
                                                // width: '100px',
                                            },
                                        }}
                                        style={{ "padding": "0px" }}
                                    >
                                        {role == "ADMIN" && <MenuItem key={"delete"} >
                                            <div className=' flex w-full  '
                                                onClick={() => {
                                                    removeUser({ belongsTo: selectedChat?.belongsTo, userId: ele?.memeberId, opponentName: ele?.name })
                                                }}
                                            >
                                                <span className='mr-2'>
                                                    <DeleteIco width={20} height={20} />
                                                </span>
                                                Delete
                                            </div>
                                        </MenuItem>}
                                        {role == "ADMIN" && ele?.role !== "ADMIN" && <MenuItem key={"admin"}>
                                            <div className='flex w-full '
                                                onClick={() => {
                                                    postChangeRole({ belongsTo: selectedChat?.belongsTo, role: "ADMIN", userId: ele?.memeberId, opponentName: ele?.name })
                                                }}
                                            >
                                                <span className='mr-2'>
                                                    <AdminIco width={20} height={20} />
                                                </span>
                                                Make admin
                                            </div>
                                        </MenuItem>}
                                        {role == "ADMIN" && ele?.role !== "MEMBER" && <MenuItem key={"member"}>
                                            <div className='flex justify-start w-full '
                                                onClick={() => {
                                                    postChangeRole({ belongsTo: selectedChat?.belongsTo, role: "MEMBER", userId: ele?.memeberId, opponentName: ele?.name })
                                                }}
                                            >
                                                <span className='mr-2'>
                                                    <UserIco width={20} height={20} />
                                                </span>
                                                Make member
                                            </div>
                                        </MenuItem>}
                                    </Menu>
                                </li>}
                            </ul>
                        )
                    })
                }
            </InfiniteScroll>
        </div >
    )
}

export default GroupMembersList
