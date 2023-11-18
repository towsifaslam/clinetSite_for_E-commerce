import {createSlice,createAsyncThunk}from'@reduxjs/toolkit'
import {addToCart , fetcItemsByUserId,updateItem ,deleteItemFromCart}from'./CartApi'

const initialState = {
    
    status: 'idle',
    items:[]
 
};
export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async(item)=>{
        const response = await addToCart(item);
        return response.data;
    }
)
export const fetcItemsByUserIdAsync = createAsyncThunk(
    'cart/fetcItemsByUserId',
    async(userId)=>{  
        const response = await fetcItemsByUserId(userId);
        return response.data
    }
)
export const updateItemAsync = createAsyncThunk(
    'cart/updateItem',
    async(update)=>{
        
        const response = await updateItem(update);
        return response.data
    }
)
export const deleteItemFromCartAsync =  createAsyncThunk(
    'cart/deleteItemFromCart',
    async(itemId)=>{
        const response = await deleteItemFromCart(itemId);
        return response.data
    }
)
export const cartSlice = createSlice({
    name:'cart',
    initialState,
  
    extraReducers:(builder)=>{
        builder
              .addCase(addToCartAsync.pending,(state)=>{
                state.status = 'loading'
              })
              .addCase(addToCartAsync.fulfilled,(state,action)=>{
                  
                state.items.push(action.payload)
                 
              })
              .addCase(fetcItemsByUserIdAsync.pending,(state)=>{
                state.status = 'idle'
              })
              .addCase(fetcItemsByUserIdAsync.fulfilled,(state,action)=>{
                state.items = action.payload;
              })
              .addCase(updateItemAsync.pending,(state)=>{
                state.status='loading'
              })
              .addCase(updateItemAsync.fulfilled,(state,action)=>{
                state.status = 'idle'
                console.log(action.payload)
                const findIndex = state.items.findIndex(item=>item.id==action.payload.id);
                state.items[findIndex] = action.payload;
              })
              .addCase(deleteItemFromCartAsync.pending,(state)=>{
                state.status = 'loading'
              })
              .addCase(deleteItemFromCartAsync.fulfilled,(state,action)=>{
                const findIndex = state.items.findIndex(item=>item.id === action.payload);
                 state.items.splice(findIndex,1)
              })
    }
});
 
// export const selectCount = (state)=>state.counter.vlaue
export const selectItems = (state)=>state.cart.items
export const selectValue = (state)=>state.cart.value

export default cartSlice.reducer;