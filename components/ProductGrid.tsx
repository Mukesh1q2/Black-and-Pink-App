
import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onTryOn: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onTryOn }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onTryOn={onTryOn} />
      ))}
    </div>
  );
};

export default ProductGrid;
