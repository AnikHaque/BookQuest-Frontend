import React, { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../redux/features/user/userThunk';
import { useToast } from '../components/ui/use-toast';
import backgroundImage from "../assets/header-bg.jpg"
import { Toaster } from '../components/ui/toaster';
import Loader from '../components/ui/Loader';

const SignUp = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toast } = useToast()
    const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { user, isLoading, isError, error} = useAppSelector(state => state.user);
  useEffect(()=> {
    if(!isLoading && user.email){
      navigate('/')
      toast({
        variant: "success",
        description: "Registration successful",
        duration: 2000
      })
    }
  }, [user.email, isLoading])

  useEffect(()=> {
    if(!isLoading && isError){
      console.log("Login failed")
      toast({
        variant: "destructive",
        title: "sign up failed",
        description: error
      })
    }
  }, [isLoading, isError, error])

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if( formData.password === formData.confirmPassword){
        dispatch(createUser({
            email: formData.email,
            username: formData.username,
            password: formData.password
        }))
    }else{
      toast({
        variant: "destructive",
        duration: 2000,
        description: "Passwords do not match"
      })
    }
  };

  if( isLoading ) {
    return <Loader />;
  }

  return (
    <div className='flex h-screen'>
    <div
        className='w-2/3 relative p-10 text-white transform -skew-x-12 -ml-24'
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <Link to="/" className="absolute top-4 text-2xl font-mono font-bold left-24 text-white hover:text-indigo-500">
         BookQuest
        </Link>
        <div className="flex flex-col justify-center items-center h-full text-center">
          <p className="text-lg text-white font-semibold mb-4 z-30">"Books are a uniquely portable magic." - Stephen King</p>
        </div>
      </div>

    <div className="flex flex-col items-center justify-center h-screen w-1/3 bg-white pl-24">
      <h2 className="text-3xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="w-72">
        <div className="mb-3">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 h-10 border px-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 h-10 border px-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 h-10 border px-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 h-10 border px-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
       <div  className='mb-5 py-2 font-semibold hover:text-indigo-700'> <Link to="/login">
        Already have an account?
        </Link></div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
      </form>
    </div>
    <Toaster />
    </div>
  );
};

export default SignUp;