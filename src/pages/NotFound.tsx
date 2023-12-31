import React from 'react';
import not_found from '../assets/not_found.svg'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen">
        <div className='flex flex-col items-center justify-center'>
          <img src={not_found} alt="Loading" className="h-96 w-96" />
          <p className='text-center text-2xl'>Page Not found</p>
          <Link to={'/'} className='text-center text-indigo-500 font-semibold text-2xl'>Back to Home</Link>
        </div>
      </div>
    );
};

export default NotFound;