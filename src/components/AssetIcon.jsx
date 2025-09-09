import React from 'react';
import { Box } from '@mui/material';

// --- Individual SVG Icon Components ---

const GoldBarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6V18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18V6Z" fill="url(#gold-gradient)" stroke="#FFD700" strokeWidth="1.5"/>
    <path d="M7 8H17" stroke="#000" strokeOpacity="0.1" strokeWidth="1" strokeLinecap="round"/>
    <defs>
      <linearGradient id="gold-gradient" x1="4" y1="5" x2="20" y2="19" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFD700"/>
        <stop offset="1" stopColor="#FFA500"/>
      </linearGradient>
    </defs>
  </svg>
);

const CoinIcon = ({ symbol }) => {
    let innerText = '';
    if (symbol === 'HCG') innerText = '½';
    if (symbol === 'QCG') innerText = '¼';
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="url(#gold-gradient)" stroke="#FFD700" strokeWidth="1.5"/>
            {innerText && <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#000" opacity="0.4" fontSize="10" fontWeight="bold">{innerText}</text>}
            <circle cx="12" cy="12" r="7" stroke="#000" strokeOpacity="0.1" strokeWidth="1"/>
            <defs>
                <linearGradient id="gold-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFD700"/>
                    <stop offset="1" stopColor="#FFA500"/>
                </linearGradient>
            </defs>
        </svg>
    )
};

const UsdIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#2E7D32"/>
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">$</text>
  </svg>
);

const UsdtIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#26A17B"/>
    <path d="M12 7H15.5V9.5H13V17H11V9.5H8.5V7H12Z" fill="white"/>
  </svg>
);

const EurIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#0D47A1"/>
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">€</text>
  </svg>
);

const SilverIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6V18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18V6Z" fill="url(#silver-gradient)" stroke="#C0C0C0" strokeWidth="1.5"/>
    <path d="M7 8H17" stroke="#000" strokeOpacity="0.1" strokeWidth="1" strokeLinecap="round"/>
    <defs>
      <linearGradient id="silver-gradient" x1="4" y1="5" x2="20" y2="19" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5F5F5"/>
        <stop offset="1" stopColor="#B0B0B0"/>
      </linearGradient>
    </defs>
  </svg>
);

// --- Main AssetIcon Component ---
const AssetIcon = ({ symbol, size = 40 }) => {
    const getIcon = () => {
        switch (symbol) {
            case 'GOLD_18C': return <GoldBarIcon />;
            case 'EGC':
            case 'HCG':
            case 'QCG': return <CoinIcon symbol={symbol} />;
            case 'USD': return <UsdIcon />;
            case 'EUR': return <EurIcon />;
            case 'USDT': return <UsdtIcon />;
            case 'SLV': return <SilverIcon />;
            default: return <UsdIcon />; // Fallback icon
        }
    };

    return (
        <Box sx={{
            width: size,
            height: size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // A subtle background can help the icons pop
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            borderRadius: '50%',
        }}>
            {getIcon()}
        </Box>
    );
};

export default AssetIcon;
