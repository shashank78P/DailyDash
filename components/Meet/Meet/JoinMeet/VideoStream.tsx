"use client"
import { streamContext } from '@/components/Meet/Meet/State/MediaState'
import UnMuteIco from '@/components/assets/UnMuteIco'
import VideoICameraIco from '@/components/assets/VideoICameraIco'
import VideoSlashIco from '@/components/assets/VideoSlashIco'
import VoiceMikeIco from '@/components/assets/VoiceMikeIco'
import { useState, useContext, useRef, useEffect, memo } from 'react'
import { streamContextDto } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { meetingAction } from '@/components/store/slice/meetingSlice';
import { mediaAction } from '../../type'

const VideoStreamer = () => {
    const meetingSelector = useSelector((state: any) => state?.meetingSliceReducer);
    const dispatch = useDispatch()

    // const { MediaActions, myStream, video, setVideo, audio, setAudio } = useContext<streamContextDto>(streamContext)
    const videoRef = useRef<HTMLVideoElement>()

    useEffect(() => {
        console.log(" setting stream to video tag")
        console.log(meetingSelector?.myStream)
        if (videoRef?.current && meetingSelector?.myStream) {
            videoRef.current.srcObject = meetingSelector?.myStream
        }
    }, [meetingSelector?.myStream])

    const MediaController = (isVideoOn : boolean, isAudioOn : boolean)=>{
        mediaAction(isVideoOn, isAudioOn).then((stream) => {
            console.log(stream);
            // @ts-ignore
            dispatch(meetingAction?.setMyStream(stream));
        })
            .catch((err) => {
                console.error("Error accessing media devices: ", err);
            });
    }

    

    // useEffect(() => {
    //     MediaActions({ isAudioOn: audio, isVideoOn: video });
    // }, [video, audio, MediaActions]);

    return (
        <>
            <li>
                <video ref={videoRef} className='min-w-[200px] min-h-[250px] bg-slate-400' autoPlay controls />
            </li>
            <li className='flex justify-center items-center'>
                {meetingSelector?.video &&
                    <div className='m-2 border border-slate-500 cursor-pointer rounded-full p-2'
                        onClick={() => {
                            console.log("tying to off video ")
                            dispatch(meetingAction?.setVideo(false))
                            if(meetingSelector?.audio){
                                MediaController(false , meetingSelector?.audio)
                            }
                        }}
                    >
                        <VideoICameraIco height={30} width={30} />
                    </div>
                }
                {!meetingSelector?.video &&
                    <div className='m-2 border border-slate-500 cursor-pointer rounded-full p-2'
                        onClick={() => {
                            console.log("tying to on video ")
                            dispatch(meetingAction?.setVideo(true))
                            MediaController(true , meetingSelector?.audio)
                        }}
                    >
                        <VideoSlashIco height={30} width={30} />
                    </div>
                }
                {!meetingSelector?.audio && <div className='m-2 border border-slate-500 cursor-pointer rounded-full p-2'
                    onClick={() => {
                        dispatch(meetingAction?.setAudio(true))
                        MediaController(meetingSelector?.video , true)
                    }}
                >
                    <UnMuteIco height={25} width={25} />
                </div>}
                {meetingSelector?.audio &&
                    <div className='m-2 border border-slate-500 cursor-pointer rounded-full p-2'
                        onClick={() => {
                            dispatch(meetingAction?.setAudio(false))
                            if(meetingSelector?.video){
                                MediaController(meetingSelector?.video , false)
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