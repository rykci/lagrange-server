task("balance", "Calls the LagrangeToken Contract to read the amount of LAG owned by the account.")
    .addPositionalParam("contract", "The address the LagrangeToken contract")
    .addPositionalParam("account", "The address of the account you want the balance for")
    .setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contract
        const account = taskArgs.account
        const networkId = network.name
        // console.log("Reading amount of LAG owned by", account, " on network ", networkId)
        const LagrangeToken = await ethers.getContractFactory("LagrangeToken")

        //Get signer information
        const accounts = await ethers.getSigners()
        const signer = accounts[0]

        const lagContract = new ethers.Contract(contractAddr, LagrangeToken.interface, signer)
        let result = BigInt(await lagContract.balanceOf(account)).toString()
        console.log(account, "Balance:", ethers.utils.formatEther(result).toString(), "LAG")
    })

module.exports = {}
