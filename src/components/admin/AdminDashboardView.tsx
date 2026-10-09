import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldAlert, 
  Users, 
  Server, 
  DollarSign, 
  Gamepad2, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle, 
  Ban, 
  Check, 
  Trash2,
  Tag,
  Activity
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const { games, reviews, addNotification } = useApp();

  const [activeTab, setActiveTab] = useState<'kpis' | 'users' | 'games' | 'reviews'>('kpis');

  // Mock Admin State
  const [adminUsers, setAdminUsers] = useState([
    { id: 'u-1', name: 'Valkyrie_X', email: 'valk@syndicate.net', role: 'SuperAdmin', status: 'active', spent: '$642.50' },
    { id: 'u-2', name: 'Ghost_Protocol_99', email: 'ghost99@cyber.io', role: 'Operative', status: 'active', spent: '$318.00' },
    { id: 'u-3', name: 'ToxicTroll_07', email: 'griefer@spam.xyz', role: 'Operative', status: 'flagged', spent: '$19.99' },
    { id: 'u-4', name: 'Ragnar_Ironhand', email: 'ragnar@nordic.no', role: 'Server Host', status: 'active', spent: '$520.40' }
  ]);

  const [catalogGames, setCatalogGames] = useState(games);

  const toggleUserBan = (id: string) => {
    setAdminUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'banned' ? 'active' : 'banned';
        addNotification('User Moderation', `User ${u.name} status updated to ${nextStatus}.`, 'info');
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const toggleFeaturedGame = (gameId: string) => {
    setCatalogGames(prev => prev.map(g => {
      if (g.id === gameId) {
        return { ...g, isFeatured: !g.isFeatured };
      }
      return g;
    }));
    addNotification('Catalog Updated', 'Featured carousel status toggled.', 'success');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">Security & Governance</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-white tracking-tight">GameForge Admin Portal</h1>
        </div>

        <span className="text-xs font-mono text-emerald-400 px-3 py-1.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl">
          Cluster Health: 99.98% Healthy
        </span>
      </div>

      {/* Top Metric KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400">Total Users</span>
          <p className="font-mono text-xl font-bold text-white">124,580</p>
          <span className="text-[10px] text-emerald-400">+12% this month</span>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400">Concurrent Online</span>
          <p className="font-mono text-xl font-bold text-cyan-400">38,210</p>
          <span className="text-[10px] text-emerald-400">Peak today</span>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400">Dedicated Nodes</span>
          <p className="font-mono text-xl font-bold text-violet-400">1,429</p>
          <span className="text-[10px] text-slate-500">128-tick bare metal</span>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400">Monthly Revenue</span>
          <p className="font-mono text-xl font-bold text-emerald-400">$382,900</p>
          <span className="text-[10px] text-emerald-400">+18.4% MRR</span>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400">Total Orders</span>
          <p className="font-mono text-xl font-bold text-white">28,490</p>
          <span className="text-[10px] text-slate-500">Avg $34.20 / order</span>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400">Catalog Games</span>
          <p className="font-mono text-xl font-bold text-white">48</p>
          <span className="text-[10px] text-slate-500">8 Publishers</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs">
        <button
          onClick={() => setActiveTab('kpis')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'kpis' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Server Nodes & Fleet
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'users' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          User Management
        </button>
        <button
          onClick={() => setActiveTab('games')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'games' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Catalog Control
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'reviews' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Review Moderation
        </button>
      </div>

      {/* TAB 1: FLEET MONITORING */}
      {activeTab === 'kpis' && (
        <div className="space-y-4">
          <h3 className="font-display font-bold text-base text-white">Datacenter Cluster Fleet Telemetry</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between font-semibold text-white">
                <span>US-East (Virginia) Cluster</span>
                <span className="text-emerald-400 font-mono">0.02% Packet Loss</span>
              </div>
              <div className="space-y-1 text-slate-400">
                <p>Nodes: 540 Active Instances</p>
                <p>Bandwidth: 14.8 Gbps sustained</p>
                <p>Average Load: 42% CPU</p>
              </div>
            </div>

            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between font-semibold text-white">
                <span>EU-Central (Frankfurt) Cluster</span>
                <span className="text-emerald-400 font-mono">0.01% Packet Loss</span>
              </div>
              <div className="space-y-1 text-slate-400">
                <p>Nodes: 480 Active Instances</p>
                <p>Bandwidth: 12.2 Gbps sustained</p>
                <p>Average Load: 38% CPU</p>
              </div>
            </div>

            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between font-semibold text-white">
                <span>APAC (Tokyo) Cluster</span>
                <span className="text-emerald-400 font-mono">0.03% Packet Loss</span>
              </div>
              <div className="space-y-1 text-slate-400">
                <p>Nodes: 409 Active Instances</p>
                <p>Bandwidth: 9.4 Gbps sustained</p>
                <p>Average Load: 31% CPU</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Lifetime Spend</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {adminUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white">{u.name}</td>
                  <td className="p-4 text-slate-400 font-mono">{u.email}</td>
                  <td className="p-4 text-slate-300">{u.role}</td>
                  <td className="p-4 font-mono text-cyan-400">{u.spent}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                      u.status === 'active' ? 'bg-emerald-950 text-emerald-400' : u.status === 'flagged' ? 'bg-amber-950 text-amber-400' : 'bg-rose-950 text-rose-400'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleUserBan(u.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        u.status === 'banned' ? 'bg-emerald-900/60 text-emerald-300' : 'bg-rose-950/60 text-rose-400 hover:bg-rose-900'
                      }`}
                    >
                      {u.status === 'banned' ? 'Unban User' : 'Ban Operative'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: GAME CATALOG CONTROL */}
      {activeTab === 'games' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Game</th>
                <th className="p-4">Price</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Featured Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {catalogGames.map((g) => (
                <tr key={g.id} className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white flex items-center gap-2">
                    <img src={g.coverImage} alt={g.title} referrerPolicy="no-referrer" className="w-8 h-8 rounded object-cover" />
                    <span>{g.title}</span>
                  </td>
                  <td className="p-4 font-mono text-white">${g.price.toFixed(2)}</td>
                  <td className="p-4 text-amber-400 font-semibold">{g.rating} ★</td>
                  <td className="p-4">
                    <span className={`text-xs ${g.isFeatured ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
                      {g.isFeatured ? 'Featured on Home' : 'Standard Catalog'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleFeaturedGame(g.id)}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs"
                    >
                      Toggle Featured
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: REVIEW MODERATION */}
      {activeTab === 'reviews' && (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between text-xs">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{r.author}</span>
                  <span className="text-slate-500 font-mono">({r.date})</span>
                  <span className="text-amber-400 font-semibold">{r.rating} ★</span>
                </div>
                <p className="text-slate-300">{r.content}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => addNotification('Moderation', 'Review marked as verified.', 'success')}
                  className="px-3 py-1.5 bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 rounded-xl"
                >
                  Approve
                </button>
                <button
                  onClick={() => addNotification('Moderation', 'Review hidden from store.', 'info')}
                  className="px-3 py-1.5 bg-rose-950/60 text-rose-300 border border-rose-500/30 rounded-xl"
                >
                  Flag / Hide
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
