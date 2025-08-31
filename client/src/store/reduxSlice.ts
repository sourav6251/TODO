// src/redux/reduxSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface userState {
    isLogin: boolean;
    // userID:String,
    userEmail: string;
    userName:string;
    role: string;
    profilePic: string; 
}

const initialState: userState = {
    isLogin: false,
    userEmail: "",
    userName:"",
    role: "",
    profilePic: "",
};

const reduxSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<userState>) => {
            state.isLogin = true;
            state.role = action.payload.role;
            state.userEmail = action.payload.userEmail;
            state.userName=action.payload.userName;
            state.profilePic = action.payload.profilePic;
        },
       
        logout: (state) => {
            state.isLogin = false;
            state.role = "";
            state.userEmail = "";
            state.userName="";
            state.profilePic = "";
        },
    },
});

export const { login,  logout } = reduxSlice.actions;
export default reduxSlice.reducer;
