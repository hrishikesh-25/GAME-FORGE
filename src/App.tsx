/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/home/HomeView';
import { StoreView } from './components/store/StoreView';
import { GameDetailView } from './components/game/GameDetailView';
import { LibraryView } from './components/library/LibraryView';
import { HostingDashboardView } from './components/hosting/HostingDashboardView';
import { ServerMarketplaceView } from './components/servers/ServerMarketplaceView';
import { ProfileView } from './components/profile/ProfileView';
import { CommunityView } from './components/community/CommunityView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { CartDrawer } from './components/cart/CartDrawer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { VideoTrailerModal } from './components/common/VideoTrailerModal';

const MainContent: React.FC = () => {
  const { currentRoute } = useApp();

  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 min-h-[calc(100vh-200px)]">
      {currentRoute === 'home' && <HomeView />}
      {currentRoute === 'store' && <StoreView />}
      {currentRoute === 'game-detail' && <GameDetailView />}
      {currentRoute === 'library' && <LibraryView />}
      {currentRoute === 'hosting' && <HostingDashboardView />}
      {currentRoute === 'servers' && <ServerMarketplaceView />}
      {currentRoute === 'profile' && <ProfileView />}
      {currentRoute === 'community' && <CommunityView />}
      {currentRoute === 'admin' && <AdminDashboardView />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#080a0f] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        <Navbar />
        <MainContent />
        <Footer />
        <CartDrawer />
        <QuickViewModal />
        <VideoTrailerModal />
      </div>
    </AppProvider>
  );
}
