const util = require("util")
const request = util.promisify(require("request"))

task("mint", "Mints LagrangeToken")
    .addPositionalParam("contractaddress", "The SimpleCoin address")
    .addPositionalParam("toaccount", "The account to send to")
    .addPositionalParam("amount", "The amount to send (in ETH)")
    .setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contractaddress
        const amount = ethers.utils.parseEther(taskArgs.amount)
        const toAccount = taskArgs.toaccount
        const networkId = network.name
        const Token = await ethers.getContractFactory("LagrangeToken")
        //Get signer information
        const accounts = await ethers.getSigners()
        const signer = accounts[0]
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

        const lagContract = new ethers.Contract(contractAddr, Token.interface, signer)
        console.log("Minting:", ethers.utils.formatEther(amount).toString(), "LAG to", toAccount)
        let tx = await lagContract.mint(toAccount, amount, {
            gasLimit: 1000000000,
            maxPriorityFeePerGas: priorityFee,
        })
        console.log("Transaction Hash:", tx.hash)
        let result = BigInt(await lagContract.balanceOf(toAccount)).toString()
        console.log("Total LAG at:", toAccount, "is", ethers.utils.formatEther(result).toString())
    })

module.exports = {}
