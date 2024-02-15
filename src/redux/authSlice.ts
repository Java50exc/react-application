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
            if (data.payload.password !== "123") {
                throw 'wrong pass';
            }
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