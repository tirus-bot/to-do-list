const main = async () => {
  const toDoListContractFactory = await hre.ethers.getContractFactory(
    "ToDoList"
  );
  const toDoListContract = await toDoListContractFactory.deploy();
  await toDoListContract.deployed();

  console.log("Contract deployed to: ", toDoListContract.address);

  // let taskTxn = await toDoListContract.createTask("Go to School");
  // await taskTxn.wait();

  // let taskCount = await toDoListContract.getTaskCount();
  // let allTasks = await toDoListContract.getAllTasks();
  // console.log(taskCount.toString());
  // console.log(allTasks);
   const completeTxn = await toDoListContract.changeIsCompleteValue(0)
   await completeTxn.wait()

   let completeValue = await toDoListContract.getTask(0)
   console.log(completeValue)
};
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
runMain();
