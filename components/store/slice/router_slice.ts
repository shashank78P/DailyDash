import { createSlice } from "@reduxjs/toolkit";
import { routerType, payloadType } from "../types/routerTypes";

const initialRouteState: { currentRouter: payloadType[] } = {
    currentRouter: [],
}

function swapIsActiveState(currentActive: any, needToActivate: any) {
    if (currentActive && needToActivate) {
        currentActive.isActive = false;
        needToActivate.isActive = true;
    }
}

const routeSlice = createSlice({
    name: "current router",
    initialState: initialRouteState,
    reducers: {
        // initializing data on mount
        // data stored on localstorage parsed and storing
        initialization(state, action: {
            payload: payloadType[]
            type: String
        }) {
            if (Array?.isArray(action?.payload)) {
                state.currentRouter = action?.payload
            }
        },

        // this function is to store path name with query parameter
        changeRouter(state, action: routerType) {
            // checking for duplicate route + query
            // adding unique one into state
            let duplicateState = state?.currentRouter;
            let isExist;
            let existIndex: number = 0;
            let currentRouteIndex = 0;
            for (let i = 0; i < duplicateState?.length; i++) {

                // getting current active tab index
                // so that we can make is isActive : false future
                if (duplicateState?.[i]?.isActive) {
                    currentRouteIndex = i
                }
                if (duplicateState?.[i]?.query === action?.payload?.query && duplicateState?.[i]?.route == action?.payload?.route) {
                    isExist = duplicateState?.[i]
                    existIndex = i;
                    break;
                }
            }
            if (isExist) {
                swapIsActiveState(state?.currentRouter?.[currentRouteIndex], state?.currentRouter?.[existIndex])
                return
            }
            // initialy , their will be empty array
            // we provided value of currentRouterIndex as 0
            // at inital , to avoid accesing of data ,where their was no data
            if (state?.currentRouter?.[currentRouteIndex]?.isActive) {
                state.currentRouter[currentRouteIndex].isActive = false;
            }
            state.currentRouter = [...state.currentRouter, { ...action?.payload, isActive: true }]
            // converting yo string and storing in localstorage
            localStorage.setItem('routerDetails', JSON.stringify(state.currentRouter));
        }
    }
}
)

const routeSliceReducer = routeSlice.reducer

export const routeAction = routeSlice.actions;

export default routeSliceReducer;

