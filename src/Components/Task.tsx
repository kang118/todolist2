import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialStateValue = {task: ""};

export const taskSlice = createSlice({
    name: "task",
    initialState:{value: initialStateValue},
    reducers: {
        add: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const {add} = taskSlice.actions;
export default taskSlice.reducer;
