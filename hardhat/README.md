# FEVM Hardhat Kit

## Cloning the Repo

Open up your terminal (or command prompt) and navigate to a directory you would like to store this code on. Once there type in the following command:

```
git clone https://github.com/lagrangedao/lagrange-server
cd lagrange-server/hardhat
yarn install
```

This will clone the hardhat kit onto your computer, switch directories into the newly installed kit, and install the dependencies the kit needs to work.

## Get a Private Key

You can get a private key from a wallet provider [such as Metamask](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key).

## Add your Private Key as an Environment Variable

copy _.env.template_ to _.env_ in the parent directory.

update the file with your own values.

## Get the Deployer Address

Run this command:

```
yarn hardhat get-address
```

The f4address is the filecoin representation of your Ethereum address. This will be needed for the faucet in the next step.

The Ethereum address will be used otherwise.

## Fund the Deployer Address

Go to the [Wallaby faucet](https://wallaby.network/#faucet), and paste in the f4 address we copied in the previous step. This will send some wallaby testnet FIL to the account.

## Deploy the LagrangeDaoToken Contract

Type in the following command in the terminal:

```
yarn hardhat deploy
```

This will compile the contract and deploy it to the Wallaby network automatically!

Alternatively, you can
