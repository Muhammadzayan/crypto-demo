import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout';
import { Clock, TrendingUp, Globe, Bookmark, Share2, ExternalLink } from 'lucide-react';

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [news, setNews] = useState([]);

  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'crypto', name: 'Cryptocurrency' },
    { id: 'stocks', name: 'Stock Market' },
    { id: 'gold', name: 'Gold & Commodities' },
    { id: 'forex', name: 'Forex' },
    { id: 'economy', name: 'Global Economy' }
  ];

  // Mock news data - in real app, this would come from news APIs
  const mockNews = [
    {
      id: 1,
      title: 'Bitcoin Reaches New All-Time High as Institutional Adoption Grows',
      summary: 'Major corporations continue to add Bitcoin to their treasury reserves, driving unprecedented demand and price appreciation.',
      category: 'crypto',
      source: 'CryptoNews Today',
      publishedAt: '2024-01-15T10:30:00Z',
      image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=400',
      trending: true
    },
    {
      id: 2,
      title: 'Gold Prices Surge Amid Global Economic Uncertainty',
      summary: 'Precious metals see increased demand as investors seek safe-haven assets during market volatility.',
      category: 'gold',
      source: 'Financial Times',
      publishedAt: '2024-01-15T09:15:00Z',
      image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400',
      trending: true
    },
    {
      id: 3,
      title: 'Federal Reserve Signals Potential Interest Rate Changes',
      summary: 'Central bank officials hint at monetary policy adjustments in response to inflation data.',
      category: 'economy',
      source: 'Reuters',
      publishedAt: '2024-01-15T08:45:00Z',
      image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400',
      trending: false
    },
    {
      id: 4,
      title: 'Tech Stocks Rally on Strong Earnings Reports',
      summary: 'Major technology companies exceed expectations, boosting investor confidence in the sector.',
      category: 'stocks',
      source: 'MarketWatch',
      publishedAt: '2024-01-15T07:20:00Z',
      image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400',
      trending: false
    },
    {
      id: 5,
      title: 'Ethereum 2.0 Upgrade Shows Promising Results',
      summary: 'Network improvements lead to reduced transaction fees and increased scalability.',
      category: 'crypto',
      source: 'Ethereum Foundation',
      publishedAt: '2024-01-15T06:30:00Z',
      image: 'https://images.pexels.com/photos/844127/pexels-photo-844127.jpeg?auto=compress&cs=tinysrgb&w=400',
      trending: true
    },
    {
      id: 6,
      title: 'USD Strengthens Against Major Currencies',
      summary: 'Dollar index rises as economic data supports Federal Reserve policy stance.',
      category: 'forex',
      source: 'Bloomberg',
      publishedAt: '2024-01-15T05:45:00Z',
      image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=400',
      trending: false
    }
  ];

  useEffect(() => {
    setNews(mockNews);
  }, []);

  const filteredNews = news.filter(article => 
    selectedCategory === 'all' || article.category === selectedCategory
  );

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor((now - published) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial News</h1>
            <p className="text-gray-600">Stay updated with the latest financial market news and analysis</p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-shrink-0 px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main News Feed */}
            <div className="lg:col-span-3">
              {/* Trending News */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="mr-2 text-emerald-600" />
                  Trending Now
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredNews.filter(article => article.trending).slice(0, 2).map((article) => (
                    <div key={article.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                      <div className="relative">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Trending
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-3">
                          <span className="text-sm text-emerald-600 font-medium capitalize">
                            {article.category}
                          </span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{article.source}</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTimeAgo(article.publishedAt)}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {article.summary}
                        </p>
                        <div className="flex items-center justify-between">
                          <button className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium">
                            Read More
                            <ExternalLink className="w-4 h-4 ml-1" />
                          </button>
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                              <Bookmark className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* All News */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest News</h2>
                <div className="space-y-6">
                  {filteredNews.map((article) => (
                    <div key={article.id} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
                      <div className="flex flex-col md:flex-row gap-6">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full md:w-48 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center mb-3">
                            <span className="text-sm text-emerald-600 font-medium capitalize">
                              {article.category}
                            </span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-500">{article.source}</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatTimeAgo(article.publishedAt)}
                            </span>
                            {article.trending && (
                              <>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-sm text-red-500 font-medium">Trending</span>
                              </>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {article.summary}
                          </p>
                          <div className="flex items-center justify-between">
                            <button className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium">
                              Read Full Article
                              <ExternalLink className="w-4 h-4 ml-1" />
                            </button>
                            <div className="flex space-x-2">
                              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <Bookmark className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <Share2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Market Summary */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Globe className="mr-2 text-emerald-600" />
                  Market Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">S&P 500</span>
                    <div className="text-right">
                      <div className="font-semibold">4,750.20</div>
                      <div className="text-green-600 text-sm">+1.2%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Bitcoin</span>
                    <div className="text-right">
                      <div className="font-semibold">$43,250</div>
                      <div className="text-green-600 text-sm">+3.5%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Gold</span>
                    <div className="text-right">
                      <div className="font-semibold">$2,050</div>
                      <div className="text-red-600 text-sm">-0.8%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">AINT</span>
                    <div className="text-right">
                      <div className="font-semibold">$280.50</div>
                      <div className="text-green-600 text-sm">+4.6%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Popular Topics */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Popular Topics</h3>
                <div className="space-y-3">
                  {['Bitcoin ETF', 'Federal Reserve', 'Gold Reserves', 'Inflation Data', 'Tech Earnings'].map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">{topic}</span>
                      <span className="text-sm text-gray-500">{Math.floor(Math.random() * 50) + 10} articles</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Stay Informed</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get daily market updates and analysis delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}