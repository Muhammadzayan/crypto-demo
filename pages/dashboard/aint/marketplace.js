import React, { useState } from 'react';
import DashboardLayout from '../layout';
import { Search, Filter, ShoppingCart, Star, Eye, Heart, Plus } from 'lucide-react';

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'gold', name: 'Gold Products' },
    { id: 'crypto', name: 'Crypto Assets' },
    { id: 'nft', name: 'NFTs' },
    { id: 'services', name: 'Services' }
  ];

  const products = [
    {
      id: 1,
      title: '1oz Gold Bar - PAMP Suisse',
      price: '2,050',
      currency: 'USD',
      image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'GoldVault Pro',
      rating: 4.9,
      reviews: 156,
      category: 'gold',
      featured: true
    },
    {
      id: 2,
      title: 'Premium AINT Staking Package',
      price: '5,000',
      currency: 'AINT',
      image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'AINT Foundation',
      rating: 4.8,
      reviews: 89,
      category: 'crypto',
      featured: true
    },
    {
      id: 3,
      title: 'Gold-Backed NFT Collection',
      price: '1.5',
      currency: 'ETH',
      image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'ArtGold Studio',
      rating: 4.7,
      reviews: 234,
      category: 'nft',
      featured: false
    },
    {
      id: 4,
      title: 'Crypto Portfolio Management',
      price: '299',
      currency: 'USD',
      image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'CryptoAdvisors',
      rating: 4.6,
      reviews: 67,
      category: 'services',
      featured: false
    },
    {
      id: 5,
      title: '10g Gold Coins Set',
      price: '650',
      currency: 'USD',
      image: 'https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'CoinMaster',
      rating: 4.9,
      reviews: 123,
      category: 'gold',
      featured: false
    },
    {
      id: 6,
      title: 'Bitcoin Mining Contract',
      price: '0.1',
      currency: 'BTC',
      image: 'https://images.pexels.com/photos/844127/pexels-photo-844127.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'MiningPool Pro',
      rating: 4.5,
      reviews: 45,
      category: 'crypto',
      featured: false
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price.replace(',', '')) - parseFloat(b.price.replace(',', ''));
      case 'price-high':
        return parseFloat(b.price.replace(',', '')) - parseFloat(a.price.replace(',', ''));
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
      default:
        return b.id - a.id;
    }
  });

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h1>
                <p className="text-gray-600">Buy and sell gold, crypto assets, and services</p>
              </div>
              <button className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Plus className="w-5 h-5 mr-2" />
                List Item
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 mr-2" />
                More Filters
              </button>
            </div>
          </div>

          {/* Featured Products */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedProducts.filter(p => p.featured).map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                    <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h3>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                        <span className="ml-1 text-sm text-gray-500">({product.reviews} reviews)</span>
                      </div>
                      <span className="ml-auto text-sm text-gray-600">by {product.seller}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-purple-600">
                        {product.price} {product.currency}
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <Eye className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Products */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                    />
                    {product.featured && (
                      <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    )}
                    <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                        <span className="ml-1 text-sm text-gray-500">({product.reviews})</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">by {product.seller}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-purple-600">
                        {product.price} {product.currency}
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Load More Products
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}