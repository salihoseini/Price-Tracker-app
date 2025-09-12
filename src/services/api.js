const PRICE_API_BASE_URL = "https://price.fiai.ir/api";

/**
 * Fetches the latest prices for all assets.
 * @returns {Promise<Array>} A promise that resolves to an array of asset objects.
 */
export const fetchLatestPrices = async () => {
  try {
    const response = await fetch(`${PRICE_API_BASE_URL}/prices/latest`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch latest prices:", error);
    throw error;
  }
};

/**
 * Fetches market statistics (top gainer/loser).
 * @returns {Promise<Object|null>} A promise that resolves to the stats object or null on error.
 */
export const fetchMarketStats = async () => {
    try {
        const response = await fetch(`${PRICE_API_BASE_URL}/stats`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch market stats:", error);
        throw error;
    }
};

/**
 * Fetches the historical price data for a given symbol.
 * @param {string} symbol - The asset symbol.
 * @returns {Promise<Array>} A promise that resolves to an array of historical price points.
 */
export const fetchPriceHistory = async (symbol) => {
  try {
    const response = await fetch(`${PRICE_API_BASE_URL}/prices/history/${symbol}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch price history for ${symbol}:`, error);
    throw error;
  }
};

