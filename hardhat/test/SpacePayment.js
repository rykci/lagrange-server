const { expect } = require("chai")
const { upgrades } = require("hardhat")

describe("SpacePayment", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    // async function deployContracts() {
    // Contracts are deployed using the first signer/account by default

    //  return { renFil, nft, owner, otherAccount }
    // }

    let token
    let payment
    let accounts
    let u1
    let spaceId

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            accounts = await ethers.getSigners()
            u1 = accounts[0].address
            console.log("address:", u1)

            let Token = await ethers.getContractFactory("LagrangeDAOToken")
            token = await Token.deploy()
            console.log("LAD token address:", token.address)

            let SpacePayment = await ethers.getContractFactory("SpacePayment")
            payment = await SpacePayment.deploy(token.address)
            await payment.deployed()
            console.log("space payment address:", payment.address)
            //const { nft, owner } = await loadFixture(deployContracts)

            expect(await payment.owner()).to.equal(u1)
        })

        it("Should mint tokens", async function () {
            accounts = await ethers.getSigners()

            let tx = await token.initialize(u1)
            await tx.wait()
            let balance = await token.balanceOf(u1)

            expect(balance).to.equal(ethers.utils.parseEther("150000000"))
        })
    })

    describe("Spaces", () => {
        it("Try buying space without deposit", async () => {
            let balance = await payment.balanceOf(u1)
            expect(balance).to.equal(0)
            await expect(payment.buySpace(2, 1)).to.be.revertedWith("not enough balance")
        })

        it("Should deposit tokens", async () => {
            let approveTx = await token.approve(payment.address, ethers.utils.parseEther("1000"))
            await approveTx.wait()
            let depositTx = await payment.deposit(ethers.utils.parseEther("1000"))
            await depositTx.wait()

            let balance = await payment.balanceOf(u1)
            expect(balance).to.equal(ethers.utils.parseEther("1000"))

            let tokenBalance = await token.balanceOf(u1)
            expect(tokenBalance).to.equal(ethers.utils.parseEther("149999000"))
        })

        it("Should buy space", async () => {
            let paymentTx = await payment.buySpace(3, 3)
            let paymentReceipt = await paymentTx.wait()
            //console.log(paymentReceipt.events.find((e) => e.event == "SpaceCreated"))
            spaceId = paymentReceipt.events.find((e) => e.event == "SpaceCreated").args.id

            let balance = await payment.balanceOf(u1)
            expect(balance).to.equal(ethers.utils.parseEther("940"))

            let info = await payment.spaceInfo(0)
            expect(info.owner).to.equal(u1)
        })

        it("Should extend space", async () => {
            let info = await payment.spaceInfo(spaceId)

            let extendTx = await payment.extendSpace(spaceId, 2)
            await extendTx.wait()
            let info2 = await payment.spaceInfo(spaceId)

            expect(parseInt(info.expiryBlock) + 2).to.be.equal(info2.expiryBlock)
        })

        it("Should not allow extend non existing spaces", async () => {
            await expect(payment.extendSpace(spaceId + 1, 2)).to.be.revertedWith("space not found")
        })
    })
})
