import React, { useEffect, useState, useRef } from 'react';
import {
    Box,
    Typography,
    Alert,
    Paper,
    Skeleton,
    Stack
} from '@mui/material';
import { usePriceData } from '../hooks/usePriceData';
import { fetchLatestPrices } from '../services/api';
import AssetIcon from '../components/AssetIcon';
import MarketStats from '../components/MarketStats';

const AssetCard = React.memo(({ asset, onClick, index, priceChange }) => {
    const isPositive = asset.change_24h >= 0;
    const changeColor = isPositive ? 'success.main' : 'error.main';

    const animationDelay = `${index * 50}ms`;
    const priceFlashColor = priceChange === 'up' ? 'success.main' : priceChange === 'down' ? 'error.main' : 'transparent';

    return (
        <Paper
            elevation={0}
            onClick={onClick}
            sx={{
                p: 2.5,
                cursor: 'pointer',
                backgroundColor: 'background.paper',
                transition: 'transform 0.2s ease-in-out, background-color 0.2s',
                opacity: 0,
                transform: 'translateY(20px)',
                animation: `fadeInUp 0.5s ease-out forwards ${animationDelay}, priceFlash 1s ease-out`,
                // Keyframes for animations
                '@keyframes fadeInUp': {
                    'from': { opacity: 0, transform: 'translateY(20px)' },
                    'to': { opacity: 1, transform: 'translateY(0)' },
                },
                '@keyframes priceFlash': {
                    '0%': { boxShadow: `0 0 12px ${priceFlashColor}` },
                    '100%': { boxShadow: '0 0 0px transparent' },
                },
                '&:hover': {
                    transform: 'scale(1.02)',
                    backgroundColor: 'action.hover',
                }
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssetIcon symbol={asset.symbol} />
                <Box sx={{ ml: 1.5, flexGrow: 1 }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{asset.fa_name}</Typography>
                    <Typography variant="body2" color="text.secondary">{asset.symbol}</Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                 <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: -0.5 }}>
                        قیمت
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1.2rem' }}>
                        {new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(asset.average_price)}
                    </Typography>
                </Box>
                 <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: -0.5 }}>
                        تغییر ۲۴ ساعت
                    </Typography>
                    <Typography sx={{ color: changeColor, fontWeight: 'bold', direction: 'ltr', fontSize: '1.1rem' }}>
                        {isPositive ? '+' : ''}{asset.change_24h.toFixed(2)}%
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
});

const AssetCardSkeleton = () => (
    <Paper sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ ml: 1.5, flexGrow: 1 }}>
                <Skeleton variant="text" width={120} height={24} />
                <Skeleton variant="text" width={50} />
            </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Skeleton variant="text" width={100} height={40} />
            <Skeleton variant="text" width={80} height={40} />
        </Box>
    </Paper>
);

const Dashboard = ({ navigateToAsset, setConnectionStatus }) => {
  // Fetch data every 10 seconds (10000 ms)
  const { data: assets, loading, status } = usePriceData(fetchLatestPrices, null, 10000);
  const [priceChanges, setPriceChanges] = useState({});
  const prevAssetsRef = useRef();

  // Update connection status in parent component
  useEffect(() => {
    setConnectionStatus(status);
  }, [status, setConnectionStatus]);

  // Logic to detect price changes for animation
  useEffect(() => {
    if (assets && prevAssetsRef.current) {
        const changes = {};
        assets.forEach(asset => {
            const prevAsset = prevAssetsRef.current.find(p => p.symbol === asset.symbol);
            if (prevAsset && prevAsset.average_price !== asset.average_price) {
                changes[asset.symbol] = prevAsset.average_price < asset.average_price ? 'up' : 'down';
            }
        });
        setPriceChanges(changes);
    }
    prevAssetsRef.current = assets;
  }, [assets]);


  if (loading && !assets) {
    return (
       <Box>
            <MarketStats />
            <Typography variant="h5" component="h2" sx={{ mb: 2, mt: 3, fontWeight: 600 }}>
                لیست قیمت‌ها
            </Typography>
            <Stack spacing={2}>
                {[...Array(8)].map((_, i) => <AssetCardSkeleton key={i} />)}
            </Stack>
       </Box>
    );
  }

  if (status === 'offline' && !assets) {
    return <Alert severity="error" variant="filled">خطا در اتصال. لطفا اتصال اینترنت خود را بررسی کنید.</Alert>;
  }

  return (
    <Box>
        <MarketStats />
        <Typography variant="h5" component="h2" sx={{ mb: 2, mt: 3, fontWeight: 600 }}>
            لیست قیمت‌ها
        </Typography>

        <Stack spacing={2}>
            {assets?.map((asset, index) => (
                <AssetCard
                    key={asset.symbol}
                    asset={asset}
                    index={index}
                    onClick={() => navigateToAsset(asset.symbol)}
                    priceChange={priceChanges[asset.symbol]}
                />
            ))}
        </Stack>
    </Box>
  );
};

export default Dashboard;

