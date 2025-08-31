
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6 border-b border-pink-500/20 shadow-lg shadow-pink-500/10 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin" style={{ animationDuration: '10s' }}>
              <path d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 17.27L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z" stroke="#FF007F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 17.27L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z" fill="#FF007F" fillOpacity="0.2"/>
          </svg>
          <h1 className="text-2xl font-bold tracking-widest text-pink-400 animate-glow">
            BLACK & PINK
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
