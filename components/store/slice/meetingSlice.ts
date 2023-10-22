import { createSlice } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

type initialMeetingStateDto = {
    video: boolean,
    audio: boolean,
    myStream: any,
    participants: Array<any>,
    message: Array<any>,
    participantsStream: any,
}

type setParticipantsStreamPayloadDto = {
    participantId: string,
    stream: MediaStream
}

const initialMeetingState: initialMeetingStateDto = {
    video: false,
    audio: false,
    myStream: null,
    participants: [],
    message: [],
    participantsStream: new Object(),
}

const meetingSlice = createSlice({
    name: "meeting",
    initialState: initialMeetingState,
    reducers: {
        setParticipantsStream(state, action: {
            payload: setParticipantsStreamPayloadDto
            type: String
        }) {
            console.log("set participants called")
            // @ts-ignore
            state.participantsStream[action?.payload?.participantId] = action?.payload?.stream
        },

        setVideo(state, action: { payload: boolean, type: string }) {
            state.video = action?.payload
            console.log("setting video")
            // if (state.video === false && state.myStream) {
            //     console.log("turning off Media via video")
            //     const tracks = state.myStream?.getTracks();
            //     if (Array.isArray(tracks)) {
            //         tracks.forEach((track: any) => {
            //             console.log(track?.kind)
            //             if(track.kind =="video"){
            //                 track.stop();
            //             }
            //         });
            //     }
            //     state.myStream = new MediaStream();
            //     return;
            // }
        },

        setAudio(state, action: { payload: boolean, type: string }) {
            state.audio = action?.payload
            console.log("setting audio")
            // if (state.audio === false) {
            //     console.log("turning off Media via audio")
            //     const tracks = state.myStream?.getTracks();
            //     if (Array.isArray(tracks)) {
            //         tracks.forEach((track: any) => {
            //             console.log(track?.kind)
            //             if(track?.kind == "audio"){
            //                 track.stop();
            //             }
            //         });
            //     }
            //     state.myStream = new MediaStream();
            //     return;
            // }
        },

        setMyStream(state, action: { payload: MediaStream }) {
            console.log(action.payload.getTracks())
            // state.myStream = action.payload
            // const tracks = action.payload.getTracks();
            // const serializedTracks = tracks.map((track: MediaStreamTrack) => ({
            //     ...track
            // }));
            // console.log(serializedTracks)
            state.myStream = action.payload;
        }
    }
})

const meetingSliceReducer = meetingSlice.reducer

export const meetingAction = meetingSlice.actions;

export default meetingSliceReducer;
