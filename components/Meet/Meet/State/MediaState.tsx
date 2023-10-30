"use client"
import React, { useState, createContext, ReactNode, useCallback, useEffect } from 'react'
import MediaContext from './MediaContext'
import { meetingDetailsDto, messageDto } from '../../types'
import { toast } from 'react-toastify'
interface Props {
    children: ReactNode
}

interface mediaDto {
    isVideoOn: Boolean
    isAudioOn: Boolean
}

const MedaiState = ({ children }: Props) => {
    const [meetingId, setMeetingId] = useState<String | null>(null)
    const [myStream, setMyStream] = useState<MediaStream | null>();
    const [myScreenShareStream, setMyScreenShareStream] = useState<MediaStream | null>();
    const [opponentScreenShareStream, setOpponentScreenShareStrem] = useState<any>({});
    // const [opponentStream, setOpponentStream] = useState<MediaStream | null>(new MediaStream());
    const [opponentNonMediaStreamStream, setOpponentNonMediaStreamStream] = useState<Array<String>>([]);
    const [opponentStream, setOpponentStream] = useState<any>({});
    const [absentParticipantsDetails, setAbsentParticipantsDetails] = useState<Array<any>>([]);
    const [participantsDetails, setParticipantsDetails] = useState<any>({});
    const [meetingDetails, setMeetingDetails] = useState<meetingDetailsDto | null>();
    const [video, setVideo] = useState(false)
    const [audio, setAudio] = useState(false)
    const [openInvitePeople, setOpenInvitePeople] = useState<Boolean>(false)
    const [isJoinMeetPage, setIsJoinMeetPage] = useState(true)
    const [pinnedParticipants, setPinnedParticipants] = useState<Array<String>>([])
    const [showPinSection, setShowPinSection] = useState<String>('')
    const [showParticipants, setShowParticipants] = useState<String>('')
    const [Navigator, setNavigator] = useState<any>()
    const [isReaction, setIsReaction] = useState<boolean>(false)
    const [isMyHandRaise, setIsMyHandRaise] = useState<boolean>(false)
    const [HandRaisedUser, setHandRaisedUser] = useState<string[]>([])
    const [isShowChat, setIsShowChat] = useState<boolean>(false)
    const [messages, setMessages] = useState<messageDto[]>([])
    const [isScreenShare, setIsScreenShare] = useState<boolean>(false)
    

    const MediaActions = useCallback(({ isVideo, isAudio }: { isVideo: boolean, isAudio: boolean }) => {
        try {
            if (Navigator) {

                // @ts-ignore
                var getUserMedia = Navigator.getUserMedia
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
            } else {
                toast.error("Your browser is supported")
            }
        } catch (err: any) {
            console.error(err?.message)
        }
    }, [Navigator])

    return (
        <>
            <MediaContext.Provider value={{
                myStream, setMyStream,
                myScreenShareStream, setMyScreenShareStream,
                MediaActions,
                setAudio,
                setVideo,
                audio,
                video,
                isJoinMeetPage, setIsJoinMeetPage,
                opponentStream, setOpponentStream,
                opponentScreenShareStream, setOpponentScreenShareStrem,
                participantsDetails, setParticipantsDetails,
                opponentNonMediaStreamStream, setOpponentNonMediaStreamStream,
                pinnedParticipants, setPinnedParticipants,
                showPinSection, setShowPinSection,
                showParticipants, setShowParticipants,
                meetingId, setMeetingId,
                absentParticipantsDetails, setAbsentParticipantsDetails,
                meetingDetails, setMeetingDetails,
                openInvitePeople, setOpenInvitePeople,
                Navigator, setNavigator,
                isReaction, setIsReaction,
                isMyHandRaise, setIsMyHandRaise,
                HandRaisedUser, setHandRaisedUser,
                isShowChat, setIsShowChat,
                messages, setMessages,
                isScreenShare, setIsScreenShare
            }}>
                {
                    children
                }
            </MediaContext.Provider>
        </>
    )
}

export default MedaiState
