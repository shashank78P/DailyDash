import api from '@/components/lib/api';
import { Avatar, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Oval } from 'react-loader-spinner';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

type ThreeDotActionResultDto = {
    setThreeDotActionResult: any,
    ThreeDotActionResult: any,
}

const NewGroup = ({ setThreeDotActionResult, ThreeDotActionResult }: ThreeDotActionResultDto) => {
    const limit = 500
    const defaultUserPic = "images/DefaultUser2.png"
    const [skip, setSkip] = useState<number>(0)
    const [search, setSearch] = useState<string>("")
    const [message, setErrorMessage] = useState<string>("")
    const [newGroupName, setNewGroupName] = useState<string>("")

    const { data, isLoading, refetch } = useQuery(["getUserOfMyContact", search], () => {
        return api.get(`/chats/getUserOfMyContact?limit=${limit}&skip=${skip}&search=${search}`)
    }, {
        onSuccess({ data }) {
        }
    })
    
    const { mutate : createGroup, isLoading : groupCreationLoading } = useMutation(async (data : any)=>{
        return await api.post("/chats/createGroup", data)
    },
    {
        onSuccess({data} : any){
            toast.success("Created successfull")
            setThreeDotActionResult("")
        },
        onError(err :any){
            toast.error(err?.response?.data?.message)
        }
    }
    )

    const [checked, setChecked] = React.useState<string[]>([]);

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    return (
        <>
            <Dialog
                open={ThreeDotActionResult == "CreateGroup"}
                onClose={() => {

                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Create New Group
                </DialogTitle>
                <DialogContent id='createNewGroup'>
                    <InfiniteScroll
                        dataLength={100}
                        next={() => {
                            setSkip((prev) => prev + limit)
                        }}
                        hasMore={!(skip > data?.data?.total)}
                        loader={<div className='m-2'><Oval height={20} width={20} color='#7e22ce' /></div>}
                        scrollableTarget="createNewGroup"
                    >
                        <input
                            type="text"
                            name="groupName"
                            id=""
                            value={newGroupName}
                            onChange={(e) => {
                                setNewGroupName(e?.target?.value)
                            }}
                            placeholder='Enter group name'
                            className='min:w-[250px] w-[300px] border p-2 my-2 mb-2 rounded-lg placeholder:text-sm placeholder:text-slate-500'
                            autoFocus={true} />
                        {/* <br /> */}
                        <p className='text-red-500 text-xs mb-2'>{message}</p>
                        <h1 className='text-sm'>Selecet User</h1>
                        <input
                            type="email"
                            name=""
                            id=""
                            value={search}
                            onChange={(e) => {
                                setSearch(e?.target?.value)
                            }}
                            placeholder='Search for a user'
                            className='w-[300px] border p-2 my-2 mb-2 rounded-lg placeholder:text-sm placeholder:text-slate-500'
                        />
                        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {data?.data?.user.map((ele: any, i: any) => {
                                const labelId = `checkbox-list-secondary-label-${ele?.userId}`;
                                return (
                                    <ListItem
                                        key={ele?.userId}
                                        secondaryAction={
                                            <Checkbox
                                                edge="end"
                                                onChange={handleToggle(ele?.userId)}
                                                checked={checked.indexOf(ele?.userId) !== -1}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={`user picture`}
                                                    src={(ele?.profilePic) ? ele?.profilePic : defaultUserPic}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText id={labelId} primary={ele?.name} style={{ "textTransform": "capitalize" }} />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </InfiniteScroll>
                </DialogContent>
                <DialogActions>
                    <button className='mx-2 text-red-500'
                        onClick={() => {
                            setThreeDotActionResult("")
                        }}
                    >Cancel</button>
                    <button
                        className='mx-2 p-2 px-4 rounded-lg text-white border border-blue-700 bg-blue-700'
                        onClick={() => {
                            if(!newGroupName){
                                setErrorMessage("Group name is required")
                            }else{
                                setErrorMessage("")
                                createGroup({groupName : newGroupName , users : checked})
                            }
                        }}
                    >Create</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default NewGroup
