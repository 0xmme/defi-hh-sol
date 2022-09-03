export interface networkConfigItem {
  blockConfirmations?: number;
  wethToken?: string;
  aavePoolAddressProviderAddress?: string;
}

export interface networkConfigInfo {
  [key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
  localhost: {
    blockConfirmations: 1,
    wethToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
  hardhat: {
    blockConfirmations: 6,
    wethToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
  rinkeby: {
    blockConfirmations: 6,
    wethToken: "0x0",
  },
  goerli: {
    blockConfirmations: 6,
    wethToken: "0x2e3A2fb8473316A02b8A297B982498E661E1f6f5",
    aavePoolAddressProviderAddress:
      "0xc4dCB5126a3AfEd129BC3668Ea19285A9f56D15D",
  },
};

export const devChains = ["hardhat", "localhost"];
export const DECIMALS = 18;
