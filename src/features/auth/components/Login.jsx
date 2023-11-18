import { useState } from 'react';
import {BsFillSignIntersectionFill}from'react-icons/bs';
import {BiShow,BiHide}from'react-icons/bi';
import {ToastContainer,toast} from'react-toastify'
import'react-toastify/dist/ReactToastify.css';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { checkUserAsync, selectLoggedInUser } from '../authSlice';
 
 
export default function LoginN() {
  const dispatch = useDispatch()
  const { register, formState: { errors }, handleSubmit } = useForm();

    const [showPassword, setShowPassword] = useState(false);
   const user = useSelector(selectLoggedInUser)
    // const [formData, setFormData] = useState({
    
    //     email: '',
    //     password: '',
    //   });
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //       ...formData,
    //       [name]: value,
    //     });
    //   };
      const toggleShowPassword = () => {
        
   
        setShowPassword(!showPassword);
     

      };
      // const handleSubmit = (e) => {
      //   e.preventDefault();
      //   if(formData.email && formData.password){
         
             
      //       toast.success('Your ar login')
      //       reset()
       
         
      //   }else{
      //     toast.error('You are not login')
          
      //   }
       
        
      // };
      // const reset = ()=>{
      //   setFormData({
      //     email:'',
      //     password:''
      //   })
      // }
    
  return (
    <>
   {user &&  <Navigate to='/' replace={true}></Navigate>}
    <div>
      <ToastContainer />
    <div className="flex items-center justify-center h-screen   ">
         <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      
      <BsFillSignIntersectionFill className="mx-auto h-10 w-auto" size={30}/>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
      <form noValidate onSubmit={handleSubmit((data)=>{
        dispatch(checkUserAsync({email:data.email,password:data.password}))
 
      })}>
      
        <div className=' mr-2'>
          <label htmlFor="email" className="block text-sm font-medium leading-6  text-gray-900">
            Email address
          </label>
          <div className="mt-2 ">
            <input
              id="email"
              
              type="email"
               
             
              {...register("email", { 
                required: "Email is requeired",
                pattern:{
                  value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message:'Email not valid'
                }
            })} 
              className="block px-3  w-full rounded-md border-0 py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset   sm:text-sm sm:leading-6"
            /> 
            {
              errors.email&&(
                <p className='text-red-500'>{errors?.email.message}</p>
              )
            }
          </div>
        </div>

        <div className='mt-5'>
          <div className="flex items-center justify-between ">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
           
          </div>
          <div className="relative border-2  mt-3">
        <input
        id="password"
         
         
          type={showPassword ? "text":'password'}
          {
            ...register('password',{
              required:'password is required',
              pattern:{
                value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                message:`- at least 8 characters\n
                - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                - Can contain special characters`
              }
            })
          }
           
          className=" block px-2  w-full rounded-md   py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400   sm:text-sm sm:leading-6"
        />
        <button
          type="button"
        
          onClick={toggleShowPassword}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
        >
          {showPassword ? <BiHide /> : <BiShow />}
        </button>
      </div>
      {
        errors.password  &&(
          <p className='text-red-500'>{errors.password.message}</p>
        )
      }
          
        </div>
        

        <div>
          <button
            type="submit"
            
            className="flex mt-7 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
           Submit
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        you do not have Any account please Reagister
        <Link to='/signup' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
           Sign Up
        </Link>
      </p>
    </div>
    </div>
  </div>
  </div>
  </>
  )
}