import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { InputLesson, IRating, IState } from "./types"
import axios from "axios"

const initialState: IState = {
    lessons: []
}

export const getLessons = createAsyncThunk('lessons/get', async () => {
    const response = await axios.get("http://localhost:3004/lessons")
    return response.data
})

export const addLesson = createAsyncThunk('lesson/add', async (param: InputLesson) => {
    const response = await axios.post('http://localhost:3004/lessons', param)
    return response.data
})

export const addRate = createAsyncThunk(
    'rate/add',
    async (param: { lessonId: string, rating: IRating }) => {
        const { lessonId, rating } = param

        const lessonResponse = await axios.get(`http://localhost:3004/lessons/${lessonId}`)
        const lesson = lessonResponse.data

        const updatedRatings = [...lesson.ratings, rating]

        const response = await axios.patch(`http://localhost:3004/lessons/${lessonId}`, {
            ratings: updatedRatings
        })

        return response.data
    }
)


const ClassBookSlice = createSlice({
    name: 'classbook',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getLessons.fulfilled, (state, action) => {
                state.lessons = action.payload
            })
            .addCase(addLesson.fulfilled, (state, action) => {
                state.lessons.push(action.payload)
            })
            .addCase(addRate.fulfilled, (state, action) => {
                const updatedLesson = action.payload
                const index = state.lessons.findIndex(lesson => lesson.id === updatedLesson.id)
                if (index !== -1) {
                    state.lessons[index] = updatedLesson
                }
            })
    }
})

export const classReducer = ClassBookSlice.reducer