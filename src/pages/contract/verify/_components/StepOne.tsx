import { useState } from "react";
import { useRouter } from "next/router";
import { FiArrowLeft } from "react-icons/fi";
import Dropdown from "@components/commons/Dropdown";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import clsx from "clsx";
import SmartContractApi from "@api/SmartContractApi";
import { SCVersionsBuilds } from "@api/types";
import InputComponent from "@components/commons/InputComponent";

enum ContractLanguage {
  Solidity = "Solidity",
  Vyper = "Vyper",
}

function ContinueBtn({
  onClick,
  disabled,
  label,
  testId,
  customStyle,
}: {
  label: string;
  testId: string;
  onClick?: () => void;
  disabled?: boolean;
  customStyle?: string;
}) {
  return (
    <button
      data-testid={`${testId}-button`}
      type="button"
      className={clsx(
        "flex items-center justify-center rounded-[40px] group border border-white-50 py-5 bg-white-50",
        disabled ? "opacity-[0.3]" : "hover:bg-white-300",
        customStyle
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <span
        className={clsx(
          "text-black-900 font-semibold tracking-[0.02em] text-xl"
        )}
      >
        {label}
      </span>
    </button>
  );
}

function ContractDetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <div className="text-white-700 text-sm mb-1 -tracking-[0.01em]">
        {label}
      </div>
      <div className="text-white-50 mb-1 -tracking-[0.02em] break-all">
        {value}
      </div>
    </div>
  );
}

