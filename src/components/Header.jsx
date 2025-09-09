import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import SyncIcon from '@mui/icons-material/Sync';

// --- New Connection Status Icon Component ---
const ConnectionStatus = ({ status }) => {
    const isOnline = status === 'online';
    const isOffline = status === 'offline';
    const isLoading = status === 'loading';

    const getIcon = () => {
        if (isOnline) return <WifiIcon sx={{ color: 'success.main' }} />;
        if (isOffline) return <WifiOffIcon sx={{ color: 'error.main' }} />;
        return (
            <SyncIcon
                sx={{
                    color: 'warning.main',
                    animation: 'spin 1.5s linear infinite',
                    '@keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' },
                    },
                }}
            />
        );
    };

    return (
        <IconButton size="small" aria-label="connection status">
            {getIcon()}
        </IconButton>
    );
};

const Header = ({ connectionStatus }) => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: (theme) => `${theme.palette.background.paper}99`,
        backdropFilter: 'blur(15px)',
        borderBottom: '1px solid',
        borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar>
        {/* --- Right Side: App Title --- */}
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            آخرین قیمت
        </Typography>

        <Box sx={{ flexGrow: 1 }} /> {/* This spacer pushes the items apart */}

        {/* --- Left Side: Connection Status Icon --- */}
        <ConnectionStatus status={connectionStatus} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

