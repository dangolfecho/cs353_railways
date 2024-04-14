import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        pnr:null
    },
    reducers:{
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        setpnr: (state, action) => {
            state.pnr = action.payload
        }
    }
});

export const {login, logout, setpnr} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const selectPnr = (state) => state.user.pnr;

export default userSlice.reducer;