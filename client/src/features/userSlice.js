import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        pnr:null,
        selectedTo:null,
        selectedFrom:null,
        date:null
    },
    reducers:{
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        setpnr: (state, action) => {
            state.pnr = action.payload;
        },
        setTo: (state, action) => {
            state.selectedTo = action.payload;
        },
        setFrom: (state, action) => {
            state.selectedFrom = action.payload;
        },
        setDate: (state, action) => {
            state.date = action.payload;
        }
    }
});

export const {login, logout, setpnr, setTo, setFrom, setDate} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const selectPnr = (state) => state.user.pnr;

export const selectTo = (state) => state.user.selectedTo;
export const selectFrom = (state) => state.user.selectedFrom;
export const selectDate = (state) => state.user.date;

export default userSlice.reducer;