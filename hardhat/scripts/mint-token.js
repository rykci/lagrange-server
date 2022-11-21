const util = require("util")
const request = util.promisify(require("request"))

const main = async () => {
    const contractAddr = "0xfc06EE2c838EB5f33410eaD82053ed69A19fdc68"
    const amount = ethers.utils.parseEther("100")
    const Token = await ethers.getContractFactory("LagrangeToken")
    //Get signer information
    const accounts = await ethers.getSigners()
    const signer = accounts[0]
    const toAccount = signer.address
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
    tx = await lagContract.mint(toAccount, amount, {
        gasLimit: 1000000000,
        maxPriorityFeePerGas: priorityFee,
    })
    console.log("Transaction Hash:", tx.hash)
    let result = BigInt(await lagContract.balanceOf(toAccount)).toString()
    console.log("Total LAG at:", toAccount, "is", ethers.utils.formatEther(result).toString())
}

main()
