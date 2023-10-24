export interface streamContextDto {
    myStream: MediaStream
    MediaActions: any,
    video: boolean,
    audio: boolean,
    isJoinMeetPage : boolean, 
    setIsJoinMeetPage : any,
    setVideo: any,
    setAudio: any,
    setMyStream: any,
    opponentStream : any,
    setOpponentStream:any,
    participantsDetails : Array<any>,
    setParticipantsDetails : any,
    opponentNonMediaStreamStream : Array<string>,
    setOpponentNonMediaStreamStream : any
}
