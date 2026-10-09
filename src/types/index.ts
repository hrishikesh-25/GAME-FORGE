export type PageRoute = 
  | 'home' 
  | 'store' 
  | 'game-detail' 
  | 'servers' 
  | 'hosting' 
  | 'library' 
  | 'community' 
  | 'profile' 
  | 'admin';

export interface Game {
  id: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number; // e.g. 4.9
  reviewCount: number;
  developer: string;
  publisher: string;
  releaseDate: string;
  genres: string[];
  tags: string[];
  isMultiplayer: boolean;
  isFeatured?: boolean;
  isSpecialOffer?: boolean;
  coverImage: string;
  bannerImage: string;
  screenshots: string[];
  trailerUrl?: string; // YouTube or video placeholder
  downloadSizeGb: number;
  systemRequirements: {
    minimum: {
      os: string;
      processor: string;
      memory: string;
      graphics: string;
      storage: string;
    };
    recommended: {
      os: string;
      processor: string;
      memory: string;
      graphics: string;
      storage: string;
    };
  };
}

export interface Review {
  id: string;
  gameId: string;
  author: string;
  authorAvatar: string;
  rating: number;
  playtimeHours: number;
  date: string;
  content: string;
  helpfulCount: number;
  recommended: boolean;
}

export interface PublicServer {
  id: string;
  name: string;
  game: string;
  gameId: string;
  region: string;
  countryCode: string;
  ip: string;
  port: number;
  players: number;
  maxPlayers: number;
  ping: number;
  status: 'online' | 'offline' | 'restarting';
  isModded: boolean;
  mods: string[];
  description: string;
  uptime: string;
  tickRate: number;
}

export interface HostedServerConfig {
  serverName: string;
  maxPlayers: number;
  tickRate: number;
  pvpEnabled: boolean;
  passwordProtected: boolean;
  difficulty: 'easy' | 'normal' | 'hard' | 'extreme';
  autoRestart: boolean;
  motd: string;
}

export interface HostedServer {
  id: string;
  name: string;
  game: string;
  gameId: string;
  region: string;
  status: 'online' | 'offline' | 'restarting';
  ip: string;
  port: number;
  ping: number;
  cpuPercent: number;
  ramUsedGb: number;
  ramMaxGb: number;
  storageUsedGb: number;
  storageMaxGb: number;
  networkMbps: number;
  currentPlayers: number;
  maxPlayers: number;
  uptime: string;
  planName: string;
  monthlyCost: number;
  config: HostedServerConfig;
  consoleLogs: Array<{
    timestamp: string;
    type: 'info' | 'warn' | 'error' | 'success';
    message: string;
  }>;
  files: Array<{
    name: string;
    size: string;
    updated: string;
    content: string;
  }>;
  mods: Array<{
    id: string;
    name: string;
    version: string;
    enabled: boolean;
    downloads: string;
  }>;
  backups: Array<{
    id: string;
    date: string;
    size: string;
    type: 'auto' | 'manual';
  }>;
}

export interface LibraryGame {
  gameId: string;
  game: Game;
  purchaseDate: string;
  playtimeHours: number;
  lastPlayed: string;
  isInstalled: boolean;
  isDownloading: boolean;
  downloadProgress: number; // 0 - 100
  downloadSpeedMbps: number;
  achievementsUnlocked: number;
  totalAchievements: number;
}

export interface CartItem {
  gameId: string;
  game: Game;
  selectedEdition?: string;
  price: number;
}

export interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  level: number;
  xpCurrent: number;
  xpNextLevel: number;
  walletBalance: number;
  badgeTitle: string;
  bio: string;
  memberSince: string;
  friendsCount: number;
  friends: Array<{
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'offline' | 'in-game';
    currentGame?: string;
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    gameTitle: string;
    date: string;
    rarity: string;
  }>;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  gameTitle: string;
  title: string;
  content: string;
  category: 'Discussion' | 'Guide' | 'News' | 'Artwork' | 'Modding';
  likes: number;
  commentsCount: number;
  timestamp: string;
  comments?: Array<{
    id: string;
    author: string;
    avatar: string;
    content: string;
    timestamp: string;
  }>;
}
