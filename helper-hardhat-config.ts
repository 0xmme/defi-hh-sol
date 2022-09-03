export interface networkConfigItem {
  blockConfirmations?: number;
}

export interface networkConfigInfo {
  [key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
  localhost: {
    blockConfirmations: 1,
  },
  hardhat: {
    blockConfirmations: 1,
  },
  rinkeby: {
    blockConfirmations: 6,
  },
  goerli: {
    blockConfirmations: 6,
  },
};

export const devChains = ["hardhat", "localhost"];
export const DECIMALS = 18;
