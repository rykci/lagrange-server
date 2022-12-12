task("balance", "Calls the LagrangeToken Contract to read the amount of LAG owned by the account.")
    .addPositionalParam("contract", "The address the SimpleCoin contract")
    .addPositionalParam("account", "The address of the account you want the balance for")
    .setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contract
        const account = taskArgs.account
        const networkId = network.name
        console.log("Reading LAG owned by", account, " on network ", networkId)
        const LagrangeToken = await ethers.getContractFactory("LagrangeToken")

        //Get signer information
        const accounts = await ethers.getSigners()
        const signer = accounts[0]

        const lagTokenContract = new ethers.Contract(contractAddr, LagrangeToken.interface, signer)
        let result = BigInt(await lagTokenContract.balanceOf(account)).toString()
        let balance = ethers.utils.formatEther(result).toString()
        console.log("Balance is:", balance, "LAG")
    })

module.exports = {}
