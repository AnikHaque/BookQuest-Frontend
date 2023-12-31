
// Header.tsx

import React from 'react';
import headerImg from '../../assets/header-bg.jpg'

interface HeaderProps {
    // Add any props you might need here
  }
  
  const Header: React.FC<HeaderProps> = () => {
    return (
      <header
        className="relative h-[70vh] flex items-center"
        style={{
          backgroundImage: `url(${headerImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-10" />
        <div className="container mx-auto text-white text-center relative z-20">
          <h1 className="text-4xl font-bold mb-4">Welcome to BookQuest Library</h1>
          <p className="text-lg mb-8">Discover a world of knowledge and imagination.</p>
        </div>
      </header>
    );
  };
  
  export default Header;