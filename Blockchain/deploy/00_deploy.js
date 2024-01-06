require("hardhat-deploy")
require("hardhat-deploy-ethers")
// const Sablier = require("../contracts/abi.json")
const { ethers } = require("hardhat")
const { Console } = require("console")

const alloAbi = require("../contracts/a/allo.json")

const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    const { deploy } = deployments
    console.log("Wallet+ Ethereum Address:", wallet.address)

    const DAI = await ethers.getContractFactory("dai")
    const DAI_INSTANCE = DAI.attach("0x8d573a4EBe0AC93d9cBCF1A3046C91DbF2ADD45A")
    const hatsModuleFactory = "0xfE661c01891172046feE16D3a57c3Cf456729efA"
    const AlloRegistry = "0x4AAcca72145e1dF2aeC137E1f3C5E3D75DB8b5f3"
    const hats = "0x3bc1A0Ad72417f2d411118085256fC53CBdDd137"
    const Allo = "0x1133eA7Af70876e64665ecD07C0A0476d09465a1"
    const eligibility_module_implementation = "0xfFD7657dDD7577bFf953ca96ae0EAc04c5212914"
    const lockupLinear = "0x483bdd560dE53DC20f72dC66ACdB622C5075de34"

    const registryParams = [
        hatsModuleFactory,
        AlloRegistry,
        hats,
        lockupLinear,
        Allo,
        eligibility_module_implementation,
    ]

    const HackRegistry = await deploy("HackRegistry", {
        from: wallet.address,
        args: registryParams,
        log: true,
    })

    // // Verify the contract
    // await hre.run("verify:verify", {
    //     address: HackRegistry.address,
    //     constructorArguments: registryParams,
    // })

    console.log("HackRegistry:", HackRegistry.address)

    const _HackRegistry = await ethers.getContractFactory("HackRegistry")
    const HackRegistryInstance = _HackRegistry.attach(HackRegistry.address)

    const table1 = await HackRegistryInstance.tables(0)
    const table2 = await HackRegistryInstance.tables(1)
    const table3 = await HackRegistryInstance.tables(2)
    const table4 = await HackRegistryInstance.tables(3)
    const table5 = await HackRegistryInstance.tables(4)
    const table6 = await HackRegistryInstance.tables(5)

    console.log(table1,'-',table2,'-',table3,'-',table4,'-',table5,'-',table6)

    const StrategyParams = [Allo, "QVHatsSablierStrategy"]

    const QVHatsSablierStrategy = await deploy("QVHatsSablierStrategy", {
        from: wallet.address,
        args: StrategyParams,
        log: true,
    })

    // Verify the contract
    // await hre.run("verify:verify", {
    //     address: QVHatsSablierStrategy.address,
    //     constructorArguments: StrategyParams,
    // })

    console.log("QVHatsSablierStrategy:", QVHatsSablierStrategy.address)

    const _QVHatsSablierStrategy = await ethers.getContractFactory("QVHatsSablierStrategy")

    const QVHatsSablierStrategyInstance = _QVHatsSablierStrategy.attach(
        QVHatsSablierStrategy.address
    )

    // ------------------- Step 1 -------------------

    // const setStrategyTx = await HackRegistryInstance.setPoolStrategyImplementation(
    //     QVHatsSablierStrategy.address
    // )
    // await setStrategyTx.wait()

    // console.log("setStrategy done")

    // const createProfileTx = await HackRegistryInstance.createProfile("kk", [1, "skatoula"], {
    //     gasLimit: 10000000000,
    // })

    // await createProfileTx.wait()

    // const profilesTableID = await HackRegistryInstance.tableIDs(0)
    // console.log(`https://tables.testnets.tableland.xyz/421614/${profilesTableID}.html`)

    // console.log("profile created")

    // const createProfile2Tx = await HackRegistryInstance.createProfile("kk", [1, "skatoula"], {
    //     gasLimit: 10000000000,
    // })

    // await createProfile2Tx.wait()

    // ------------------- Step 2 -------------------

    const ProfileID = "0x33bb7a6647db8acad7e60a7dff816dc2948f27e3e0ffbc3df380a9369ba77a0c"

    // const initializeParams = [101, [50, 1, 0, 120, 120, 120, 0, 0, 0, "0x00"]]

    // const mint = await DAI_INSTANCE.mint(
    //     wallet.address,
    //     BigInt("111111111111111111111111111111")
    // )
    // await mint.wait()

    // console.log("dai minted")

    // const AproveDai = await DAI_INSTANCE.approve(
    //     HackRegistryInstance.address,
    //     BigInt("111111111111111111111111111111")
    // )
    // await AproveDai.wait()

    // console.log("dai approved")

    // const createPoolWithQVHatsxSablierStrategyTx =
    //     await HackRegistryInstance.createPoolWithQVHatsSablierStrategy(
    //         ProfileID,
    //         initializeParams,
    //         DAI_INSTANCE.address,
    //         BigInt("111111111111111111111111111111"),
    //         [1, "skatoula"],
    //         { gasLimit: 10000000000 }
    //     )

    // await createPoolWithQVHatsxSablierStrategyTx.wait()

    // console.log("pool created")

    // ------------------- Step 3 -------------------

    const ProfileToRegister = "0x12a70e17d1e208e2030a847ceee962a0d0ce437455bcb14f2f52624a0e86a551"
    const ProfileToRegisterAddress = "0xc68d078c7d94a0875e6b8b3295f4c002125076b7"
    const PoolStrategy = "0xe7c0d008c30d2b2c2c25ce60a76dd9f87ceb9262"
    const poolID = 94

    const AlloInstance = new ethers.Contract(Allo, alloAbi, wallet)

    const AbiCoder = new ethers.utils.AbiCoder()

    // const RegisterProfileIntoPool = await HackRegistryInstance.registerRecipient(
    //     poolID,
    //     ProfileToRegister,
    //     [1, "skatoula"],
    //     { gasLimit: 10000000000 }
    // )

    // await RegisterProfileIntoPool.wait()

    // console.log("registered")

    // const PoolStrategyInstance = _QVHatsSablierStrategy.attach(PoolStrategy)

    // const _recipients = [ProfileToRegisterAddress]
    // const _recipientStatuses = [2]

    // const reviewRecipients = await PoolStrategyInstance.reviewRecipients(_recipients , _recipientStatuses, { gasLimit: 10000000000 });
    // await reviewRecipients.wait()

    // console.log("reviewed")

    // ------------------- Step 4 -------------------

    let VoiceCreditsToAllocate = 101

    const data = AbiCoder.encode(
        ["address", "uint256"],
        [ProfileToRegisterAddress, VoiceCreditsToAllocate]
    )

    // const AllocateTx = await AlloInstance.allocate(poolID, data, { gasLimit: 100000000 })
    // await AllocateTx.wait()

    // console.log("allocated")

    // ------------------- Step 5 -------------------

    // const DistributeTx = await AlloInstance.distribute(
    //     poolID,
    //     [ProfileToRegisterAddress],
    //     "0x0000",
    //     { gasLimit: 100000000 }
    // )
    // await DistributeTx.wait()

    // console.log("distributed")
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

