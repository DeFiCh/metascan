import {
  WALLET_ADDRESS_URL,
  filterParams,
  getBaseUrl,
  wrapResponse,
} from "@api/index";
import {
  RawTokensWithPaginationProps,
  RawTxnWithPaginationProps,
  WalletAddressCounterI,
  WalletAddressInfoI,
} from "@api/types";
import { NetworkConnection } from "@contexts/Environment";

export default {
  getDetail: async (
    network: NetworkConnection,
    aid: string
  ): Promise<WalletAddressInfoI> => {
    const baseUrl = getBaseUrl(network);
    const res = await fetch(`${baseUrl}/${WALLET_ADDRESS_URL}/${aid}`);
    return wrapResponse<WalletAddressInfoI>(res);
  },
  getCounters: async (
    network: NetworkConnection,
    aid: string
  ): Promise<WalletAddressCounterI> => {
    const baseUrl = getBaseUrl(network);
    const res = await fetch(`${baseUrl}/${WALLET_ADDRESS_URL}/${aid}/counters`);
    return wrapResponse<WalletAddressCounterI>(res);
  },
  getTokens: async (
    network: NetworkConnection,
    aid: string
  ): Promise<RawTokensWithPaginationProps> => {
    const baseUrl = getBaseUrl(network);
    const res = await fetch(`${baseUrl}/${WALLET_ADDRESS_URL}/${aid}/tokens`);
    return wrapResponse<RawTokensWithPaginationProps>(res);
  },
  getAddressTransactions: async (
    network: NetworkConnection,
    aid: string,
    blockNumber?: string,
    itemsCount?: string,
    index?: string
  ): Promise<RawTxnWithPaginationProps> => {
    const baseUrl = getBaseUrl(network);
    const params = filterParams([
      { key: "block_number", value: blockNumber },
      { key: "items_count", value: itemsCount },
      { key: "index", value: index },
    ]);
    const res = await fetch(
      `${baseUrl}/${WALLET_ADDRESS_URL}/${aid}/transactions${params}`
    );
    return wrapResponse<RawTxnWithPaginationProps>(res);
  },
};
