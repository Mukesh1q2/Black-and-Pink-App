import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Product } from '../types';
import { virtualTryOn } from '../services/geminiService';
import { CloseIcon, UploadIcon, RetryIcon, DownloadIcon, ShareIcon, ShoppingCartIcon } from './icons';

interface TryOnModalProps {
  product: Product;
  onClose: () => void;
}

const PoseGuide: React.FC = () => (
    <svg viewBox="0 0 100 150" className="absolute inset-0 w-full h-full text-pink-500/30">
      <circle cx="50" cy="20" r="10" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2 2" />
      <line x1="50" y1="30" x2="50" y2="70" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="50" y1="70" x2="35" y2="110" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="50" y1="70" x2="65" y2="110" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="35" y1="110" x2="30" y2="145" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="65" y1="110" x2="70" y2="145" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
);

const loadingMessages = [
    "Warming up the cosmic loom...",
    "Aligning the star patterns...",
    "Nyra is working her magic ✨",
    "Stitching with threads of nebula...",
    "Almost ready to reveal your new look! 💖"
];

const TryOnModal: React.FC<TryOnModalProps> = ({ product, onClose }) => {
  const [userImageFile, setUserImageFile] = useState<File | null>(null);
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let interval: number;
    if (isLoading) {
        setLoadingMessage(loadingMessages[0]); // Reset on new loading
        interval = window.setInterval(() => {
            setLoadingMessage(prev => {
                const currentIndex = loadingMessages.indexOf(prev);
                return loadingMessages[(currentIndex + 1) % loadingMessages.length];
            });
        }, 2500);
    }
    return () => window.clearInterval(interval);
  }, [isLoading]);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUserImageFile(file);
      setUserImageUrl(URL.createObjectURL(file));
      setGeneratedImageUrl(null);
      setError(null);
    }
  };

  const handleTryOn = useCallback(async () => {
    if (!userImageFile) {
      setError("Please upload an image first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const resultUrl = await virtualTryOn(userImageFile, product.imageUrl);
      setGeneratedImageUrl(resultUrl);
    } catch (err) {
      setError("Sorry, the cosmic rays interfered. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userImageFile, product.imageUrl]);

  const reset = () => {
      setUserImageFile(null);
      setUserImageUrl(null);
      setGeneratedImageUrl(null);
      setError(null);
      if(fileInputRef.current) {
          fileInputRef.current.value = "";
      }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-end justify-center z-50 p-4 pt-10 md:items-center md:p-4">
      <div className="bg-[#1a1a1a] border border-pink-500/30 rounded-t-xl md:rounded-xl shadow-2xl shadow-pink-900/40 w-full max-w-4xl max-h-full flex flex-col animate-slide-up">
        
        <div className="flex justify-between items-center p-4 border-b border-pink-500/20 flex-shrink-0">
          <h2 className="text-xl font-bold text-pink-400">Try On: {product.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 flex-grow overflow-y-auto">
            <p className="text-center text-gray-300 mb-4">
                Ready to see if you’re angelic 😇 or devilish 😈 in this fit? Try it on!
            </p>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Input Section */}
            <div className="flex flex-col items-center justify-center space-y-4">
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-full h-96 bg-black/30 border-2 border-dashed border-pink-500/40 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-pink-500/80 transition-colors">
                    {userImageUrl ? (
                        <img src={userImageUrl} alt="Your selfie" className="w-full h-full object-contain rounded-lg" />
                    ) : (
                       <>
                        <PoseGuide />
                        <UploadIcon className="w-12 h-12 text-pink-500/60 mb-2" />
                        <span className="text-gray-400">Upload or take a photo</span>
                        <span className="text-xs text-gray-500">For best results, use a full-body shot.</span>
                       </>
                    )}
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    capture="user"
                    className="hidden"
                />
                 <button 
                    onClick={handleTryOn} 
                    disabled={isLoading || !userImageFile}
                    className="w-full bg-pink-600 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 hover:bg-pink-500 hover:shadow-lg hover:shadow-pink-500/40 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                    {isLoading ? 'Conjuring...' : 'Generate Style'}
                </button>
                <button onClick={reset} className="text-sm text-gray-400 hover:text-pink-400 flex items-center">
                    <RetryIcon className="w-4 h-4 mr-1" />
                    Start Over
                </button>
            </div>
            
            {/* Output Section */}
            <div className="flex flex-col h-full">
                <div className="w-full h-96 bg-black/30 border border-pink-500/20 rounded-lg flex items-center justify-center relative flex-grow">
                    {isLoading && (
                        <div className="flex flex-col items-center text-pink-400 text-center p-4">
                            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-4 animate-pulse">{loadingMessage}</p>
                        </div>
                    )}
                    {!isLoading && generatedImageUrl && (
                        <img src={generatedImageUrl} alt="Virtual try-on result" className="w-full h-full object-contain rounded-lg" />
                    )}
                    {!isLoading && !generatedImageUrl && (
                        <div className="text-center text-gray-500 p-4">
                        <p className="text-lg">Your cosmic new look will appear here.</p>
                        {error && <p className="mt-4 text-red-400">{error}</p>}
                        </div>
                    )}
                </div>
                {generatedImageUrl && !isLoading && (
                    <div className="mt-4 space-y-2 flex-shrink-0">
                        <p className="text-center text-pink-300">How does that fit, darling? 😇</p>
                        <div className="grid grid-cols-3 gap-3">
                            <button className="flex items-center justify-center w-full bg-gray-700/80 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 hover:bg-gray-700">
                                <DownloadIcon className="w-5 h-5 mr-2" />
                                Save
                            </button>
                            <button className="flex items-center justify-center w-full bg-gray-700/80 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 hover:bg-gray-700">
                                <ShareIcon className="w-5 h-5 mr-2" />
                                Share
                            </button>
                                <button className="flex items-center justify-center w-full bg-pink-600/80 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-600/30">
                                <ShoppingCartIcon className="w-5 h-5 mr-2" />
                                Buy Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0 mt-4 text-xs text-center text-gray-500 bg-black/20 p-2 rounded-b-md border-t border-gray-700/50">
            <strong>Your Privacy is Our Priority 💖:</strong> Your photo is processed securely and is never stored. A production app would perform this magic on your device.
        </div>
      </div>
    </div>
  );
};

export default TryOnModal;