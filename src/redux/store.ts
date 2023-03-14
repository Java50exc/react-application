import {configureStore} from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";
export const store: any = configureStore({
    reducer: {
       count: counterReducer,

    }
})