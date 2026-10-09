import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Play, 
  ShoppingBag, 
  Heart, 
  Star, 
  Server, 
  Zap, 
  Clock, 
  ChevronRight, 
  Eye, 
  Flame, 
  ShieldCheck,
  Cpu,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Game } from '../../types';

export const HomeView: React.FC = () => {
  const { 
    games, 
    publicServers, 
    navigate, 
    addToCart, 
    isInCart, 
    toggleWishlist, 
    isInWishlist, 
    setActiveTrailerUrl, 
    setQuickViewGame,
    addNotification
  } = useApp();

  const heroGame = games[0]; // Aetherium Rift: Retribution
  const featuredGames = games.filter(g => g.isFeatured && g.id !== heroGame.id).slice(0, 3);
  const popularGames = games.slice(1, 7);
  const specialOffers = games.filter(g => g.isSpecialOffer);

  // Flash Sale Countdown simulation (e.g. 05h 42m 19s)
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    'Action', 'Adventure', 'RPG', 'Strategy', 'Racing', 'Horror', 'Multiplayer', 'Indie', 'Simulation'
  ];

  return (
    <div className="space-y-16 pb-12">
      
      {/* 1. HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-950 shadow-2xl">
        {/* Cinematic Background Image with Gradient Scrim */}
        <div className="absolute inset-0">
          <img
            src={heroGame.coverImage}
            alt={heroGame.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-80 scale-[1.01] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-[#080a0f]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080a0f] via-[#080a0f]/60 to-transparent" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 px-6 sm:px-12 py-16 sm:py-24 max-w-3xl space-y-6">
          
          {/* Unboxed Metadata (Zero-pill rule) */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
            <span className="text-cyan-400 font-semibold tracking-wider uppercase">Featured Flagship</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{heroGame.developer}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{heroGame.rating.toFixed(1)}</span>
            </div>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">{heroGame.reviewCount.toLocaleString()} Reviews</span>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-2">
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-balance">
              {heroGame.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-200 font-medium max-w-xl leading-relaxed">
              {heroGame.tagline}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 max-w-xl leading-relaxed">
            {heroGame.description}
          </p>

          {/* Price & Primary Call-to-actions */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            
            <div className="flex items-baseline gap-2 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/60">
              <span className="text-2xl font-bold font-mono text-white">
                ${heroGame.price.toFixed(2)}
              </span>
              {heroGame.originalPrice && (
                <span className="text-sm font-mono text-slate-500 line-through">
                  ${heroGame.originalPrice.toFixed(2)}
                </span>
              )}
              {heroGame.discountPercentage && (
                <span className="text-xs font-bold text-cyan-400 font-mono">
                  -{heroGame.discountPercentage}%
                </span>
              )}
            </div>

            <button
              onClick={() => addToCart(heroGame)}
              className="py-3 px-6 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isInCart(heroGame.id) ? 'In Cart' : 'Buy Now'}</span>
            </button>

            <button
              onClick={() => setActiveTrailerUrl(heroGame.trailerUrl || 'https://www.youtube.com')}
              className="py-3 px-5 bg-slate-900/90 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Watch Trailer</span>
            </button>

            <button
              onClick={() => toggleWishlist(heroGame.id)}
              className={`p-3 rounded-xl border transition-colors ${
                isInWishlist(heroGame.id)
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                  : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isInWishlist(heroGame.id) ? 'fill-rose-400' : ''}`} />
            </button>
          </div>

          {/* Quick specs footnote */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
            <span>Size: {heroGame.downloadSizeGb} GB</span>
            <span aria-hidden="true">·</span>
            <span>Dedicated Multi-node Servers Online</span>
            <span aria-hidden="true">·</span>
            <button 
              onClick={() => navigate('game-detail', heroGame.id)}
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              Full Details <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 2. SPECIAL OFFERS / FLASH SALE */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <h2 className="font-display text-2xl font-bold text-white tracking-tight">Special Offers</h2>
            </div>
            <p className="text-xs text-slate-400">Exclusive time-limited discounts on flagship titles</p>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-xl self-start sm:self-auto text-xs">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400 font-medium">Flash Sale Ends:</span>
            <span className="font-mono font-bold text-cyan-300">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {specialOffers.slice(0, 3).map((game) => (
            <div
              key={game.id}
              className="group bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-2xl overflow-hidden transition-all flex flex-col"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                <img
                  src={game.coverImage}
                  alt={game.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {game.discountPercentage && (
                  <span className="absolute top-3 left-3 bg-cyan-500 text-slate-950 font-mono font-black text-xs px-2.5 py-1 rounded-md shadow-md">
                    -{game.discountPercentage}%
                  </span>
                )}
                <button
                  onClick={() => setQuickViewGame(game)}
                  className="absolute bottom-3 right-3 p-2 bg-black/70 hover:bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <span>{game.genres[0]}</span>
                    <span aria-hidden="true">·</span>
                    <div className="flex items-center gap-0.5 text-amber-400 font-semibold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{game.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <h3 
                    onClick={() => navigate('game-detail', game.id)}
                    className="font-display font-bold text-base text-white hover:text-cyan-300 cursor-pointer transition-colors truncate"
                  >
                    {game.title}
                  </h3>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono font-bold text-base text-white">${game.price.toFixed(2)}</span>
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
      </section>

      {/* 3. FEATURED GAMES (HORIZONTAL SHOWCASE CARDS) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">Featured Collections</h2>
            <p className="text-xs text-slate-400">Curated high-production experiences with active multiplayer populations</p>
          </div>
          <button
            onClick={() => navigate('store')}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
          >
            Explore Store <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredGames.map((game) => (
            <div
              key={game.id}
              className="group bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden transition-all flex flex-col sm:flex-row"
            >
              <div className="sm:w-1/2 aspect-video sm:aspect-auto relative overflow-hidden bg-slate-950 shrink-0">
                <img
                  src={game.coverImage}
                  alt={game.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 sm:w-1/2 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{game.genres.slice(0, 2).join(' · ')}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-400 font-semibold">{game.rating.toFixed(1)} ★</span>
                  </div>
                  <h3 
                    onClick={() => navigate('game-detail', game.id)}
                    className="font-display font-bold text-lg text-white hover:text-cyan-300 cursor-pointer transition-colors leading-snug"
                  >
                    {game.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {game.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="font-mono font-bold text-base text-white">${game.price.toFixed(2)}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuickViewGame(game)}
                      className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Quick View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => addToCart(game)}
                      className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs rounded-lg hover:from-cyan-400 hover:to-indigo-500 transition-all"
                    >
                      {isInCart(game.id) ? 'In Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. GAME SERVER HOSTING SECTION */}
      <section className="bg-gradient-to-br from-slate-900/90 via-slate-950 to-indigo-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-violet-400" />
              <h2 className="font-display text-2xl font-bold text-white tracking-tight">Dedicated Game Servers</h2>
            </div>
            <p className="text-xs text-slate-400">
              Low-latency 128Hz tick nodes hosted globally on GameForge NVMe infrastructure
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('hosting')}
              className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-violet-500/20"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Host Your Own Server</span>
            </button>
            <button
              onClick={() => navigate('servers')}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
            >
              Browse All
            </button>
          </div>
        </div>

        {/* Server Table / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {publicServers.slice(0, 3).map((server) => (
            <div
              key={server.id}
              className="p-4 bg-slate-900/80 border border-slate-800 hover:border-violet-500/40 rounded-xl transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-violet-400 font-semibold">{server.region}</span>
                  <span className="font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {server.ping}ms
                  </span>
                </div>
                <h4 className="font-semibold text-white text-xs truncate" title={server.name}>
                  {server.name}
                </h4>
                <p className="text-[11px] text-slate-400 truncate">{server.game}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="text-slate-400 text-[11px] font-mono">
                  Players: <strong className="text-white">{server.players}</strong>/{server.maxPlayers}
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${server.ip}:${server.port}`);
                    addNotification('Server Connect Copied', `Copied IP ${server.ip}:${server.port} to clipboard! Launch game to join.`, 'success');
                  }}
                  className="px-3 py-1 bg-violet-950/60 hover:bg-violet-900/80 text-violet-200 border border-violet-500/30 rounded-lg text-xs font-semibold transition-colors"
                >
                  Join Server
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. POPULAR GAMES GRID */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">Popular on GameForge</h2>
            <p className="text-xs text-slate-400">Top-rated titles trending this week across all genres</p>
          </div>
          <button
            onClick={() => navigate('store')}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
          >
            View Top 100 <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularGames.map((game) => (
            <div
              key={game.id}
              className="group bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] w-full bg-slate-950 overflow-hidden">
                <img
                  src={game.coverImage}
                  alt={game.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => setQuickViewGame(game)}
                  className="absolute bottom-2 right-2 p-1.5 bg-black/75 hover:bg-black text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Quick View"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-3 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 
                    onClick={() => navigate('game-detail', game.id)}
                    className="text-xs font-bold text-white hover:text-cyan-300 cursor-pointer truncate transition-colors"
                  >
                    {game.title}
                  </h4>
                  <p className="text-[10px] text-slate-400">{game.genres[0]}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-white">${game.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(game)}
                    className="p-1 rounded bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-colors"
                    title="Add to cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CATEGORIES & GENRES */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-white tracking-tight">Browse by Category</h2>
          <p className="text-xs text-slate-400">Discover your next obsession across 9 core disciplines</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                navigate('store');
              }}
              className="p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-center transition-all group"
            >
              <span className="text-xs font-semibold text-slate-300 group-hover:text-cyan-300 transition-colors block">
                {cat}
              </span>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};
