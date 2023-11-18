 
import './App.css'
 
// import Counter from './features/counter/Counter'
 import Home from './Pages/Home'
import LoginPages from './Pages/LoginPages'
import SignupPages from './Pages/SignupPages'
// import { createRoot } from "react-dom/client";
 
import {
  createBrowserRouter,
  RouterProvider,
   
} from "react-router-dom";
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
 import ProductDetailPage from './Pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetcItemsByUserIdAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';


const router = createBrowserRouter([
  {
    path: "/",
    element:<Protected>
      <Home></Home>
    </Protected>
  },
  {
    path: "/login",
    element: <LoginPages></LoginPages>,
  },
  {
    path: "/signup",
    element: <SignupPages></SignupPages>,
  },
  {
    path: "/cart",
    element:<Protected><CartPage></CartPage></Protected> 
  },
  {
    path: "/checkout",
    element:<Protected><CheckoutPage></CheckoutPage></Protected>
  },
  {
    path: "/product-detail/:id",
    element:<Protected><ProductDetailPage></ProductDetailPage></Protected>
  },
]);

function App() {
   
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  //  console.log("towsif",user[0].id)
    useEffect(()=>{
      if(user){

        dispatch(fetcItemsByUserIdAsync(user[0]?.id || 0))

      }
    },[dispatch,user])

  return (
    <div>
       <RouterProvider router={router} />

    </div>
  )
}

export default App
