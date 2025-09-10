import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CustomTooltip = ({ active, payload, label }) => {
    const theme = useTheme();
    if (active && payload && payload.length) {
        return (
            <Paper elevation={4} sx={{ p: 1.5, backgroundColor: `${theme.palette.background.paper}e0`, backdropFilter: 'blur(5px)' }}>
                <Typography variant="caption" color="text.secondary">
                    {new Date(label).toLocaleDateString('fa-IR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </Typography>
                <Typography sx={{ fontWeight: 'bold', fontFamily: 'monospace', color: 'primary.main' }}>
                    {new Intl.NumberFormat('en-US').format(payload[0].value)}
                </Typography>
            </Paper>
        );
    }
    return null;
};

const PriceChart = ({ data }) => {
    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;

    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('fa-IR', { month: 'short', day: 'numeric' });
    const formatPrice = (price) => new Intl.NumberFormat('en-US').format(price);

    return (
        <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 }, height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={primaryColor} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="time"
                        tickFormatter={formatDate}
                        fontSize={12}
                        stroke={theme.palette.text.secondary}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        domain={['dataMin', 'dataMax']}
                        tickFormatter={formatPrice}
                        fontSize={12}
                        stroke={theme.palette.text.secondary}
                        axisLine={false}
                        tickLine={false}
                        width={80}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke={primaryColor}
                        strokeWidth={2}
                        fill="url(#chartGradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default PriceChart;

