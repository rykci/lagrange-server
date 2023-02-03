require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("./tasks")
require("dotenv").config({ path: "../.env" })

const PRIVATE_KEY = process.env.private_key
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    defaultNetwork: "hyperspace",
    networks: {
        hyperspace: {
            url: "https://api.hyperspace.node.glif.io/rpc/v1",
            accounts: [PRIVATE_KEY],
        },
        wallaby: {
            url: "https://wallaby.node.glif.io/rpc/v0",
            accounts: [PRIVATE_KEY],
        },
        mumbai: {
            url: process.env.rpc_endpoint,
            accounts: [PRIVATE_KEY],
        },
        binance: {
            url: "https://data-seed-prebsc-2-s3.binance.org:8545",
            accounts: [PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: "NCZHD5SVRGTYANFMXHZ17E5XFZ5TRAAXBB",
        customChains: [],
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
}
