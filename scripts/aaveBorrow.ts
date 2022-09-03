import { ethers, getNamedAccounts, network } from "hardhat";
import { getWeth } from "../scripts/getWeth";
import { networkConfig } from "../helper-hardhat-config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Address } from "hardhat-deploy/dist/types";
import { IPool } from "../typechain-types/IPool";
import { IPoolAddressesProvider } from "../typechain-types/IPoolAddressesProvider";

async function main() {
  await getWeth();
  const wethToken: Address = networkConfig[network.name].wethToken!;
  const testValue = ethers.utils.parseEther("0.0001").toString();

  const { deployer } = await getNamedAccounts();
  const deploySigner: SignerWithAddress = await ethers.getSigner(deployer);
  const lendingPool: IPool = await getLendingPool(deploySigner);
  await approveErc20(wethToken, lendingPool.address, testValue, deploySigner);
  await lendingPool.deposit(wethToken, testValue, deployer, 0);
  console.log(`${testValue} deposited!`);

  async function approveErc20(
    approveErc: Address,
    approveAddress: Address,
    approveAmount: string,
    approvingAccount: SignerWithAddress
  ) {
    const erc20Contract = await ethers.getContractAt(
      "IERC20",
      approveErc,
      approvingAccount
    );
    const approvalTx = await erc20Contract.approve(
      approveAddress,
      approveAmount
    );
    await approvalTx.wait(1);
    console.log(`${approveAmount} approved!`);
  }

  async function getLendingPool(Signer: SignerWithAddress): Promise<IPool> {
    const aavePoolAddressesProvider: IPoolAddressesProvider =
      (await ethers.getContractAt(
        "IPoolAddressesProvider",
        networkConfig[network.name].aavePoolAddressProviderAddress!,
        Signer
      )) as IPoolAddressesProvider;

    const aaveLendingPoolAddress = await aavePoolAddressesProvider.getPool();

    const aaveLendingPool = (await ethers.getContractAt(
      "IPool",
      aaveLendingPoolAddress,
      Signer
    )) as IPool;

    return aaveLendingPool;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
