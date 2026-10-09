import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PageRoute, 
  Game, 
  PublicServer, 
  HostedServer, 
  HostedServerConfig, 
  LibraryGame, 
  CartItem, 
  UserProfile, 
  CommunityPost, 
  Review 
} from '../types';
import { 
  INITIAL_GAMES, 
  PUBLIC_SERVERS, 
  INITIAL_HOSTED_SERVERS, 
  INITIAL_USER, 
  INITIAL_COMMUNITY_POSTS, 
  INITIAL_REVIEWS 
} from '../data/mockData';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  currentRoute: PageRoute;
  selectedGameId: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  games: Game[];
  library: LibraryGame[];
  cart: CartItem[];
  wishlist: string[];
  user: UserProfile;
  hostedServers: HostedServer[];
  publicServers: PublicServer[];
  communityPosts: CommunityPost[];
  reviews: Review[];
  notifications: AppNotification[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  activeTrailerUrl: string | null;
  setActiveTrailerUrl: (url: string | null) => void;
  quickViewGame: Game | null;
  setQuickViewGame: (game: Game | null) => void;
  activePlaySession: { game: Game; startedAt: number; elapsedSeconds: number } | null;
  
  navigate: (route: PageRoute, gameId?: string) => void;
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string) => void;
  clearCart: () => void;
  isInCart: (gameId: string) => boolean;
  toggleWishlist: (gameId: string) => void;
  isInWishlist: (gameId: string) => boolean;
  purchaseCart: (paymentMethod: string, discountPct?: number) => { success: boolean; message: string };
  installGame: (gameId: string) => void;
  launchGame: (gameId: string) => void;
  stopGameSession: () => void;
  addReview: (gameId: string, rating: number, content: string, recommended: boolean) => void;
  startServer: (serverId: string) => void;
  stopServer: (serverId: string) => void;
  restartServer: (serverId: string) => void;
  sendServerCommand: (serverId: string, command: string) => void;
  updateServerConfig: (serverId: string, newConfig: Partial<HostedServerConfig>) => void;
  saveServerFile: (serverId: string, fileName: string, content: string) => void;
  toggleServerMod: (serverId: string, modId: string) => void;
  createNewServer: (serverData: { name: string; gameTitle: string; region: string; ramTier: number }) => void;
  createCommunityPost: (data: { title: string; content: string; gameTitle: string; category: CommunityPost['category'] }) => void;
  markNotificationRead: (id: string) => void;
  addNotification: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedGameId, setSelectedGameId] = useState<string | null>('game-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTrailerUrl, setActiveTrailerUrl] = useState<string | null>(null);
  const [quickViewGame, setQuickViewGame] = useState<Game | null>(null);
  const [activePlaySession, setActivePlaySession] = useState<{ game: Game; startedAt: number; elapsedSeconds: number } | null>(null);

  // Initial user library with game-1 already owned and installed
  const [library, setLibrary] = useState<LibraryGame[]>([
    {
      gameId: 'game-1',
      game: INITIAL_GAMES[0],
      purchaseDate: 'Oct 01, 2026',
      playtimeHours: 68.4,
      lastPlayed: 'Today',
      isInstalled: true,
      isDownloading: false,
      downloadProgress: 100,
      downloadSpeedMbps: 0,
      achievementsUnlocked: 12,
      totalAchievements: 25,
    },
    {
      gameId: 'game-2',
      game: INITIAL_GAMES[1],
      purchaseDate: 'Sep 15, 2026',
      playtimeHours: 42.1,
      lastPlayed: '2 days ago',
      isInstalled: false,
      isDownloading: false,
      downloadProgress: 0,
      downloadSpeedMbps: 0,
      achievementsUnlocked: 8,
      totalAchievements: 20,
    }
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['game-3']);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [hostedServers, setHostedServers] = useState<HostedServer[]>(INITIAL_HOSTED_SERVERS);
  const [publicServers, setPublicServers] = useState<PublicServer[]>(PUBLIC_SERVERS);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'n-1',
      title: 'Patch 2.4 Deployed',
      message: 'Aetherium Rift server node 142.250.180.205 auto-updated to v2.4 successfully.',
      timestamp: '15m ago',
      read: false,
      type: 'success'
    },
    {
      id: 'n-2',
      title: 'Wishlist Item On Sale',
      message: 'Shadow Heist: Blackout is currently 33% off for the GameForge Autumn Showcase!',
      timestamp: '2h ago',
      read: false,
      type: 'info'
    }
  ]);

  // Live timer for active play session
  useEffect(() => {
    if (!activePlaySession) return;
    const interval = setInterval(() => {
      setActivePlaySession(prev => prev ? { ...prev, elapsedSeconds: prev.elapsedSeconds + 1 } : null);
    }, 1000);
    return () => clearInterval(interval);
  }, [activePlaySession]);

  const navigate = (route: PageRoute, gameId?: string) => {
    setCurrentRoute(route);
    if (gameId) {
      setSelectedGameId(gameId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addNotification = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const newNotif: AppNotification = {
      id: `n-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addToCart = (game: Game) => {
    if (cart.some(item => item.gameId === game.id)) {
      addNotification('Cart Alert', `${game.title} is already in your cart.`, 'info');
      setIsCartOpen(true);
      return;
    }
    const newItem: CartItem = {
      gameId: game.id,
      game,
      price: game.price
    };
    setCart(prev => [...prev, newItem]);
    addNotification('Added to Cart', `${game.title} was added to your cart.`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (gameId: string) => {
    setCart(prev => prev.filter(item => item.gameId !== gameId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (gameId: string) => {
    return cart.some(item => item.gameId === gameId);
  };

  const toggleWishlist = (gameId: string) => {
    const isWished = wishlist.includes(gameId);
    const game = games.find(g => g.id === gameId);
    if (isWished) {
      setWishlist(prev => prev.filter(id => id !== gameId));
      addNotification('Wishlist', `${game?.title || 'Game'} removed from wishlist.`, 'info');
    } else {
      setWishlist(prev => [...prev, gameId]);
      addNotification('Wishlist', `${game?.title || 'Game'} saved to your wishlist.`, 'success');
    }
  };

  const isInWishlist = (gameId: string) => {
    return wishlist.includes(gameId);
  };

  const purchaseCart = (paymentMethod: string, discountPct: number = 0) => {
    if (cart.length === 0) {
      return { success: false, message: 'Your cart is empty.' };
    }

    const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
    const discountAmount = subtotal * (discountPct / 100);
    const finalTotal = +(subtotal - discountAmount).toFixed(2);

    if (paymentMethod === 'GameForge Wallet' && user.walletBalance < finalTotal) {
      return { 
        success: false, 
        message: `Insufficient wallet balance ($${user.walletBalance.toFixed(2)}). Please choose another payment method or top up.` 
      };
    }

    // Deduct wallet if used
    if (paymentMethod === 'GameForge Wallet') {
      setUser(prev => ({
        ...prev,
        walletBalance: +(prev.walletBalance - finalTotal).toFixed(2),
        xpCurrent: prev.xpCurrent + Math.round(finalTotal * 10)
      }));
    } else {
      setUser(prev => ({
        ...prev,
        xpCurrent: prev.xpCurrent + Math.round(finalTotal * 10)
      }));
    }

    // Add purchased games to user library
    const newLibraryEntries: LibraryGame[] = cart.map(item => ({
      gameId: item.game.id,
      game: item.game,
      purchaseDate: 'Today',
      playtimeHours: 0,
      lastPlayed: 'Never',
      isInstalled: false,
      isDownloading: false,
      downloadProgress: 0,
      downloadSpeedMbps: 0,
      achievementsUnlocked: 0,
      totalAchievements: 15,
    })).filter(newLib => !library.some(lib => lib.gameId === newLib.gameId));

    setLibrary(prev => [...prev, ...newLibraryEntries]);
    
    // Remove from wishlist if purchased
    const purchasedIds = cart.map(c => c.gameId);
    setWishlist(prev => prev.filter(id => !purchasedIds.includes(id)));

    const titles = cart.map(c => c.game.title).join(', ');
    setCart([]);
    setIsCartOpen(false);

    addNotification('Purchase Successful!', `Purchased: ${titles}. Added to your GameForge library.`, 'success');
    return { success: true, message: 'Order complete! Your game is ready to download.' };
  };

  const installGame = (gameId: string) => {
    const libGame = library.find(item => item.gameId === gameId);
    if (!libGame || libGame.isInstalled || libGame.isDownloading) return;

    // Start download simulation
    setLibrary(prev => prev.map(item => {
      if (item.gameId === gameId) {
        return { ...item, isDownloading: true, downloadProgress: 5, downloadSpeedMbps: 88.4 };
      }
      return item;
    }));

    addNotification('Download Started', `Downloading ${libGame.game.title} (high-speed CDN)...`, 'info');

    let currentProgress = 5;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 12;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setLibrary(prev => prev.map(item => {
          if (item.gameId === gameId) {
            return {
              ...item,
              isDownloading: false,
              isInstalled: true,
              downloadProgress: 100,
              downloadSpeedMbps: 0
            };
          }
          return item;
        }));
        addNotification('Installation Complete', `${libGame.game.title} is now installed and ready to launch!`, 'success');
      } else {
        setLibrary(prev => prev.map(item => {
          if (item.gameId === gameId) {
            return {
              ...item,
              downloadProgress: currentProgress,
              downloadSpeedMbps: +(85 + Math.random() * 15).toFixed(1)
            };
          }
          return item;
        }));
      }
    }, 450);
  };

  const launchGame = (gameId: string) => {
    const libItem = library.find(item => item.gameId === gameId);
    if (!libItem) return;

    setActivePlaySession({
      game: libItem.game,
      startedAt: Date.now(),
      elapsedSeconds: 0
    });

    // Update last played
    setLibrary(prev => prev.map(item => {
      if (item.gameId === gameId) {
        return { ...item, lastPlayed: 'Just now' };
      }
      return item;
    }));

    addNotification('Game Launched', `Launching ${libItem.game.title} in High-Performance mode.`, 'success');
  };

  const stopGameSession = () => {
    if (!activePlaySession) return;
    const additionalHours = +(activePlaySession.elapsedSeconds / 3600).toFixed(2);
    setLibrary(prev => prev.map(item => {
      if (item.gameId === activePlaySession.game.id) {
        return {
          ...item,
          playtimeHours: +(item.playtimeHours + Math.max(0.01, additionalHours)).toFixed(1)
        };
      }
      return item;
    }));
    setActivePlaySession(null);
  };

  const addReview = (gameId: string, rating: number, content: string, recommended: boolean) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      gameId,
      author: user.username,
      authorAvatar: user.avatar,
      rating,
      playtimeHours: 24.5,
      date: 'Just now',
      content,
      helpfulCount: 0,
      recommended
    };
    setReviews(prev => [newRev, ...prev]);
    addNotification('Review Published', 'Your review has been shared with the GameForge community!', 'success');
  };

  // Server management actions
  const startServer = (serverId: string) => {
    setHostedServers(prev => prev.map(s => {
      if (s.id === serverId) {
        return {
          ...s,
          status: 'online',
          uptime: '0m',
          consoleLogs: [
            ...s.consoleLogs,
            { timestamp: new Date().toLocaleTimeString(), type: 'info', message: '[Power] Boot sequence initiated via GameForge Dashboard' },
            { timestamp: new Date().toLocaleTimeString(), type: 'success', message: '[Power] Server daemon active on port ' + s.port }
          ]
        };
      }
      return s;
    }));
    addNotification('Server Started', `Server instance online and accepting player connections.`, 'success');
  };

  const stopServer = (serverId: string) => {
    setHostedServers(prev => prev.map(s => {
      if (s.id === serverId) {
        return {
          ...s,
          status: 'offline',
          currentPlayers: 0,
          cpuPercent: 0.1,
          ramUsedGb: 0.4,
          consoleLogs: [
            ...s.consoleLogs,
            { timestamp: new Date().toLocaleTimeString(), type: 'warn', message: '[Power] Graceful shutdown sequence dispatched.' },
            { timestamp: new Date().toLocaleTimeString(), type: 'info', message: '[Power] World state saved. Daemon stopped.' }
          ]
        };
      }
      return s;
    }));
    addNotification('Server Stopped', `Server shutdown safely. World data preserved.`, 'info');
  };

  const restartServer = (serverId: string) => {
    setHostedServers(prev => prev.map(s => {
      if (s.id === serverId) {
        return { ...s, status: 'restarting' };
      }
      return s;
    }));
    addNotification('Server Restarting', 'Broadcasting restart signal to connected clients...', 'warning');

    setTimeout(() => {
      setHostedServers(prev => prev.map(s => {
        if (s.id === serverId) {
          return {
            ...s,
            status: 'online',
            uptime: '1m',
            consoleLogs: [
              ...s.consoleLogs,
              { timestamp: new Date().toLocaleTimeString(), type: 'info', message: '[Restart] Warm reboot cycle completed in 2.1s' }
            ]
          };
        }
        return s;
      }));
      addNotification('Server Online', 'Server restart cycle complete.', 'success');
    }, 2000);
  };

  const sendServerCommand = (serverId: string, command: string) => {
    const cmd = command.trim();
    if (!cmd) return;

    let reply = `[RCON] Command "${cmd}" executed successfully.`;
    if (cmd.startsWith('kick')) {
      reply = `[RCON] Disconnected player specified in arguments.`;
    } else if (cmd === 'status') {
      reply = `[RCON] Tickrate: 128 | TPS: 20.00 | Memory Heap: 6.8 GB / 16.0 GB`;
    } else if (cmd === 'save') {
      reply = `[World] Auto-saving world chunk state... Saved.`;
    }

    setHostedServers(prev => prev.map(s => {
      if (s.id === serverId) {
        return {
          ...s,
          consoleLogs: [
            ...s.consoleLogs,
            { timestamp: new Date().toLocaleTimeString(), type: 'info', message: `> ${cmd}` },
            { timestamp: new Date().toLocaleTimeString(), type: 'success', message: reply }
          ]
        };
      }
      return s;
    }));
  };

  const updateServerConfig = (serverId: string, newConfig: Partial<HostedServerConfig>) => {
    setHostedServers(prev => prev.map(s => {
      if (s.id === serverId) {
        return {
          ...s,
          config: { ...s.config, ...newConfig }
        };
      }
      return s;
    }));
    addNotification('Configuration Saved', 'Server configuration updated. Restart server to apply tickrate modifications.', 'success');
  };

  const saveServerFile = (serverId: string, fileName: string, content: string) => {
    setHostedServers(prev => prev.map(s => {
      if (s.id === serverId) {
        return {
          ...s,
          files: s.files.map(f => f.name === fileName ? { ...f, content, updated: 'Just now' } : f)
        };
      }
      return s;
    }));
    addNotification('File Saved', `${fileName} written to NVMe storage.`, 'success');
  };

  const toggleServerMod = (serverId: string, modId: string) => {
    setHostedServers(prev => prev.map(s => {
      if (s.id === serverId) {
        return {
          ...s,
          mods: s.mods.map(m => m.id === modId ? { ...m, enabled: !m.enabled } : m)
        };
      }
      return s;
    }));
  };

  const createNewServer = (data: { name: string; gameTitle: string; region: string; ramTier: number }) => {
    const matchedGame = games.find(g => g.title === data.gameTitle) || games[0];
    const newServer: HostedServer = {
      id: `hosted-${Date.now()}`,
      name: data.name,
      game: data.gameTitle,
      gameId: matchedGame.id,
      region: data.region,
      status: 'online',
      ip: `142.${Math.floor(Math.random()*150 + 50)}.${Math.floor(Math.random()*200 + 10)}.${Math.floor(Math.random()*250 + 1)}`,
      port: 27015 + Math.floor(Math.random() * 50),
      ping: 18,
      cpuPercent: 12.4,
      ramUsedGb: 1.8,
      ramMaxGb: data.ramTier,
      storageUsedGb: 6.2,
      storageMaxGb: 100,
      networkMbps: 12.0,
      currentPlayers: 0,
      maxPlayers: data.ramTier * 4,
      uptime: '1m',
      planName: `Forge Dedicated (${data.ramTier}GB RAM)`,
      monthlyCost: data.ramTier * 2.5,
      config: {
        serverName: data.name,
        maxPlayers: data.ramTier * 4,
        tickRate: 128,
        pvpEnabled: true,
        passwordProtected: false,
        difficulty: 'normal',
        autoRestart: true,
        motd: `Welcome to ${data.name}! Hosted on GameForge Dedicated High-Speed Node.`
      },
      consoleLogs: [
        { timestamp: new Date().toLocaleTimeString(), type: 'info', message: '[Provisioner] Container allocation granted on Ryzen 7000 cluster.' },
        { timestamp: new Date().toLocaleTimeString(), type: 'success', message: `[Provisioner] Game image deployed. Server running.` }
      ],
      files: [
        {
          name: 'server.cfg',
          size: '1.4 KB',
          updated: 'Just now',
          content: `hostname "${data.name}"\nsv_tickrate 128\nsv_maxplayers ${data.ramTier * 4}\n`
        }
      ],
      mods: [],
      backups: [
        { id: `bk-init`, date: 'Today - Initial State', size: '512 MB', type: 'auto' }
      ]
    };

    setHostedServers(prev => [newServer, ...prev]);
    addNotification('Server Provisioned', `New server "${data.name}" is now online!`, 'success');
  };

  const createCommunityPost = (data: { title: string; content: string; gameTitle: string; category: CommunityPost['category'] }) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: user.username,
      avatar: user.avatar,
      gameTitle: data.gameTitle,
      title: data.title,
      content: data.content,
      category: data.category,
      likes: 1,
      commentsCount: 0,
      timestamp: 'Just now',
      comments: []
    };
    setCommunityPosts(prev => [newPost, ...prev]);
    addNotification('Post Published', 'Your thread has been posted to GameForge Community Forums.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        selectedGameId,
        searchQuery,
        setSearchQuery,
        games,
        library,
        cart,
        wishlist,
        user,
        hostedServers,
        publicServers,
        communityPosts,
        reviews,
        notifications,
        isCartOpen,
        setIsCartOpen,
        activeTrailerUrl,
        setActiveTrailerUrl,
        quickViewGame,
        setQuickViewGame,
        activePlaySession,
        navigate,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        toggleWishlist,
        isInWishlist,
        purchaseCart,
        installGame,
        launchGame,
        stopGameSession,
        addReview,
        startServer,
        stopServer,
        restartServer,
        sendServerCommand,
        updateServerConfig,
        saveServerFile,
        toggleServerMod,
        createNewServer,
        createCommunityPost,
        markNotificationRead,
        addNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
