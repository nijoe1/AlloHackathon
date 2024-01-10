require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("dotenv").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.19",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
            viaIR: true,
        },
    },
    // defaultNetwork: "sepolia",
    // defaultNetwork: "mumbai",
    defaultNetwork: "arbsepolia",

    networks: {
        sepolia: {
            chainId: 11155111,
            url: "https://ethereum-sepolia.blockpi.network/v1/rpc/public	",
            accounts: [PRIVATE_KEY],
        },
        arbsepolia: {
            chainId: 421614,
            url: `https://sepolia-rollup.arbitrum.io/rpc`,
            accounts: [PRIVATE_KEY],
        },
        goerli: {
            chainId: 5,
            url: `https://rpc.ankr.com/eth_goerli`,
            accounts: [PRIVATE_KEY],
        },
    },
    etherscan: {
        // apiKey: "JYMKRTHHFUSX4X11I1NQRNW6X7K2FJFJUU",
        // etherscan
        // apiKey: "KNVT7KRT9B15Z5UTXZT8TG8HNMIJXWXRMY",
        apiKey: "WYSTQ1IEARCZSHZ5EETIZ7RG73QCWKPAM4",

        customChains: [
            {
                network: "arbsepolia",
                chainId: 421614,
                urls: {
                    apiURL: "https://api-sepolia.arbiscan.io/api",
                    browserURL: "https://sepolia.arbiscan.io",
                },
            },
        ],
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
}
