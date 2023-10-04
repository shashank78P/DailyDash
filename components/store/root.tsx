import { configureStore } from "@reduxjs/toolkit";
import routeSliceReducer from "./slice/router_slice"
import userSliceReducer from "./slice/userSlice";
const Store = configureStore({
    reducer: {
        routeSliceReducer,
        userSliceReducer
    }
})

export default Store;