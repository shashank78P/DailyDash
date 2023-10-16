import React from 'react'
import { ReactMediaRecorder } from 'react-media-recorder'
import VideoPreview from './VideoPreview'
import { useMutation } from 'react-query'
import api from '@/components/lib/api'
import axios from 'axios'
import apiFromData from '@/components/lib/apiFormData'

const VideoRecord = () => {
    const { mutate: postAudio } = useMutation((data: any) => {
        return api.post("/file-system/upload-blob-data", data)
    },
        {
            onSuccess() {

            },

            onError() {

            }
        })

    return (
        <ReactMediaRecorder
            // video
            screen
            render={({ previewStream, status, startRecording, stopRecording, mediaBlobUrl }) => {
                return (
                    <>
                        <div>
                            <p>{status}</p>
                            <button onClick={startRecording}>Start Recording</button>
                            <button onClick={stopRecording}>Stop Recording</button>
                            <button onClick={async () => {
                                console.log(mediaBlobUrl)
                                // @ts-ignore
                                const response = await fetch("blob:http://localhost:3000/5a476b3f-d4ad-43e5-8640-26586ab67ae8");
                                const blob = await response.blob();
                                console.log(blob)
                                const formData = new FormData()
                                let reader = new FileReader()
                                reader.onload = () => {
                                    console.log("reader.onload")
                                    console.log(reader.result)
                                    postAudio({ 'file': reader.result })
                                }
                                // @ts-ignore
                                reader.readAsDataURL(blob)

                                // formData.append("file", data?.data)
                            }}>Post</button>
                            <video src={mediaBlobUrl} controls autoPlay loop />
                        </div>
                        <VideoPreview stream={previewStream} />;
                    </>
                )
            }}
        />
    )
}

export default VideoRecord
