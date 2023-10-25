import VoiceMikeIco from '@/components/assets/VoiceMikeIco'
import { Dialog, DialogTitle } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ReactMediaRecorder } from 'react-media-recorder'

const AudioAnalyse = ({ previewAudioStream }: any) => {
    useEffect(() => {
        console.log(previewAudioStream)
    }, [previewAudioStream])
    return (
        <>
            sdasd
        </>
    )
}

const VideoTemp = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div>

                <Dialog open={true} >
                    <DialogTitle>Audio record</DialogTitle>
                </Dialog>
                <ReactMediaRecorder audio render={({ clearBlobUrl, isAudioMuted, error, muteAudio, mediaBlobUrl, pauseRecording, resumeRecording, startRecording, status, stopRecording, previewAudioStream }) => {
                    return (
                        <>
                            <span className='border p-2'
                                onClick={() => {
                                    // startRecording()
                                    setIsOpen(!isOpen)
                                }}
                            >
                                <VoiceMikeIco width={30} height={30} />
                            </span>
                            <span
                                onClick={() => {
                                    stopRecording()
                                }}
                            >Stop</span>
                            <AudioAnalyse previewAudioStream={previewAudioStream} />
                        </>
                    )
                }} />
            </div>
        </>
    )
}

export default VideoTemp
