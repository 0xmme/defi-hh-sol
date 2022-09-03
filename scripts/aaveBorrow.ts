import { ethers, getNamedAccounts, network } from "hardhat";
import { getWeth } from "../scripts/getWeth";
import { networkConfig } from "../helper-hardhat-config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Address } from "hardhat-deploy/dist/types";

async function main() {
  //await getWeth();

  const { deployer } = await getNamedAccounts();
  const deploySigner = await ethers.getSigner(deployer);
  const lendingPool = await getLendingPool(deploySigner);
  const wethToken = networkConfig[network.name].wethToken!;

  async function approveErc20(
    approveErc: Address,
    approveAddress: Address,
    approveAmount: number,
    approvingAccount: Address
  ) {
    const approvingSigner = await ethers.getSigner(approvingAccount);
    const erc20Contract = await ethers.getContractAt(
      "IERC20",
      approveErc,
      approvingSigner
    );
  }

  async function getLendingPool(Signer: SignerWithAddress) {
    const aavePoolAddressesProvider = await ethers.getContractAt(
      "IPoolAddressesProvider",
      networkConfig[network.name].aavePoolAddressProviderAddress!,
      Signer
    );

    const aaveLendingPoolAddress = await aavePoolAddressesProvider.getPool();

    const aaveLendingPool = await ethers.getContractAt(
      "IPool",
      aaveLendingPoolAddress,
      Signer
    );

    return aaveLendingPool;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
