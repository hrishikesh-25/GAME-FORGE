import { Game, PublicServer, HostedServer, UserProfile, CommunityPost, Review } from '../types';

export const HERO_GAME_IMG = '/src/assets/images/hero_cyber_forge_1791396911349.jpg';
export const VALKYRIE_GAME_IMG = '/src/assets/images/game_valkyrie_odyssey_1791396925414.jpg';
export const STARFALL_GAME_IMG = '/src/assets/images/game_starfall_protocol_1791396937255.jpg';
export const SHADOW_HEIST_IMG = '/src/assets/images/game_shadow_heist_1791396955248.jpg';
export const DATACENTER_IMG = '/src/assets/images/server_datacenter_node_1791396971071.jpg';

export const INITIAL_GAMES: Game[] = [
  {
    id: 'game-1',
    title: 'Aetherium Rift: Retribution',
    tagline: 'Cybernetic warfare in a fractured orbital megacity.',
    description: 'Enter Neo-Kyoto in the year 2188. As an exiled Syndicate operative equipped with experimental phase-blade implants and gravitational disruption rigs, plunge into high-stakes extraction raids across shattered corporate spires. Team up in 4-player co-op or conquer the open frontier solo.',
    price: 49.99,
    originalPrice: 69.99,
    discountPercentage: 28,
    rating: 4.9,
    reviewCount: 14820,
    developer: 'Vanguard Void Studios',
    publisher: 'GameForge Publishing',
    releaseDate: 'October 12, 2025',
    genres: ['Action', 'RPG', 'Multiplayer'],
    tags: ['Cyberpunk', 'Co-op', 'Loot Shooter', 'Fast-Paced', 'Sci-Fi'],
    isMultiplayer: true,
    isFeatured: true,
    isSpecialOffer: true,
    coverImage: HERO_GAME_IMG,
    bannerImage: HERO_GAME_IMG,
    screenshots: [
      HERO_GAME_IMG,
      SHADOW_HEIST_IMG,
      STARFALL_GAME_IMG
    ],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    downloadSizeGb: 78.4,
    systemRequirements: {
      minimum: {
        os: 'Windows 11 64-bit',
        processor: 'AMD Ryzen 5 3600 / Intel i5-10400F',
        memory: '16 GB RAM',
        graphics: 'NVIDIA RTX 2060 6GB / AMD RX 5600 XT',
        storage: '85 GB SSD space required',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        processor: 'AMD Ryzen 7 7800X3D / Intel i7-14700K',
        memory: '32 GB RAM',
        graphics: 'NVIDIA RTX 4070 Ti / AMD RX 7900 XT',
        storage: '85 GB NVMe SSD space required',
      },
    },
  },
  {
    id: 'game-2',
    title: 'Valkyrie Odyssey: Frostfall',
    tagline: 'Claim runic ascendancy in an unforgiving Norse realm.',
    description: 'Awaken upon the frozen peaks of Yggdrasil as a fallen warrior chosen by Odin. Forge enchanted weapons with ancient celestial runes, build fortified longhouses against roaming frost giants, and wage war across nine realms with seamless drop-in dedicated multiplayer servers.',
    price: 39.99,
    originalPrice: 49.99,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 9410,
    developer: 'Northern Mythic Interactive',
    publisher: 'GameForge Publishing',
    releaseDate: 'August 18, 2025',
    genres: ['Adventure', 'RPG', 'Multiplayer'],
    tags: ['Open World', 'Survival Craft', 'Mythology', 'Souls-like', 'Co-op'],
    isMultiplayer: true,
    isFeatured: true,
    isSpecialOffer: true,
    coverImage: VALKYRIE_GAME_IMG,
    bannerImage: VALKYRIE_GAME_IMG,
    screenshots: [
      VALKYRIE_GAME_IMG,
      HERO_GAME_IMG,
      SHADOW_HEIST_IMG
    ],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    downloadSizeGb: 46.2,
    systemRequirements: {
      minimum: {
        os: 'Windows 10/11 64-bit',
        processor: 'Intel Core i5-8400 / AMD Ryzen 5 2600',
        memory: '12 GB RAM',
        graphics: 'GTX 1660 Super / RX 580',
        storage: '50 GB SSD space required',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        processor: 'Intel Core i7-12700 / AMD Ryzen 7 5800X',
        memory: '16 GB RAM',
        graphics: 'RTX 3070 8GB / RX 6750 XT',
        storage: '50 GB NVMe SSD space',
      },
    },
  },
  {
    id: 'game-3',
    title: 'Starfall Protocol: Zero G',
    tagline: 'Hardcore tactical extraction shooter adrift in the void.',
    description: 'Drift through decommissioned orbital cruisers, salvage classified prototypes, and repel rogue AI security swarms. Every bulkhead breach poses decompression risks in zero-gravity firefights. Extract with your loot before the reactor initiates thermal collapse.',
    price: 34.99,
    rating: 4.7,
    reviewCount: 6830,
    developer: 'Apex Horizon Labs',
    publisher: 'Apex Horizon',
    releaseDate: 'May 30, 2025',
    genres: ['Action', 'Strategy', 'Multiplayer'],
    tags: ['Extraction Shooter', 'Tactical', 'Space', 'Hardcore PvPvE', 'FPS'],
    isMultiplayer: true,
    isFeatured: true,
    coverImage: STARFALL_GAME_IMG,
    bannerImage: STARFALL_GAME_IMG,
    screenshots: [
      STARFALL_GAME_IMG,
      HERO_GAME_IMG,
      VALKYRIE_GAME_IMG
    ],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    downloadSizeGb: 62.0,
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        processor: 'Intel i5-9600K / Ryzen 5 3600',
        memory: '16 GB RAM',
        graphics: 'RTX 2060 / RX 5600 XT',
        storage: '65 GB SSD space',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        processor: 'Intel i7-13700K / Ryzen 7 7700X',
        memory: '32 GB RAM',
        graphics: 'RTX 4070 / RX 7800 XT',
        storage: '65 GB NVMe SSD space',
      },
    },
  },
  {
    id: 'game-4',
    title: 'Shadow Heist: Blackout',
    tagline: 'Precision stealth and social engineering in high-tech dystopia.',
    description: 'The world is governed by neural monopolists. As a ghost contractor, hack corporate nodes, disable biometric laser grids, and coordinate silent infiltrations with your syndicate crew. One tripped alarm turns a surgical heist into an all-out paramilitary siege.',
    price: 29.99,
    originalPrice: 44.99,
    discountPercentage: 33,
    rating: 4.6,
    reviewCount: 4210,
    developer: 'Cipher Works',
    publisher: 'GameForge Originals',
    releaseDate: 'January 14, 2025',
    genres: ['Action', 'Adventure', 'Strategy'],
    tags: ['Stealth', 'Cyberpunk', 'Hacking', 'Immersive Sim', 'Co-op'],
    isMultiplayer: true,
    isFeatured: false,
    isSpecialOffer: true,
    coverImage: SHADOW_HEIST_IMG,
    bannerImage: SHADOW_HEIST_IMG,
    screenshots: [
      SHADOW_HEIST_IMG,
      HERO_GAME_IMG,
      STARFALL_GAME_IMG
    ],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    downloadSizeGb: 38.5,
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        processor: 'Intel i5-7400 / Ryzen 3 3300X',
        memory: '8 GB RAM',
        graphics: 'GTX 1060 6GB / RX 570',
        storage: '40 GB available space',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        processor: 'Intel i7-11700 / Ryzen 5 5600X',
        memory: '16 GB RAM',
        graphics: 'RTX 3060 12GB',
        storage: '40 GB SSD space',
      },
    },
  },
  {
    id: 'game-5',
    title: 'Ironclad Vanguard: Frontline',
    tagline: 'Massive combined-arms armored warfare on destructible battlefields.',
    description: 'Engage in 64 vs 64 mechanical warfare with heavy main battle tanks, attack gunships, and artillery batteries across fully destructible terrain. Features hyper-realistic ballistic simulations and squad-leader tactical command nets.',
    price: 19.99,
    rating: 4.5,
    reviewCount: 11200,
    developer: 'Titan Ballistics',
    publisher: 'Titan Interactive',
    releaseDate: 'November 2024',
    genres: ['Action', 'Multiplayer', 'Strategy'],
    tags: ['Military', 'Vehicular Combat', 'Tactical', 'FPS', 'Large Scale'],
    isMultiplayer: true,
    coverImage: HERO_GAME_IMG,
    bannerImage: HERO_GAME_IMG,
    screenshots: [HERO_GAME_IMG, STARFALL_GAME_IMG],
    downloadSizeGb: 55.0,
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        processor: 'Intel i5-8400',
        memory: '12 GB RAM',
        graphics: 'GTX 1070 8GB',
        storage: '60 GB HDD',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        processor: 'Ryzen 7 5700X',
        memory: '16 GB RAM',
        graphics: 'RTX 3060 Ti',
        storage: '60 GB SSD',
      },
    },
  },
  {
    id: 'game-6',
    title: 'Dread Hollow: The Descent',
    tagline: 'Psychological cosmic horror in an abandoned deep-earth borehole.',
    description: 'Trapped 14 kilometers beneath the Siberian permafrost inside an abandoned drilling facility, you are tasked with recovering acoustic sensor logs. But something is answering the drills from below. Manage limited oxygen, flashlights, and sanity in oppressive atmospheric terror.',
    price: 24.99,
    originalPrice: 29.99,
    discountPercentage: 17,
    rating: 4.8,
    reviewCount: 3120,
    developer: 'Subterranean Mind',
    publisher: 'GameForge Publishing',
    releaseDate: 'September 2025',
    genres: ['Horror', 'Adventure', 'Indie'],
    tags: ['Atmospheric', 'Survival Horror', 'Psychological', 'Story Rich'],
    isMultiplayer: false,
    isSpecialOffer: true,
    coverImage: SHADOW_HEIST_IMG,
    bannerImage: SHADOW_HEIST_IMG,
    screenshots: [SHADOW_HEIST_IMG, VALKYRIE_GAME_IMG],
    downloadSizeGb: 22.1,
    systemRequirements: {
      minimum: {
        os: 'Windows 10',
        processor: 'Intel i3-10100',
        memory: '8 GB RAM',
        graphics: 'GTX 1050 Ti',
        storage: '25 GB SSD',
      },
      recommended: {
        os: 'Windows 11',
        processor: 'Intel i5-11400',
        memory: '16 GB RAM',
        graphics: 'RTX 2060',
        storage: '25 GB SSD',
      },
    },
  },
  {
    id: 'game-7',
    title: 'Apex Apex: Neon Horizon',
    tagline: 'High-octane anti-gravity arcade racing at supersonic Mach speeds.',
    description: 'Blaze across magnetic tracks twisting through megacity hyper-loops, subterranean molten tubes, and orbital stations. Master drift boosting, defensive sonic shields, and weaponized slipstreams against 16 racers in 120 FPS high-refresh velocity.',
    price: 27.99,
    rating: 4.6,
    reviewCount: 2900,
    developer: 'Velocity Core',
    publisher: 'Pulse Digital',
    releaseDate: 'March 2025',
    genres: ['Racing', 'Action', 'Multiplayer'],
    tags: ['Sci-Fi', 'Fast-Paced', 'Arcade', 'Soundtrack', 'Competitive'],
    isMultiplayer: true,
    coverImage: HERO_GAME_IMG,
    bannerImage: HERO_GAME_IMG,
    screenshots: [HERO_GAME_IMG, STARFALL_GAME_IMG],
    downloadSizeGb: 31.8,
    systemRequirements: {
      minimum: {
        os: 'Windows 10',
        processor: 'Intel i5-6600K',
        memory: '8 GB RAM',
        graphics: 'GTX 970 / RX 570',
        storage: '35 GB',
      },
      recommended: {
        os: 'Windows 11',
        processor: 'Ryzen 5 3600',
        memory: '16 GB RAM',
        graphics: 'RTX 3060',
        storage: '35 GB SSD',
      },
    },
  },
  {
    id: 'game-8',
    title: 'Sub-Zero Colony: Mars',
    tagline: 'Survive brutal Martian dust storms and build an autonomous civilization.',
    description: 'Command the first permanent subterranean colony on Mars. Manage thermal grids, geothermal power generation, hydroponics domes, and atmospheric terraforming stations while facing catastrophic radiation flares and dust avalanches.',
    price: 32.99,
    rating: 4.7,
    reviewCount: 5410,
    developer: 'Red Planet Simulations',
    publisher: 'GameForge Publishing',
    releaseDate: 'July 2025',
    genres: ['Simulation', 'Strategy', 'Indie'],
    tags: ['City Builder', 'Survival', 'Space', 'Resource Management', 'Base Building'],
    isMultiplayer: false,
    coverImage: STARFALL_GAME_IMG,
    bannerImage: STARFALL_GAME_IMG,
    screenshots: [STARFALL_GAME_IMG, VALKYRIE_GAME_IMG],
    downloadSizeGb: 19.4,
    systemRequirements: {
      minimum: {
        os: 'Windows 10',
        processor: 'Intel i5-8400',
        memory: '8 GB RAM',
        graphics: 'GTX 1060 6GB',
        storage: '20 GB',
      },
      recommended: {
        os: 'Windows 11',
        processor: 'Ryzen 7 3700X',
        memory: '16 GB RAM',
        graphics: 'RTX 2070',
        storage: '20 GB SSD',
      },
    },
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    gameId: 'game-1',
    author: 'Ghost_Protocol_99',
    authorAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    playtimeHours: 142.6,
    date: '3 days ago',
    content: 'The phase-dash mechanics and high-frequency sound design are sublime. Running custom 128-tick GameForge hosted servers with our clan has zero packet loss even with 40 operatives clashing at the extraction zone. Absolute 10/10.',
    helpfulCount: 382,
    recommended: true
  },
  {
    id: 'rev-2',
    gameId: 'game-1',
    author: 'Valkyrie_Nova',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    playtimeHours: 68.2,
    date: '1 week ago',
    content: 'Visually stunning Neo-Kyoto art direction. Boss encounters test your reflexes and loadout synergy. Highly recommend picking this up while on sale.',
    helpfulCount: 154,
    recommended: true
  },
  {
    id: 'rev-3',
    gameId: 'game-2',
    author: 'Ragnar_Ironhand',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    playtimeHours: 210.5,
    date: '2 weeks ago',
    content: 'Best survival craft RPG since Valheim. Building colossal mead halls into cliffs while blizzards rage outside feels cozy yet perilous. Dedicated server hosting is seamless.',
    helpfulCount: 419,
    recommended: true
  }
];

