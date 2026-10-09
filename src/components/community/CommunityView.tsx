import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Plus, 
  Send, 
  Filter, 
  Calendar, 
  BookOpen, 
  Sparkles, 
  Radio, 
  Flame,
  X
} from 'lucide-react';
import { CommunityPost } from '../../types';

export const CommunityView: React.FC = () => {
  const { communityPosts, createCommunityPost, games, user, addNotification } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postGame, setPostGame] = useState(games[0].title);
  const [postCategory, setPostCategory] = useState<CommunityPost['category']>('Discussion');

  const categories = ['All', 'Discussion', 'Guide', 'News', 'Artwork', 'Modding'];

  const filteredPosts = communityPosts.filter((p) => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    return true;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    createCommunityPost({
      title: postTitle.trim(),
      content: postContent.trim(),
      gameTitle: postGame,
      category: postCategory
    });

    setPostTitle('');
    setPostContent('');
    setIsNewPostOpen(false);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Community Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-white tracking-tight">GameForge Community Hub</h1>
          <p className="text-xs text-slate-400">
            Developer updates, player blueprints, esports tournaments, and clan recruitment
          </p>
        </div>

        <button
          onClick={() => setIsNewPostOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Discussion Thread</span>
        </button>
      </div>

      {/* Featured Community Events & Broadcasts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/30 rounded-2xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> Live Broadcast
          </div>
          <h3 className="font-display font-bold text-sm text-white">GameForge Autumn Invitational Finals</h3>
          <p className="text-xs text-slate-400">16 clans competing in Aetherium Rift 128-tick brackets for $50,000.</p>
        </div>

        <div className="p-4 bg-gradient-to-br from-violet-950/40 to-slate-900 border border-violet-500/30 rounded-2xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-violet-400 font-semibold">
            <Calendar className="w-3.5 h-3.5" /> Upcoming Community Event
          </div>
          <h3 className="font-display font-bold text-sm text-white">Valkyrie Frostfall Community Raid Night</h3>
          <p className="text-xs text-slate-400">Every Saturday at 20:00 UTC on the Valhalla Official cluster.</p>
        </div>

        <div className="p-4 bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/30 rounded-2xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Creator Spotlight
          </div>
          <h3 className="font-display font-bold text-sm text-white">Mod of the Month: Oxide Core v2.1</h3>
          <p className="text-xs text-slate-400">Download rates exceeded 240,000 installs across GameForge hosts.</p>
        </div>
      </div>

      {/* Filter Categories tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-5 bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl space-y-3 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-xl object-cover bg-slate-800"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">{post.author}</span>
                    <span className="text-[10px] text-cyan-400 font-mono">[{post.category}]</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{post.gameTitle}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="font-display font-bold text-base text-white hover:text-cyan-300 cursor-pointer transition-colors">
              {post.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">{post.content}</p>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => addNotification('Liked', 'Post added to your saved favorites.', 'info')}
                  className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{post.likes} Upvotes</span>
                </button>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.commentsCount} Comments</span>
                </span>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  addNotification('Copied', 'Thread link copied to clipboard.', 'success');
                }}
                className="hover:text-white"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE NEW POST MODAL */}
      {isNewPostOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-display font-bold text-lg text-white">Create Community Thread</h3>
              <button onClick={() => setIsNewPostOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">Thread Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tips for extracting high-value loot in Sector 4"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold block">Associated Game</label>
                  <select
                    value={postGame}
                    onChange={(e) => setPostGame(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                  >
                    {games.map(g => (
                      <option key={g.id} value={g.title}>{g.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold block">Category</label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                  >
                    <option value="Discussion">Discussion</option>
                    <option value="Guide">Guide</option>
                    <option value="Artwork">Artwork</option>
                    <option value="Modding">Modding</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">Post Content</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your guide, patch review, or question here..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewPostOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold rounded-xl"
                >
                  Publish Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
