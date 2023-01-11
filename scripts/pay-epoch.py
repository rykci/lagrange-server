"""Manual transfer script for space payment.

- Will transfer 1 LAD every epoch for 10000 epochs

"""
import time
import os
import json

from web3 import HTTPProvider, Web3
from web3.middleware import geth_poa_middleware


from dotenv import load_dotenv

load_dotenv()

rpc_endpoint = os.getenv("rpc_endpoint")
assert rpc_endpoint is not None, "You must set rpc_endpoint in .env file"
web3 = Web3(HTTPProvider(rpc_endpoint))
web3.middleware_onion.inject(geth_poa_middleware, layer=0)
epoch_block = web3.eth.block_number
print(f"Connected to blockchain, chain id is {web3.eth.chain_id}. the latest block is {epoch_block:,}")

RECEIPIENT_ADDRESS = "0x31174CE312C34b64eaf75d97bA0cfbEb28E4B45D"
EPOCH_TIME = 30 # 1 hour
NUM_EPOCH = 10 # 10000 epochs

TOKEN_ADDRESS = "0x31174CE312C34b64eaf75d97bA0cfbEb28E4B45D"
TOKEN_ABI_FILE = open('LagrangeDAOToken.json')
TOKEN_ABI = json.load(TOKEN_ABI_FILE)

wallet_address = os.getenv('wallet_address')
private_key = os.getenv('private_key')

assert web3.isChecksumAddress(wallet_address), f"Not a valid wallet address: {wallet_address}"
assert web3.isChecksumAddress(TOKEN_ADDRESS), f"Not a valid token address: {TOKEN_ADDRESS}"
assert web3.isChecksumAddress(RECEIPIENT_ADDRESS), f"Not a valid receipient address: {RECEIPIENT_ADDRESS}"

# Show users the current status of token and his address
token_contract = web3.eth.contract(address=TOKEN_ADDRESS, abi=TOKEN_ABI)
token_name, token_symbol = token_contract.functions.name().call(), token_contract.functions.symbol().call()
token_decimals = token_contract.functions.decimals().call()
print(f"Token: {token_name} ({token_symbol})")

token_balance = token_contract.functions.balanceOf(wallet_address).call()
native_balance = web3.eth.getBalance(wallet_address)

print(f"wallet address: {wallet_address}")
print(f"native balance: {native_balance/(10**18)}")
print(f"token balance: {token_balance/(10**token_decimals)} {token_symbol}")


for i in range(NUM_EPOCH):
    current_time = int(time.time())
    current_block = web3.eth.block_number
    print(f"\nepoch {i+1}:")
    print(f"current block: {current_block}")
    print(f"current timestamp: {current_time}")

    nonce = web3.eth.getTransactionCount(wallet_address)

    # TRANSFER FUNCTION
    print(f"paying 1 {token_symbol}...")
    tx = token_contract.functions.transfer(RECEIPIENT_ADDRESS, 1 * 10**token_decimals).buildTransaction({
        'from': wallet_address,
        'nonce': nonce
    })

    # SIGN TX
    signed_tx = web3.eth.account.signTransaction(tx, private_key)
    tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
    web3.eth.wait_for_transaction_receipt(tx_hash)
    hash = web3.toHex(tx_hash)

    print(f"transaction hash: {hash}")
    time.sleep(EPOCH_TIME)


