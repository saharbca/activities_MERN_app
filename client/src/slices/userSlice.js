import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
export const  registerUser= createAsyncThunk('user/registerUser', async(data,{rejectWithValue})=>{
    try {
        const res= await axios.post('/users/register',data)
        return res.data
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message)
    }
})

export const loginUser= createAsyncThunk('user/loginUser',async(info,{rejectWithValue})=>{
    try {
        const res = await axios.post('/users/login',info)
        return res.data
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message)
    }
})
const userSlice = createSlice({
    name:'user',
    initialState: {
        userInfo: {}, 
        token: localStorage.getItem('token') || null, 
        isAuth:Boolean(localStorage.getItem('isAuth')) || false,
        errors:null, 
    },
    reducers:{
        logout:(state)=>{
            localStorage.clear()
            state.token = null
            state.isAuth=false
        }, 
    },
extraReducers:{
    [registerUser.fulfilled]:(state,action)=>{
        state.token=action.payload.token
        localStorage.setItem('token',action.payload.token)
        localStorage.setItem('isAuth',true)
        state.isAuth=true
        state.errors=null
    },
    [registerUser.rejected]:(state,action)=>{
         state.errors= action.payload
    },
    [loginUser.fulfilled]:(state,action)=>{
        state.token=action.payload.token
        localStorage.setItem('token',action.payload.token)
        localStorage.setItem('isAuth',true)
        state.isAuth=true
        state.errors=null
        },
    [loginUser.rejected]:(state,action)=>{
        state.errors= action.payload
    },
}
});

export default userSlice.reducer;
export const {logout}=userSlice.actions;