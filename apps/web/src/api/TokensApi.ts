import { NetworkConnection } from "@contexts/Environment";
import { TOKENS_URL, filterParams, getBaseUrl, wrapResponse } from "./index";

export interface RawTokenWithPaginationProps {
  items: any[];
  next_page_params?: TokenNextPageParamsProps;
}

export default {
  getTokens: async (
    network: NetworkConnection,
    contractAddressHash?: string,
    holderCount?: string,
    isNameNull?: string,
    itemsCount?: string,
    marketCap?: string,
    name?: string,
  ): Promise<RawTokenWithPaginationProps> => {
    const baseUrl = getBaseUrl(network);
    const params = filterParams([
      { key: "contract_address_hash", value: contractAddressHash },
      { key: "holder_count", value: holderCount },
      { key: "is_name_null", value: isNameNull },
      { key: "items_count", value: itemsCount },
      { key: "market_cap", value: marketCap },
      { key: "name", value: name },
    ]);
    const res = await fetch(`${baseUrl}/${TOKENS_URL}${params}`);

    return wrapResponse<RawTokenWithPaginationProps>(res);
  },
};

export interface TokenNextPageParamsProps {
  contract_address_hash?: string;
  holder_count?: string;
  is_name_null?: string;
  items_count: string;
  market_cap?: string;
  name?: string;
}

export interface TokenQueryParamsProps extends TokenNextPageParamsProps {
  page_number?: string;
}
