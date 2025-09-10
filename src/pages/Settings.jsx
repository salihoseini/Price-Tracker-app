import React from 'react';
import { Box, Typography, Paper, Switch, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 56,
    height: 32,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 24,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(18px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 4,
        color: '#ffb74d', // Sun color
        '&.Mui-checked': {
            transform: 'translateX(24px)',
            color: '#90caf9', // Moon color
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#2E3C56' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 24,
        height: 24,
        borderRadius: 12,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 32 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));


const Settings = ({ mode, toggleTheme }) => {
    const isDarkMode = mode === 'dark';

    return (
        <Box>
            <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
                تنظیمات
            </Typography>

            <Paper elevation={0} sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                    <Typography sx={{ fontWeight: 600 }}>حالت تاریک</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <WbSunnyIcon sx={{ color: isDarkMode ? 'text.secondary' : 'warning.main' }} />
                        <AntSwitch checked={isDarkMode} onChange={toggleTheme} />
                        <Brightness2Icon sx={{ color: isDarkMode ? 'primary.main' : 'text.secondary' }} />
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    );
};

export default Settings;

