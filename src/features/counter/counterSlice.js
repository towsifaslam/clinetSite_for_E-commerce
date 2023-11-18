import {createSlice,createAsyncThunk}from'@reduxjs/toolkit'
import {fetchCount}from'./counterApi'

const initialState = {
    value :0,
    status:'idle'
};
export const incrementAsync = createAsyncThunk(
    'counter/fetchCoun',
    async(amount)=>{
        const response = await fetchCount(amount);
        return response.data;
    }
)
export const counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        increment:(state)=>{
            state.value+=1;
        }
    },
    extraReducers:(builder)=>{
        builder
              .addCase(incrementAsync.pending,(state)=>{
                state.status = 'loading'
              })
              .addCase(incrementAsync.fulfilled,(state,action)=>{
                state.status = 'idle',
                state.value +=action.payload
              })
    }
});
export const {increment} = counterSlice.actions
export const selectCount = (state)=>state.counter.vlaue
export default counterSlice.reducer;