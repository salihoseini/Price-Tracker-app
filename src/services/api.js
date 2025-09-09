const PRICE_API_BASE_URL = "https://price.fiai.ir/api";
const NEWS_API_BASE_URL = "https://finnhub.io/api/v1";

// IMPORTANT: Replace with your actual Finnhub API key
const NEWS_API_KEY = "d2uqqgpr01qq994gt48gd2uqqgpr01qq994gt490";

export const fetchLatestPrices = async () => {
  try {
    const response = await fetch(`${PRICE_API_BASE_URL}/prices/latest`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch latest prices:", error);
    return [];
  }
};

export const fetchMarketStats = async () => {
    try {
        const response = await fetch(`${PRICE_API_BASE_URL}/stats`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch market stats:", error);
        return null;
    }
};

// CORRECTED: This function now correctly fetches the full history for the mini-charts
export const fetchPriceHistory = async (symbol) => {
  try {
    const response = await fetch(`${PRICE_API_BASE_URL}/prices/history/${symbol}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    // Return the last 30 data points for a clean sparkline
    return data.slice(-30);
  } catch (error) {
    console.error(`Failed to fetch price history for ${symbol}:`, error);
    return [];
  }
};

export const fetchMarketNews = async () => {
  if (NEWS_API_KEY === "YOUR_FINNHUB_API_KEY") {
    console.warn("Finnhub API key is not set. Please add it in src/services/api.js");
    return [];
  }
  try {
    const response = await fetch(`${NEWS_API_BASE_URL}/news?category=general&token=${NEWS_API_KEY}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.slice(0, 20);
  } catch (error) {
    console.error("Failed to fetch market news:", error);
    return [];
  }
};

