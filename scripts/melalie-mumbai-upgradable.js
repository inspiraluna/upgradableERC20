// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");

async function main() {
  
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  
  console.log("Account balance:", (await deployer.getBalance()).toString());

  await hre.run('compile');

  const MelalieUpgradableChild = await ethers.getContractFactory("MelalieUpgradableChild");                                                                            
  const mel = await upgrades.deployProxy(MelalieUpgradableChild, ["Melalie","MEL","0xb5505a6d998549090530911180f38aC5130101c6"]);
  await mel.deployed();
  console.log("MelalieUpgradableChild deployed to mumbai matic:", mel.address);
  // await mel.mintToken(mel.address,"1000000000000000000000000");
  const owner = await mel.owner()
  console.log("MelalieUpgradableChild:owner", owner.toString());
  const totalSupply = await mel.totalSupply()
  console.log("MelalieUpgradableChild initialized with totalSupply", totalSupply.toString());
  // deployed to: 0x347eb1935f58cf3856BE55f620B12aCEFd829F21  # or older 0xBf5e0739A6af8511EC091d8aB05eDE3720CC2Bd3
  
  // await mel.transferToken(mel.address,"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","1000000000000000000000")
  // await mel.transferToken(mel.address,"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","1000000000000000000000")
  // await mel.createStake("500000000000000000000")
  // console.log('stake of me',(await mel.stakeOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString())
  /*console.log('uprading ...')
  const MelalieUpgradableV2 = await ethers.getContractFactory("MelalieUpgradableV2");
  const melV2 = await upgrades.upgradeProxy(mel.address, MelalieUpgradableV2);
  await melV2.mintToken(mel.address,"1000000000000000000000000");
  const totalSupplyV2 = await melV2.totalSupply()
  console.log("MelalieUpgradableV2:totalSupply", totalSupplyV2.toString());
  const ownerV2 = await melV2.owner()
  console.log("MelalieUpgradableV2:ownerV2", ownerV2.toString());
  console.log('stake of meV2',(await melV2.stakeOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString())*/
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
