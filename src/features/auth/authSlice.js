import {createSlice,createAsyncThunk}from'@reduxjs/toolkit'
import { createUser,checkUser}from'./authApi'

const initialState = {
    loggedInUser :null,
    status:'idle',
    error:null
};
export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async(userData)=>{
        const response = await createUser(userData);
        return response.data;
    }
)
export const checkUserAsync = createAsyncThunk(
    'user/checkUser',
    async(userData)=>{
        const response = await checkUser(userData);
        return response.data;
    }
)
export const counterSlice = createSlice({
    name:'counter',
    initialState,
   
    extraReducers:(builder)=>{
        builder
              .addCase(createUserAsync.pending,(state)=>{
                state.status = 'loading'
              })
              .addCase(createUserAsync.fulfilled,(state,action)=>{
                state.status = 'idle',
                state.loggedInUser =action.payload
              })
              .addCase(checkUserAsync.pending,(state)=>{
                state.status = 'loading'
              })
              .addCase(checkUserAsync.fulfilled,(state,action)=>{
                state.status = 'idle',
                state.loggedInUser =action.payload
              }) 
              .addCase(checkUserAsync.rejected,(state,action)=>{
                state.status = 'idle',
                state.error =action.error
              }) 
    }
});
 
 export const selectLoggedInUser = (state)=>state.auth.loggedInUser
export default counterSlice.reducer;