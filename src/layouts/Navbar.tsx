import React, { useState } from 'react';
import { FaBook, FaHome, FaInfoCircle,  FaBars, FaTimes } from 'react-icons/fa';
import { GiBookshelf } from 'react-icons/gi';
import { PiClipboardTextBold } from 'react-icons/pi';
import { AiOutlineRead } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { logout } from '../redux/features/user/userSlice';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';



const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch()
  const { toast } = useToast();
  const { user, isLoading } = useAppSelector( state => state.user)
  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(logout());
      toast({
        variant: "success",
        description: "Login in successful",
        duration: 2000
      })
    })
  }

  if(isLoading){
    return <div></div>
  }

  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
         <Link to={'/'} className='transform -skew-x-12'>
         <span className="text-white font-bold text-2xl font-mono">
     
            BookQuest
          </span>
         </Link>
        </div>
        <div className="hidden md:flex items-center">
          <Link to={'/'} className="text-white mx-4 flex items-center">
            <FaHome className="inline mr-2" />
           <span> Home</span>
          </Link>
          <Link to="/books" className="text-white mx-4 flex items-center">
            <GiBookshelf className="inline mr-2" />
            <span>All Books</span>
          </Link>
         { !user.email && <div className='flex gap-5'>
         <Link to={'/signup'}>
          <button
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500  hover:bg-indigo-100 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
          </Link>
         <Link to={'/login'}>
          <button
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-100 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
          </Link>
         </div>}
       {user?.email &&  <>
        <Link to="/my-wishlist" className="text-white mx-4 flex items-center">
            <PiClipboardTextBold className="inline mr-2" />
            <span>Wishlist</span>
          </Link>
        <Link to="/my-readlist" className="text-white mx-4 flex items-center">
            <AiOutlineRead className="inline mr-2" />
            <span>Reading</span>
          </Link>
        <div>
          <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar>
                      <AvatarImage src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    Logout                             
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
          </div>
       </> }
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden pl-8">
          <Link to="/" className="block text-white my-2">
       
            Home
          </Link>
          <Link to="/" className="block text-white my-2">
       
           <span> All Books</span>
          </Link>
      { !user.email && <>
        <Link to="/login" className="block text-white my-2">
           <span> Login</span>
          </Link>
          <Link to="/signup" className="block text-white my-2">        
           <span> Signup</span>
          </Link>
      </> }
         {user.email && <button className="block text-white my-2" onClick={handleLogout}>         
           <span> Logout</span>
          </button>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;