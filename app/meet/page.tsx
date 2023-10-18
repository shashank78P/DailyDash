"use client"
// @ts-nocheck
import MyCard from '@/components/Meet/MyCard';
import { SocketContext } from '@/components/context/SocketContext';
import { userType } from '@/components/store/types/userType';
import React, { useContext, useState } from 'react'
import { ReactMediaRecorder } from 'react-media-recorder';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const page = () => {
    const userSelector: userType = useSelector((state: any) => state?.userSliceReducer);
    const socket: any = useContext(SocketContext);
    const [videoStream, setVideoStream] = useState<Array<any>>([])

    socket?.on("1-notification", (data: any) => {
        toast.success(data?.userId + " joined meeting ")
    })

    socket?.on("1", (data: any) => {
        setVideoStream(videoStream.map((video: any, i) => {
            if (data?.userId == video?.userId) {
                return data
            } else {
                return video
            }
        }))
    })

    function handelJoin() {
        socket?.emit("joinMeet", { userId: userSelector?.userId, meetingId: "1" })
    }
    return (
        <div>
            <ReactMediaRecorder
                video={true}
                render={({ clearBlobUrl, error, mediaBlobUrl, pauseRecording, resumeRecording, startRecording, status, stopRecording, previewStream }) => {
                    return (<>
                        <MyCard stream={previewStream} />
                        <button onClick={() => {
                            handelJoin()
                        }}>
                            Join
                        </button>
                        <button onClick={() => {
                            startRecording()
                        }}>
                            start video
                        </button>
                        <button onClick={() => {
                            stopRecording();
                        }}>
                            stop video
                        </button>
                        {
                            videoStream?.map((video: any, i) => {
                                return (
                                    <video src={video?.stream} autoPlay loop controls />
                                )
                            })
                        }
                    </>)
                }}>
            </ReactMediaRecorder>
        </div>
    )
}

export default page
