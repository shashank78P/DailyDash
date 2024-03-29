import AttachIco from '@/components/assets/AttachIco'
import Send from '@/components/assets/Send'
import VoiceMikeIco from '@/components/assets/VoiceMikeIco'
import React, { useState } from 'react'
import { ChatActionsDto } from '../type'
import { useSelector } from 'react-redux'
import CameraIco from '@/components/assets/CameraIco'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import apiFromData from '@/components/lib/apiFormData'
import SmilyFace from '@/components/assets/SmilyFace'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import AudioRecord from '@/components/GlobalComponents/Audio/AudioRecord'
import VideoRecord from '@/components/GlobalComponents/Video/VideoRecord'

const ChatActions = ({ selectedChat, socket, isEmojiOpen, setIsEmojiOpen }: ChatActionsDto) => {
    const [message, setMessage] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const userSelector = useSelector((state: any) => state?.userSliceReducer);

    const { mutate: postFile, isLoading } = useMutation((data: any) => {
        return apiFromData.post("/file-system/upload", data)
    },
        {
            onSuccess({ data }) {
                console.log(data?.[0]?._id)
                let mimeType = data?.[0]?.mimeType
                mimeType = mimeType.split("/")[0]
                sendFile(data?.[0]?._id, mimeType)
                toast.success("Uploaded Successfully")
            },

            onError() {
                toast.error("Upload failed")
            }
        })


    function sendFile(fileId: string, type: string) {
        if (selectedChat?.type == "INDIVIDUAL" && fileId) {
            socket?.emit("INDIVIDUAL", { message, messageType: type, fileId: fileId, belongsTo: selectedChat?.belongsTo, to: selectedChat?.opponentId, userId: userSelector?.userId });
        }
        else if (selectedChat?.type == "GROUP" && fileId) {
            socket?.emit("GROUP", { message, messageType: type, fileId: fileId, belongsTo: selectedChat?.belongsTo, to: selectedChat?.opponentId, userId: userSelector?.userId });
        }
    }

    function sendMessage() {
        if (selectedChat?.type == "INDIVIDUAL") {
            socket?.emit("INDIVIDUAL", { message, messageType: "TEXT", belongsTo: selectedChat?.belongsTo, to: selectedChat?.opponentId, userId: userSelector?.userId });
        }
        else if (selectedChat?.type == "GROUP") {
            socket?.emit("GROUP", { message, messageType: "TEXT", belongsTo: selectedChat?.belongsTo, to: selectedChat?.opponentId, userId: userSelector?.userId });
        }
        setMessage("");
    }

    return (
        <>
            {isOpen && <AudioRecord isOpen={isOpen} setIsOpen={setIsOpen} sendFile={sendFile} />}
            {isVideoOpen && <VideoRecord isOpen={isVideoOpen} setIsOpen={setIsVideoOpen} sendFile={sendFile} />}
            <ul className='w-full flex justify-between items-center'>
                <input
                    type="file"
                    name=""
                    id="file-upload"
                    hidden
                    multiple
                    onChange={async (e: any) => {
                        for (let i = 0; i < e?.target?.files?.length; i++) {
                            var formData = new FormData()
                            formData.append("file", e?.target?.files?.[i])
                            await postFile(formData)
                        }
                    }}
                />
                <li className='mx-2 cursor-pointer'>
                    <label htmlFor='file-upload' className='cursor-pointer'>
                        <AttachIco width={25} height={25} />
                    </label>
                </li>
                <li className='m-2 cursor-pointer'
                    onClick={() => {
                        setIsOpen(!isOpen)
                    }}
                >
                    <VoiceMikeIco width={25} height={25} />
                </li>
                <li className='m-2 cursor-pointer'
                    onClick={() => {
                        setIsVideoOpen(!isVideoOpen)
                    }}
                >
                    <CameraIco width={25} height={25} />
                </li>
                <li className=' flex flex-1 items-center relative'>
                    <textarea
                        placeholder='Type here to message...'
                        style={
                            {
                                "height": "60px",
                                "resize": "none"
                            }
                        }
                        className='w-full border p-2 text-base rounded-md placeholder:text-base'
                        value={message}
                        onChange={(e) => {
                            if(e?.target?.value?.length == 0){
                                socket?.emit("STOPED-TYPING" , { belongsTo : selectedChat?.opponentId , type : selectedChat?.type })
                            }else{
                                socket?.emit("STARTED-TYPING" , { belongsTo : selectedChat?.opponentId , type : selectedChat?.type })
                            }
                            setMessage(e?.target?.value);
                        }}
                    />
                    <span className='cursor-pointer relative ml-1'
                        onClick={() => {
                            setIsEmojiOpen(!isEmojiOpen)
                        }}
                    >
                        <SmilyFace height={25} width={25} />
                    </span>
                    {isEmojiOpen && <div className='absolute right-0 bottom-[60px] z-50'>
                        <Picker
                            onEmojiSelect={(e: any) => {
                                console.log(e?.native)
                                setMessage(message + e?.native)
                            }}
                        />
                    </div>}
                </li>
                <li
                    className='m-2 cursor-pointer bg-purple-500 p-2 rounded-lg grid place-content-center'
                    onClick={(e) => {
                        if(message){
                            sendMessage()
                            socket?.emit("STOPED-TYPING" , { belongsTo : selectedChat?.opponentId , type : selectedChat?.type })
                        }
                    }}
                >
                    <Send width={25} height={25} color='white' />
                </li>
            </ul>
        </>
    )
}

export default ChatActions