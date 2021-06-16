// hardhat.config.js
require("@nomiclabs/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');
require("hardhat-gas-reporter");

const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim();
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
    },
    goerli: {
      url: `https://goerli.infura.io/v3/ab8c974ffadf4558a55b0148d4dd9b57`,
      accounts: [privateKey],
      gas: "auto",
      gasPrice: "auto"
    },

    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  gasReporter: {
    currency: 'EUR',
    //gasPrice: 21
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};

// require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-ethers");
// require('@openzeppelin/hardhat-upgrades');
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async () => {
//   const accounts = await ethers.getSigners();
//   const prov = ethers.getDefaultProvider();
//   for (const account of accounts) {
//     const balance = await prov.getBalance(account.address);
//     console.log(account.address, balance);
//   }
// });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

// /**
//  * @type import('hardhat/config').HardhatUserConfig
//  */
// module.exports = {
//   solidity: "0.7.3",
// };


// const fs = require('fs');
// const privateKey = fs.readFileSync(".secret").toString().trim();
// module.exports = {
//   defaultNetwork: "matic",
//   networks: {
//     hardhat: {
//     },
//     matic: {
//       url: "https://rpc-mumbai.maticvigil.com",
//       accounts: [privateKey]
//     }
//   },
//   solidity: {
//     version: "0.8.0",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200
//       }
//     }
//   },
//   paths: {
//     sources: "./contracts",
//     tests: "./test",
//     cache: "./cache",
//     artifacts: "./artifacts"
//   },
//   mocha: {
//     timeout: 20000
//   }
// }