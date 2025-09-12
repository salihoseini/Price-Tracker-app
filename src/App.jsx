import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

import { createMuiTheme, createRtlCache } from './theme.js';
import Dashboard from './pages/Dashboard.jsx';
import AssetDetail from './pages/AssetDetail.jsx';
import About from './pages/About.jsx'; // Replaced News with About
import Settings from './pages/Settings.jsx'; // Corrected the import path
import Navbar from './components/Navbar.jsx';
import Header from './components/Header.jsx';
import InstallPWA from './components/InstallPWA.jsx';

const cacheRtl = createRtlCache();

function App() {
  useEffect(() => {
    document.body.dir = "rtl";
  }, []);

  const [page, setPage] = useState({ name: 'dashboard', symbol: null });
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'dark';
  });
  const [connectionStatus, setConnectionStatus] = useState('online');

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  const theme = useMemo(() => createMuiTheme(mode), [mode]);

  // Navigation functions
  const navigateTo = (pageName) => setPage({ name: pageName, symbol: null });
  const navigateToAsset = (symbol) => setPage({ name: 'assetDetail', symbol });
  const goBackToDashboard = () => setPage({ name: 'dashboard', symbol: null });

  const renderPage = () => {
    switch (page.name) {
      case 'dashboard':
        return <Dashboard navigateToAsset={navigateToAsset} setConnectionStatus={setConnectionStatus} />;
      case 'assetDetail':
        return <AssetDetail symbol={page.symbol} goBack={goBackToDashboard} />;
      case 'about': // Changed from 'news' to 'about'
        return <About />;
      case 'settings':
        return <Settings mode={mode} toggleTheme={toggleTheme} />;
      default:
        return <Dashboard navigateToAsset={navigateToAsset} setConnectionStatus={setConnectionStatus} />;
    }
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header connectionStatus={connectionStatus} />
        <Box component="main" sx={{ pt: '80px', pb: '80px', px: { xs: 2, md: 3 }, maxWidth: '1200px', margin: '0 auto' }}>
          {renderPage()}
        </Box>
        <Navbar activePage={page.name} setPage={navigateTo} />
        <InstallPWA />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;

