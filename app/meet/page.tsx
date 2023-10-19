"use client"
// @ts-nocheck
import MyCard from '@/components/Meet/MyCard';
import { SocketContext } from '@/components/context/SocketContext';
import { userType } from '@/components/store/types/userType';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { ReactMediaRecorder } from 'react-media-recorder';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Peer } from "peerjs";
import ReactPlayer from 'react-player';
import { v4 as uuidv4 } from "uuid"

const page = () => {
    const userSelector: userType = useSelector((state: any) => state?.userSliceReducer);
    const { socket, myPeer }: any = useContext(SocketContext);
    const [videoStream, setVideoStream] = useState<Array<any>>([])
    const [joined, setJoined] = useState<Array<string>>(["651f9f640fda2143f57d4a54", "6522964ed4e29dd9fb7c8547"])
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
    const opponent = useRef<HTMLVideoElement | null>(null)
    const myVideo = useRef<HTMLVideoElement | null>(null)

    useEffect(() => {
        if (socket && myPeer) {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            myPeer.on('call', function (call: any) {
                getUserMedia({ video: true, audio: true , screen : true}, function (stream: MediaStream) {
                    call.answer(stream); 
                    setStream(stream)
                    if(myVideo.current){
                        // var myVideo = opponent?.current
                        myVideo.current.srcObject = stream;
                    }else{
                        console.log("my video current null")
                    }
                    call.on('stream', function (remoteStream: MediaStream) {
                        console.log("opponent stream");
                        setRemoteStream(remoteStream)
                        if (opponent.current) {
                            opponent.current.srcObject = remoteStream;
                        }else{
                            console.log(" opponent current null");
                        }
                    });
                }, function (err: any) {
                    console.log('Failed to get local stream', err);
                });
            });
        }
    }, [socket, myPeer])


    const makeCall = () => {
        if (navigator) {
            // @ts-ignore
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            getUserMedia({ video: true, audio: true , screen : true }, function (stream: any) {
                joined.map((id) => {
                    if (id == userSelector?.userId) return;
                    var call = myPeer.call(id, stream);
                    setStream(stream)
                    if(myVideo.current){
                        // var myVideo = opponent?.current
                        myVideo.current.srcObject = stream;
                    }else{
                        console.log("my video current null")
                    }
                    call.on('stream', function (remoteStream: MediaStream) {
                        console.log("opponent stream via makecall", remoteStream)
                        setRemoteStream(remoteStream)
                        if (opponent.current) {
                            opponent.current.srcObject = remoteStream;
                        }else{
                            console.log("opponent current null")
                        }
                    });
                })
            }
                , function (err: any) {
                    console.log('Failed to get local stream', err);
                });
        }
    }

    useCallback(() => {
        if (myVideo.current) {
            myVideo.current.srcObject = stream
        }
    }, [stream, myVideo.current])
    useCallback(() => {
        if (opponent.current) {
            opponent.current.srcObject = remoteStream
        }
    }, [remoteStream, opponent.current])

    useEffect(() => {
        if (socket && myPeer) {
            socket?.on("1", (data: any) => {
                // handelStreaming();
            })

            socket?.on("1-notification", (data: any) => {
                console.log(data?.userId + " joined meeting ")
                toast.success(data?.userId + " joined meeting ")
            })
        }
        return () => {
            socket?.off("1-notification", (data: any) => { })
            socket?.off("1", (data: any) => { })
        }
    }, [socket, myPeer]);

    function handelJoin() {
        socket?.emit("joinMeet", { userId: userSelector?.userId, meetingId: "1" });
    }
    return (
        <div>
            <button onClick={() => {
                makeCall()
            }}>Make call</button>

            {/* <ReactMediaRecorder
                video
                // screen
                render={({ previewStream, status, startRecording, stopRecording, mediaBlobUrl, resumeRecording, pauseRecording, clearBlobUrl, muteAudio, unMuteAudio, isAudioMuted }) => {
                    return (
                        <>
                            <MyCard
                                stream={previewStream}
                                setRemoteStream={setRemoteStream}
                                joined={joined}
                                setStream={setStream}
                                opponent={opponent}
                                myVideo={myVideo}
                            />
                        </>)
                }}
            >
            
        </ReactMediaRecorder> */}
        <h1>My video</h1>
        <video
            className="w-[400px] h-[250px] my-2 mx-auto"
            autoPlay muted ref={myVideo}
        />
        <h1>Opponent video</h1>
        <video
            className="w-[400px] h-[250px] my-2 mx-auto"
            autoPlay muted ref={opponent}
        />
        </div>
    )
}

export default page