"use client"
import React, { useState, createContext, ReactNode, useCallback, useEffect } from 'react'
interface Props {
    children: ReactNode
}
export let streamContext: any = null;

interface mediaDto {
    isVideoOn: Boolean
    isAudioOn: Boolean
}

const MedaiState = ({ children }: Props) => {
    streamContext = createContext({});
    const [myStream, setMyStream] = useState<MediaStream | null>(new MediaStream());
    const [video, setVideo] = useState(false)
    const [audio, setAudio] = useState(false)
    const [isJoinMeetPage, setIsJoinMeetPage] = useState(true)

    useEffect(() => {
        if (video == false || audio == false) {
            
        }
        console.log(myStream)
    }, [video, audio])

    const MediaActions = useCallback(({ isVideo, isAudio }: { isVideo: boolean, isAudio: boolean }) => {
        try {
            // @ts-ignore
            var getUserMedia = navigator.getUserMedia
            if (getUserMedia) {
                if (isVideo === false && isAudio === false) {
                    return;
                }
                getUserMedia(
                    { video: isVideo, audio: isAudio },
                    function (stream: MediaStream) {
                        setMyStream(stream)
                    }
                )
            } else {
                console.error("getUserMedia not found")
                return new MediaStream();
            }
        } catch (err: any) {
            console.error(err?.message)
        }
    }, [navigator])

    return (
        <>
            <streamContext.Provider value={{
                myStream,
                setMyStream,
                MediaActions,
                setAudio,
                setVideo,
                audio,
                video,
                isJoinMeetPage, setIsJoinMeetPage
            }}>
                {
                    children
                }
            </streamContext.Provider>
        </>
    )
}

export default MedaiState
