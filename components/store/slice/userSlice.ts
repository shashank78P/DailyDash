import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../types/userType";

const initialuserState: userType = {}

const userSlice = createSlice({
    name: "user",
    initialState: initialuserState,
    reducers: {
        // initializing data on mount
        // data stored on localstorage parsed and storing
        initialization(state, action: {
            payload: userType
            type: String
        }) {
            state.email = action?.payload?.email
            state.firstName = action?.payload?.firstName
            state.lastName = action?.payload?.lastName
            state.login = action?.payload?.login
        },

        // this function is to store path name with query parameter
        setuser(state, action: {
            payload: userType
            type: String
        }) {
            state.email = action?.payload?.email
            state.firstName = action?.payload?.firstName
            state.lastName = action?.payload?.lastName
            state.login = action?.payload?.login
            state.userId = action?.payload?.userId
            state.logInId = action?.payload?.logInId
        }
    }
}
)

const userSliceReducer = userSlice.reducer

export const userAction = userSlice.actions;

export default userSliceReducer;

