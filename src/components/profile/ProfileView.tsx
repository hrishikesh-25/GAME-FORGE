import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Trophy, 
  Users, 
  Wallet, 
  Star, 
  Heart, 
  ShieldCheck, 
  Clock, 
  MessageSquare, 
  Plus, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Flame
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, library, wishlist, games, reviews, navigate, addNotification } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'games' | 'friends' | 'achievements' | 'reviews'>('overview');
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(25);

  const userReviews = reviews.filter(r => r.author === user.username);
  const wishedGames = games.filter(g => wishlist.includes(g.id));

  const handleTopUp = () => {
    user.walletBalance += topUpAmount;
    addNotification('Funds Added', `Added $${topUpAmount}.00 to your GameForge Wallet balance.`, 'success');
    setIsTopUpOpen(false);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Profile Hero Header Card */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-cyan-400 p-0.5 bg-slate-950 shadow-xl">
                <img
                  src={user.avatar}
                  alt={user.username}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-black text-[11px] rounded-md font-mono shadow">
                LVL {user.level}
              </div>
            </div>

            {/* User Meta */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="font-display text-2xl font-extrabold text-white">{user.username}</h1>
                <span className="text-xs text-cyan-400 font-semibold bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                  {user.badgeTitle}
                </span>
              </div>
              <p className="text-xs text-slate-300 max-w-md leading-relaxed">{user.bio}</p>
              <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-slate-400 pt-1">
                <span>Member since {user.memberSince}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 font-medium">Account Status: Good Standing</span>
              </div>
            </div>
          </div>

          {/* Wallet Balance & XP Summary Box */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:min-w-[240px] space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-cyan-400" /> Wallet Balance
              </span>
              <span className="font-mono font-bold text-white text-base">
                ${user.walletBalance.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => setIsTopUpOpen(true)}
              className="w-full py-1.5 px-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Top Up Wallet (Mock)</span>
            </button>

            {/* XP Bar */}
            <div className="pt-2 border-t border-slate-800 space-y-1 text-[11px]">
              <div className="flex justify-between text-slate-400 font-mono">
                <span>XP Progress</span>
                <span>{user.xpCurrent} / {user.xpNextLevel}</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full"
                  style={{ width: `${(user.xpCurrent / user.xpNextLevel) * 100}%` }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'overview' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Profile Overview
        </button>
        <button
          onClick={() => setActiveTab('games')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'games' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Owned Games ({library.length})
        </button>
        <button
          onClick={() => setActiveTab('friends')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'friends' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Friends ({user.friends.length})
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'achievements' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Achievements
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'reviews' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Reviews ({userReviews.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left stats & recent games */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Quick summary stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-center">
                <span className="font-mono text-2xl font-bold text-white block">{library.length}</span>
                <span className="text-xs text-slate-400">Games Owned</span>
              </div>
              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-center">
                <span className="font-mono text-2xl font-bold text-cyan-400 block">
                  {library.reduce((acc, curr) => acc + curr.playtimeHours, 0).toFixed(0)}h
                </span>
                <span className="text-xs text-slate-400">Hours Played</span>
              </div>
              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-center">
                <span className="font-mono text-2xl font-bold text-amber-400 block">
                  {user.achievements.length}
                </span>
                <span className="text-xs text-slate-400">Rare Medals</span>
              </div>
            </div>

            {/* Recently Played */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-white">Recently Played</h3>
                <button onClick={() => navigate('library')} className="text-xs text-cyan-400 hover:underline">
                  Open Library →
                </button>
              </div>

              <div className="space-y-3">
                {library.slice(0, 3).map((item) => (
                  <div key={item.gameId} className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3">
                      <img src={item.game.coverImage} alt={item.game.title} referrerPolicy="no-referrer" className="w-12 h-12 object-cover rounded-lg bg-slate-800" />
                      <div>
                        <h4 className="text-xs font-bold text-white">{item.game.title}</h4>
                        <p className="text-[11px] text-slate-400">{item.playtimeHours} hours on record</p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('library')}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg"
                    >
                      View Stats
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Rare Trophy Showcase */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" /> Rare Achievement Showcase
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {user.achievements.map((ach) => (
                  <div key={ach.id} className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-amber-400 font-mono font-semibold">{ach.rarity}</span>
                      <span className="text-[10px] text-slate-500">{ach.date}</span>
                    </div>
                    <h5 className="text-xs font-bold text-white">{ach.title}</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{ach.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Friends & Wishlist mini */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Friends Quick Panel */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" /> Friends Online
                </h3>
                <span className="text-xs text-slate-400 font-mono">{user.friends.filter(f => f.status !== 'offline').length} online</span>
              </div>

              <div className="space-y-2.5">
                {user.friends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/40 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative">
                        <img src={friend.avatar} alt={friend.name} referrerPolicy="no-referrer" className="w-8 h-8 rounded-lg object-cover" />
                        <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-slate-900 ${
                          friend.status === 'in-game' ? 'bg-emerald-400' : friend.status === 'online' ? 'bg-cyan-400' : 'bg-slate-600'
                        }`} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-white truncate">{friend.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {friend.status === 'in-game' ? `In: ${friend.currentGame}` : friend.status}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => addNotification('Chat Opened', `Started direct message with ${friend.name}`, 'info')}
                      className="text-cyan-400 hover:text-cyan-300 text-[11px]"
                    >
                      Chat
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Wishlist Quick Preview */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-400" /> Wishlist
                </h3>
                <span className="text-xs text-slate-400 font-mono">{wishedGames.length} saved</span>
              </div>

              {wishedGames.length === 0 ? (
                <p className="text-xs text-slate-500 py-2">No games in your wishlist.</p>
              ) : (
                <div className="space-y-2">
                  {wishedGames.map((g) => (
                    <div key={g.id} className="flex items-center justify-between p-2 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
                      <span className="font-medium text-white truncate max-w-[150px]">{g.title}</span>
                      <span className="font-mono text-cyan-400 font-bold">${g.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: OWNED GAMES */}
      {activeTab === 'games' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {library.map((item) => (
            <div key={item.gameId} className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3 flex flex-col justify-between">
              <div className="flex gap-3">
                <img src={item.game.coverImage} alt={item.game.title} referrerPolicy="no-referrer" className="w-16 h-16 object-cover rounded-xl bg-slate-950 shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-white truncate">{item.game.title}</h4>
                  <p className="text-xs text-slate-400">{item.playtimeHours} hours played</p>
                  <p className="text-[11px] text-slate-500">Purchased {item.purchaseDate}</p>
                </div>
              </div>
              <button
                onClick={() => navigate('library')}
                className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg"
              >
                Launch in Library
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: FRIENDS */}
      {activeTab === 'friends' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {user.friends.map((friend) => (
            <div key={friend.id} className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={friend.avatar} alt={friend.name} referrerPolicy="no-referrer" className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-sm text-white">{friend.name}</h4>
                  <p className="text-xs text-slate-400 capitalize">{friend.status} {friend.currentGame ? `· ${friend.currentGame}` : ''}</p>
                </div>
              </div>
              <button
                onClick={() => addNotification('Invite Sent', `Sent game invite to ${friend.name}`, 'success')}
                className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-semibold"
              >
                Invite to Server
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: ACHIEVEMENTS */}
      {activeTab === 'achievements' && (
        <div className="space-y-3">
          {user.achievements.map((ach) => (
            <div key={ach.id} className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{ach.title}</span>
                  <span className="text-xs text-cyan-400 font-mono">({ach.gameTitle})</span>
                </div>
                <p className="text-xs text-slate-400">{ach.description}</p>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs text-amber-400 block">{ach.rarity}</span>
                <span className="text-[11px] text-slate-500">{ach.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: REVIEWS */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {userReviews.length === 0 ? (
            <p className="text-slate-400 text-xs py-8 text-center">You haven't written any reviews yet.</p>
          ) : (
            userReviews.map((rev) => (
              <div key={rev.id} className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-cyan-400">Review for GameForge Title</span>
                  <span className="text-slate-500 font-mono">{rev.date}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{rev.content}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* TOP UP MODAL (MOCK) */}
      {isTopUpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="font-display font-bold text-lg text-white">Top Up GameForge Wallet</h3>
            <p className="text-xs text-slate-400">Add funds to purchase games, expansions, and dedicated game servers.</p>
            <div className="grid grid-cols-3 gap-2">
              {[10, 25, 50, 100].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setTopUpAmount(amt)}
                  className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                    topUpAmount === amt ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  +${amt}
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-2 text-xs">
              <button onClick={() => setIsTopUpOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">
                Cancel
              </button>
              <button onClick={handleTopUp} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold rounded-xl">
                Add ${topUpAmount}.00 Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
