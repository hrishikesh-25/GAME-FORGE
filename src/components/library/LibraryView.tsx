import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Play, 
  Download, 
  Search, 
  CheckCircle, 
  Clock, 
  Trophy, 
  HardDrive, 
  RefreshCw, 
  Trash2,
  FolderOpen,
  Settings,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { LibraryGame } from '../../types';

export const LibraryView: React.FC = () => {
  const { 
    library, 
    installGame, 
    launchGame, 
    activePlaySession, 
    stopGameSession, 
    navigate,
    addNotification 
  } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'installed' | 'ready'>('all');
  const [selectedGameId, setSelectedGameId] = useState<string>(library[0]?.gameId || '');

  const filteredLibrary = library.filter((item) => {
    if (searchFilter.trim() && !item.game.title.toLowerCase().includes(searchFilter.toLowerCase())) {
      return false;
    }
    if (statusFilter === 'installed' && !item.isInstalled) return false;
    return true;
  });

  const activeSelectedGame = library.find(item => item.gameId === selectedGameId) || library[0];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-white tracking-tight">Game Library</h1>
          <p className="text-xs text-slate-400">
            Manage your acquired digital software, cloud saves, and local installations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">
            {library.filter(l => l.isInstalled).length} of {library.length} installed
          </span>
          <button
            onClick={() => navigate('store')}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
          >
            + Store Catalog
          </button>
        </div>
      </div>

      {library.length === 0 ? (
        <div className="p-16 text-center bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
          <HardDrive className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-white">Your Library is Empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Acquire titles from the GameForge store or claim free community releases to start downloading.
          </p>
          <button
            onClick={() => navigate('store')}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg"
          >
            Browse Marketplace
          </button>
        </div>
      ) : (
        /* Split Library View: Left Sidebar games list + Right Game Command Center */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
          
          {/* Left Column: Game List with Search */}
          <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col space-y-3">
            
            {/* Search and Filters */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Filter library..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs">
              <button
                onClick={() => setStatusFilter('all')}
                className={`flex-1 py-1 rounded-lg font-medium transition-colors ${
                  statusFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({library.length})
              </button>
              <button
                onClick={() => setStatusFilter('installed')}
                className={`flex-1 py-1 rounded-lg font-medium transition-colors ${
                  statusFilter === 'installed' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Installed ({library.filter(l => l.isInstalled).length})
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
              {filteredLibrary.map((item) => {
                const isSelected = item.gameId === activeSelectedGame?.gameId;
                const isPlaying = activePlaySession?.game.id === item.gameId;

                return (
                  <button
                    key={item.gameId}
                    onClick={() => setSelectedGameId(item.gameId)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all border ${
                      isSelected
                        ? 'bg-slate-800 border-cyan-500/40 text-white'
                        : 'bg-slate-950/40 border-transparent hover:bg-slate-800/50 text-slate-300'
                    }`}
                  >
                    <img
                      src={item.game.coverImage}
                      alt={item.game.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover rounded-lg bg-slate-950 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white truncate">{item.game.title}</h4>
                        {isPlaying && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0 ml-1" />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                        {item.isInstalled ? (
                          <span className="text-emerald-400 flex items-center gap-1 font-medium">
                            Ready to Play
                          </span>
                        ) : item.isDownloading ? (
                          <span className="text-cyan-400 font-mono">
                            {item.downloadProgress}% ({item.downloadSpeedMbps} MB/s)
                          </span>
                        ) : (
                          <span className="text-slate-500">Not Installed</span>
                        )}
                        <span aria-hidden="true">·</span>
                        <span>{item.playtimeHours}h</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right Column: Selected Game Command Center */}
          {activeSelectedGame && (
            <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
              
              {/* Game Banner Header */}
              <div className="relative aspect-[21/9] w-full bg-slate-950 overflow-hidden">
                <img
                  src={activeSelectedGame.game.bannerImage || activeSelectedGame.game.coverImage}
                  alt={activeSelectedGame.game.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/60 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
                      {activeSelectedGame.game.genres.join(' · ')}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                      {activeSelectedGame.game.title}
                    </h2>
                  </div>

                  {/* Primary Play / Install Action */}
                  <div>
                    {activeSelectedGame.isInstalled ? (
                      activePlaySession?.game.id === activeSelectedGame.gameId ? (
                        <button
                          onClick={stopGameSession}
                          className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all"
                        >
                          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                          <span>Quit Active Session</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => launchGame(activeSelectedGame.gameId)}
                          className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
                        >
                          <Play className="w-4 h-4 fill-slate-950" />
                          <span>PLAY GAME</span>
                        </button>
                      )
                    ) : activeSelectedGame.isDownloading ? (
                      <div className="px-5 py-2.5 bg-slate-950/80 border border-cyan-500/50 rounded-xl space-y-1 w-52">
                        <div className="flex justify-between text-xs text-cyan-300 font-mono">
                          <span>Downloading</span>
                          <span>{activeSelectedGame.downloadProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-cyan-400 h-full transition-all duration-300"
                            style={{ width: `${activeSelectedGame.downloadProgress}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => installGame(activeSelectedGame.gameId)}
                        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all"
                      >
                        <Download className="w-4 h-4" />
                        <span>Install ({activeSelectedGame.game.downloadSizeGb} GB)</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Game Stats & Telemetry Bar */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-950/60 border border-slate-800 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-500 block">Total Playtime</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {activeSelectedGame.playtimeHours} Hours
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Last Played</span>
                    <span className="font-medium text-slate-300 text-sm">
                      {activeSelectedGame.lastPlayed}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Achievements</span>
                    <span className="font-mono font-bold text-amber-400 text-sm">
                      {activeSelectedGame.achievementsUnlocked} / {activeSelectedGame.totalAchievements}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Cloud Status</span>
                    <span className="font-medium text-emerald-400 text-sm flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Up to Date
                    </span>
                  </div>
                </div>

                {/* Achievements Showcase Preview */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      Recent Achievements
                    </h4>
                    <span className="text-xs text-cyan-400 hover:underline cursor-pointer">
                      View all {activeSelectedGame.totalAchievements} →
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">First Extraction</p>
                        <p className="text-[10px] text-slate-400">Escaped zone intact</p>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">Apex Slayer</p>
                        <p className="text-[10px] text-slate-400">Defeated world boss</p>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl flex items-center gap-3 opacity-50">
                      <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-400 truncate">Locked Challenge</p>
                        <p className="text-[10px] text-slate-500">Progress 40%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Quick Actions */}
                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        addNotification('Game Verified', 'Local installation integrity verified successfully. 0 corrupt files.', 'success');
                      }}
                      className="text-slate-400 hover:text-white flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Verify File Integrity</span>
                    </button>
                    <span className="text-slate-700">|</span>
                    <button
                      onClick={() => navigate('servers')}
                      className="text-slate-400 hover:text-cyan-400 flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Browse Dedicated Servers</span>
                    </button>
                  </div>

                  <span className="text-slate-500 font-mono text-[11px]">
                    Install Path: C:/GameForge/Library/{activeSelectedGame.game.id}
                  </span>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
