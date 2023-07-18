import clsx from "clsx";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useNetwork } from "@contexts/NetworkContext";
import { TokenItemI, TokensListPageParamsProps } from "@api/types";
import PaginationLoader from "@components/skeletonLoaders/PaginationLoader";
import Pagination from "@components/commons/Pagination";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "@components/skeletonLoaders/SkeletonLoader";
import { useGetContractTokensMutation } from "@store/token";
import DetailRowTitle from "./DetailRowTitle";
import ContractTokenRow, { TokenTableFixedTitle } from "./ContractTokenRow";

interface TokenDetailsProps {
  addressHash: string;
}

export default function ContractTokensList({ addressHash }: TokenDetailsProps) {
  const { connection } = useNetwork();
  const [tokens, setTokens] = useState<TokenItemI[]>([]);
  const [nextPage, setNextPage] = useState<TokensListPageParamsProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [trigger] = useGetContractTokensMutation();
  const router = useRouter();

  const params = router.query;
  const fetchTokens = async () => {
    setIsLoading(true);
    const tokenList = await trigger({
      network: connection,
      addressHash,
      queryParams: params,
    }).unwrap();
    setTokens(tokenList.items);
    setNextPage(tokenList.next_page_params as TokensListPageParamsProps);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTokens();
  }, [params.page_number, addressHash]);

  if (!isLoading && tokens.length === 0) {
    return <div className="text-white-50">No contract tokens</div>;
  }

  return (
    <div>
      <TokensListPagination
        addressHash={addressHash}
        nextPageParams={nextPage}
        isLoading={isLoading}
        containerClass="justify-end mt-5 md:mt-0"
        loaderClass="right-1 md: top-4"
      />
      \
      <div className="hidden lg:block">
        <div className="grid grid-cols-7 mb-5">
          <div data-testid="contract-tokens-asset-title">
            <DetailRowTitle title={TokenTableFixedTitle.asset} />
          </div>
          <div data-testid="contract-tokens-type-title">
            <DetailRowTitle title={TokenTableFixedTitle.type} />
          </div>
          <div data-testid="contract-tokens-symbol-title">
            <DetailRowTitle title={TokenTableFixedTitle.symbol} />
          </div>
          <div
            className="col-span-2 text-right"
            data-testid="contract-tokens-amount-title items-end"
          >
            <DetailRowTitle
              title={TokenTableFixedTitle.quantity}
              containerClass="justify-end"
            />
          </div>
          <div
            className="col-span-2 text-right"
            data-testid="contract-tokens-contract-address-title"
          >
            <DetailRowTitle
              title="Contract Address"
              containerClass="justify-end"
            />
          </div>
        </div>
        <div className="brand-gradient-1 h-[1px]" />
      </div>
      {isLoading ? (
        <SkeletonLoader rows={22} screen={SkeletonLoaderScreen.AddressTokens} />
      ) : (
        <>
          {tokens.map((item) => (
            <ContractTokenRow key={item.token.address} data={item} />
          ))}
        </>
      )}
      <TokensListPagination
        addressHash={addressHash}
        nextPageParams={nextPage}
        isLoading={isLoading}
        containerClass="flex w-full md:justify-end mt-12 md:mt-10"
        loaderClass="left-1 md:left-auto md:right-1 top-4"
      />
    </div>
  );
}

function TokensListPagination({
  addressHash,
  nextPageParams,
  isLoading,
  containerClass = "",
  loaderClass = "",
}: {
  addressHash: string;
  isLoading: boolean;
  nextPageParams?: TokensListPageParamsProps;
  containerClass?: string;
  loaderClass?: string;
}) {
  return (
    <div className={clsx("relative", containerClass)}>
      {isLoading && <PaginationLoader customStyle={loaderClass} />}
      <Pagination<TokensListPageParamsProps>
        pathname={`/address/${addressHash}`}
        nextPageParams={nextPageParams}
        shallow
      />
    </div>
  );
}
