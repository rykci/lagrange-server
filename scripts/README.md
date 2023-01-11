# How to transfer ERC-20 token with web3.py

This is a tutorial how to transfer ERC-20 token in Python with web3-ethereum-defi package.

You need:

- A private key in hexadecimal format
- ETH or other EVM native token for gas fees
- JSON-RPC node to connect to the blockchain
- A Python virtual environment with web3-ethereum-defi installed
- Understanding how to operate command line and command line applications

# Set up

Import your private key and JSON-RPC to an environment variable in UNIX shell:

```
export PRIVATE_KEY="0x..."
export JSON_RPC_URL="https://..."
```

install packages:

```
pip install web3
pip install "web3-ethereum-defi[data]"
```

# Running

Run the script:

```
python transfer.py
```

Example output

```
Connected to blockchain, chain id is 1. the latest block is 14,627,918
Token details are <XXX (XXX) at 0x0aC7B3733cBeE5D87A80fbf331f4A0bD01f17386>
Your balance is: 369999999 XXX
Your have : 0.2679961495972585 ETH for gas fees
How many tokens to transfer? 1
Give destination Ethereum address? 0x6449299d1d268c4008b4fB992afd04AB5fAec4E6
Confirm transfering 1 XXX to 0x6449299d1d268c4008b4fB992afd04AB5fAec4E6
Ok [y/n]?y
Broadcasted transaction 0xfed8c07b1da1d4348d3ea0ec678f30082fc8e944ada4b0f6510b5a7c05ceb910, now waiting 5 minutes for mining
All ok!
```
