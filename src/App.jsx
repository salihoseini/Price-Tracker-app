import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

import Dashboard from './pages/Dashboard';
import AssetDetail from './pages/AssetDetail';
import News from './pages/News';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import Header from './components/Header';
import InstallPWA from './components/InstallPWA'; // Import the new component

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const getDesignTokens = (mode) => ({
  direction: 'rtl',
  palette: {
    mode,
    ...(mode === 'light' ? {
          primary: { main: '#3861FB' },
          background: { default: '#F8F9FD', paper: '#FFFFFF' },
          text: { primary: '#1A202C', secondary: '#718096' },
        } : {
          primary: { main: '#4A90E2' }, // CORRECTED COLOR CODE
          background: { default: '#0A0F19', paper: '#131826' },
          text: { primary: '#FFFFFF', secondary: '#A0AEC0' },
        }),
    success: { main: '#0ECB81' },
    error: { main: '#F6465D' },
    warning: { main: '#F5A623' },
  },
  typography: { fontFamily: "'Vazirmatn', sans-serif", h4: { fontWeight: 700 }, h5: { fontWeight: 600 } },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none', borderRadius: '16px', border: 'none' } } },
    MuiBottomNavigation: {
        styleOverrides: {
             root: ({ theme }) => ({
                background: theme.palette.background.paper,
                borderTop: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
                height: 65,
                paddingBottom: '10px'
            })
        }
    }
  },
});

function App() {
  document.body.dir = 'rtl';
  const [page, setPage] = useState({ name: 'dashboard', symbol: null });
  const [mode, setMode] = useState('dark');
  const [connectionStatus, setConnectionStatus] = useState('online');

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const navigateToAsset = (symbol) => setPage({ name: 'assetDetail', symbol });
  const goBackToDashboard = () => setPage({ name: 'dashboard', symbol: null });

  const renderPage = () => {
    switch (page.name) {
      case 'dashboard': return <Dashboard navigateToAsset={navigateToAsset} setConnectionStatus={setConnectionStatus} />;
      case 'assetDetail': return <AssetDetail symbol={page.symbol} goBack={goBackToDashboard} />;
      case 'news': return <News />;
      case 'settings': return <Settings mode={mode} toggleTheme={toggleTheme} />;
      default: return <Dashboard navigateToAsset={navigateToAsset} setConnectionStatus={setConnectionStatus} />;
    }
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header connectionStatus={connectionStatus} />
        <Box component="main" sx={{ pt: '80px', pb: '80px', px: { xs: 2, md: 3 } }}>
            {renderPage()}
        </Box>
        <Navbar activePage={page.name} setPage={setPage} />
        <InstallPWA /> {/* Add the install component here */}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;

