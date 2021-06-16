// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  await hre.run('compile');
  console.log(ethers.address)
  const MelalieUpgradable = await ethers.getContractFactory("MelalieUpgradable");
  const MelalieUpgradableV2 = await ethers.getContractFactory("MelalieUpgradableV2");
                                                                              
  const mel = await upgrades.deployProxy(MelalieUpgradable, ["Melalie","MEL","1000000000000000000000000"]);
  await mel.deployed();
  console.log("MelalieStakingToken deployed to:", mel.address);
  await mel.mintToken(mel.address,"1000000000000000000000000");
  const owner = await mel.owner()
  console.log("MelalieUpgradableV2:owner", owner.toString());
  const totalSupply = await mel.totalSupply()
  console.log("MelalieStakingToken initialized with totalSupply", totalSupply.toString());
  await mel.transferToken(mel.address,"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","1000000000000000000000")
  await mel.transferToken(mel.address,"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","1000000000000000000000")
  await mel.createStake("500000000000000000000")
  console.log('stake of me',(await mel.stakeOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString())
  console.log('uprading ...')
  const melV2 = await upgrades.upgradeProxy(mel.address, MelalieUpgradableV2);
  await melV2.mintToken(mel.address,"1000000000000000000000000");
  const totalSupplyV2 = await melV2.totalSupply()
  console.log("MelalieUpgradableV2:totalSupply", totalSupplyV2.toString());
  const ownerV2 = await melV2.owner()
  console.log("MelalieUpgradableV2:ownerV2", ownerV2.toString());
  console.log('stake of meV2',(await melV2.stakeOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
