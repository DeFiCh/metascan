import { RawContractProps } from "@store/contract";
import { formatDateToUTC } from "./durationHelper";

interface DataFlowProps {
  internalType: string;
  name: string;
  type: string;
}

interface ContractAbiProps {
  inputs: DataFlowProps[];
  outputs?: DataFlowProps[];
  name?: string;
  type: string;
  stateMutability?: string;
  anonymous?: boolean;
}

export interface ContractProps {
  abi: ContractAbiProps[];
  compilerSettings?: string;
  compilerVersion: string;
  constructorArgs: string;
  creationBytecode: string;
  deployedBytecode: string;
  evmVersion: string;
  isChangedBytecode: boolean;
  isFullyVerified: boolean;
  isPartiallyVerified: boolean;
  isSelfDestructed: boolean;
  isVerified: boolean;
  isVerifiedViaEthBytecodeDb: boolean;
  isVerifiedViaSourcify: boolean;
  isVyperContract: boolean;

  name: string;
  optimizationEnabled: boolean;
  sourceCode: string;
  verifiedAt: string;
}

/**
 * This function is called from component to directly transform data from component instead of reducers to minimize loops
 * @param tx raw contract data from the api
 * @returns formatted contract data
 */
export const transformContractData = (contract: RawContractProps) => ({
  abi: contract.abi,
  compilerSettings: contract.compiler_settings,
  compilerVersion: contract.compiler_version ?? "",
  constructorArgs: contract.constructor_args,
  creationBytecode: contract.creation_bytecode,
  deployedBytecode: contract.deployed_bytecode,
  evmVersion: contract.evm_version,
  isChangedBytecode: contract.is_changed_bytecode,
  isFullyVerified: contract.is_fully_verified,
  isPartiallyVerified: contract.is_partially_verified,
  isSelfDestructed: contract.is_self_destructed,
  isVerified: contract.is_verified,
  isVerifiedViaEthBytecodeDb: contract.is_verified_via_eth_bytecode_db,
  isVerifiedViaSourcify: contract.is_verified_via_sourcify,
  isVyperContract: contract.is_vyper_contract,
  name: contract.name,
  optimizationEnabled: contract.optimization_enabled,
  optimizationRuns: contract.optimization_runs ?? "N/A",
  sourceCode: contract.source_code,
  verifiedAt: formatDateToUTC(contract.verified_at, "MM/DD/YYYY"),
});
