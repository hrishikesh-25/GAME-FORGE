import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Star, 
  ShoppingBag, 
  Heart, 
  Eye, 
  SlidersHorizontal,
  X,
  Users,
  Check
} from 'lucide-react';
import { Game } from '../../types';

export const StoreView: React.FC = () => {
  const { 
    games, 
    navigate, 
    addToCart, 
    isInCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewGame,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [multiplayerFilter, setMultiplayerFilter] = useState<'all' | 'multi' | 'single'>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'newest' | 'price-asc' | 'price-desc'>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const genres = ['All', 'Action', 'Adventure', 'RPG', 'Strategy', 'Racing', 'Horror', 'Multiplayer', 'Indie', 'Simulation'];

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = game.title.toLowerCase().includes(query);
        const matchTags = game.tags.some(t => t.toLowerCase().includes(query));
        const matchGenre = game.genres.some(g => g.toLowerCase().includes(query));
        if (!matchTitle && !matchTags && !matchGenre) return false;
      }

      // Genre
      if (selectedGenre !== 'All' && !game.genres.includes(selectedGenre)) {
        return false;
      }

      // Price
      if (selectedPriceRange === 'under-20' && game.price >= 20) return false;
      if (selectedPriceRange === 'under-40' && (game.price < 20 || game.price >= 40)) return false;
      if (selectedPriceRange === '40-plus' && game.price < 40) return false;

      // Rating
      if (minRating > 0 && game.rating < minRating) return false;

      // Multiplayer
      if (multiplayerFilter === 'multi' && !game.isMultiplayer) return false;
      if (multiplayerFilter === 'single' && game.isMultiplayer) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popularity') return b.reviewCount - a.reviewCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0;
    });
  }, [games, searchQuery, selectedGenre, selectedPriceRange, minRating, multiplayerFilter, sortBy]);

  const resetFilters = () => {
    setSelectedGenre('All');
    setSelectedPriceRange('all');
    setMinRating(0);
    setMultiplayerFilter('all');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedGenre !== 'All' || selectedPriceRange !== 'all' || minRating > 0 || multiplayerFilter !== 'all' || searchQuery !== '';

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header banner */}
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-extrabold text-white tracking-tight">Game Marketplace</h1>
        <p className="text-xs text-slate-400">
          Discover verified next-gen titles with direct dedicated server matchmaking integration
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-4">
        
        {/* Top filter row: Search + Sort + View */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by title, genre, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort & View toggles */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Releases</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Second filter row: Interactive Segmented Category Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedGenre === g
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Third filter row: Price, Rating, Multiplayer mode */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Price pills/selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Price:</span>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
              >
                <option value="all">Any Price</option>
                <option value="under-20">Under $20</option>
                <option value="under-40">$20 – $40</option>
                <option value="40-plus">$40+</option>
              </select>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Rating:</span>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
              >
                <option value={0}>All Ratings</option>
                <option value={4.5}>4.5+ ★ Stars</option>
                <option value={4.7}>4.7+ ★ Stars</option>
              </select>
            </div>

            {/* Multiplayer mode */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Mode:</span>
              <button
                onClick={() => setMultiplayerFilter(multiplayerFilter === 'multi' ? 'all' : 'multi')}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  multiplayerFilter === 'multi'
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                Multiplayer Only
              </button>
            </div>
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-rose-400 hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Reset all filters
            </button>
          )}
        </div>

      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing <strong className="text-white font-mono">{filteredGames.length}</strong> games</span>
        <span className="text-slate-500">GameForge Verified DRM-Free Store</span>
      </div>

      {/* Games List or Grid */}
      {filteredGames.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <p className="text-base text-slate-300 font-semibold">No games match your current filter criteria.</p>
          <p className="text-xs text-slate-500">Try adjusting your genre or price filters to see more results.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-cyan-400 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="group bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden">
                <img
                  src={game.coverImage}
                  alt={game.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {game.discountPercentage && (
                  <span className="absolute top-2.5 left-2.5 bg-cyan-500 text-slate-950 font-mono font-black text-xs px-2 py-0.5 rounded shadow">
                    -{game.discountPercentage}%
                  </span>
                )}
                <button
                  onClick={() => setQuickViewGame(game)}
                  className="absolute bottom-2.5 right-2.5 p-2 bg-black/75 hover:bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <span>{game.genres.slice(0, 2).join(' · ')}</span>
                    <span aria-hidden="true">·</span>
                    <div className="flex items-center gap-0.5 text-amber-400 font-semibold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{game.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <h3
                    onClick={() => navigate('game-detail', game.id)}
                    className="font-display font-bold text-sm text-white hover:text-cyan-300 cursor-pointer transition-colors leading-tight line-clamp-1"
                  >
                    {game.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {game.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono text-sm font-bold text-white">${game.price.toFixed(2)}</span>
                    {game.originalPrice && (
                      <span className="font-mono text-xs text-slate-500 line-through">
                        ${game.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleWishlist(game.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isInWishlist(game.id)
                          ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                          : 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isInWishlist(game.id) ? 'fill-rose-400' : ''}`} />
                    </button>
                    <button
                      onClick={() => addToCart(game)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 text-xs font-semibold rounded-lg transition-colors border border-slate-700 hover:border-cyan-400"
                    >
                      {isInCart(game.id) ? 'In Cart' : 'Buy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="space-y-3">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="group bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition-all flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={game.coverImage}
                  alt={game.title}
                  referrerPolicy="no-referrer"
                  className="w-20 h-16 object-cover rounded-xl bg-slate-950 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{game.developer}</span>
                    <span aria-hidden="true">·</span>
                    <span>{game.genres.join(', ')}</span>
                  </div>
                  <h3
                    onClick={() => navigate('game-detail', game.id)}
                    className="font-display font-bold text-base text-white hover:text-cyan-300 cursor-pointer transition-colors truncate"
                  >
                    {game.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1">{game.tagline}</p>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <div className="flex items-center gap-1 text-amber-400 font-semibold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{game.rating.toFixed(1)}</span>
                </div>

                <div className="text-right">
                  <span className="font-mono text-base font-bold text-white block">
                    ${game.price.toFixed(2)}
                  </span>
                  {game.originalPrice && (
                    <span className="font-mono text-xs text-slate-500 line-through">
                      ${game.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuickViewGame(game)}
                    className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                    title="Quick View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(game.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      isInWishlist(game.id)
                        ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                        : 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(game.id) ? 'fill-rose-400' : ''}`} />
                  </button>
                  <button
                    onClick={() => addToCart(game)}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs rounded-xl hover:from-cyan-400 hover:to-indigo-500 transition-all shadow-md shadow-cyan-500/15"
                  >
                    {isInCart(game.id) ? 'In Cart' : 'Buy Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
