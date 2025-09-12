import { createTheme } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

// Configure the RTL cache
export const createRtlCache = () => {
  return createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });
};

// Define the design tokens for both light and dark modes
const getDesignTokens = (mode) => ({
  direction: 'rtl',
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Palette values for light mode
          primary: { main: '#3861FB' },
          background: { default: '#F8F9FD', paper: '#FFFFFF' },
          text: { primary: '#1A202C', secondary: '#718096' },
          action: { hover: 'rgba(0, 0, 0, 0.04)' },
        }
      : {
          // Palette values for dark mode
          primary: { main: '#4A90E2' },
          background: { default: '#0A0F19', paper: '#131826' },
          text: { primary: '#FFFFFF', secondary: '#A0AEC0' },
          action: { hover: 'rgba(255, 255, 255, 0.08)' },
        }),
    // Common palette values
    success: { main: '#0ECB81' },
    error: { main: '#F6465D' },
    warning: { main: '#F5A623' },
  },
  typography: {
    fontFamily: "'Vazirmatn', sans-serif",
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: '16px',
          border: 'none',
        },
      },
    },
  },
});

// Function to create the theme based on the mode
export const createMuiTheme = (mode) => createTheme(getDesignTokens(mode));

