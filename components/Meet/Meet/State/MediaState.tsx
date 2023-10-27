"use client"
import React, { useState, createContext, ReactNode, useCallback, useEffect } from 'react'
import MediaContext from './MediaContext'
import { meetingDetailsDto } from '../../types'
interface Props {
    children: ReactNode
}

interface mediaDto {
    isVideoOn: Boolean
    isAudioOn: Boolean
}

const MedaiState = ({ children }: Props) => {
    const [meetingId, setMeetingId] = useState<String | null>(null)
    const [myStream, setMyStream] = useState<MediaStream | null>(new MediaStream());
    // const [opponentStream, setOpponentStream] = useState<MediaStream | null>(new MediaStream());
    const [opponentNonMediaStreamStream, setOpponentNonMediaStreamStream] = useState<Array<String>>([]);
    const [opponentStream, setOpponentStream] = useState<any>({});
    const [absentParticipantsDetails, setAbsentParticipantsDetails] = useState<Array<any>>([]);
    const [participantsDetails, setParticipantsDetails] = useState<any>({});
    const [meetingDetails, setMeetingDetails] = useState<meetingDetailsDto | null>();
    const [video, setVideo] = useState(false)
    const [audio, setAudio] = useState(false)
    const [openInvitePeople, setOpenInvitePeople] = useState<Boolean>(false)
    const [isJoinMeetPage, setIsJoinMeetPage] = useState(!true)
    const [pinnedParticipants, setPinnedParticipants] = useState<Array<String>>([])
    const [showPinSection, setShowPinSection] = useState<String>('')
    const [showParticipants, setShowParticipants] = useState<String>('')


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
                opponentNonMediaStreamStream, setOpponentNonMediaStreamStream,
                pinnedParticipants, setPinnedParticipants,
                showPinSection, setShowPinSection,
                showParticipants, setShowParticipants,
                meetingId , setMeetingId,
                absentParticipantsDetails, setAbsentParticipantsDetails,
                meetingDetails, setMeetingDetails,
                openInvitePeople, setOpenInvitePeople
            }}>
                {
                    children
                }
            </MediaContext.Provider>
        </>
    )
}

export default MedaiState
