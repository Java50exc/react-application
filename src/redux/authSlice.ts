import { createSlice } from "@reduxjs/toolkit";
const initialState: { authUser: string, authPassword: string } = {
    authUser: "",
    authPassword: ""
}
const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        login: (state, data) => {
            state.authUser = data.payload.user;
            state.authPassword = data.payload.password;
        },
        logout: (state) => {
            state.authUser = "";
            state.authPassword = "";
        }
    }
});
export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;