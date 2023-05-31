import { NetworkConnection } from "@contexts/Environment";
import {
  filterParams,
  getBaseUrl,
  MAIN_BLOCKS_URL,
  wrapResponse,
} from "./index";
import { BlockProps, RawTransactionI } from "./types";

interface BlocksResponseProps {
  items: RawTransactionI[];
  next_page_params?: {
    block_number?: string;
    items_count?: string;
    index?: string;
  };
}

export default {
  getBlocks: async (
    network: NetworkConnection,
    blockNumber?: string,
    itemsCount?: string
  ): Promise<BlockProps[]> => {
    const baseUrl = getBaseUrl(network);
    const params = filterParams([
      { key: "block_number", value: blockNumber },
      { key: "items_count", value: itemsCount },
      { key: "type", value: "block" },
    ]);
    const res = await fetch(`${baseUrl}/${MAIN_BLOCKS_URL}${params}`);

    return wrapResponse<BlockProps[]>(res);
  },
  getBlock: async (
    network: NetworkConnection,
    blockId: string
  ): Promise<BlockProps> => {
    const baseUrl = getBaseUrl(network);
    const res = await fetch(`${baseUrl}/${MAIN_BLOCKS_URL}/${blockId}`);

    return wrapResponse<BlockProps>(res);
  },
  getBlockTransactions: async (
    network: NetworkConnection,
    blockId: string,
    blockNumber?: string,
    itemsCount?: string,
    index?: string
  ): Promise<BlocksResponseProps> => {
    const baseUrl = getBaseUrl(network);
    const params = filterParams([
      { key: "block_number", value: blockNumber },
      { key: "items_count", value: itemsCount },
      { key: "index", value: index },
    ]);
    const res = await fetch(
      `${baseUrl}/${MAIN_BLOCKS_URL}/${blockId}/transactions${params}`
    );
    return wrapResponse<BlocksResponseProps>(res);
  },
};
export interface BlockNextPageParamsProps {
  block_number: string;
  items_count: string;
}

export interface BlockQueryParamsProps extends BlockNextPageParamsProps {
  type: "block";
  page_number?: string;
}
