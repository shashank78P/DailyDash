export interface streamContextDto {
    myStream: MediaStream
    MediaActions: any,
    video: boolean,
    audio: boolean,
    isJoinMeetPage: boolean,
    setIsJoinMeetPage: any,
    setVideo: any,
    setAudio: any,
    setMyStream: any,
    opponentStream: any,
    setOpponentStream: any,
    participantsDetails: any,
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
    meetingDetails : meetingDetailsDto,
    setMeetingDetails : any
    openInvitePeople : boolean,
    setOpenInvitePeople : any,
    Navigator:any,
    setNavigator:any
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