require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_API_KEY = "1ylk_Ttc9T4tKKpHDU0cagsOu0-Ycw3f";
const GOERLI_PRIVATE_KEY = "7521fc8879ad8dd85d930b22ba44c25c94806ed1fa6bcbc9bb2f2d4702127491";

module.exports = {
  solidity: "0.8.9",
  networks:{
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};
