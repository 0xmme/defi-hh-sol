import { ethers, getNamedAccounts, network } from "hardhat";
import { getWeth } from "../scripts/getWeth";
import { networkConfig } from "../helper-hardhat-config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

async function main() {
  //await getWeth();

  const { deployer } = await getNamedAccounts();
  const deploySigner = await ethers.getSigner(deployer);
  const lendingPool = await getLendingPool(deploySigner);

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
