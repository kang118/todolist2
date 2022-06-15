import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getList, addTodo, updateTodo } from "./todoAPI";
import React from "react";
import axios from "axios";
import { iTodo } from '../Interfaces';

const initialState:any[] = []

const instance = axios.create({
    baseURL: `http://localhost:3000/`
})

export const fetchList = createAsyncThunk('list/fetchLists', async() => {
    let test = await instance.get('/api')
    console.log(test)
    console.log(typeof(test))
    console.log(test.data)
    console.log(typeof(test.data))
    return test.data
})

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync',
    async(payload:any) => {
        console.log("IN add todo")
        console.log(payload)
        let res:any = await instance.post('/api/create', {content: payload.task})
        console.log(res)
        console.log(typeof res)
        console.log(payload.task)
        return payload.task
    })

// export function addTodoAsync(x:any):any {
//     createAsyncThunk('todos/addTodoAsync',
//     async(x) => {
//         let res:any = await instance.post('/api/create', {content: x})
//         console.log(res)
//         console.log(typeof res)
//         return res
//     })
// } 

// })

// export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync', async(payload) => {
//     let res = await instance.post(`/api/${id}`, {id:id})
// }

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

        // delTask: (state) => {
        //     state.value = initialStateValue;
        // }
    },
    // extraReducers: {
    //     [fetchList.fulfilled]: (state, action) => {
    //         return action.payload.todos;
    //     }
    // }
    extraReducers(builder) {
        builder.addCase(fetchList.fulfilled, (state, action:any) => {
            console.log("data fetched")
            console.log(action.payload)
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
            state.push(action.payload)
        })
    }
})
//     extraReducers(builder) {
//         builder.addCase(fetchList.pending, (state, action: any) => {
//             state.value.status = 'loading'
//         })
//         .addCase(fetchList.fulfilled, (state, action: any) => {
//             state.value.status = 'succeeded'
//             state.value=action.payload
//         })
//         .addCase(fetchList.rejected, (state, action) => {
//             state.value.status = 'failed'
//         })
//     }
// })

export const {addTask} = listSlice.actions;
export default listSlice.reducer;
/*export const User = () => {
    return <h3> Welcome User xxx </h3>
}*/