import React from 'react';
import { Paper, Typography, Box, Skeleton, Grid, Divider } from '@mui/material';
import { usePriceData } from '../hooks/usePriceData';
import { fetchMarketStats } from '../services/api';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const StatItem = ({ title, data, icon, color }) => (
    <Box sx={{ textAlign: 'center', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary', mb: 1 }}>
            {icon}
            <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold' }}>{title}</Typography>
        </Box>
        {data ? (
            <>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {data.fa_name}
                </Typography>
                <Typography sx={{ color, fontWeight: 'bold', direction: 'ltr' }}>
                    {data.change_24h >= 0 ? '+' : ''}{data.change_24h.toFixed(2)}%
                </Typography>
            </>
        ) : (
             <Box>
                <Skeleton variant="text" width="90%" sx={{mx: 'auto'}} />
                <Skeleton variant="text" width="50%" sx={{mx: 'auto'}} />
            </Box>
        )}
    </Box>
);


const MarketStats = () => {
    const { data: stats, loading } = usePriceData(fetchMarketStats);

    if (loading) {
        return (
            <Skeleton variant="rounded" height={90} sx={{ borderRadius: 4, mb: 3 }} />
        )
    }

    if (!stats) return null;

    return (
        <Paper
            elevation={0}
            sx={{
                p: {xs: 1, sm: 0},
                mb: 3,
                position: 'relative',
                overflow: 'hidden',
                // A subtle gradient gives the banner a distinct look
                background: (theme) => `linear-gradient(90deg, ${theme.palette.action.hover} 0%, ${theme.palette.background.paper} 50%, ${theme.palette.action.hover} 100%)`
            }}
        >
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={6}>
                    <StatItem
                        title="بیشترین رشد"
                        icon={<TrendingUpIcon color="success" />}
                        data={stats.top_gainer}
                        color="success.main"
                    />
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ height: '60px', alignSelf: 'center' }} />
                <Grid item xs={5.5}> {/* Use 5.5 to give the divider some space */}
                    <StatItem
                        title="بیشترین افت"
                        icon={<TrendingDownIcon color="error" />}
                        data={stats.top_loser}
                        color="error.main"
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default MarketStats;

