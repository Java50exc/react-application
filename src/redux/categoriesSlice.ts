import {createSlice} from "@reduxjs/toolkit";
import {CategoryType} from "../model/CategoryType";

const initialState: { categories: string[] } = { categories: [] };
const categoriesSlice = createSlice({
    initialState,
    name: "categoriesState",
    reducers: {
        setCategories: (state, data) => {
            state.categories = data.payload;
        },
        resetCategories: (state) => {
            state.categories = initialState.categories;
        }
    }
});
export const categoriesActions = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;