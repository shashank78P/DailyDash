import React, { useEffect, useState } from 'react'
import { ReactMediaRecorder } from 'react-media-recorder'
import VideoPreview from './VideoPreview'
import { useMutation } from 'react-query'
import api from '@/components/lib/api'
import axios from 'axios'
import apiFromData from '@/components/lib/apiFormData'
import { toast } from 'react-toastify'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import CrossIco from '@/components/assets/CrossIco'
import PauseIco from '@/components/assets/PauseIco'
import PlayIco from '@/components/assets/PlayIco'
import ResetIco from '@/components/assets/ResetIco'
import SaveIco from '@/components/assets/SaveIco'
import UnMuteIco from '@/components/assets/UnMuteIco'
import VoiceMikeIco from '@/components/assets/VoiceMikeIco'
import TickMark from '@/components/assets/TickMark'
import DeleteIco from '@/components/assets/DeleteIco'
import Send from '@/components/assets/Send'
import { Oval } from 'react-loader-spinner'

type VideoRecordDto = {
    isOpen: boolean,
    setIsOpen: any,
    sendFile: any
}

const VideoRecord = ({ isOpen, setIsOpen, sendFile }: VideoRecordDto) => {
    const [mediaUrl, setMediaUrl] = useState<any[]>([]);
    const [recordType, setRecordType] = useState<string>("video");
    const [isPlay, setIsPlay] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [selected, setSelected] = useState<number>(0);
    const { mutate: postVideo, isLoading } = useMutation((data: any) => {
        return api.post("/file-system/upload-video-base64-data", data)
    },
        {
            onSuccess({ data }) {
                sendFile(data?.[0]?._id, "VIDEO")
                setIsOpen(false)
                setMediaUrl([])
                toast.success("Uploaded Successfully")
            },

            onError() {
                toast.error("Upload failed")
            }
        })

    return (
        <ReactMediaRecorder
            video={recordType == "video"}
            screen={recordType == "screen"}
            // screen
            render={({ previewStream, status, startRecording, stopRecording, mediaBlobUrl, resumeRecording, pauseRecording, clearBlobUrl, muteAudio, unMuteAudio, isAudioMuted }) => {
                // useEffect(() => {
                //     if (mediaBlobUrl) {
                //         setSelected(mediaUrl.length)
                //         setMediaUrl(prev => [...prev, mediaBlobUrl])
                //     }
                // }, [mediaBlobUrl])
                return (
                    <>
                        <Dialog open={isOpen}>
                            <div className='relative min-w-[250px]'>
                                <span className='absolute top-2 right-2 mb-2 cursor-pointer'
                                    onClick={() => {
                                        setIsOpen(false)
                                        stopRecording()
                                        setSelected(mediaUrl.length)
                                        setMediaUrl(prev => [...prev, mediaBlobUrl])
                                    }}
                                >
                                    <CrossIco width={30} height={30} color='red' />
                                </span>
                                <DialogTitle style={{ fontWeight: "700" }}>Video Recorder</DialogTitle>
                                <DialogContent>
                                    <ul className='flex'>
                                        <li className={`${recordType == "video" && "border-0 border-b-2 border-purple-500 text-purple-500"}   p-2 my-2 `}
                                            onClick={() => {
                                                setRecordType("video")
                                            }}
                                        >Video</li>
                                        <li className={`${recordType == "screen" && "border-0 border-b-2  border-purple-500 text-purple-500"} p-2 my-2 `}
                                            onClick={() => {
                                                setRecordType("screen")
                                            }}
                                        >Screen</li>
                                    </ul>
                                    {previewStream && ["recording", "paused"].includes(status) && <VideoPreview stream={previewStream} />}
                                    {!(previewStream && ["recording", "paused"].includes(status)) && mediaUrl.length > 0 && selected > -1 && <video
                                        src={mediaUrl?.[selected]}
                                        className="w-[400px] h-[250px] my-2 mx-auto"
                                        autoPlay
                                        controls
                                        loop
                                    />
                                    }
                                    {
                                        <div className='w-full flex justify-center items-center flex-wrap'>
                                            {
                                                mediaUrl?.map((url, i) => {
                                                    return (
                                                        <>
                                                            <div className='relative'
                                                                onClick={() => {
                                                                    if (selected != i) {
                                                                        setSelected(i)
                                                                    }
                                                                }}
                                                            >
                                                                {selected == i && <div className='absolute top-2 right-2 p-1 bg-purple-700 rounded-full'>
                                                                    <TickMark height={15} width={15} color='white' />
                                                                </div>}
                                                                <video src={url}
                                                                    className={`w-[150px] h-[50px] m-2 aspect-video`}
                                                                    autoPlay={true}
                                                                    muted
                                                                    loop
                                                                />
                                                                {selected == i && <div className='p-1 bg-red-500 rounded-full cursor-pointer flex justify-center items-center'
                                                                    onClick={() => {
                                                                        setMediaUrl(mediaUrl.filter((ele, j) => j !== selected))
                                                                        setSelected(0)
                                                                    }}
                                                                >
                                                                    <DeleteIco height={15} width={15} color='white' />
                                                                </div>}
                                                            </div>
                                                        </>
                                                    )
                                                })

                                            }
                                        </div>
                                    }
                                    {
                                        ["recording", "stopping", "stopped", "paused"].includes(status) &&
                                        <div className='my-2 text-purple-700 text-sm text-center flex items-center justify-center'>

                                            {status === "recording" && <div className='w-4 h-4  rounded-full mr-2 p-[1px] border-2 border-red-500 flex items-center justify-center'>
                                                <div className='bg-red-500 w-2 h-2 rounded-full'>
                                                </div>
                                            </div>}
                                            {status}
                                        </div>
                                    }
                                    <ul>
                                        <li className='flex justify-center items-center'>
                                            {isAudioMuted && <div className=' flex flex-col items-center justify-center'>
                                                <span className='m-2 cursor-pointer border bg-purple-700 p-2 rounded-full'
                                                    onClick={() => {
                                                        unMuteAudio()
                                                    }}
                                                >
                                                    <UnMuteIco width={20} height={20} color='white' />
                                                </span>
                                                <span className='text-xs text-slate-600'>Un-Mute</span>
                                            </div>}
                                            {!isAudioMuted && <div className=' flex flex-col items-center justify-center'>
                                                <span className='m-2 cursor-pointer border bg-purple-700 p-2 rounded-full'
                                                    onClick={() => {
                                                        muteAudio()
                                                    }}
                                                >
                                                    <VoiceMikeIco width={20} height={20} color='white' />
                                                </span>
                                                <span className='text-xs text-slate-600'>Mute</span>
                                            </div>}
                                            {!isPlay && <div className=' flex flex-col items-center justify-center'>
                                                <span className='m-2 cursor-pointer border bg-purple-700 p-2 rounded-full'
                                                    onClick={() => {
                                                        if (!isStarted) {
                                                            setIsStarted(true)
                                                            startRecording()
                                                        } else {
                                                            resumeRecording()
                                                        }
                                                        setIsPlay(!isPlay)
                                                    }}
                                                >
                                                    <PlayIco width={20} height={20} color='white' />
                                                </span>
                                                <span className='text-xs text-slate-600'>{!isStarted ? "Start" : "Resume"}</span>
                                            </div>}
                                            {isPlay && <div className=' flex flex-col items-center justify-center'>
                                                <span className='m-2 cursor-pointer border bg-purple-700 p-2 rounded-full'
                                                    onClick={() => {
                                                        pauseRecording()
                                                        setIsPlay(false)
                                                    }}
                                                >
                                                    <PauseIco width={20} height={20} color='white' />
                                                </span>
                                                <span className='text-xs text-slate-600'>Pause</span>
                                            </div>}
                                            <div className=' flex flex-col items-center justify-center'>
                                                <span className='m-2 cursor-pointer border bg-purple-700 p-2 rounded-full'
                                                    onClick={async () => {
                                                        setIsStarted(false)
                                                        setIsPlay(false)
                                                        stopRecording()
                                                        setSelected(mediaUrl.length)
                                                        setMediaUrl(prev => [...prev, mediaBlobUrl])
                                                    }}
                                                >
                                                    <SaveIco width={20} height={20} color='white' />
                                                </span>
                                                <span className='text-xs text-slate-600'>Save</span>
                                            </div>
                                            <div className=' flex flex-col items-center justify-center'>
                                                <span className='m-2 cursor-pointer border bg-purple-700 p-2 rounded-full'
                                                    onClick={() => {
                                                        setIsStarted(false)
                                                        setIsPlay(false)
                                                        clearBlobUrl()
                                                        setMediaUrl([])
                                                        setSelected(0)
                                                    }}
                                                >
                                                    <ResetIco width={20} height={20} color='white' />
                                                </span>
                                                <span className='text-xs text-slate-600'>Reset all</span>
                                            </div>
                                        </li>
                                    </ul>
                                </DialogContent>
                                <div className='w-full flex mr-2 items-center justify-end'>
                                    {!isLoading ?
                                        <span className='m-2 cursor-pointer border bg-purple-700 p-2 rounded-full'
                                            onClick={async () => {
                                                setIsStarted(false)
                                                setIsPlay(false)
                                                await Promise.all(
                                                    mediaUrl?.map(async (url, i) => {
                                                        const response = await fetch(url);
                                                        const blob = await response.blob();
                                                        let reader = new FileReader()
                                                        reader.onload = () => {
                                                            postVideo({ 'file': reader.result })
                                                        }
                                                        // @ts-ignore
                                                        reader.readAsDataURL(blob)
                                                    }))
                                            }}
                                        >
                                            <Send width={20} height={20} color='white' />
                                        </span> :
                                        <span className='m-2 p-2'>
                                            <Oval color='#7e22ce' height={30} secondaryColor='#7e22ce' />
                                        </span>
                                    }
                                </div>
                            </div >
                        </Dialog>
                    </>
                )
            }}
        />
    )
}

export default VideoRecord
