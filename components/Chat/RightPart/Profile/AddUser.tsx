import React, { useState } from 'react'
import InvitationLink from './InvitationLink'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import SearchUserToAdd from './SearchUserToAdd'

const AddUser = ({setOptions , selectedChat} : any) => {
  const [tab, setTab] = useState("Add User")
  return (
    <>
      <div className='min-w-[300px]'>
        <Dialog open={true} >
          <DialogTitle>
            <ul className='flex w-full items-center justify-between'>
              <li className={`w-full text-center min-w-[150px] text-lg font-normal cursor-pointer ${ tab == "Add User" && "border-0 border-b-2 border-purple-700"} `}
                onClick={()=>{
                  setTab("Add User")
                }}
                >Add User</li>
              <li className={`w-full text-center min-w-[150px] text-lg font-normal cursor-pointer ${ tab == "Invitation Link" && "border-0 border-b-2 border-purple-700"}`}
                onClick={()=>{
                  setTab("Invitation Link")
                }}
              >Invitation Link</li>
            </ul>
          </DialogTitle>
          <DialogContent>
            { tab == "Add User" && <SearchUserToAdd setOptions={setOptions} selectedChat={selectedChat}/>}
            { tab == "Invitation Link" && <InvitationLink setOptions={setOptions} selectedChat={selectedChat}/>}
          </DialogContent>
        </Dialog>
      </div>
      {/* <InvitationLink /> */}
    </>
  )
}

export default AddUser
