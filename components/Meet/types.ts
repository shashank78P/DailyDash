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
    opponentStream : MediaStream,
    setOpponentStream:any,
}