import { SocketContext } from '@/components/context/SocketContext';
import api from '@/components/lib/api';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

type ThreeDotActionResultDto = {
    setThreeDotActionResult: any,
    ThreeDotActionResult: any,
    setSelectedChat: any,
    setRefetchList : Function
}

const NewContact = ({ setThreeDotActionResult, ThreeDotActionResult, setSelectedChat , setRefetchList }: ThreeDotActionResultDto) => {
    const [email, setEmail] = useState();
    const [error, setError] = useState("");
    const userSelector = useSelector((state: any) => state?.userSliceReducer);
    const { socket } : any= useContext(SocketContext);
    const { mutate: getUser, isLoading } = useMutation(
        async (data: any) => await api.post("/chats/findUserToInitialChat", data),
        {
            onSuccess({data}){
                setRefetchList( (prev : boolean) => !prev)
                socket.emit("INDIVIDUAL", 
                { 
                    event: { type: "CHAT_INITIATED", message: `Chat initiated by ${userSelector?.firstName ?? ""} ${userSelector?.lastName ?? ""}` } ,
                    ...data,
                    messageType : "TEXT"
            });
                toast.success("Chat initiated successfully")
            },
            onError(err : any){
                toast.error(err?.response?.data?.message)
            }
        }
        );

    return (
        <>
            <Dialog
                open={ThreeDotActionResult == "AddUser"}
                onClose={() => {

                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add New Contact"}
                </DialogTitle>
                <DialogContent>
                    <h1 className='text-sm'>Enter email</h1>
                    <input
                        type="email"
                        name="email"
                        onChange={(e: any) => {
                            setEmail(e?.target?.value);
                        }}
                        className=' min:w-[250px] w-[300px] border p-2 my-2 mb-2 rounded-lg text-sm'
                        autoFocus={true}
                    />
                    <p className='text-red-500 text-xs'>{error}</p>
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
                            getUser({ email }, {
                                onSuccess({ data }) {
                                    // setSelectedChat(data?._id)
                                    setThreeDotActionResult("")
                                },
                                onError(err: any) {
                                    setError(err?.response?.data?.message)
                                }
                            })
                        }}
                    >Find</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default NewContact
