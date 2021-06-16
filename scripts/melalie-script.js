// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  await hre.run('compile');

  // const MelalieStakingToken = await ethers.getContractFactory("MelalieStakingToken");
  // const mel = await upgrades.deployProxy(MelalieStakingToken, "Melalie","MEL","1000000000000000000000000");
  // await mel.deployed();
  // console.log("MelalieStakingToken deployed to:", mel.address);
  //0xd6bAEC21fEFB4ad64d29d3d20527c37c757F409c
  // We get the contract to deploy
  const MelalieStakingToken = await hre.ethers.getContractFactory("MelalieStakingToken");
  const mel = await MelalieStakingToken.deploy("Melalie","MEL","1000000000000000000000000");
  await mel.deployed();
  console.log("MelalieStakingToken deployed to:", mel.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
