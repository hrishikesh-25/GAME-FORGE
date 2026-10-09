import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Star, ShoppingBag, Heart, ExternalLink, ShieldCheck, Users } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewGame, setQuickViewGame, navigate, addToCart, isInCart, toggleWishlist, isInWishlist } = useApp();
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  if (!quickViewGame) return null;

  const inCart = isInCart(quickViewGame.id);
  const inWish = isInWishlist(quickViewGame.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Top close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Quick View</span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">{quickViewGame.developer}</span>
          </div>
          <button
            onClick={() => setQuickViewGame(null)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gallery */}
            <div className="space-y-3">
              <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative">
                <img
                  src={quickViewGame.screenshots[selectedImgIdx] || quickViewGame.coverImage}
                  alt={quickViewGame.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {quickViewGame.screenshots.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIdx(idx)}
                    className={`aspect-video rounded-lg overflow-hidden border transition-all ${
                      selectedImgIdx === idx ? 'border-cyan-400 ring-1 ring-cyan-400' : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Screenshot" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="font-display text-xl font-bold text-white tracking-tight leading-snug">
                  {quickViewGame.title}
                </h3>

                {/* Rating & Metadata (Zero-pill text separators) */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1 text-amber-400 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{quickViewGame.rating.toFixed(1)}</span>
                  </div>
                  <span aria-hidden="true">·</span>
                  <span>{quickViewGame.reviewCount.toLocaleString()} reviews</span>
                  <span aria-hidden="true">·</span>
                  <span>{quickViewGame.releaseDate}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {quickViewGame.description.slice(0, 220)}...
                </p>

                {/* Tags / Genres as clean text */}
                <div className="text-xs text-slate-400 flex flex-wrap gap-x-2 gap-y-1 pt-1">
                  <span className="text-slate-500 font-medium">Genres:</span>
                  {quickViewGame.genres.map((g, i) => (
                    <span key={g}>
                      {g}{i < quickViewGame.genres.length - 1 ? ' ·' : ''}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{quickViewGame.isMultiplayer ? 'Dedicated Multiplayer Servers Available' : 'Singleplayer Campaign'}</span>
                </div>
              </div>

              {/* Price and actions */}
              <div className="pt-6 border-t border-slate-800 space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono text-white">
                    ${quickViewGame.price.toFixed(2)}
                  </span>
                  {quickViewGame.originalPrice && (
                    <span className="text-sm font-mono text-slate-500 line-through">
                      ${quickViewGame.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {quickViewGame.discountPercentage && (
                    <span className="text-xs font-bold text-cyan-400 font-mono bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                      -{quickViewGame.discountPercentage}%
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      addToCart(quickViewGame);
                    }}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      inCart
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{inCart ? 'In Cart' : 'Add to Cart'}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewGame.id)}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      inWish 
                        ? 'bg-rose-500/20 border-rose-500 text-rose-400' 
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${inWish ? 'fill-rose-400' : ''}`} />
                  </button>

                  <button
                    onClick={() => {
                      navigate('game-detail', quickViewGame.id);
                      setQuickViewGame(null);
                    }}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors flex items-center justify-center"
                    title="View Full Page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
