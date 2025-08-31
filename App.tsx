
import React, { useState, useEffect } from 'react';
import { Product } from './types';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import TryOnModal from './components/TryOnModal';
import NyraChat from './components/NyraChat';
import DailyChallenge from './components/DailyChallenge';
import { MOCK_PRODUCTS } from './constants';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isTryOnModalOpen, setIsTryOnModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Simulate fetching products from an API, e.g., synced from Instagram
    setProducts(MOCK_PRODUCTS);
  }, []);

  const handleTryOn = (product: Product) => {
    setSelectedProduct(product);
    setIsTryOnModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTryOnModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans cosmic-bg">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-400 animate-glow">New Arrivals</h1>
          <p className="text-gray-300 mt-2">Freshly beamed in. Just for you.</p>
        </div>
        <ProductGrid products={products} onTryOn={handleTryOn} />
        <DailyChallenge />
      </main>
      
      <NyraChat />

      {isTryOnModalOpen && selectedProduct && (
        <TryOnModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;
