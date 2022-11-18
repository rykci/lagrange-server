import os
import sys
from web3 import Web3, HTTPProvider

try:
    w3 = Web3(HTTPProvider('https://wallaby.node.glif.io/rpc/v0'))
except:
    print("[!] WARNING: INVALID HTTPProvider ('web3' env variable)")
    sys.exit("NOPE")

wallet = '0x96216849c49358B10257cb55b28eA603c874b05E'

wallet_balance = w3.eth.get_balance(wallet)

print(wallet, wallet_balance/(10**18))
