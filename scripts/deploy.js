const main = async () => {
    const toDoListContractFactory = await hre.ethers.getContractFactory("ToDoList")
    const toDoListContract = await toDoListContractFactory.deploy()
    await toDoListContract.deployed()

    console.log("Contract deployed to: ", toDoListContract.address)
}
const runMain = async () => {
    try {
        await main()
        process.exit(0)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}
runMain()