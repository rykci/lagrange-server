# FEVM Hardhat Kit

## Install Dependencies

Open up your terminal (or command prompt) and navigate to a directory you would like to store this code on. Once there type in the following command:

```
yarn install
```

This will install the dependencies the kit needs to work.

## Get a Private Key

You can get a private key from a wallet provider [such as Metamask](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key).

## Add your Private Key as an Environment Variable

Add your private key as an environment variable by creating a `.env` file:

```
PRIVATE_KEY='abcdef'
```

\
If you use a .env file, don't commit and push any changes to .env files that may contain sensitive information, such as a private key! If this information reaches a public GitHub repository, someone can use it to check if you have any Mainnet funds in that wallet address, and steal them!

## Get the Deployer Address

Run this command:

```
yarn hardhat get-address
```

The f4address is the filecoin representation of your Ethereum address. This will be needed for the faucet in the next step.

The Ethereum address will be used otherwise.

## Fund the Deployer Address

Go to the [Wallaby faucet](https://wallaby.network/#faucet), and paste in the f4 address we copied in the previous step. This will send some wallaby testnet FIL to the account.

## Deploy Contracts

Type in the following command in the terminal:

```
yarn hardhat deploy
```

This will compile the contract and deploy it to the Wallaby network automatically!

Keep note of the deployed contract address for the next step.

##### Contract List

| Contract      | Address                                    |
| ------------- | ------------------------------------------ |
| LagrangeToken | 0x7Ab117e1Cb497dF76856902EDF3a7f93b27Bb0E2 |
| Faucet        | 0xEbdf73A200F5a01C1Fb8dfB0de5a7B509044C8B1 |

## Read your LAG balance

Type in the following command in the terminal:

```
yarn hardhat balance 'THE DEPLOYED CONTRACT ADDRESS HERE' 'YOUR Ethereum ADDRESS HERE'
```

## Mint LAG

Type in the following command in the terminal:

```
yarn hardhat mint 'THE DEPLOYED CONTRACT ADDRESS HERE' 'YOUR Ethereum ADDRESS HERE' 'AMOUNT (IN ETH)'
```

## Get LAG from Faucet

Type in the following command in the terminal:

```
yarn hardhat faucet 'THE DEPLOYED FAUCET CONTRACT ADDRESS HERE' 'YOUR Ethereum ADDRESS HERE' 'THE DEPLOYED LAG CONTRACT ADDRESS HERE' 'AMOUNT (IN ETH)'
```
