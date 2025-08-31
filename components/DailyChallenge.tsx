
import React from 'react';
import { SparklesIcon } from './icons';

const DailyChallenge: React.FC = () => {
  return (
    <div className="my-16 container mx-auto text-center">
      <div className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 p-8 rounded-xl border border-pink-500/30">
        <div className="flex items-center justify-center mb-4">
          <SparklesIcon className="w-8 h-8 text-pink-400 animate-pulse" />
          <h2 className="text-3xl font-bold text-pink-300 ml-3">Daily Style Challenge</h2>
        </div>
        <p className="text-xl text-gray-200">
          "Style an outfit for a cosmic disco on a rogue asteroid!"
        </p>
        <button className="mt-6 bg-transparent border-2 border-pink-500 text-pink-400 font-bold py-2 px-6 rounded-full transition-all duration-300 hover:bg-pink-500 hover:text-white hover:shadow-lg hover:shadow-pink-500/40">
          Accept Challenge
        </button>
      </div>
    </div>
  );
};

export default DailyChallenge;
