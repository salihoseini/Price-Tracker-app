import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';


// --- Single Navigation Item Component ---
const NavItem = ({ icon, activeIcon, label, isActive, onClick }) => (
    <Box
        onClick={onClick}
        sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 1,
            cursor: 'pointer',
            borderRadius: '16px',
            color: isActive ? 'primary.main' : 'text.secondary',
            transition: 'color 0.2s ease-in-out, background-color 0.2s ease-in-out',
            position: 'relative',
            '&:hover': {
                backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
            }
        }}
    >
        {isActive ? activeIcon : icon}
        <Typography
            variant="caption"
            sx={{
                fontWeight: isActive ? 'bold' : 'medium',
                mt: 0.5,
                transition: 'font-weight 0.2s ease-in-out'
            }}
        >
            {label}
        </Typography>
         {isActive && (
            <Box
                sx={{
                    position: 'absolute',
                    bottom: -10,
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    transition: 'opacity 0.3s ease-in-out',
                }}
            />
        )}
    </Box>
);

// --- Main Full-Width Navbar Component ---
const Navbar = ({ activePage, setPage }) => {
    const navItems = [
        { name: 'settings', icon: <SettingsOutlinedIcon />, activeIcon: <SettingsIcon />, label: 'تنظیمات' },
        { name: 'dashboard', icon: <HomeOutlinedIcon />, activeIcon: <HomeIcon />, label: 'بازارها' },
        { name: 'about', icon: <InfoOutlinedIcon />, activeIcon: <InfoIcon />, label: 'درباره' },
    ];

    return (
        <Box
            component="nav"
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.85),
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid',
                borderColor: (theme) => theme.palette.divider,
                boxShadow: (theme) => `0 -1px 12px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}`,
                pb: 'env(safe-area-inset-bottom)', // Safe area for iPhones
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                sx={{
                    height: 65,
                    px: 1,
                }}
            >
                {navItems.map((item) => (
                    <NavItem
                        key={item.name}
                        icon={item.icon}
                        activeIcon={item.activeIcon}
                        label={item.label}
                        isActive={activePage === item.name}
                        onClick={() => setPage(item.name)}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default Navbar;

