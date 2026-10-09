import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Play, Volume2, Shield } from 'lucide-react';

export const VideoTrailerModal: React.FC = () => {
  const { activeTrailerUrl, setActiveTrailerUrl } = useApp();

  if (!activeTrailerUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
            <Play className="w-4 h-4 fill-cyan-400" />
            <span>Official Gameplay & Cinematic Trailer</span>
          </div>
          <button
            onClick={() => setActiveTrailerUrl(null)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Frame */}
        <div className="aspect-video w-full bg-black relative flex items-center justify-center">
          <iframe
            src="https://www.youtube-nocookie.com/embed/kJQP7kiw5Fk?autoplay=1&mute=0"
            title="GameForge Official Trailer"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>Resolution: 4K 60FPS Ultra HDR</span>
          <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
            <Shield className="w-3.5 h-3.5" /> High-Bitrate Stream
          </span>
        </div>
      </div>
    </div>
  );
};
