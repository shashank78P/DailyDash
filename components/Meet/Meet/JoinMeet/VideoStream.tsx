// @ts-nocheck
"use client"
import MediaContext from '@/components/Meet/Meet/State/MediaContext'
import UnMuteIco from '@/components/assets/UnMuteIco'
import VideoICameraIco from '@/components/assets/VideoICameraIco'
import VideoSlashIco from '@/components/assets/VideoSlashIco'
import VoiceMikeIco from '@/components/assets/VoiceMikeIco'
import { useState, useContext, useRef, useEffect, memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { meetingAction } from '@/components/store/slice/meetingSlice';
import { streamContextDto } from '../../types'

const VideoStreamer = () => {
    const meetingSelector = useSelector((state: any) => state?.meetingSliceReducer);
    const dispatch = useDispatch()

    const {Navigator, MediaActions, myStream, setMyStream, video, setVideo, audio, setAudio } = useContext<streamContextDto>(MediaContext)
    const videoRef = useRef<HTMLVideoElement>()


    useEffect(() => {
        console.log(" setting stream to video tag")
        if (videoRef?.current && myStream?.active) {
            videoRef.current.srcObject = myStream
        }
    }, [myStream])

    useEffect(() => {
        const tracks = myStream?.getTracks();
        if (Array.isArray(tracks)) {
            tracks.forEach((track: any) => {
                console.log(track)
                if (track?.kind == "video" && video == false) {
                    track.stop();
                }
                if (track?.kind == "audio" && audio == false) {
                    track.stop();
                }
            });
        }
    }, [audio, meetingSelector.video])

    const mediaAction = useCallback((isVideoOn: boolean, isAudioOn: boolean) => {
        return new Promise((resolve, reject) => {
            console.log("==================================")
            // @ts-ignore
            if ( Navigator && Navigator?.mediaDevices && Navigator?.mediaDevices?.getUserMedia) {
                // @ts-ignore
                var getUserMedia = Navigator.getUserMedia || Navigator.webkitGetUserMedia || Navigator.mozGetUserMedia;
                getUserMedia({ video: isVideoOn, audio: isAudioOn }, function (stream: MediaStream) {
                    resolve(stream);
                }, function (err: any) {
                    reject(err);
                });
            } else {
                reject(new Error("getUserMedia not supported"));
            }
        });
    }, [Navigator])

    const MediaController = (isVideoOn: boolean, isAudioOn: boolean) => {
        mediaAction(isVideoOn, isAudioOn).then((stream) => {
            console.log(stream);
            setMyStream(stream)
        })
            .catch((err) => {
                console.error("Error accessing media devices: ", err);
            });
    }

    return (
        <>
            <li>
                <video ref={videoRef} className='min-w-[200px] min-h-[250px] bg-slate-400' autoPlay controls />
            </li>
            <li className='flex justify-center items-center'>
                {video &&
                    <div className='m-2 border border-slate-500 cursor-pointer rounded-full p-2'
                        onClick={() => {
                            console.log("tying to off video ")
                            setVideo(false)
                            if (audio) {
                                MediaController(false, audio)
                            }
                        }}
                    >
                        <VideoICameraIco height={30} width={30} />
                    </div>
                }
                {!video &&
                    <div className='m-2 border border-slate-500 cursor-pointer rounded-full p-2'
                        onClick={() => {
                            console.log("tying to on video ")
                            setVideo(true)
                            MediaController(true, audio)
                        }}
                    >
                        <VideoSlashIco height={30} width={30} />
                    </div>
                }
                {!audio && <div className='m-2 border border-slate-500 cursor-pointer rounded-full p-2'
                    onClick={() => {
                        setAudio(true)
                        MediaController(video, true)
                    }}
                >
                    <UnMuteIco height={25} width={25} />
                </div>}
                {audio &&
                    <div className='m-2 border border-slate-500 cursor-pointer rounded-full p-2'
                        onClick={() => {
                            setAudio(false)
                            if (video) {
                                MediaController(video, false)
                            }
                        }}
                    >
                        <VoiceMikeIco height={25} width={25} />
                    </div>
                }
            </li>
        </>
    )
}

export default memo(VideoStreamer)