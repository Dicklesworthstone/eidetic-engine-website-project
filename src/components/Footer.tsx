import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900/50 py-8 border-t border-gray-800/50 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              EideticEngine - Advanced Agent Framework
            </p>
          </div>
          
          <div className="flex items-center text-sm text-gray-400">
            <p>Built with</p>
            <Heart className="w-4 h-4 mx-1 text-red-400" />
            <p>by the EideticEngine Team</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 