import TokenStatsDisplay from "@components/TokenStatsDisplay";
import GroupChainStatsCard from "@components/GroupChainStatsCard";
import { HomeTitle } from "@components/HomeTitle";
import { SearchBar } from "layouts/components/searchbar/SearchBar";

export default function Home() {
  return (
    <>
      <HomeTitle />
      <SearchBar containerClass="px-5 md:px-10 lg:px-[316px] my-10" />
      <TokenStatsDisplay />
      <GroupChainStatsCard />
    </>
  );
}
