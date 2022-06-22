import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import React from "react";
import axios from "axios";

const initialState:any[] = []

const instance = axios.create({
    baseURL: `http://localhost:3000/`
})


export const fetchList = createAsyncThunk('list/fetchLists', async() => {
    let test = await instance.get('/api')
    //test.data is sent as action.payload to be fulfilled
    return test.data
})

export const fetchTodo = createAsyncThunk('todo/fetchTodo', async(payload:any) => {
    let test = await instance.get(`/api/${payload.id}`)
    //test.data is sent as action.payload to be fulfilled
    return test.data
})

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync',
    async(payload:any) => {
        console.log("In add todo")
        let res = await instance.post('/api/create', {content: payload.task})
        console.log(res)
        let testing = await instance.get('/api')
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
        console.log(res.data)
        let testing = await instance.get('/api')
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
    extraReducers(builder) {
        builder.addCase(fetchList.fulfilled, (state, action:any) => {
            console.log("data fetched")
            console.log(action.payload)
            return action.payload
        })
        .addCase(fetchList.pending, (state, action:any) => {
            console.log("pending data")
        })
        .addCase(fetchTodo.pending, (state, action:any) => {
            console.log("pending todo")
        })
        .addCase(fetchTodo.fulfilled, (state, action:any) => {
            console.log("todo fetched")
            console.log(action.payload)
            return action.payload
        })
        .addCase(addTodoAsync.pending, (state, action) => {
            console.log("pending save")
        })
        .addCase(addTodoAsync.fulfilled, (state, action) => {
            console.log("value added")
            console.log(action.payload)
            return action.payload
        })
        .addCase(editTodoAsync.pending, (state, action) => {
            console.log("pending edit")
        })
        .addCase(editTodoAsync.fulfilled, (state, action) => {
            console.log("value changed")
            console.log(action.payload)
            return action.payload
        })
    }
})

export const {addTask} = listSlice.actions;
export default listSlice.reducer;