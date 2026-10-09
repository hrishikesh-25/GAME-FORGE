import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Bell, 
  Server, 
  User as UserIcon, 
  ShieldAlert, 
  Wallet, 
  LogOut, 
  ChevronDown,
  X,
  Play
} from 'lucide-react';
import { PageRoute } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    currentRoute, 
    navigate, 
    cart, 
    wishlist, 
    user, 
    setIsCartOpen, 
    notifications, 
    markNotificationRead,
    searchQuery,
    setSearchQuery,
    games,
    activePlaySession,
    stopGameSession
  } = useApp();

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredSearchGames = searchQuery.trim() 
    ? games.filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.genres.some(gen => gen.toLowerCase().includes(searchQuery.toLowerCase()))).slice(0, 5)
    : [];

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const navLinks: { label: string; route: PageRoute }[] = [
    { label: 'Store', route: 'store' },
    { label: 'Discover', route: 'home' },
    { label: 'Servers', route: 'servers' },
    { label: 'Community', route: 'community' },
    { label: 'Library', route: 'library' },
  ];

  return (
    <>
      {/* Active Game Playing banner if launched */}
      {activePlaySession && (
        <aside aria-label="Game session notification" className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-cyan-950 border-b border-emerald-500/30 px-4 py-2 flex items-center justify-between text-xs text-emerald-200 z-50">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Running Session: <strong className="text-white font-semibold">{activePlaySession.game.title}</strong></span>
            <span className="text-emerald-400 font-mono">
              {Math.floor(activePlaySession.elapsedSeconds / 60)}m {activePlaySession.elapsedSeconds % 60}s
            </span>
          </div>
          <button
            onClick={stopGameSession}
            className="px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-100 rounded text-xs font-medium border border-emerald-500/40 transition-colors"
          >
            Exit Game
          </button>
        </aside>
      )}

      {/* Top Bar strictly following 3-Zone Contract */}
      <header className="sticky top-0 z-40 w-full bg-[#080a0f]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Zone 1: Brand Wordmark */}
          <button 
            onClick={() => navigate('home')}
            className="text-left group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md py-1"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 via-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <span className="font-display font-extrabold text-white text-base tracking-tighter">GF</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              GameForge
            </span>
          </button>

          {/* Zone 2: 4-6 Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-slate-300">
            {navLinks.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => navigate(item.route)}
                  className={`px-3 py-1.5 rounded-md transition-all relative whitespace-nowrap text-xs uppercase tracking-wider font-semibold ${
                    isActive 
                      ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30' 
                      : 'hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-cyan-400 rounded-full" />
                  )}
                </button>
              );
            })}

            <button
              onClick={() => navigate('hosting')}
              className={`px-3 py-1.5 rounded-md transition-all relative whitespace-nowrap text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 ${
                currentRoute === 'hosting'
                  ? 'text-violet-300 bg-violet-950/40 border border-violet-500/30'
                  : 'text-violet-400 hover:text-violet-200 hover:bg-violet-950/20'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>Hosting</span>
            </button>
          </nav>

          {/* Zone 3: 1-2 Primary Actions & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Input Box */}
            <div className="relative">
              {isSearchExpanded ? (
                <div className="flex items-center bg-slate-900/90 border border-cyan-500/40 rounded-lg px-2.5 py-1.5 w-48 sm:w-64 transition-all">
                  <Search className="w-4 h-4 text-cyan-400 shrink-0 mr-2" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search games, servers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery) {
                        navigate('store');
                        setIsSearchExpanded(false);
                      }
                    }}
                    className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
                  />
                  <button 
                    onClick={() => { setIsSearchExpanded(false); setSearchQuery(''); }}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchExpanded(true)}
                  aria-label="Open search"
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}

              {/* Instant Search Dropdown Preview */}
              {isSearchExpanded && filteredSearchGames.length > 0 && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-2 z-50">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                    Matching Games
                  </div>
                  {filteredSearchGames.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => {
                        navigate('game-detail', g.id);
                        setIsSearchExpanded(false);
                        setSearchQuery('');
                      }}
                      className="w-full flex items-center gap-2 p-1.5 rounded hover:bg-slate-800 text-left transition-colors"
                    >
                      <img 
                        src={g.coverImage} 
                        alt={g.title} 
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover rounded bg-slate-800" 
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-white truncate">{g.title}</p>
                        <p className="text-[11px] text-cyan-400 font-mono">${g.price.toFixed(2)}</p>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      navigate('store');
                      setIsSearchExpanded(false);
                    }}
                    className="w-full text-center text-xs text-cyan-400 hover:underline py-1 mt-1 border-t border-slate-800"
                  >
                    View all store results →
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => navigate('store')}
              aria-label="Wishlist"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors relative"
            >
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'text-rose-400 fill-rose-500/20' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Notifications Menu */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notifications"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-cyan-500 text-slate-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center font-mono animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                    <span className="text-xs font-semibold text-white">Notifications</span>
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-slate-400 hover:text-slate-200"
                    >
                      Close
                    </button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-500 py-3 text-center">No notifications yet.</p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${
                            n.read ? 'bg-slate-800/40 text-slate-400' : 'bg-slate-800 text-slate-200 border-l-2 border-cyan-400'
                          }`}
                        >
                          <div className="flex justify-between font-medium text-white mb-0.5">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{n.timestamp}</span>
                          </div>
                          <p className="text-[11px] leading-relaxed text-slate-400">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg transition-colors border border-slate-700 text-xs font-medium"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 && (
                <span className="bg-cyan-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full text-[10px] font-mono">
                  {cart.length}
                </span>
              )}
            </button>

            {/* User Profile Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-800/60 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyan-500/40 relative">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-slate-900" />
                </div>
                <div className="hidden lg:block text-left text-xs">
                  <p className="font-semibold text-white leading-tight">{user.username}</p>
                  <p className="text-[10px] text-cyan-400 font-mono">LVL {user.level}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50">
                  <div className="p-2 border-b border-slate-800 mb-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Wallet Balance</span>
                      <span className="font-mono font-semibold text-emerald-400">${user.walletBalance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
                      <span>XP Progress</span>
                      <span className="font-mono">{user.xpCurrent} / {user.xpNextLevel}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                      <div 
                        className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full"
                        style={{ width: `${(user.xpCurrent / user.xpNextLevel) * 100}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => { navigate('profile'); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-left"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>User Profile</span>
                  </button>

                  <button
                    onClick={() => { navigate('library'); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-left"
                  >
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                    <span>My Game Library</span>
                  </button>

                  <button
                    onClick={() => { navigate('hosting'); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-left"
                  >
                    <Server className="w-3.5 h-3.5 text-violet-400" />
                    <span>Server Hosting Manager</span>
                  </button>

                  <button
                    onClick={() => { navigate('admin'); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-left"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                    <span>Admin Dashboard</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around pt-2.5 mt-2 border-t border-slate-800/60 text-xs">
          {navLinks.map((item) => (
            <button
              key={item.route}
              onClick={() => navigate(item.route)}
              className={`py-1 px-2 font-medium ${
                currentRoute === item.route ? 'text-cyan-400 font-bold' : 'text-slate-400'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => navigate('hosting')}
            className={`py-1 px-2 font-medium ${
              currentRoute === 'hosting' ? 'text-violet-400 font-bold' : 'text-slate-400'
            }`}
          >
            Hosting
          </button>
        </div>
      </header>
    </>
  );
};
