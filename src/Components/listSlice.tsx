import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import React from "react";
import axios from "axios";
import { useAppSelector } from "./hooks";

const initialState:any[] = []

const instance = axios.create({
    baseURL: `http://localhost:3000/`
})


export const fetchList = createAsyncThunk('list/fetchLists', async() => {
    let test = await instance.get('/api')
    console.log(test)
    console.log(test.data)
    //test.data is sent as action.payload to be fulfilled
    return test.data
})

export const fetchTodo = createAsyncThunk('todo/fetchTodo', async(payload:any) => {
    let test = await instance.get(`/api/${payload.id}`)
    console.log(test)
    console.log(test.data)
    console.log(typeof(test.data))
    //test.data is sent as action.payload to be fulfilled
    return test.data
})

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync',
    async(payload:any) => {
        console.log("In add todo")
        console.log(payload)
        let res = await instance.post('/api/create', {content: payload.task})
        console.log(res)
        console.log(typeof res)
        console.log(payload.task)
        console.log("Fetch List")
        let testing = await instance.get('/api')
        console.log(testing)
        console.log(testing.data)
        return testing.data
})

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync',
    async(payload:any) => {
        console.log("Deleting todo")
        console.log(payload)
        let res = await instance.post(`/api/${payload.id}`, {id: payload.id})
        console.log(res)
})

export const editTodoAsync = createAsyncThunk('todos/editTodoAsync',
    async(payload:any) => {
        console.log("Editing todo")
        console.log(payload)
        let res = await instance.post(`/api/edit/${payload.id}`, {content: payload.edit, id:payload.id})
        console.log(res)
        let testing = await instance.get('/api')
        console.log(testing)
        console.log(testing.data)
        return testing.data
})

export const listSlice = createSlice({
    name: "list",
    initialState: initialState,
    reducers: {
        addTask: (state, action) => {
            const todo = {
                content: action.payload.todo
            }
            state.push(todo)
        },
    },
    // extraReducers: {
    //     [fetchList.fulfilled]: (state, action) => {
    //         return action.payload.todos;
    //     }
    // }
    extraReducers(builder) {
        builder.addCase(fetchList.fulfilled, (state, action:any) => {
            console.log("data fetched")
            console.log(state)
            console.log(action.payload)
            //return value is used to populate state in test.tsx
            return action.payload
        })
        .addCase(fetchList.pending, (state, action:any) => {
            console.log("pending data")
        })
        .addCase(addTodoAsync.pending, (state, action) => {
            console.log("pending save")
        })
        .addCase(addTodoAsync.fulfilled, (state, action) => {
            console.log("value added")
            console.log(action.payload)
            // console.log(state)
            // console.log(typeof state)
            // console.log("Pushing")
            // state.push(action.payload)
            // console.log(state)
            return action.payload
        })
        .addCase(editTodoAsync.pending, (state, action) => {
            console.log("pending edit")
        })
        .addCase(editTodoAsync.fulfilled, (state, action) => {
            console.log("value changed")
            console.log(action.payload)
            // console.log(state)
            // console.log(typeof state)
            // console.log("Pushing")
            // state.push(action.payload)
            // console.log(state)
            return action.payload
        })
    }
})


export const {addTask} = listSlice.actions;
export default listSlice.reducer;