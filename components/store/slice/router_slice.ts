import { createSlice } from "@reduxjs/toolkit";
import { routerType, payloadType, changeRouterType } from "../types/routerTypes";


const initialRouteState: { currentRouter: payloadType[], currentRouterIndex: number } = {
    currentRouter: [],
    currentRouterIndex: 0
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
            payload: { currentRouter: payloadType[], currentRouterIndex: number }
            type: String
        }) {
            if (Array?.isArray(action?.payload?.currentRouter)) {
                state.currentRouter = action?.payload?.currentRouter
                state.currentRouterIndex = action?.payload?.currentRouterIndex
            }
        },

        // this function is to store path name with query parameter
        changeCurrentRouter(state, action: routerType) {
            console.log("changeCurrentRouter")
            let inCommingRoute = action.payload
            let routeIndex = state.currentRouterIndex

            if(routeIndex === 0){
                routeIndex = 1;
            }

            if (state.currentRouter) {
                console.log(inCommingRoute)
                console.log(routeIndex -1)
                state.currentRouter[routeIndex - 1] = inCommingRoute;
                state.currentRouterIndex = routeIndex;
                localStorage.setItem('routerDetails', JSON.stringify(state.currentRouter));
                localStorage.setItem('currentRouterIndex', JSON.stringify(routeIndex));
            }
        },

        changeRouter(state, action: changeRouterType) {
            const from = state.currentRouterIndex - 1;
            const to = action?.payload?.to - 1;

            if (state.currentRouter.length >= from && state.currentRouter.length >= to) {
                const duplicate = state.currentRouter[from]
                const toRoute = state.currentRouter[to]
                duplicate.isActive = false
                toRoute.isActive = true
                state.currentRouter[from] = duplicate
                state.currentRouter[to] = toRoute
                state.currentRouterIndex = to + 1;
                localStorage.setItem('routerDetails', JSON.stringify(state.currentRouter));
                localStorage.setItem('currentRouterIndex', JSON.stringify(state.currentRouterIndex));
            }

            // checking for duplicate route + query
            // adding unique one into state
            // state.currentRouter[currentRouteIndex].isActive = false;
            // let duplicateState = state?.currentRouter;


            // state.currentRouter = [...state.currentRouter, { ...action?.payload, isActive: true }]
            // converting yo string and storing in localstorage
            // localStorage.setItem('routerDetails', JSON.stringify(state.currentRouter));
        },

        createNewRouter(state, action) {
            state.currentRouter = [...state.currentRouter, { ...action.payload, isActive: true }];

            if (state.currentRouterIndex != 0) {
                const previousActiveRoute = state.currentRouter[state.currentRouterIndex - 1];
                previousActiveRoute.isActive = false;
                state.currentRouter[state.currentRouterIndex - 1] = previousActiveRoute;
            }

            state.currentRouterIndex = state.currentRouter.length;

            localStorage.setItem("routerDetails", JSON.stringify(state.currentRouter));
            localStorage.setItem("currentRouterIndex", JSON.stringify(state.currentRouterIndex));
        },

        deleteRouter(state, action) {
            const closingWindowIndex = action?.payload?.to - 1;
            const currentActiveIndex = state.currentRouterIndex - 1;

            console.log({ currentActiveIndex, closingWindowIndex })
            console.log(currentActiveIndex == closingWindowIndex, currentActiveIndex == 0)

            if (currentActiveIndex === closingWindowIndex && currentActiveIndex != 0) {
                state.currentRouter[0].isActive = true;
                state.currentRouterIndex = 1;
            }

            else if (currentActiveIndex == -1 || currentActiveIndex == 0 ) {
                const index = state.currentRouter.length - 1
                console.log("else if")
                console.log(index)

                if (index == 0) {
                    state.currentRouterIndex = 0;
                } else {
                    state.currentRouter[index].isActive = true;
                    state.currentRouterIndex = index;
                }
            }
            else {
                console.log("else")
                state.currentRouterIndex = state.currentRouterIndex - 1
            }

            state.currentRouter = state.currentRouter.filter((router, i) => (i) != closingWindowIndex)
            localStorage.setItem("routerDetails", JSON.stringify(state.currentRouter));
            localStorage.setItem("currentRouterIndex", JSON.stringify(state.currentRouterIndex));
        }
    }
}
)

const routeSliceReducer = routeSlice.reducer

export const routeAction = routeSlice.actions;

export default routeSliceReducer;