export const PUBLIC_SERVERS: PublicServer[] = [
  {
    id: 'srv-pub-1',
    name: 'GameForge Official EU #01 [High-Tick]',
    game: 'Aetherium Rift: Retribution',
    gameId: 'game-1',
    region: 'Europe (Frankfurt)',
    countryCode: 'DE',
    ip: '185.107.96.14',
    port: 27015,
    players: 48,
    maxPlayers: 64,
    ping: 18,
    status: 'online',
    isModded: false,
    mods: ['Vanilla+', 'Anti-Cheat V3'],
    description: 'Official GameForge competitive 128-tick extraction instance. Low ping, DDoS protected, zero toxic conduct.',
    uptime: '99.98%',
    tickRate: 128,
  },
  {
    id: 'srv-pub-2',
    name: 'NA-East Prime | 2x Loot | Fast Extract',
    game: 'Aetherium Rift: Retribution',
    gameId: 'game-1',
    region: 'US East (Virginia)',
    countryCode: 'US',
    ip: '198.51.100.42',
    port: 27018,
    players: 60,
    maxPlayers: 64,
    ping: 24,
    status: 'online',
    isModded: true,
    mods: ['2x Loot Multiplier', 'Quick Extraction', 'Custom Killfeed'],
    description: 'Fast paced extraction with balanced economy, weekly wipes every Thursday 18:00 EST.',
    uptime: '99.92%',
    tickRate: 128,
  },
  {
    id: 'srv-pub-3',
    name: 'Valhalla Realm [PvP / Runic Warfare]',
    game: 'Valkyrie Odyssey: Frostfall',
    gameId: 'game-2',
    region: 'US Central (Dallas)',
    countryCode: 'US',
    ip: '172.93.45.88',
    port: 2456,
    players: 32,
    maxPlayers: 50,
    ping: 32,
    status: 'online',
    isModded: true,
    mods: ['ValheimPlus', 'EpicLoot', 'RuneMaster Modpack'],
    description: 'Hardcore survival experience. Guild sieges on weekends. Dedicated gigabit fiber host.',
    uptime: '100%',
    tickRate: 64,
  },
  {
    id: 'srv-pub-4',
    name: 'Void Explorers APAC | Casual PVE',
    game: 'Starfall Protocol: Zero G',
    gameId: 'game-3',
    region: 'Asia Pacific (Tokyo)',
    countryCode: 'JP',
    ip: '103.28.54.190',
    port: 7777,
    players: 26,
    maxPlayers: 32,
    ping: 44,
    status: 'online',
    isModded: false,
    mods: ['Pure Vanilla'],
    description: 'Cooperative void salvaging. Friendly community, helpful sherpas for new cadets.',
    uptime: '99.85%',
    tickRate: 64,
  },
  {
    id: 'srv-pub-5',
    name: 'Shadow Syndicate [Stealth Only / No Guns]',
    game: 'Shadow Heist: Blackout',
    gameId: 'game-4',
    region: 'Europe (London)',
    countryCode: 'GB',
    ip: '194.36.14.7',
    port: 27020,
    players: 14,
    maxPlayers: 16,
    ping: 21,
    status: 'online',
    isModded: true,
    mods: ['GhostMode Challenge', 'Hardcore AI Vision'],
    description: 'Pure stealth infiltration. Triggering 1 alarm kicks squad from current vault run.',
    uptime: '99.95%',
    tickRate: 64,
  },
  {
    id: 'srv-pub-6',
    name: 'Iron Vanguard 64p Tactical Conquest',
    game: 'Ironclad Vanguard: Frontline',
    gameId: 'game-5',
    region: 'US West (Oregon)',
    countryCode: 'US',
    ip: '64.225.10.99',
    port: 28960,
    players: 58,
    maxPlayers: 64,
    ping: 28,
    status: 'online',
    isModded: false,
    mods: ['Realistic Ballistics', 'Squad Comm Net'],
    description: 'Armored combat simulation. Squad mic communication strongly recommended.',
    uptime: '99.70%',
    tickRate: 120,
  }
];

