// @ts-nocheck
import CrossIco from '@/components/assets/CrossIco';
import DeleteIco from '@/components/assets/DeleteIco';
import PauseIco from '@/components/assets/PauseIco';
import PlayIco from '@/components/assets/PlayIco';
import ResetIco from '@/components/assets/ResetIco';
import SaveIco from '@/components/assets/SaveIco';
import Send from '@/components/assets/Send';
import VoiceMikeIco from '@/components/assets/VoiceMikeIco';
import api from '@/components/lib/api';
import apiFromData from '@/components/lib/apiFormData';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Oval } from 'react-loader-spinner';
import { ReactMediaRecorder } from 'react-media-recorder';
// import { ReactMediaRecorder } from 'react-media-recorder';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import UseMediaController from '../UseMediaController';

type AudioRecordDto = {
    isOpen: boolean,
    setIsOpen: any,
    sendFile: any
}

const AudioRecord = ({ isOpen, setIsOpen, sendFile }: AudioRecordDto) => {
    const videoRef = useRef<HTMLVideoElement>();
    const [myStream, startRecording, mediaUrl, setMediaUrl, stopRecording, status, pauseRecording, resumeRecording, clearBlobUrl, MuteAudio, unMuteAudio, isAudioMuted, setIsAudioMuted,isPlay, setIsPlay
        ,isStarted, setIsStarted] = UseMediaController();

    useEffect(() => {
        if (myStream && videoRef.current) {
            videoRef.current.srcObject = myStream
        }
    }, [myStream])

    const { mutate: postAudio, isLoading } = useMutation((data: any) => {
        return api.post("/file-system/upload-Audio-base64-data", data)
    },
        {
            onSuccess({ data }) {
                sendFile(data?.[0]?._id, "AUDIO")
                setIsOpen(false)
                setMediaUrl([])
                toast.success("Uploaded Successfully")
            },

            onError() {
                toast.error("Upload failed")
            }
        }
    )

    async function postAudioFromMediaUrl() {
        await Promise.all(
            mediaUrl?.map(async (url: any, i: number) => {
                const response = await fetch(url);
                const blob = await response.blob();
                let reader = new FileReader()
                reader.onload = () => {
                    postAudio({ 'file': reader.result })
                }
                // @ts-ignore
                reader.readAsDataURL(blob)
            }))
    }

    return (
        <>
            <div>

                {/* <ReactMediaRecorder audio render={({ clearBlobUrl, error, mediaBlobUrl, pauseRecording, resumeRecording, startRecording, status, stopRecording, previewAudioStream }) => { */}
                {/* return ( */}
                <>
                    <Dialog open={isOpen} >
                        <div className='relative min-w-[250px]'>
                            <span className='absolute top-2 right-2 mb-2 cursor-pointer'
                                onClick={() => {
                                    setIsOpen(false)
                                }}
                            >
                                <CrossIco width={30} height={30} color='red' />
                            </span>
                            <DialogTitle style={{ fontWeight: "700" }}>Audio Recorder</DialogTitle>
                            <DialogContent>
                                {
                                    ["started", "stopping", "stopped", "paused"].includes(status) &&
                                    <div className='my-2 text-purple-700 text-sm text-center flex items-center justify-center'>

                                        {status === "started" && <div className='w-4 h-4  rounded-full mr-2 p-[1px] border-2 border-red-500 flex items-center justify-center'>
                                            <div className='bg-red-500 w-2 h-2 rounded-full'>
                                            </div>
                                        </div>}
                                        {status}
                                    </div>
                                }
                                <ul>
                                    <li className='flex justify-center items-center'>
                                        {!isPlay && <div className=' flex flex-col items-center justify-center'>
                                            <span className='m-2 cursor-pointer border bg-purple-700 p-2 rounded-full'
                                                onClick={() => {
                                                    if (!isStarted) {
                                                        // setIsStarted(true)
                                                        startRecording(false, true)
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
                                                    // setIsPlay(false)
                                                }}
                                            >
                                                <PauseIco width={20} height={20} color='white' />
                                            </span>
                                            <span className='text-xs text-slate-600'>Pause</span>
                                        </div>}
                                        <div className=' flex flex-col items-center justify-center'>
                                            <span className='m-2 cursor-pointer border bg-purple-700 p-2 rounded-full'
                                                onClick={async () => {
                                                    stopRecording()
                                                }}
                                            >
                                                <SaveIco width={20} height={20} color='white' />
                                            </span>
                                            <span className='text-xs text-slate-600'>Save</span>
                                        </div>
                                        <div className=' flex flex-col items-center justify-center'>
                                            <span className='m-2 cursor-pointer border bg-purple-700 p-2 rounded-full'
                                                onClick={() => {
                                                    clearBlobUrl()
                                                }}
                                            >
                                                <ResetIco width={20} height={20} color='white' />
                                            </span>
                                            <span className='text-xs text-slate-600'>Reset all</span>
                                        </div>
                                    </li>
                                </ul>

                                {
                                    Array.isArray(mediaUrl) && mediaUrl?.map((url, i) => {
                                        return (
                                            <div className=' flex items-center justify-center' key={i}>
                                                <audio
                                                    className='my-2'
                                                    src={url}
                                                    controls
                                                    id="audio1"
                                                ></audio>
                                                <div className='ml-2 cursor-pointer'
                                                    onClick={() => {
                                                        setMediaUrl(mediaUrl.filter((ele, j) => j != i))
                                                    }}
                                                >
                                                    <DeleteIco height={20} width={20} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </DialogContent>
                            <div className='w-full flex mr-2 items-center justify-end'>
                                {!isLoading ?
                                    <span className='m-2 cursor-pointer border bg-purple-700 p-2 rounded-full'
                                        onClick={async () => {
                                            setIsStarted(false)
                                            setIsPlay(false)
                                            postAudioFromMediaUrl()
                                        }}
                                    >
                                        <Send width={20} height={20} color='white' />
                                    </span> :
                                    <span className='m-2 p-2'>
                                        <Oval color='#7e22ce' height={30} secondaryColor='#7e22ce' />
                                    </span>
                                }
                            </div>
                        </div>
                    </Dialog >
                </>
                {/* ) */}
                {/* }} /> */}
            </div>
        </>
    )
}
export default AudioRecord
