import React, { useState, useEffect } from 'react';
import { Button, Paper, Typography, Box, IconButton } from '@mui/material';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import CloseIcon from '@mui/icons-material/Close';

const InstallPWA = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Show the install promotion
            setIsVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = async () => {
        // Hide our user interface that shows our A2HS button
        setIsVisible(false);
        if (!deferredPrompt) {
            return;
        }
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        await deferredPrompt.userChoice;
        // We've used the prompt, and can't use it again, throw it away
        setDeferredPrompt(null);
    };

    const handleCloseClick = () => {
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <Paper
            elevation={4}
            sx={{
                position: 'fixed',
                bottom: { xs: 80, sm: 30 }, // Position above the navbar
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                maxWidth: '400px',
                zIndex: 2000,
                p: 2,
                backgroundColor: 'background.paper',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                animation: 'slideUp 0.5s ease-out forwards',
                '@keyframes slideUp': { 'from': { transform: 'translate(-50%, 100px)', opacity: 0 }, 'to': { transform: 'translate(-50%, 0)', opacity: 1 } }
            }}
        >
            <IconButton onClick={handleCloseClick} size="small" sx={{ position: 'absolute', top: 8, left: 8 }}>
                <CloseIcon />
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
            >
                نصب
            </Button>
        </Paper>
    );
};

export default InstallPWA;
