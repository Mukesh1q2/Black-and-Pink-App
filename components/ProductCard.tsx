
import React from 'react';
import { Product } from '../types';
import { CameraIcon, ShoppingCartIcon } from './icons';

interface ProductCardProps {
  product: Product;
  onTryOn: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onTryOn }) => {
  const isSoldOut = product.availability === 'Sold Out';

  return (
    <div className={`bg-black/30 rounded-lg overflow-hidden border border-pink-500/20 shadow-lg shadow-pink-900/20 transition-all duration-300 hover:shadow-pink-500/30 hover:border-pink-500/50 ${isSoldOut ? 'opacity-50' : ''}`}>
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-96 object-cover" />
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-2xl font-bold text-pink-500 tracking-widest -rotate-12 border-2 border-pink-500 px-4 py-2">SOLD OUT</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-200">{product.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xl font-semibold text-pink-400">{product.price}</p>
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${isSoldOut ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
            {product.availability}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => onTryOn(product)}
            disabled={isSoldOut}
            className="flex items-center justify-center w-full bg-pink-600/80 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-600/30 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <CameraIcon className="w-5 h-5 mr-2" />
            Try It On
          </button>
          <button
            disabled={isSoldOut}
            className="flex items-center justify-center w-full bg-gray-700/80 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 hover:bg-gray-700 disabled:cursor-not-allowed"
          >
             <ShoppingCartIcon className="w-5 h-5 mr-2" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