export default function StepOne({
  isEditing,
  setIsEditing,
  onSubmit,
  defaultDropdownValue,
}) {
  // todo add validations
  const router = useRouter();
  const queryAddress = router.query.address;
  const [address, setAddress] = useState((queryAddress as string) ?? "");
  const [compiler, setCompiler] = useState(defaultDropdownValue);
  const [version, setVersion] = useState(defaultDropdownValue);
  const [license, setLicense] = useState(defaultDropdownValue);
  const [terms, setTerms] = useState(false);
  const [compilerVersions, setCompilerVersions] = useState<
    { label: string; value: string }[]
  >([]);

  const getSmartContractVersions = async (language) => {
    let builds: SCVersionsBuilds[];
    if (language === ContractLanguage.Solidity) {
      const versionsRes = await SmartContractApi.getSolidityVersions();
      builds = versionsRes.builds.reverse();
    } else {
      const versionsRes = await SmartContractApi.getVyperVersions();
      builds = versionsRes.builds;
    }
    setCompilerVersions(
      builds.map((each) => ({
        label: each.longVersion,
        value: each.longVersion,
      }))
    );
  };

  const types = [
    {
      label: "Solidity (Single file)",
      value: "Solidity (Single file)",
      type: ContractLanguage.Solidity,
    },
    {
      label: "Solidity (Multi-Part files)",
      value: "Solidity (Multi-Part files)",
      type: ContractLanguage.Solidity,
    },
    {
      label: "Solidity (Standard-Json-Input)",
      value: "Solidity (Standard-Json-Input)",
      type: ContractLanguage.Solidity,
    },
    {
      label: "Vyper (Experimental)",
      value: "Vyper (Experimental)",
      type: ContractLanguage.Vyper,
    },
  ];

  const licenseTypes = [
    { label: "No License (None)", value: "No License (None)" },
    { label: "The Unlicense (Unlicense)", value: "The Unlicense (Unlicense)" },
    { label: "MIT License (MIT)", value: "MIT License (MIT)" },
    {
      label: "GNU General Public License v2.0 (GNU GPLv2)",
      value: "GNU General Public License v2.0 (GNU GPLv2)",
    },
    {
      label: "GNU General Public License v3.0 (GNU GPLv3)",
      value: "GNU General Public License v3.0 (GNU GPLv3)",
    },
    {
      label: "GNU Lesser General Public License v2.1 (GNU LGPLv2.1)",
      value: "GNU Lesser General Public License v2.1 (GNU LGPLv2.1)",
    },
    {
      label: "GNU Lesser General Public License v3.0 (GNU LGPLv3)",
      value: "GNU Lesser General Public License v3.0 (GNU LGPLv3)",
    },
    {
      label: "BSD 2-clause &quot;Simplified&quot; license (BSD-2-Clause)",
      value: "BSD 2-clause &quot;Simplified&quot; license (BSD-2-Clause)",
    },
    {
      label:
        "BSD 3-clause &quot;New&quot; Or &quot;Revised&quot; license (BSD-3-Clause)",
      value:
        "BSD 3-clause &quot;New&quot; Or &quot;Revised&quot; license (BSD-3-Clause)",
    },
    {
      label: "Mozilla Public License 2.0 (MPL-2.0)",
      value: "Mozilla Public License 2.0 (MPL-2.0)",
    },
    {
      label: "Open Software License 3.0 (OSL-3.0)",
      value: "Open Software License 3.0 (OSL-3.0)",
    },
    { label: "Apache 2.0 (Apache-2.0)", value: "Apache 2.0 (Apache-2.0)" },
    {
      label: "GNU Affero General Public License (GNU AGPLv3)",
      value: "GNU Affero General Public License (GNU AGPLv3)",
    },
    {
      label: "Business Source License (BSL 1.1)",
      value: "Business Source License (BSL 1.1)",
    },
  ];

  const reset = () => {
    setCompiler(defaultDropdownValue);
    setVersion(defaultDropdownValue);
    setLicense(defaultDropdownValue);
    setTerms(false);
    setAddress("");
  };

  const onFormSubmit = () => {
    const data = {
      address,
      compiler: compiler.value,
      version: version.value,
      license: license.value,
    };
    onSubmit(data);
  };

  const checkAddress = (addressValue: string): string => {
    // TODO add address check
    if (addressValue.length === 42) {
      return "";
    }
    return "Invalid Length";
  };

  const isDisabled = (): boolean => {
    if (
      checkAddress(address) !== "" ||
      compiler.value === "" ||
      version.value === "" ||
      license.value === "" ||
      !terms
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="px-1 md:px-0 mt-12">
      {isEditing ? (
        <div className="w-full lg:w-8/12">
          <div className="mb-12">
            <button
              onClick={() => router.back()}
              type="button"
              className="flex flex-row mb-6"
            >
              <FiArrowLeft size={24} className="text-white-50" />
              <div className="font-medium ml-2 text-white-50">Back</div>
            </button>
            <div className="text-2xl md:text-[32px] font-bold text-white-50 mb-4">
              Verify & publish contract source code
            </div>
            <div className="text-base md:text-2xl text-white-700">
              A &quot;smart contract&quot; should provide end users with more
              information on what they are &quot;digitally signing&quot; for and
              give users an opportunity to audit the code to independently
              verify.
            </div>
          </div>
          <div>
            <div className="mb-[38px] text-right p-2">
              <button
                type="button"
                className="text-black-500 font-medium"
                onClick={reset}
              >
                Reset form
              </button>
            </div>
            <div className="space-y-6">
              <InputComponent
                label="Enter contract address to verify"
                value={address}
                setValue={setAddress}
                error={checkAddress(address)}
                placeholder="0x…"
              />
              <Dropdown
                value={compiler}
                label="Compiler"
                placeholder="Select compiler"
                options={types}
                onChange={(value) => {
                  setCompiler(value);
                  getSmartContractVersions(value.type);
                }}
              />
              <Dropdown
                value={version}
                label="Compiler version"
                placeholder="Select compiler version"
                options={compilerVersions}
                onChange={setVersion}
              />
              <Dropdown
                value={license}
                label="Open Source License type"
                placeholder="Select license type"
                options={licenseTypes}
                onChange={setLicense}
              />

              <div className="flex flex-col lg:flex-row items-center justify-between pt-8">
                <div className="flex flex-row items-center mb-8 lg:mb-0">
                  <button
                    type="button"
                    className="flex flex-row items-center"
                    onClick={() => setTerms(!terms)}
                  >
                    {terms ? (
                      <IoMdCheckmarkCircle
                        size={18}
                        className="text-green-800"
                      />
                    ) : (
                      <MdRadioButtonUnchecked
                        size={18}
                        className="text-white-50"
                      />
                    )}
                    <span className="text-white-50 ml-2 mr-1">
                      I agree to the
                    </span>
                  </button>
                  <a
                    target="_blank"
                    data-testid="terms-of-service"
                    href="/contract/verify/terms"
                    className="text-lightBlue brand-gradient-1 active:brand-gradient-2 bg-clip-text hover:text-transparent transition-all ease-in duration-300"
                  >
                    Terms of Service
                  </a>
                </div>
                <ContinueBtn
                  label="Continue"
                  testId="continue"
                  onClick={onFormSubmit}
                  disabled={isDisabled()}
                  customStyle="w-full md:w-3/6 lg:w-2/6"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="pb-6 border-b-[0.5px] border-black-300">
          <div className="text-2xl md:text-[32px] font-bold text-white-50 mb-4">
            Verifying contract
          </div>
          <ContractDetailRow label="Contract address" value={address} />
          <div className="flex flex-col md:flex-row mt-4 space-y-4 md:space-y-0 md:space-x-5 justify-between">
            <ContractDetailRow label="Compiler" value={compiler.label} />
            <ContractDetailRow label="Compiler version" value={version.label} />
            <ContractDetailRow
              label="Open source license type"
              value={license.label}
            />
          </div>
          <div className="mt-6 md:mt-4 py-1.5">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-lightBlue brand-gradient-1 active:brand-gradient-2 bg-clip-text hover:text-transparent transition-all ease-in duration-300 font-medium"
            >
              Edit contract details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}