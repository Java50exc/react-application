import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { codeReducer } from "./codeSlice";
import { productsReducer } from "./productsSlice";
import { shoppingReducer } from "./shoppingSlice";
import {categoriesReducer} from "./categoriesSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        codeState: codeReducer,
        productsState: productsReducer,
        shoppingState: shoppingReducer,
        categoriesState: categoriesReducer
    }
})