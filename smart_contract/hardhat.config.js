require("@nomiclabs/hardhat-waffle");
//https://eth-ropsten.alchemyapi.io/v2/G1p4MG6muiM2WGc2xY2mBH3GIiXDrTbP


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.4",
    networks: {
        rapsten: {
            url: 'https://eth-ropsten.alchemyapi.io/v2/G1p4MG6muiM2WGc2xY2mBH3GIiXDrTbP',
            accounts: ['474f6e23f1f4eb2aeab7285fccb46c1cd985f6a299232b40af1561b4c5c83118']
        }
    }
};
