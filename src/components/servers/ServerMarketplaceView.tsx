import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Server, 
  Search, 
  Globe, 
  Wifi, 
  Users, 
  Copy, 
  Play, 
  Filter, 
  ShieldCheck, 
  Plus, 
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { PublicServer } from '../../types';

export const ServerMarketplaceView: React.FC = () => {
  const { publicServers, games, navigate, addNotification } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [modFilter, setModFilter] = useState<'all' | 'modded' | 'vanilla'>('all');
  const [maxPing, setMaxPing] = useState<number>(100);
  const [hideEmpty, setHideEmpty] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Direct connect modal state
  const [isDirectConnectOpen, setIsDirectConnectOpen] = useState(false);
  const [directConnectIp, setDirectConnectIp] = useState('');

  const regions = ['All', 'Europe (Frankfurt)', 'US East (Virginia)', 'US Central (Dallas)', 'US West (Oregon)', 'Asia Pacific (Tokyo)', 'Europe (London)'];

  const filteredServers = useMemo(() => {
    return publicServers.filter((server) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        if (!server.name.toLowerCase().includes(query) && !server.game.toLowerCase().includes(query)) {
          return false;
        }
      }

      if (selectedGame !== 'All' && server.game !== selectedGame) return false;
      if (selectedRegion !== 'All' && server.region !== selectedRegion) return false;

      if (modFilter === 'modded' && !server.isModded) return false;
      if (modFilter === 'vanilla' && server.isModded) return false;

      if (server.ping > maxPing) return false;
      if (hideEmpty && server.players === 0) return false;

      return true;
    });
  }, [publicServers, searchQuery, selectedGame, selectedRegion, modFilter, maxPing, hideEmpty]);

  const handleCopyServer = (server: PublicServer) => {
    const connectStr = `connect ${server.ip}:${server.port}`;
    navigator.clipboard.writeText(connectStr);
    setCopiedId(server.id);
    addNotification('Connect String Copied', `Copied "${connectStr}" to clipboard!`, 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDirectConnectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directConnectIp.trim()) return;
    addNotification('Direct Connect', `Opening socket handshake to ${directConnectIp.trim()}...`, 'info');
    setIsDirectConnectOpen(false);
    setDirectConnectIp('');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-white tracking-tight">Public Server Browser</h1>
          <p className="text-xs text-slate-400">
            Browse and join low-latency verified multiplayer game servers worldwide
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDirectConnectOpen(true)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
          >
            Direct Connect IP
          </button>
          <button
            onClick={() => navigate('hosting')}
            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-violet-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Host Your Server</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search server name, host, or game..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Game filter dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Game:</span>
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
            >
              <option value="All">All Games</option>
              {games.filter(g => g.isMultiplayer).map(g => (
                <option key={g.id} value={g.title}>{g.title}</option>
              ))}
            </select>
          </div>

          {/* Region filter dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Region:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
            >
              {regions.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Secondary filters row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Modded vs Vanilla */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Modpack:</span>
              <button
                onClick={() => setModFilter('all')}
                className={`px-2.5 py-1 rounded-lg border ${modFilter === 'all' ? 'bg-slate-800 text-white border-slate-700' : 'border-slate-800 text-slate-400'}`}
              >
                All
              </button>
              <button
                onClick={() => setModFilter('vanilla')}
                className={`px-2.5 py-1 rounded-lg border ${modFilter === 'vanilla' ? 'bg-slate-800 text-white border-slate-700' : 'border-slate-800 text-slate-400'}`}
              >
                Vanilla
              </button>
              <button
                onClick={() => setModFilter('modded')}
                className={`px-2.5 py-1 rounded-lg border ${modFilter === 'modded' ? 'bg-slate-800 text-white border-slate-700' : 'border-slate-800 text-slate-400'}`}
              >
                Modded
              </button>
            </div>

            {/* Max Ping Slider */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Max Ping:</span>
              <input
                type="range"
                min={20}
                max={150}
                value={maxPing}
                onChange={(e) => setMaxPing(Number(e.target.value))}
                className="w-24 accent-violet-500"
              />
              <span className="font-mono text-slate-300">{maxPing}ms</span>
            </div>

            {/* Hide Empty */}
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={hideEmpty}
                onChange={(e) => setHideEmpty(e.target.checked)}
                className="rounded accent-violet-500"
              />
              <span>Hide Empty Servers</span>
            </label>
          </div>

          <span className="text-slate-500 font-mono">
            {filteredServers.length} Servers Online
          </span>
        </div>
      </div>

      {/* Server Cards Grid */}
      <div className="space-y-3">
        {filteredServers.length === 0 ? (
          <div className="py-20 text-center bg-slate-900/40 border border-slate-800 rounded-2xl space-y-2">
            <p className="text-slate-300 font-semibold text-sm">No servers found matching these filters.</p>
            <p className="text-slate-500 text-xs">Try increasing the ping threshold or resetting filters.</p>
          </div>
        ) : (
          filteredServers.map((server) => (
            <div
              key={server.id}
              className="group bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-violet-400 font-semibold">{server.game}</span>
                  <span aria-hidden="true" className="text-slate-700">·</span>
                  <span className="text-slate-400">{server.region}</span>
                  <span aria-hidden="true" className="text-slate-700">·</span>
                  <span className={`font-mono text-[11px] ${server.isModded ? 'text-amber-400' : 'text-slate-400'}`}>
                    {server.isModded ? `Modded (${server.mods.length} mods)` : 'Vanilla'}
                  </span>
                  <span aria-hidden="true" className="text-slate-700">·</span>
                  <span className="text-slate-500 font-mono text-[11px]">{server.tickRate}Hz</span>
                </div>

                <h3 className="font-display font-bold text-base text-white group-hover:text-violet-300 transition-colors">
                  {server.name}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-1">{server.description}</p>
              </div>

              {/* Stats & Actions */}
              <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                <div className="flex items-center gap-5 text-xs">
                  <div className="text-right">
                    <span className="text-slate-500 block text-[10px]">Players</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {server.players} / {server.maxPlayers}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-slate-500 block text-[10px]">Ping</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm flex items-center gap-1 justify-end">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {server.ping}ms
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyServer(server)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    title="Copy IP connect command"
                  >
                    {copiedId === server.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => {
                      handleCopyServer(server);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Join Server</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Direct Connect Modal */}
      {isDirectConnectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="font-display font-bold text-lg text-white">Direct Connect to IP</h3>
            <p className="text-xs text-slate-400">Enter the IP address and port of the game server you wish to join.</p>
            <form onSubmit={handleDirectConnectSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="192.168.1.1:27015"
                value={directConnectIp}
                onChange={(e) => setDirectConnectIp(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-violet-500"
              />
              <div className="flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setIsDirectConnectOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl"
                >
                  Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
