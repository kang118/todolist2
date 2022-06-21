import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialStateValue = {name: "user, please log in"};

export const userSlice = createSlice({
    name: "user",
    initialState:{value: initialStateValue},
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },

        logout: (state) => {
            state.value = initialStateValue;
        }
    }
})

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;
/*export const User = () => {
    return <h3> Welcome User xxx </h3>
}*/