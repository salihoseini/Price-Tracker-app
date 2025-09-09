import React, { useState, useEffect } from 'react';
import { fetchLatestPrices, fetchPriceHistory } from '../services/api';
import { usePriceData } from '../hooks/usePriceData';
import PriceChart from '../components/PriceChart';
import AssetIcon from '../components/AssetIcon';
import {
    Box, Typography, Paper, Skeleton,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack, IconButton
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // For RTL back arrow

// --- Reusable Component for Price Summary ---
const PriceSummary = ({ asset }) => {
    const formatPrice = (price) => new Intl.NumberFormat('en-US').format(price);
    return (
        <Paper elevation={0} sx={{ p: 2.5, backgroundColor: 'background.paper' }}>
             <Stack spacing={2}>
                 <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography color="text.secondary">بالاترین قیمت</Typography>
                    <Typography sx={{fontWeight: 'bold', fontFamily: 'monospace', color: 'success.main'}}>{formatPrice(asset.high_price)}</Typography>
                 </Box>
                 <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography color="text.secondary">میانگین قیمت</Typography>
                    <Typography sx={{fontWeight: 'bold', fontFamily: 'monospace'}}>{formatPrice(asset.average_price)}</Typography>
                 </Box>
                 <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography color="text.secondary">پایین‌ترین قیمت</Typography>
                    <Typography sx={{fontWeight: 'bold', fontFamily: 'monospace', color: 'error.main'}}>{formatPrice(asset.low_price)}</Typography>
                 </Box>
             </Stack>
        </Paper>
    );
};


// --- Main Asset Detail Component ---
const AssetDetail = ({ symbol, goBack }) => {
  const { data: historyData, loading: historyLoading } = usePriceData(fetchPriceHistory, symbol);
  const [assetDetails, setAssetDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);

  useEffect(() => {
    const getAssetDetails = async () => {
      setLoadingDetails(true);
      const allAssets = await fetchLatestPrices();
      const details = allAssets.find(asset => asset.symbol === symbol);
      setAssetDetails(details);
      setLoadingDetails(false);
    };
    getAssetDetails();
  }, [symbol]);

  const formatPrice = (price) => {
    if (typeof price !== 'number') return 'N/A';
    return new Intl.NumberFormat('en-US').format(price);
  };

  // --- Skeleton Loader UI ---
  if (loadingDetails) {
    return (
        <Stack spacing={3}>
            {/* Header Skeleton */}
            <Paper elevation={0} sx={{p: 2.5}}>
                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Skeleton variant="circular" width={48} height={48} />
                    <Box sx={{ ml: 2, flexGrow: 1 }}>
                        <Skeleton variant="text" width={180} height={30} />
                        <Skeleton variant="text" width={80} />
                    </Box>
                 </Box>
                 <Skeleton variant="text" width="60%" height={40}/>
            </Paper>
            {/* Other Skeletons */}
            <Skeleton variant="rounded" height={80} />
            <Skeleton variant="rounded" height={300} />
            <Skeleton variant="rounded" height={200} />
        </Stack>
    );
  }

  const isPositive = assetDetails.change_24h >= 0;
  const changeColor = isPositive ? 'success.main' : 'error.main';

  return (
    <Stack spacing={3}>
        {/* --- Back Button --- */}
        <Box sx={{ display: 'flex' }}>
            <IconButton onClick={goBack} aria-label="go back">
                <ArrowForwardIcon />
            </IconButton>
        </Box>

        {/* --- Main Header Card --- */}
        <Paper elevation={0} sx={{ p: 2.5, backgroundColor: 'background.paper' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AssetIcon symbol={assetDetails.symbol} size={48} />
                <Box sx={{ ml: 2, flexGrow: 1 }}>
                    <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>{assetDetails.fa_name}</Typography>
                    <Typography color="text.secondary">{assetDetails.symbol}</Typography>
                </Box>
            </Box>
            <Box sx={{mt: 1}}>
                <Typography variant="h4" sx={{fontFamily: 'monospace', fontWeight: 'bold'}}>
                     {formatPrice(assetDetails.average_price)}
                </Typography>
                <Typography sx={{ color: changeColor, fontWeight: 'bold', direction: 'ltr' }}>
                    {isPositive ? '+' : ''}{assetDetails.change_24h.toFixed(2)}% (24 ساعت)
                </Typography>
            </Box>
        </Paper>

        {/* --- Price Summary Card --- */}
        <PriceSummary asset={assetDetails} />

        {/* --- Price Chart --- */}
        {historyLoading ? (
            <Skeleton variant="rounded" height={300} />
        ) : (
            <PriceChart data={historyData} />
        )}

        {/* --- Price Sources Table --- */}
        <Box>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>منابع قیمت</Typography>
          <TableContainer component={Paper} elevation={0}>
              <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell>منبع</TableCell>
                          <TableCell align="left">قیمت (تومان)</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {assetDetails.sources.map((source) => (
                          <TableRow key={source.source} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell sx={{fontWeight: 'bold'}}>{source.source}</TableCell>
                              <TableCell align="left" sx={{fontFamily: 'monospace'}}>{formatPrice(source.price)}</TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
      </Box>
    </Stack>
  );
};

export default AssetDetail;

