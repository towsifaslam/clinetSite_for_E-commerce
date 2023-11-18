import {configureStore}from'@reduxjs/toolkit'
 
 import productListSlice from '../features/product-lists/productListSlice'
import authReducer from '../features/auth/authSlice'
 import cartReducer from '../features/cart/cartSlice'
export const store = configureStore({
    reducer:{
        product:productListSlice,
        auth:authReducer,
        cart:cartReducer
     
    }
})