// console.log("dai minted")

// const AproveDai = await daiContract.approve(
//     LockupLinearStreamCreator.address,
//     BigInt("1000000000000000000000000000000000000")
// )
// await AproveDai.wait()

// console.log("dai approved")

// const AproveDai2 = await daiContract.approve(
//     "0x483bdd560dE53DC20f72dC66ACdB622C5075de34",
//     BigInt("10000000000")
// )
// await AproveDai2.wait()

// console.log("dai approved")

// const CreateStream = await LockupLinearStreamCreatorInstance.createStream(
//     // Amount of tokens to stream
//     BigInt("100"),
//     "0x464e3F471628E162FA34F130F4C3bCC41fF7635d",

//     { gasLimit: 100000000 }
// )
// console.log(CreateStream)
// await CreateStream.wait()

// const sablier = new ethers.Contract(
//     "0xa3e36b51B7A456812c92253780f4B15bad56e34c",
//     Sablier,
//     wallet
// )
// struct CreateWithDurations {
//     address sender;
//     address recipient;
//     uint128 totalAmount;
//     IERC20 asset;
//     bool cancelable;
//     Durations durations;
//     Broker broker;
// }
// const stream = await sablier.createWithDurations([
//     "0x044B595C9b94A17Adc489bD29696af40ccb3E4d2",
//     "0x464e3F471628E162FA34F130F4C3bCC41fF7635d",
//     100,
//     "0x8d573a4EBe0AC93d9cBCF1A3046C91DbF2ADD45A",
//     false,
//     [0, 3600],
//     ["0x0000000000000000000000000000000000000000", "0x00"],
// ])
// await stream.wait()
