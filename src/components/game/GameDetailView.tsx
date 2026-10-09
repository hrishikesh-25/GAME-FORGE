import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Play, 
  ArrowLeft, 
  Server, 
  Check, 
  Cpu, 
  HardDrive, 
  Monitor, 
  Layers, 
  ThumbsUp, 
  MessageSquare,
  Users,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Game } from '../../types';

export const GameDetailView: React.FC = () => {
  const { 
    selectedGameId, 
    games, 
    navigate, 
    addToCart, 
    isInCart, 
    toggleWishlist, 
    isInWishlist, 
    setActiveTrailerUrl, 
    publicServers,
    reviews,
    addReview,
    addNotification
  } = useApp();

  const game = games.find(g => g.id === selectedGameId) || games[0];
  const [selectedScreenshotIdx, setSelectedScreenshotIdx] = useState(0);

  // Review Form state
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewContent, setNewReviewContent] = useState('');
  const [isRecommended, setIsRecommended] = useState(true);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const gameServers = publicServers.filter(s => s.gameId === game.id);
  const gameReviews = reviews.filter(r => r.gameId === game.id);

  const inCart = isInCart(game.id);
  const inWish = isInWishlist(game.id);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewContent.trim()) return;

    setIsSubmittingReview(true);
    setTimeout(() => {
      addReview(game.id, newReviewRating, newReviewContent.trim(), isRecommended);
      setNewReviewContent('');
      setIsSubmittingReview(false);
    }, 400);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('store')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Store</span>
          <span aria-hidden="true">/</span>
          <span>{game.genres[0]}</span>
          <span aria-hidden="true">/</span>
          <span className="text-slate-300">{game.title}</span>
        </div>
      </div>

      {/* Main Header / Cinematic Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Media Gallery (16:9 large viewer + thumbnails) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group">
            <img
              src={game.screenshots[selectedScreenshotIdx] || game.coverImage}
              alt={game.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            
            {/* Trailer Play Overlay button */}
            <button
              onClick={() => setActiveTrailerUrl(game.trailerUrl || 'https://www.youtube.com')}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 group-hover:opacity-100 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110">
                <Play className="w-7 h-7 fill-slate-950 ml-1" />
              </div>
            </button>

            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-slate-300 border border-white/10">
              Click to view 4K cinematic trailer
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="grid grid-cols-4 gap-3">
            {game.screenshots.map((shot, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedScreenshotIdx(idx)}
                className={`aspect-video rounded-xl overflow-hidden border transition-all ${
                  selectedScreenshotIdx === idx
                    ? 'border-cyan-400 ring-2 ring-cyan-400/40'
                    : 'border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={shot} alt="Screenshot" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module (Sticky on Desktop) */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-cyan-400 font-semibold">{game.developer}</span>
              <span aria-hidden="true">·</span>
              <span>{game.releaseDate}</span>
            </div>
            <h1 className="font-display text-2xl font-extrabold text-white leading-tight">
              {game.title}
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              {game.tagline}
            </p>
          </div>

          {/* Rating & Reviews unboxed stats */}
          <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Community Sentiment:</span>
              <span className="text-emerald-400 font-semibold">Overwhelmingly Positive</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">User Rating:</span>
              <div className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{game.rating.toFixed(1)} / 5.0</span>
                <span className="text-slate-500 font-normal">({game.reviewCount.toLocaleString()})</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Download Payload:</span>
              <span className="text-slate-200 font-mono">{game.downloadSizeGb} GB SSD</span>
            </div>
          </div>

          {/* Genres / Tags */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-400">Genres & Themes:</span>
            <div className="text-xs text-slate-300 leading-relaxed">
              {game.genres.concat(game.tags).slice(0, 6).join(' · ')}
            </div>
          </div>

          {/* Price & Primary Purchase Actions */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-white">
                ${game.price.toFixed(2)}
              </span>
              {game.originalPrice && (
                <span className="text-sm font-mono text-slate-500 line-through">
                  ${game.originalPrice.toFixed(2)}
                </span>
              )}
              {game.discountPercentage && (
                <span className="text-xs font-bold text-cyan-400 font-mono bg-cyan-950 border border-cyan-500/30 px-2 py-0.5 rounded">
                  -{game.discountPercentage}%
                </span>
              )}
            </div>

            <button
              onClick={() => addToCart(game)}
              className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                inCart
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-slate-950 shadow-cyan-500/20'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{inCart ? 'Already in Cart — Open' : 'Add to Cart / Buy Now'}</span>
            </button>

            <button
              onClick={() => toggleWishlist(game.id)}
              className={`w-full py-2.5 px-4 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
                inWish
                  ? 'bg-rose-500/10 border-rose-500 text-rose-400'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Heart className={`w-4 h-4 ${inWish ? 'fill-rose-400' : ''}`} />
              <span>{inWish ? 'In Your Wishlist' : 'Add to Wishlist'}</span>
            </button>

            <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>DRM-Free · Includes dedicated server client files</span>
            </div>
          </div>

        </div>

      </div>

      {/* Description & Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">About the Game</h2>
            <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-4">
              <p>{game.description}</p>
              <p>
                Engineered from the ground up for high-tick precision multiplayer combat and vast emergent worlds. Whether playing solo or deploying a private squad on our 128Hz GameForge server network, experience unprecedented fidelity and zero packet jitter.
              </p>
            </div>
          </div>

          {/* System Requirements Grid */}
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <h3 className="font-display text-xl font-bold text-white tracking-tight">System Specifications</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Minimum */}
              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                <span className="text-xs font-bold text-slate-300 block pb-1 border-b border-slate-800">
                  Minimum Requirements
                </span>
                <div className="space-y-1.5 text-slate-400">
                  <p><strong className="text-slate-300">OS:</strong> {game.systemRequirements.minimum.os}</p>
                  <p><strong className="text-slate-300">CPU:</strong> {game.systemRequirements.minimum.processor}</p>
                  <p><strong className="text-slate-300">RAM:</strong> {game.systemRequirements.minimum.memory}</p>
                  <p><strong className="text-slate-300">GPU:</strong> {game.systemRequirements.minimum.graphics}</p>
                  <p><strong className="text-slate-300">Storage:</strong> {game.systemRequirements.minimum.storage}</p>
                </div>
              </div>

              {/* Recommended */}
              <div className="p-4 bg-slate-900/60 border border-cyan-500/20 rounded-xl space-y-2">
                <span className="text-xs font-bold text-cyan-400 block pb-1 border-b border-slate-800">
                  Recommended Specifications (60+ FPS)
                </span>
                <div className="space-y-1.5 text-slate-400">
                  <p><strong className="text-slate-300">OS:</strong> {game.systemRequirements.recommended.os}</p>
                  <p><strong className="text-slate-300">CPU:</strong> {game.systemRequirements.recommended.processor}</p>
                  <p><strong className="text-slate-300">RAM:</strong> {game.systemRequirements.recommended.memory}</p>
                  <p><strong className="text-slate-300">GPU:</strong> {game.systemRequirements.recommended.graphics}</p>
                  <p><strong className="text-slate-300">Storage:</strong> {game.systemRequirements.recommended.storage}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right sidebar: Multiplayer & Live Servers */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Multiplayer Node status */}
          <div className="p-5 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/40 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-violet-400" />
              <h3 className="font-display font-bold text-sm text-white">Live Game Servers</h3>
            </div>
            <p className="text-xs text-slate-400">
              Active verified public servers running this title right now:
            </p>

            {gameServers.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No community servers currently registered.</p>
            ) : (
              <div className="space-y-2.5">
                {gameServers.map((s) => (
                  <div key={s.id} className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-white truncate max-w-[180px]">{s.name}</span>
                      <span className="font-mono text-emerald-400">{s.ping}ms</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono">
                      <span>Players: {s.players}/{s.maxPlayers}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`${s.ip}:${s.port}`);
                          addNotification('Server IP Copied', `Copied ${s.ip}:${s.port} to clipboard!`, 'success');
                        }}
                        className="text-violet-400 hover:text-violet-300 text-xs font-semibold"
                      >
                        Copy IP
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => navigate('hosting')}
              className="w-full py-2 px-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Deploy Dedicated Server (${19.99}/mo)</span>
            </button>
          </div>

        </div>
      </div>

      {/* Community Reviews & Review Submission Form */}
      <section className="space-y-6 pt-6 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">Customer Reviews</h2>
            <p className="text-xs text-slate-400">Verified player feedback from GameForge license holders</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">{gameReviews.length} Community Reviews</span>
          </div>
        </div>

        {/* Write a review box */}
        <form onSubmit={handleReviewSubmit} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              Write a Review for {game.title}
            </h4>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsRecommended(true)}
                className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  isRecommended ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                <ThumbsUp className="w-3 h-3" /> Recommended
              </button>
              <button
                type="button"
                onClick={() => setIsRecommended(false)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  !isRecommended ? 'bg-rose-500 text-white font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Not Recommended
              </button>
            </div>
          </div>

          <textarea
            rows={3}
            value={newReviewContent}
            onChange={(e) => setNewReviewContent(e.target.value)}
            placeholder="Share your thoughts on performance, netcode, mechanics, or lore with other operatives..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Rating:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReviewRating(star)}
                    className="p-0.5"
                  >
                    <Star className={`w-4 h-4 ${star <= newReviewRating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmittingReview || !newReviewContent.trim()}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmittingReview ? 'Posting...' : 'Post Public Review'}</span>
            </button>
          </div>
        </form>

        {/* Existing Reviews list */}
        <div className="space-y-4">
          {gameReviews.map((rev) => (
            <div key={rev.id} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.authorAvatar}
                    alt={rev.author}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-lg object-cover bg-slate-800"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white">{rev.author}</span>
                    <div className="text-[11px] text-slate-400">
                      <span>{rev.playtimeHours} hrs on record</span>
                      <span aria-hidden="true"> · </span>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs">
                  {rev.recommended ? (
                    <span className="text-cyan-400 flex items-center gap-1 font-semibold">
                      <ThumbsUp className="w-3.5 h-3.5" /> Recommended
                    </span>
                  ) : (
                    <span className="text-rose-400 font-semibold">Not Recommended</span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{rev.content}</p>

              <div className="text-[11px] text-slate-500 flex items-center gap-4 pt-1 border-t border-slate-800/80">
                <span>{rev.helpfulCount} people found this review helpful</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
