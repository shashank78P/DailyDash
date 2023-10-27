import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useContext, useState } from 'react'
import { TagsInput } from 'react-tag-input-component'
import { streamContextDto } from '../../types'
import MediaContext from '../State/MediaContext'
import { toast } from 'react-toastify'
import api from '@/components/lib/api'
import { useMutation } from 'react-query'

const InvitePeopleToMeet = () => {
    const [selected, setSelected] = useState([])
    const [error , setError] = useState("")
    const { meetingId, openInvitePeople, setOpenInvitePeople } = useContext<streamContextDto>(MediaContext)

    const { mutate: InvitePeople, isLoading } = useMutation((data: any) => {
        return api.post("/meet/invite-people-for-meeting", data)
    },
        {
            onSuccess() {
                setSelected([])
                setOpenInvitePeople(false)
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            }
        }
    )

    return (
        <>
            <Dialog open={openInvitePeople} >
                <DialogTitle className='font-semibold capitalize'>Invite people</DialogTitle>
                <DialogContent>
                    <ul>
                        <li className='text-base mb-2'>Enter user email: </li>
                        <li className='text-base mb-2'>
                            <TagsInput
                                value={selected}
                                onChange={(e: any) => {
                                    setSelected(e)
                                }}
                            />
                        </li>
                        <li className='text-red-500 font-normal text-xs'>{error}</li>
                    </ul>
                </DialogContent>
                <DialogActions>
                    <button className='rounded-lg p-2 px-3 text-red-500'
                        onClick={() => {
                            setSelected([])
                            setOpenInvitePeople(false)
                        }}
                    >Close</button>
                    <button className='rounded-lg p-2 px-3 bg-purple-500 text-white'
                        onClick={()=>{
                            if(selected?.length > 0){
                                setError("")
                                InvitePeople({ invitingPropeList : selected , meetingId})
                            }else{
                                setError("Please enter email, click enter button")
                            }
                        }}
                    >Invite</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default InvitePeopleToMeet
