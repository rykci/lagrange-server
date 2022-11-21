const util = require("util")
const request = util.promisify(require("request"))

task("faucet", "Gets Tokens from Facuet")
    .addPositionalParam("contractaddress", "The Faucet address")
    .addPositionalParam("toaccount", "The account to send to")
    .addPositionalParam("tokenaddress", "The Token address")
    .addPositionalParam("amount", "The amount to send (in ETH)")
    .setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contractaddress
        const tokenAddr = taskArgs.tokenaddress
        const amount = ethers.utils.parseEther(taskArgs.amount)
        const toAccount = taskArgs.toaccount
        const networkId = network.name
        const Faucet = await ethers.getContractFactory("Faucet")
        const Token = await ethers.getContractFactory("LagrangeToken")
        //Get signer information
        const accounts = await ethers.getSigners()
        const signer = accounts[0]
        const admin = accounts[1]
        const priorityFee = await callRpc("eth_maxPriorityFeePerGas")

        async function callRpc(method, params) {
            var options = {
                method: "POST",
                url: "https://wallaby.node.glif.io/rpc/v0",
                // url: "http://localhost:1234/rpc/v0",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    method: method,
                    params: params,
                    id: 1,
                }),
            }
            const res = await request(options)
            return JSON.parse(res.body).result
        }

        const faucetContract = new ethers.Contract(contractAddr, Faucet.interface, admin)
        const tokenContract = new ethers.Contract(tokenAddr, Token.interface, signer)
        console.log(
            "Calling Faucet:",
            ethers.utils.formatEther(amount).toString(),
            "LAG to",
            toAccount
        )
        tx = await faucetContract.sendMultiTokens([tokenAddr], [amount], toAccount, {
            gasLimit: 1000000000,
            maxPriorityFeePerGas: priorityFee,
        })
        console.log("Transaction Hash:", tx.hash)
        let faucetBalance = BigInt(await tokenContract.balanceOf(contractAddr)).toString()
        let result = BigInt(await tokenContract.balanceOf(toAccount)).toString()
        console.log(
            "Total LAG reamining in faucet:",
            ethers.utils.formatEther(faucetBalance).toString()
        )
        console.log("Total LAG at:", toAccount, "is", ethers.utils.formatEther(result).toString())
    })

module.exports = {}
