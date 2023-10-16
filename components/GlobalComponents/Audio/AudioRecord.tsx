import CrossIco from '@/components/assets/CrossIco';
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
import React, { useEffect, useState } from 'react'
import { ReactMediaRecorder } from 'react-media-recorder';
import { useMutation } from 'react-query';

const Analyze = ({ previewAudioStream }: any) => {
    useEffect(() => {
        console.log(previewAudioStream)

    }, [previewAudioStream])

    return (<>
        <h1>Analyse</h1>
    </>)
}

const AudioRecord = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isPlay, setIsPlay] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [mediaUrl, setMediaUrl] = useState<any[]>([]);

    const { mutate: postAudio } = useMutation((data: any) => {
        return api.post("/file-system/upload-blob-data", data)
    },
        {
            onSuccess() {

            },

            onError() {

            }
        }
    )
    console.log(mediaUrl)

    return (
        <>
            <div>

                <ReactMediaRecorder audio render={({ clearBlobUrl, error, mediaBlobUrl, pauseRecording, resumeRecording, startRecording, status, stopRecording, previewAudioStream }) => {
                    return (
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
                                        {/* <div className='text-center'>
                                            0:12:00
                                        </div> */}
                                        {
                                            ["recording", "stopping", "stopped", "paused"].includes(status) &&
                                            <div className='my-2 text-purple-700 text-sm text-center'>
                                                {status}
                                            </div>
                                        }
                                        <ul>
                                            <li className='flex justify-center items-center'>
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
                                                            if(mediaBlobUrl){
                                                                setMediaUrl([...mediaUrl, mediaBlobUrl])
                                                            }
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
                                                    <audio
                                                        className='my-2'
                                                        src={url}
                                                        controls
                                                        id="audio1"
                                                    ></audio>
                                                )
                                            })
                                        }
                                    </DialogContent>
                                    <div className='w-full flex mr-2 items-center justify-end'>
                                        <span className='m-2 cursor-pointer border bg-purple-700 p-2 rounded-full'
                                            onClick={async () => {
                                                setIsStarted(false)
                                                setIsPlay(false)
                                                await Promise.all(
                                                    mediaUrl?.map((url, i) => {
                                                        axios.get(url).then(res => {
                                                            console.log(res?.data)
                                                            const reader = new FileReader()
                                                            postAudio({ 'file': JSON.stringify(res?.data) })
                                                        })
                                                    }))
                                            }}
                                        >
                                            <Send width={20} height={20} color='white' />
                                        </span>
                                    </div>
                                </div>
                            </Dialog >

                            <span className='border p-2'
                                onClick={() => {
                                    // startRecording()
                                    setIsOpen(!isOpen)
                                }}
                            >
                                <VoiceMikeIco width={30} height={30} />
                            </span>
                            < Analyze previewAudioStream={previewAudioStream} />
                        </>
                    )
                }} />
                <input type="file" name="" id=""
                    onChange={(e: any) => {
                        console.log(e?.target?.value)
                    }}
                />
            </div>
        </>
    )
}
export default AudioRecord
