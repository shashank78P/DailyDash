export interface streamContextDto {
    myStream: MediaStream
    MediaActions: any,
    opponentScreenShareStream: any,
    setOpponentScreenShareStrem: any,
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

export interface MeetingContext {
    show: boolean,
    setShow: Function,
    isEdit: boolean,
    setIsEdit: Function,
    selectedTab: number,
    setSelectedTab: Function,
    selected: scheduledMeetingDto,
    setSelected: Function,
    createMeeting: boolean,
    setCreateMeeting: Function,
    selectedId: string | null,
    setSelectedId: Function,
    search: string,
    setSearch: Function,
    rows: string,
    setRows: Function,
    page: string,
    setPage: Function,
    status: string,
    setStatus: Function,
    handelClearSelectedData: Function,
}

export type scheduledMeetingDto = {
    participantsEmail: string[]
    createdAt: string,
    createdBy: string,
    createrName: string,
    description: string,
    meetingDate: string,
    meetingEndingAt: string,
    meetingId: string,
    meetingLength: string,
    meetingLengthPararmeter: string,
    meetingStatus: string,
    participantsCount: number,
    title: string,
    whoCanJoin: string,
    _id: string,
}

export const meetingStatusStyle: any = {
    "On Going": "text-green-700 bg-green-200 p-2 rounded-lg",
    "Completed": "text-red-700 bg-red-200 p-2 rounded-lg",
    "Not Started": "text-yellow-700 bg-yellow-200 p-2 rounded-lg"
}