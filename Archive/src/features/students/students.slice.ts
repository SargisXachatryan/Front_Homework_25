import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IState, InputStudent } from "./types";
import axios from "axios";

const  initialState:IState={
    list:[]
}

export const getAllStudents = createAsyncThunk('students/get', async () => {
    const response = await axios.get("http://localhost:3004/students")
    return response.data
})

export const addStudent = createAsyncThunk('students/add', async (params:InputStudent) => {
    const response = await axios.post("http://localhost:3004/students",params)
    return response.data
})
const StudentSlice = createSlice({
    name:'students',
    initialState:initialState,
    reducers:{},
    extraReducers:builder=>{
        builder
        .addCase(getAllStudents.fulfilled, (state, action) => {
            state.list= action.payload
        })
        .addCase(addStudent.fulfilled, (state, action) => {
            state.list.push(action.payload)
        })
    }
})

export const studentReducer = StudentSlice.reducer