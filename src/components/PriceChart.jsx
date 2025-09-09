import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, Typography, Box, Button, ButtonGroup } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PriceChart = ({ data }) => {
  const theme = useTheme();

  const formatPrice = (price) => new Intl.NumberFormat('en-US').format(price);
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  if (!data || data.length === 0) {
    return (
      <Paper variant="outlined" sx={{ height: 420, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography color="text.secondary">No historical data available.</Typography>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined">
        <Box sx={{p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant="h6" sx={{fontWeight: 'bold'}}>Price History</Typography>
            <ButtonGroup variant="outlined" size="small">
                <Button>24h</Button>
                <Button>7d</Button>
                <Button>1m</Button>
            </ButtonGroup>
        </Box>
      <Box sx={{ height: 350, pr: 2 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tickFormatter={formatDate} fontSize={12} stroke={theme.palette.text.secondary} />
            <YAxis
              domain={['dataMin - 1000', 'dataMax + 1000']}
              tickFormatter={formatPrice}
              fontSize={12}
              axisLine={false}
              tickLine={false}
              width={80}
              stroke={theme.palette.text.secondary}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
            <Tooltip
                contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    borderColor: theme.palette.divider,
                    borderRadius: '0.5rem'
                }}
            />
            <Area type="monotone" dataKey="price" stroke={theme.palette.primary.main} fill="url(#colorPrice)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default PriceChart;