export const INITIAL_HOSTED_SERVERS: HostedServer[] = [
  {
    id: 'hosted-1',
    name: 'Chronos Syndicate HQ [US-East]',
    game: 'Aetherium Rift: Retribution',
    gameId: 'game-1',
    region: 'US East (N. Virginia)',
    status: 'online',
    ip: '142.250.180.205',
    port: 27015,
    ping: 16,
    cpuPercent: 34.2,
    ramUsedGb: 6.8,
    ramMaxGb: 16.0,
    storageUsedGb: 28.4,
    storageMaxGb: 100.0,
    networkMbps: 42.8,
    currentPlayers: 18,
    maxPlayers: 32,
    uptime: '14d 6h 41m',
    planName: 'Forge Ultra (AMD EPYC™ 9654)',
    monthlyCost: 24.99,
    config: {
      serverName: 'Chronos Syndicate HQ [US-East]',
      maxPlayers: 32,
      tickRate: 128,
      pvpEnabled: true,
      passwordProtected: false,
      difficulty: 'hard',
      autoRestart: true,
      motd: 'Welcome to Chronos! Join our Discord discord.gg/chronos-forge',
    },
    consoleLogs: [
      { timestamp: '11:12:04', type: 'info', message: '[Server] GameForge High-Frequency Tick Engine initialized @ 128Hz' },
      { timestamp: '11:12:05', type: 'info', message: '[Network] Socket bound to 142.250.180.205:27015 with DDoS protection active' },
      { timestamp: '11:12:08', type: 'success', message: '[Sync] Map sector "Neo-Kyoto Sector 04" loaded in 1,420ms' },
      { timestamp: '11:13:20', type: 'info', message: '[Player] Operative "CipherZero" connected from 98.24.11.20' },
      { timestamp: '11:14:01', type: 'info', message: '[Economy] Vault extraction spawned at Spire Apex' },
      { timestamp: '11:14:40', type: 'warn', message: '[AntiCheat] High velocity anomalous sprint detected on Client #07 - Checked OK (Grapple Hook boost)' },
    ],
    files: [
      {
        name: 'server.cfg',
        size: '2.4 KB',
        updated: 'Today at 09:30',
        content: `// GameForge Dedicated Server Configuration
hostname "Chronos Syndicate HQ [US-East]"
rcon_password "forge_super_secure_rcon_99"
sv_maxplayers 32
sv_tickrate 128
sv_lan 0
sv_cheats 0
sv_pure 1
mp_roundtime 15
mp_friendlyfire 1
net_maxcleartime 0.001
sv_minrate 128000
sv_maxrate 0
`
      },
      {
        name: 'admins.json',
        size: '840 B',
        updated: 'Yesterday at 14:12',
        content: `[
  { "steamId": "76561198000000001", "name": "Valkyrie_X", "role": "SuperAdmin", "permissions": ["*"] },
  { "steamId": "76561198000000002", "name": "ShadowGhost", "role": "Moderator", "permissions": ["kick", "mute", "teleport"] }
]`
      },
      {
        name: 'bans.json',
        size: '120 B',
        updated: '3 days ago',
        content: `[]`
      }
    ],
    mods: [
      { id: 'mod-1', name: 'Oxide Framework Core', version: 'v2.0.5982', enabled: true, downloads: '1.4M' },
      { id: 'mod-2', name: 'UltraKillfeed & Announcer', version: 'v1.4.2', enabled: true, downloads: '240K' },
      { id: 'mod-3', name: 'Dynamic Weather & Fog Fix', version: 'v3.1.0', enabled: true, downloads: '180K' },
      { id: 'mod-4', name: 'Custom Clan Territories', version: 'v2.8.0', enabled: false, downloads: '95K' }
    ],
    backups: [
      { id: 'bk-1', date: 'Oct 07, 2026 - 04:00', size: '1.42 GB', type: 'auto' },
      { id: 'bk-2', date: 'Oct 06, 2026 - 04:00', size: '1.39 GB', type: 'auto' },
      { id: 'bk-3', date: 'Oct 05, 2026 - 18:22', size: '1.38 GB', type: 'manual' }
    ]
  },
  {
    id: 'hosted-2',
    name: 'Nordic Valhalla Guild World',
    game: 'Valkyrie Odyssey: Frostfall',
    gameId: 'game-2',
    region: 'Europe (Frankfurt)',
    status: 'online',
    ip: '185.107.96.88',
    port: 2456,
    ping: 22,
    cpuPercent: 19.5,
    ramUsedGb: 4.2,
    ramMaxGb: 12.0,
    storageUsedGb: 14.1,
    storageMaxGb: 80.0,
    networkMbps: 18.2,
    currentPlayers: 8,
    maxPlayers: 20,
    uptime: '6d 12h 05m',
    planName: 'Forge Pro (Ryzen™ 9 7950X)',
    monthlyCost: 17.99,
    config: {
      serverName: 'Nordic Valhalla Guild World',
      maxPlayers: 20,
      tickRate: 60,
      pvpEnabled: false,
      passwordProtected: true,
      difficulty: 'normal',
      autoRestart: true,
      motd: 'Private Guild Server - Password required.',
    },
    consoleLogs: [
      { timestamp: '10:45:00', type: 'info', message: '[World] World save completed in 240ms' },
      { timestamp: '10:52:14', type: 'info', message: '[Player] Bjorn_The_Bold joined the realm' },
    ],
    files: [
      {
        name: 'valkyrie_world.cfg',
        size: '1.2 KB',
        updated: 'Oct 04, 2026',
        content: `world_seed=YGGDRASIL_99214\npve_only=1\nbuilding_decay=0\nresource_respawn=1.5\n`
      }
    ],
    mods: [
      { id: 'mod-val-1', name: 'ValheimPlus Expanded', version: 'v0.9.9', enabled: true, downloads: '890K' }
    ],
    backups: [
      { id: 'bk-val-1', date: 'Oct 06, 2026 - 02:00', size: '820 MB', type: 'auto' }
    ]
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'usr-9021',
  username: 'Valkyrie_X',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  level: 42,
  xpCurrent: 8450,
  xpNextLevel: 10000,
  walletBalance: 148.50,
  badgeTitle: 'Apex Server Architect',
  bio: 'Competitive extraction operative, clan leader of Chronos, and dedicated game server host. Low ping enthusiast.',
  memberSince: 'March 2023',
  friendsCount: 28,
  friends: [
    { id: 'f-1', name: 'Ghost_Protocol_99', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&auto=format&fit=crop&q=80', status: 'in-game', currentGame: 'Aetherium Rift: Retribution' },
    { id: 'f-2', name: 'Ragnar_Ironhand', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', status: 'in-game', currentGame: 'Valkyrie Odyssey: Frostfall' },
    { id: 'f-3', name: 'CyberPulse', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80', status: 'online' },
    { id: 'f-4', name: 'NexusQueen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', status: 'offline' }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Apex Sovereign',
      description: 'Extracted with 1,000,000 credits in a single deployment without sustaining lethal armor damage.',
      icon: 'ShieldAlert',
      gameTitle: 'Aetherium Rift: Retribution',
      date: 'Unlocked Oct 02, 2026',
      rarity: '0.8% of players'
    },
    {
      id: 'ach-2',
      title: 'Runic Architect',
      description: 'Constructed an intact Great Mead Hall over 100 meters above sea level in blizzard conditions.',
      icon: 'Hammer',
      gameTitle: 'Valkyrie Odyssey: Frostfall',
      date: 'Unlocked Sep 21, 2026',
      rarity: '3.4% of players'
    },
    {
      id: 'ach-3',
      title: 'Zero-G Ghost',
      description: 'Cleared a derelict capital ship in stealth mode without discharging kinetic ammunition.',
      icon: 'Zap',
      gameTitle: 'Starfall Protocol: Zero G',
      date: 'Unlocked Aug 14, 2026',
      rarity: '5.1% of players'
    }
  ]
};

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: 'Vanguard_DevTeam',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    gameTitle: 'Aetherium Rift: Retribution',
    title: 'Major Patch 2.4 "Orbital Collapse" Now Live + 128-Tick Server Optimizations',
    content: 'We are thrilled to deploy Patch 2.4 across all GameForge nodes! This update introduces the new orbital tether extraction zone, 4 new plasma weapons, dynamic zero-G gravity storms, and a 40% reduction in netcode packet serialization latency.',
    category: 'News',
    likes: 1240,
    commentsCount: 284,
    timestamp: '4 hours ago',
    comments: [
      { id: 'c-1', author: 'Ghost_Protocol_99', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&auto=format&fit=crop&q=80', content: 'The netcode improvements are immediately noticeable! Solid 128-tick stability.', timestamp: '2 hours ago' },
      { id: 'c-2', author: 'Valkyrie_X', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', content: 'Updated our Chronos server right away without a hitch. Thank you team!', timestamp: '1 hour ago' }
    ]
  },
  {
    id: 'post-2',
    author: 'BjornMastery',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    gameTitle: 'Valkyrie Odyssey: Frostfall',
    title: 'Comprehensive Guide: Runic Synergy & High-Altitude Structural Reinforcements',
    content: 'If your stone arches keep collapsing under heavy snow weight, check out this blueprint guide. By weaving Thurisaz runes into the cornerstone mortar, load-bearing capacities increase by 300%. Full screenshot walkthrough included.',
    category: 'Guide',
    likes: 852,
    commentsCount: 97,
    timestamp: '1 day ago',
  },
  {
    id: 'post-3',
    author: 'NeonSlick',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    gameTitle: 'Shadow Heist: Blackout',
    title: 'Solo Ghost Infiltration of the OmniCore Data Fortress (No Alarms, Hardcore)',
    content: 'Managed to pull off a clean extraction on the highest security tier with zero detection markers. Sharing the camera route timing diagram and EMP jammer placement.',
    category: 'Discussion',
    likes: 540,
    commentsCount: 42,
    timestamp: '2 days ago',
  }
];
