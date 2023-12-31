import React from 'react';
import Loading from '../../assets/loading.svg'

const Loader = () => {
    return (
         <div className="flex items-center justify-center h-screen">
      <div className="animate-bounce">
        <img src={Loading} alt="Loading" className="h-60 w-60" />
        <p className='text-center text-2xl'>Loading...</p>
      </div>
    </div>
    );
};

export default Loader;