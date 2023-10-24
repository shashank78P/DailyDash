"use client"
import React, { useState, createContext, ReactNode, useCallback, useEffect } from 'react'
import MediaContext from './MediaContext'
interface Props {
    children: ReactNode
}

interface mediaDto {
    isVideoOn: Boolean
    isAudioOn: Boolean
}

const MedaiState = ({ children }: Props) => {
    const [myStream, setMyStream] = useState<MediaStream | null>(new MediaStream());
    // const [opponentStream, setOpponentStream] = useState<MediaStream | null>(new MediaStream());
    const [opponentNonMediaStreamStream, setOpponentNonMediaStreamStream] = useState<Array<String>>([]);
    const [opponentStream, setOpponentStream] = useState<any>({});
    const [participantsDetails, setParticipantsDetails] = useState<any>([]);
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
            <MediaContext.Provider value={{
                myStream,
                setMyStream,
                MediaActions,
                setAudio,
                setVideo,
                audio,
                video,
                isJoinMeetPage, setIsJoinMeetPage,
                opponentStream, setOpponentStream,
                participantsDetails, setParticipantsDetails,
                opponentNonMediaStreamStream, setOpponentNonMediaStreamStream
            }}>
                {
                    children
                }
            </MediaContext.Provider>
        </>
    )
}

export default MedaiState
