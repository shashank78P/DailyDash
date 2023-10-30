export interface streamContextDto {
    myStream: MediaStream
    MediaActions: any,
    opponentScreenShareStream : any, 
    setOpponentScreenShareStrem : any,
    myScreenShareStream: MediaStream,
    setMyScreenShareStream: any,
    video: boolean,
    audio: boolean,
    isJoinMeetPage: boolean,
    setIsJoinMeetPage: any,
    setVideo: any,
    setAudio: any,
    setMyStream: any,
    opponentStream: any,
    setOpponentStream: any,
    participantsDetails: participantsDetailsDto[],
    setParticipantsDetails: any,
    opponentNonMediaStreamStream: Array<string>,
    setOpponentNonMediaStreamStream: any,
    pinnedParticipants: Array<String>,
    setPinnedParticipants: any,
    showPinSection: String,
    setShowPinSection: any,
    showParticipants: String,
    setShowParticipants: any,
    meetingId: string, setMeetingId: any,
    absentParticipantsDetails: Array<any>,
    setAbsentParticipantsDetails: any,
    meetingDetails: meetingDetailsDto,
    setMeetingDetails: any
    openInvitePeople: boolean,
    setOpenInvitePeople: any,
    Navigator: any,
    setNavigator: any,
    isReaction: boolean,
    setIsReaction: any,
    isMyHandRaise: boolean,
    setIsMyHandRaise: any,
    HandRaisedUser: string[],
    setHandRaisedUser: any,
    isShowChat: boolean,
    setIsShowChat: any,
    messages: messageDto[],
    setMessages: any,
    isScreenShare: boolean,
    setIsScreenShare: any
}

export interface messageDto {
    message: string,
    createdAt: Date,
    createdBy: string,
    userId: string,
    meetingId: string
}

export interface participantsDetailsDto {
    belongsTo: string,
    createdAt: string,
    emial: string,
    isAttended: string,
    isInMeeting: string,
    participantId: string,
    userName: string,
    userPic: string,
    _id: string
}


export interface meetingDetailsDto {
    title: string,
    description: string,
    meetingDate: Date
    whoCanJoin: string,
    createdAt: Date,
    createdBy: string,
    createrName: string,
    participantsCount: number,
    meetingLength: string,
}