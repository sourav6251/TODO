// src/redux/reduxSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import logo from "/logo.png";

export interface userState {
    isLogin: boolean;
    userEmail: string;
    userName:string;
    darkMode: boolean;
    profilePic: string; 
}

const initialState: userState = {
    isLogin: false,
    userEmail: "String",
    darkMode: false,
    userName:"user",
    profilePic: logo,
};

const reduxSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<userState>) => {
            state.isLogin = true;
            state.userEmail = action.payload.userEmail;
            state.userName=action.payload.userName;
            state.profilePic = action.payload.profilePic;
        },
        toggleDarkmode: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
        },
        logout: (state) => {
            state.isLogin = false;
            state.userEmail = "";
            state.userName="Hello user";
            state.profilePic = logo;
        },
    },
});

export const { login, toggleDarkmode, logout } = reduxSlice.actions;
export default reduxSlice.reducer;
