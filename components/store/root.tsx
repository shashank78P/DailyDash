import { configureStore } from "@reduxjs/toolkit";
import routeSliceReducer from "./slice/router_slice"
import userSliceReducer from "./slice/userSlice";
import meetingSliceReducer from "./slice/meetingSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist'
const Store = configureStore({
    reducer: {
        routeSliceReducer,
        userSliceReducer,
        meetingSliceReducer
    },
    middleware: (getDefaultMiddleware) =>
        // getDefaultMiddleware({
        //     serializableCheck: {
        //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        //     },
        // }),
        getDefaultMiddleware({
            serializableCheck: {
              // Ignore these action types
              ignoredActions: ['your/action/type'],
              // Ignore these field paths in all actions
              ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
              // Ignore these paths in the state
              ignoredPaths: ['items.dates'],
            },
          }),
})

export default Store;