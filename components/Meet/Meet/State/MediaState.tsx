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

    useEffect(() => {
        // console.log()
        // if (audio == false) {
        //     const tracks = myStream?.getTracks();
        //     if (Array.isArray(tracks)) {
        //         tracks.forEach((track: any) => {
        //             if (track?.kind == "audio") {
        //                 track.stop();
        //             }
        //         });
        //     }
        // }
        if (video == false) {
            const tracks = myStream?.getTracks();
            if (Array.isArray(tracks)) {
                tracks.forEach((track: any) => {
                    console.log(track)
                    if (track?.kind == "video") {
                        track.stop();
                    }
                });
            }
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
    // console.log(myStream?.getAudioTracks())
    // console.log(myStream?.getVideoTracks())

    return (
        <>
            <streamContext.Provider value={{
                myStream,
                MediaActions,
                setAudio,
                setVideo,
                audio,
                video
            }}>
                {
                    children
                }
            </streamContext.Provider>
        </>
    )
}

export default MedaiState
