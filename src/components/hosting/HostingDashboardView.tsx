import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Server, 
  Power, 
  RotateCcw, 
  Terminal, 
  FileText, 
  Sliders, 
  Package, 
  Database, 
  Plus, 
  Copy, 
  Check, 
  AlertCircle, 
  Activity, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Users, 
  Clock, 
  Globe,
  Save,
  Trash2,
  X,
  Play
} from 'lucide-react';
import { HostedServer } from '../../types';

export const HostingDashboardView: React.FC = () => {
  const { 
    hostedServers, 
    startServer, 
    stopServer, 
    restartServer, 
    sendServerCommand, 
    updateServerConfig, 
    saveServerFile, 
    toggleServerMod, 
    createNewServer, 
    games,
    addNotification 
  } = useApp();

  const [selectedServerId, setSelectedServerId] = useState<string>(hostedServers[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'overview' | 'console' | 'files' | 'config' | 'mods' | 'backups'>('overview');
  
  // Console input state
  const [consoleInput, setConsoleInput] = useState('');

  // File editor state
  const [selectedFileName, setSelectedFileName] = useState('server.cfg');
  const [fileContent, setFileContent] = useState('');
  const [isEditingFile, setIsEditingFile] = useState(false);

  // Create Server Wizard Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newServerName, setNewServerName] = useState('Alpha Operative Syndicate');
  const [newServerGame, setNewServerGame] = useState(games[0].title);
  const [newServerRegion, setNewServerRegion] = useState('US East (N. Virginia)');
  const [newServerRamTier, setNewServerRamTier] = useState(16);

  // Active Server
  const currentServer = hostedServers.find(s => s.id === selectedServerId) || hostedServers[0];

  const handleSendCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim() || !currentServer) return;
    sendServerCommand(currentServer.id, consoleInput.trim());
    setConsoleInput('');
  };

  const handleOpenFile = (name: string, content: string) => {
    setSelectedFileName(name);
    setFileContent(content);
    setIsEditingFile(true);
  };

  const handleSaveFile = () => {
    if (!currentServer) return;
    saveServerFile(currentServer.id, selectedFileName, fileContent);
    setIsEditingFile(false);
  };

  const handleCreateServerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNewServer({
      name: newServerName.trim() || 'Custom Forge Node',
      gameTitle: newServerGame,
      region: newServerRegion,
      ramTier: newServerRamTier
    });
    setIsCreateModalOpen(false);
  };

  if (!currentServer) {
    return (
      <div className="text-center py-24 space-y-4">
        <Server className="w-12 h-12 text-slate-600 mx-auto" />
        <h2 className="text-xl font-bold text-white">No Game Servers Active</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs rounded-xl"
        >
          Deploy Your First Server
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header with Server switcher and Create Server button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-violet-400">Infrastructure Control</span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">Enterprise NVMe Clusters</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-white tracking-tight">
            Server Hosting Manager
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Server Selector dropdown */}
          <select
            value={currentServer.id}
            onChange={(e) => setSelectedServerId(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
          >
            {hostedServers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.status.toUpperCase()})
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-violet-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Server</span>
          </button>
        </div>
      </div>

      {/* Server Status Header Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              currentServer.status === 'online' 
                ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]' 
                : currentServer.status === 'restarting' 
                  ? 'bg-amber-400 animate-pulse' 
                  : 'bg-rose-500'
            }`} />
            <h2 className="font-display text-xl font-bold text-white">{currentServer.name}</h2>
            <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {currentServer.status}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
            <span className="text-slate-300">{currentServer.game}</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>IP: <strong className="text-white">{currentServer.ip}:{currentServer.port}</strong></span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Region: {currentServer.region}</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-emerald-400">Ping: {currentServer.ping}ms</span>
          </div>
        </div>

        {/* Action Power Controls */}
        <div className="flex items-center gap-2">
          {currentServer.status === 'online' ? (
            <button
              onClick={() => stopServer(currentServer.id)}
              className="px-4 py-2 bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Power className="w-3.5 h-3.5 text-rose-400" />
              <span>Stop Server</span>
            </button>
          ) : (
            <button
              onClick={() => startServer(currentServer.id)}
              className="px-4 py-2 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              <span>Start Server</span>
            </button>
          )}

          <button
            onClick={() => restartServer(currentServer.id)}
            disabled={currentServer.status === 'restarting'}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${currentServer.status === 'restarting' ? 'animate-spin' : ''}`} />
            <span>Restart</span>
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(`connect ${currentServer.ip}:${currentServer.port}`);
              addNotification('Copied', 'Console connect string copied to clipboard.', 'success');
            }}
            className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors"
            title="Copy Direct Connect Command"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs (Zero-pill segmented tab control) */}
      <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'overview' ? 'bg-violet-600 text-white font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-3.5 h-3.5" /> Overview
        </button>
        <button
          onClick={() => setActiveTab('console')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'console' ? 'bg-violet-600 text-white font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" /> Live Console
        </button>
        <button
          onClick={() => setActiveTab('config')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'config' ? 'bg-violet-600 text-white font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" /> Config Editor
        </button>
        <button
          onClick={() => setActiveTab('files')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'files' ? 'bg-violet-600 text-white font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> File Manager
        </button>
        <button
          onClick={() => setActiveTab('mods')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'mods' ? 'bg-violet-600 text-white font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-3.5 h-3.5" /> Mods & Plugins
        </button>
        <button
          onClick={() => setActiveTab('backups')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'backups' ? 'bg-violet-600 text-white font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Database className="w-3.5 h-3.5" /> Backups
        </button>
      </div>

      {/* TAB CONTENT */}

      {/* 1. OVERVIEW TAB: Live Telemetry Gauges */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Telemetry Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* CPU */}
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-cyan-400" /> CPU Load</span>
                <span className="font-mono text-cyan-400 font-bold">{currentServer.cpuPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full transition-all duration-500" style={{ width: `${currentServer.cpuPercent}%` }} />
              </div>
              <p className="text-[10px] text-slate-500">AMD EPYC™ 16-Core Node Affinity</p>
            </div>

            {/* RAM */}
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-violet-400" /> RAM Memory</span>
                <span className="font-mono text-violet-400 font-bold">{currentServer.ramUsedGb} / {currentServer.ramMaxGb} GB</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-violet-500 h-full rounded-full transition-all duration-500" style={{ width: `${(currentServer.ramUsedGb / currentServer.ramMaxGb) * 100}%` }} />
              </div>
              <p className="text-[10px] text-slate-500">ECC DDR5 5600MHz Allocated</p>
            </div>

            {/* Storage */}
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5 text-amber-400" /> NVMe Storage</span>
                <span className="font-mono text-amber-400 font-bold">{currentServer.storageUsedGb} / {currentServer.storageMaxGb} GB</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${(currentServer.storageUsedGb / currentServer.storageMaxGb) * 100}%` }} />
              </div>
              <p className="text-[10px] text-slate-500">PCIe Gen5 Tier-1 Storage Array</p>
            </div>

            {/* Network / Players */}
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-emerald-400" /> Active Players</span>
                <span className="font-mono text-emerald-400 font-bold">{currentServer.currentPlayers} / {currentServer.maxPlayers}</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full transition-all duration-500" style={{ width: `${(currentServer.currentPlayers / currentServer.maxPlayers) * 100}%` }} />
              </div>
              <p className="text-[10px] text-slate-500 font-mono">Net I/O: {currentServer.networkMbps} Mbps</p>
            </div>

          </div>

          {/* Details Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="font-display font-bold text-sm text-white">Instance Metadata</h3>
              <div className="space-y-2 text-xs divide-y divide-slate-800/80">
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Server Hardware Tier:</span>
                  <span className="text-white font-medium">{currentServer.planName}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Operating System:</span>
                  <span className="text-slate-300 font-mono">Ubuntu Server 24.04 LTS (Bare Metal)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Uptime:</span>
                  <span className="text-emerald-400 font-mono font-semibold">{currentServer.uptime}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Tickrate:</span>
                  <span className="text-cyan-400 font-mono font-semibold">{currentServer.config.tickRate} Hz (128-tick Engine)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Monthly Renewal:</span>
                  <span className="text-white font-mono">${currentServer.monthlyCost.toFixed(2)}/mo</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-sm text-white">Scheduled Maintenance & Backups</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Automated rolling snapshots take place daily at 04:00 UTC with zero player downtime.
                </p>
                <div className="mt-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Next Auto-Restart:</span>
                    <span className="font-mono text-amber-400">Tomorrow at 04:00 UTC</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Snapshot Retention:</span>
                    <span className="font-mono">7 Days (Encrypted NVMe)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  addNotification('Backup Created', 'Instant manual snapshot taken successfully (1.42 GB).', 'success');
                }}
                className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
              >
                Create Instant Manual Snapshot
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 2. CONSOLE TAB: Interactive Command Runner */}
      {activeTab === 'console' && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-[520px]">
          {/* Console top bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-mono">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>rcon@{currentServer.ip}:{currentServer.port}</span>
            </div>
            <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Socket Connected
            </span>
          </div>

          {/* Console Output Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1 font-mono text-xs select-text bg-[#07090e]">
            {currentServer.consoleLogs.map((log, idx) => (
              <div key={idx} className="flex gap-2 leading-relaxed">
                <span className="text-slate-600 select-none">[{log.timestamp}]</span>
                <span className={`
                  ${log.type === 'error' ? 'text-rose-400' : ''}
                  ${log.type === 'warn' ? 'text-amber-400' : ''}
                  ${log.type === 'success' ? 'text-emerald-400' : ''}
                  ${log.type === 'info' ? 'text-slate-300' : ''}
                `}>
                  {log.message}
                </span>
              </div>
            ))}
          </div>

          {/* Console Command Input */}
          <form onSubmit={handleSendCommand} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
            <span className="text-cyan-400 font-mono self-center text-sm pl-2">&gt;</span>
            <input
              type="text"
              placeholder="Enter command (e.g., status, save, kick <id>, say <msg>)..."
              value={consoleInput}
              onChange={(e) => setConsoleInput(e.target.value)}
              className="flex-1 bg-transparent font-mono text-xs text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors font-mono"
            >
              Execute
            </button>
          </form>
        </div>
      )}

      {/* 3. CONFIG EDITOR TAB: GUI Controls */}
      {activeTab === 'config' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="font-display font-bold text-lg text-white">Visual Server Configuration</h3>
            <p className="text-xs text-slate-400">Modify tickrate, max operative slots, MOTD, and gameplay rules.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            
            <div className="space-y-2">
              <label className="text-slate-300 font-semibold block">Server Display Name</label>
              <input
                type="text"
                value={currentServer.config.serverName}
                onChange={(e) => updateServerConfig(currentServer.id, { serverName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-300 font-semibold block">Server MOTD (Message of the Day)</label>
              <input
                type="text"
                value={currentServer.config.motd}
                onChange={(e) => updateServerConfig(currentServer.id, { motd: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-slate-300 font-semibold">Max Players ({currentServer.config.maxPlayers})</label>
              </div>
              <input
                type="range"
                min={8}
                max={64}
                step={4}
                value={currentServer.config.maxPlayers}
                onChange={(e) => updateServerConfig(currentServer.id, { maxPlayers: Number(e.target.value) })}
                className="w-full accent-violet-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-300 font-semibold block">Tickrate (Hz)</label>
              <select
                value={currentServer.config.tickRate}
                onChange={(e) => updateServerConfig(currentServer.id, { tickRate: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              >
                <option value={60}>60 Hz (Standard)</option>
                <option value={100}>100 Hz (Competitive)</option>
                <option value={128}>128 Hz (Ultra Precision Pro)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-slate-300 font-semibold block">PvP Combat Status</label>
              <button
                type="button"
                onClick={() => updateServerConfig(currentServer.id, { pvpEnabled: !currentServer.config.pvpEnabled })}
                className={`w-full py-2.5 rounded-xl border font-semibold transition-colors ${
                  currentServer.config.pvpEnabled
                    ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                    : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                }`}
              >
                {currentServer.config.pvpEnabled ? 'PvP Combat Enabled' : 'PvE Only (Friendly)'}
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-slate-300 font-semibold block">Difficulty Profile</label>
              <select
                value={currentServer.config.difficulty}
                onChange={(e) => updateServerConfig(currentServer.id, { difficulty: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="easy">Easy (Casual)</option>
                <option value="normal">Normal (Standard)</option>
                <option value="hard">Hard (Competitive)</option>
                <option value="extreme">Extreme (Hardcore Extraction)</option>
              </select>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => {
                addNotification('Saved', 'All configuration modifications have been written to disk.', 'success');
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl text-xs"
            >
              Save & Apply Settings
            </button>
          </div>
        </div>
      )}

      {/* 4. FILE MANAGER TAB: Edit config files */}
      {activeTab === 'files' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-base text-white">Server File System</h3>
              <p className="text-xs text-slate-400">Direct NVMe file browser and configuration editor</p>
            </div>
            <span className="text-xs text-slate-500 font-mono">/home/gameforge/server_01/</span>
          </div>

          {isEditingFile ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono text-cyan-400 font-semibold">Editing: {selectedFileName}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditingFile(false)}
                    className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveFile}
                    className="px-3 py-1 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1"
                  >
                    <Save className="w-3.5 h-3.5" /> Save File
                  </button>
                </div>
              </div>
              <textarea
                rows={14}
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>
          ) : (
            <div className="divide-y divide-slate-800/80 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
              {currentServer.files.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between p-3.5 hover:bg-slate-800/40 transition-colors text-xs"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="font-mono font-medium text-white">{file.name}</p>
                      <p className="text-[11px] text-slate-500">Updated {file.updated}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-slate-400">{file.size}</span>
                    <button
                      onClick={() => handleOpenFile(file.name, file.content)}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. MODS & PLUGINS TAB */}
      {activeTab === 'mods' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-base text-white">Mods & Plugins Management</h3>
              <p className="text-xs text-slate-400">Toggle community plugins or install verified packages with 1-click</p>
            </div>
            <button
              onClick={() => addNotification('Mod Manager', 'Opened ModHub repository.', 'info')}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700"
            >
              + Browse ModHub
            </button>
          </div>

          <div className="divide-y divide-slate-800/80 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
            {currentServer.mods.map((mod) => (
              <div key={mod.id} className="flex items-center justify-between p-4 hover:bg-slate-800/40 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{mod.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">{mod.version}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{mod.downloads} active server installs</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-medium ${mod.enabled ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {mod.enabled ? 'Active' : 'Disabled'}
                  </span>
                  <button
                    onClick={() => toggleServerMod(currentServer.id, mod.id)}
                    className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                      mod.enabled 
                        ? 'bg-rose-950/40 text-rose-300 hover:bg-rose-900/60' 
                        : 'bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60'
                    }`}
                  >
                    {mod.enabled ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. BACKUPS TAB */}
      {activeTab === 'backups' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-base text-white">Server Snapshot & Restore</h3>
              <p className="text-xs text-slate-400">Restore world save states, configurations, and player inventories</p>
            </div>
            <button
              onClick={() => addNotification('Backup Started', 'Creating incremental server snapshot...', 'info')}
              className="px-3.5 py-1.5 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs rounded-xl"
            >
              Take Manual Snapshot
            </button>
          </div>

          <div className="divide-y divide-slate-800/80 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
            {currentServer.backups.map((bk) => (
              <div key={bk.id} className="flex items-center justify-between p-4 text-xs">
                <div className="flex items-center gap-3">
                  <Database className="w-4 h-4 text-violet-400" />
                  <div>
                    <span className="font-mono font-medium text-white">{bk.date}</span>
                    <span className="text-[11px] text-slate-400 block uppercase">Type: {bk.type}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-slate-400">{bk.size}</span>
                  <button
                    onClick={() => addNotification('Restore Initiated', `Rolling back to backup from ${bk.date}...`, 'warning')}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium"
                  >
                    Restore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE NEW SERVER MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#0a0d14] border border-violet-500/30 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-violet-400" />
                <h3 className="font-display font-bold text-lg text-white">Deploy New Dedicated Server</h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateServerSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">Server Instance Name</label>
                <input
                  type="text"
                  required
                  value={newServerName}
                  onChange={(e) => setNewServerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">Game Title</label>
                <select
                  value={newServerGame}
                  onChange={(e) => setNewServerGame(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                >
                  {games.filter(g => g.isMultiplayer).map((g) => (
                    <option key={g.id} value={g.title}>{g.title}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">Datacenter Region</label>
                <select
                  value={newServerRegion}
                  onChange={(e) => setNewServerRegion(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="US East (N. Virginia)">US East (N. Virginia) · 16ms</option>
                  <option value="US Central (Dallas)">US Central (Dallas) · 24ms</option>
                  <option value="US West (Oregon)">US West (Oregon) · 28ms</option>
                  <option value="Europe (Frankfurt)">Europe (Frankfurt) · 18ms</option>
                  <option value="Europe (London)">Europe (London) · 21ms</option>
                  <option value="Asia Pacific (Tokyo)">Asia Pacific (Tokyo) · 38ms</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">RAM Hardware Allocation</label>
                <div className="grid grid-cols-3 gap-2">
                  {[8, 16, 32].map((ram) => (
                    <button
                      key={ram}
                      type="button"
                      onClick={() => setNewServerRamTier(ram)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        newServerRamTier === ram
                          ? 'border-violet-500 bg-violet-950/40 text-white font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <span className="block font-mono text-sm">{ram} GB</span>
                      <span className="text-[10px] text-slate-500">${(ram * 2.5).toFixed(2)}/mo</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                Includes automated DDoS mitigation, NVMe Gen5 storage, and instant provisioning in ~10 seconds.
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-violet-500/20"
                >
                  Confirm & Provision Server
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
