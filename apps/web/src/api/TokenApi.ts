import { NetworkConnection } from "@contexts/Environment";
import { TOKENS_URL, getBaseUrl, wrapResponse } from ".";

export default {
  getToken: async (
    network: NetworkConnection,
    tokenId: string,
  ): Promise<TokenProps> => {
    const baseUrl = getBaseUrl(network);
    const res = await fetch(`${baseUrl}/${TOKENS_URL}/${tokenId}`);
    return wrapResponse<TokenProps>(res);
  },
  getTokenCounters: async (
    network: NetworkConnection,
    tokenId: string,
  ): Promise<TokenCountersProps> => {
    const baseUrl = getBaseUrl(network);
    const res = await fetch(`${baseUrl}/${TOKENS_URL}/${tokenId}/counters`);
    return wrapResponse<TokenCountersProps>(res);
  },
};

export interface TokenProps {
  address: string;
  circulating_market_cap: string | null;
  decimals: string;
  exchange_rate: string | null;
  holders: string;
  icon_url: string | null;
  name: string;
  symbol: string;
  total_supply: string;
  type: string;
}

export interface TokenCountersProps {
  token_holders_count: string;
  transfers_count: string;
}
