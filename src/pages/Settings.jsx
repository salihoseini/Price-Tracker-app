import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemIcon, Switch, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';

const ThemeSwitch = styled(Switch)(({ theme }) => ({
  // Custom switch styles can go here if needed
}));

const Settings = ({ mode, toggleTheme }) => {
    const theme = useTheme();
  return (
    <Box sx={{ pb: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        تنظیمات
      </Typography>
      <Paper variant="outlined" sx={{borderRadius: 4}}>
        <List>
          <ListItem sx={{py: 1.5}}>
            <ListItemIcon>
              {mode === 'dark' ? <ModeNightOutlinedIcon /> : <WbSunnyOutlinedIcon />}
            </ListItemIcon>
            <ListItemText id="switch-list-label-theme" primary="حالت نمایش" />
            <ThemeSwitch
              edge="end"
              onChange={toggleTheme}
              checked={mode === 'dark'}
              inputProps={{
                'aria-labelledby': 'switch-list-label-theme',
              }}
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default Settings;

