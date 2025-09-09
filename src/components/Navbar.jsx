import React from 'react';
import { Box, IconButton, Typography, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SettingsIcon from '@mui/icons-material/Settings';

// --- Single Navigation Item Component ---
const NavItem = ({ icon, label, isActive, onClick }) => (
    <IconButton
        onClick={onClick}
        sx={{
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '12px',
            color: isActive ? 'primary.main' : 'text.secondary',
            transition: 'color 0.2s ease-in-out',
            p: 1,
            width: 70,
            height: 60
        }}
    >
        {icon}
        <Typography variant="caption" sx={{ fontWeight: isActive ? 'bold' : 'medium', mt: 0.5 }}>
            {label}
        </Typography>
    </IconButton>
);

// --- Main Full-Width Navbar Component ---
const Navbar = ({ activePage, setPage }) => {
    const navItems = [
        { name: 'news', icon: <NewspaperIcon />, label: 'اخبار' },
        { name: 'dashboard', icon: <HomeIcon />, label: 'بازارها' },
        { name: 'settings', icon: <SettingsIcon />, label: 'تنظیمات' },
    ];

    return (
        <Box
            component="nav"
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0, // Stretches the component full-width
                zIndex: 1000,
                backgroundColor: (theme) => `${theme.palette.background.paper}e0`, // More opaque
                backdropFilter: 'blur(15px)',
                borderTop: '1px solid',
                borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-around" // Evenly distribute items
                alignItems="center"
                sx={{
                    height: 65,
                    paddingBottom: '10px', // For devices with home bar
                }}
            >
                {navItems.map((item) => (
                    <NavItem
                        key={item.name}
                        icon={item.icon}
                        label={item.label}
                        isActive={activePage === item.name}
                        onClick={() => setPage({ name: item.name, symbol: null })}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default Navbar;

