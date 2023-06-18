import { configureStore } from "@reduxjs/toolkit";
import routeSliceReducer from "./slice/router_slice"
const Store = configureStore({
    reducer: {
        routeSliceReducer
    }
})

export default Store;