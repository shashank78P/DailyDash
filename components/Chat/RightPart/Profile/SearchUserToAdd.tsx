import { SocketContext } from '@/components/context/SocketContext'
import api from '@/components/lib/api'
import { List, ListItem, Checkbox, ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material'
import { data } from 'autoprefixer'
import { skip } from 'node:test'
import React, { useContext, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Oval } from 'react-loader-spinner'
import { useMutation, useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const SearchUserToAdd = ({ setOptions, selectedChat }: any) => {
  const limit = 500;
  const userSelector = useSelector((state: any) => state?.userSliceReducer);
  const socket: any = useContext(SocketContext);
  const defaultUserPic = "images/DefaultUser2.png"
  const [skip, setSkip] = useState<number>(0)
  const [search, setSearch] = useState<string>("")
  const [userList, setUserList] = useState<string[]>([])
  const [message, setErrorMessage] = useState<string>("")
  const [newGroupName, setNewGroupName] = useState<string>("")

  const { data, isLoading, refetch } = useQuery(["getUserOfMyContact", search], () => {
    return api.get(`/chats/getUserOfMyContactExceptParticularGroup?limit=${limit}&skip=${skip}&search=${search}&belongsTo=${selectedChat?.belongsTo}`)
  }, {
    onSuccess({ data }) {
    }
  })

  const { mutate : addUser , isLoading : isAddUserLoading } = useMutation(async (data: any) => {
    return api.post("/chats/AddUserToGroup", data)
  }, {
    onSuccess({ data }) {
      socket.emit("GROUP", { event: { type: "JOIN", message: `${ userList.toString() } is added by ${data?.name}` }, messageType: "TEXT", belongsTo: selectedChat?.belongsTo, to: selectedChat?.opponentId, userId: userSelector?.userId });
      setOptions("")
    },
    onError(err) {
      toast.error("Not added sucessfully")
    }
  })
  const [checked, setChecked] = React.useState<string[]>([]);

  const handleToggle = (value: string, name: string) => () => {
    const currentIndex = checked.indexOf(value);
    const nameIndex = userList.indexOf(name)
    const newChecked = [...checked];
    const newUserList = [...userList];

    if (currentIndex === -1) {
      newChecked.push(value);
      newUserList.push(name);
    } else {
      newChecked.splice(currentIndex, 1);
      newUserList.splice(nameIndex, 1);
    }

    setChecked(newChecked);
    setUserList(newUserList)
    console.log(newChecked)
  };

  console.log(userList);
  console.log(checked);

  return (
    <div>
      <InfiniteScroll
        dataLength={100}
        next={() => {
          setSkip((prev) => prev + limit)
        }}
        hasMore={!(skip > data?.data?.total)}
        loader={<div className='m-2'><Oval height={20} width={20} color='#7e22ce' /></div>}
        scrollableTarget="createNewGroup"
      >
        <h1 className='text-sm'>Select User</h1>
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
                    onChange={handleToggle(ele?.userId, ele?.name)}
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
        <div className='flex justify-end items-center '>
          <button className='mx-2 text-red-500 text-base'
            onClick={() => {
              setOptions("")
            }}
          >Cancel</button>
          { isAddUserLoading ? 
            <Oval color='#7e22ce' height={20} width={20} secondaryColor='#7e22ce'/>
          : 
          <button
            className='mx-2 p-2 px-4 rounded-lg text-white border border-blue-700 bg-blue-700 text-base'
            onClick={() => {
              addUser({ users : checked , belongsTo : selectedChat?.belongsTo})
            }}
          >Add</button>}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default SearchUserToAdd
