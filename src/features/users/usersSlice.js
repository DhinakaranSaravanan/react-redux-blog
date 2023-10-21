import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'
const initialState = [
  /*   {
        id : 0,
        name : 'dk'
    },
    {
        id : 1,
        name : 'dhina'
    },
    {
        id : 2,
        name : 'dhinakaran'
    } */
]

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL)
    return response.data
}) 

const usersSlice = createSlice({
    name : 'users',
    initialState,
    reducers :{},
    extraReducers(builder){
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                //Here replace the data not taking the shallow copy because we  prevent the data duplication
                return action.payload
            })
    }
})

export const selectAllUsers = (state) => state.users;
export const selectUserById = (state, userId) => state.users.find(user => user.id === userId)
export default usersSlice.reducer