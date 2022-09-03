import { BigNumberish } from "ethers";
import { ethers, getNamedAccounts, network } from "hardhat";
import { networkConfig } from "../helper-hardhat-config";

export const depositValue = ethers.utils.parseEther("0.0001").toString();

export async function getWeth() {
  const { deployer } = await getNamedAccounts();
  const BigNum: BigNumberish = depositValue;
  const deployerSigner = await ethers.getSigner(deployer);
  const iWeth = await ethers.getContractAt(
    "IWeth",
    networkConfig[network.name]!.wethToken!,
    deployerSigner
  );

  const txResponse = await iWeth.deposit({ value: depositValue });
  await txResponse.wait(1);
  //const txWithdraw = await iWeth.withdraw(BigNum);
  //await txWithdraw.wait(1);

  const balanceWeth = (await iWeth.balanceOf(deployer)).toString();
  console.log(`Got ${depositValue} WETH, now up to ${balanceWeth} WETH!`);
}
