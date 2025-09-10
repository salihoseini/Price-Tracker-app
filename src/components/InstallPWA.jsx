import React, { useState, useEffect } from 'react';
import { Button, Paper, Typography, Box, IconButton } from '@mui/material';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import CloseIcon from '@mui/icons-material/Close';

const InstallPWA = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            // Check if the app is already installed
            if (window.matchMedia('(display-mode: standalone)').matches) {
                return;
            }
            setIsVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = async () => {
        setIsVisible(false);
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        setDeferredPrompt(null);
    };

    if (!isVisible) return null;

    return (
        <Paper
            elevation={4}
            sx={{
                position: 'fixed',
                bottom: { xs: 80, sm: 30 },
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                maxWidth: '400px',
                zIndex: 2000,
                p: 2,
                backgroundColor: 'background.paper',
                borderRadius: '16px',
                border: '1px solid',
                borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                animation: 'slideUp 0.5s ease-out forwards',
                '@keyframes slideUp': { 'from': { transform: 'translate(-50%, 100px)', opacity: 0 }, 'to': { transform: 'translate(-50%, 0)', opacity: 1 } }
            }}
        >
            <IconButton onClick={() => setIsVisible(false)} size="small" sx={{ position: 'absolute', top: 8, left: 8 }}>
                <CloseIcon fontSize="small" />
            </IconButton>
            <Box flexGrow={1}>
                <Typography sx={{ fontWeight: 'bold' }}>
                    نصب اپلیکیشن
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    برای تجربه بهتر، اپ را به صفحه اصلی خود اضافه کنید.
                </Typography>
            </Box>
            <Button
                variant="contained"
                onClick={handleInstallClick}
                startIcon={<SystemUpdateAltIcon />}
                size="small"
                sx={{ ml: 2, flexShrink: 0 }}
            >
                نصب
            </Button>
        </Paper>
    );
};

export default InstallPWA;

