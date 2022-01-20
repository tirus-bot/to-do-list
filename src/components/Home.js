import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import contractAbi from "../artifacts/contracts/Todolist.sol/ToDoList.json"
import TaskTile from "./TaskTile";

const Home = () => {
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  const [currentAccount, setCurrentAccount] = useState("");
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([])
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you are connected to MetaMask!");
      } else {
        console.log("We have the ethereum object", ethereum);

        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account", account);
          setCurrentAccount(account);
        } else {
          console.log("No authorized account found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);
      } else {
        console.log("Get MetaMask");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setTaskList = async () => {
    try {
      const { ethereum } = window
      if(ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer)
          let allTasks = await contract.getAllTasks()
          setTasks(allTasks)
      }else {
          console.log('Ethereum object does not exist')
      }
   }catch(error) {
       console.log(error)
   }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if(currentAccount) setTaskList()
  }, [currentAccount])

  const onChange = (event) => {
    setInput(event.target.value);
  };

  

  const createItem = async () => {
     try {
        const { ethereum } = window
        if(ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer)
            const taskTxn = await contract.createTask(input)
            await taskTxn.wait()
            let allTasks = await contract.getAllTasks()
            setTasks(allTasks)
            console.log(allTasks)
        }else {
            console.log('Ethereum object does not exist')
        }
        setInput("");
     }catch(error) {
         console.log(error)
     }
      
  };

  return (
    <Main>
      <InputContainer>
        <InputTask
          value={input}
          onChange={onChange}
          placeholder="Type a task"
          onKeyPress={(e) => {if(e.key === 'Enter') {createItem()}}}
        />
      </InputContainer>
      {!currentAccount && (
        <ConnectButton onClick={connectWallet}>Connect Wallet</ConnectButton>
      )}
      <Button onClick={createItem} >Create Task</Button>
      {tasks.map((id, index) => {
        return (
          <TaskTile key={id} index={index} contractAddress={contractAddress} _task={tasks[index].task} completed={tasks[index].completed.toString()}/>
        )
      } )}
    </Main>
  );
};

export default Home;
const Main = styled.div`
  /* height: 100vh; */
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  margin-top: 50px;
  width: 650px;
  height: 80px;
`;
const InputTask = styled.input`
  height: 100%;
  width: 100%;
  font-size: 18px;
`;
const ConnectButton = styled.div`
  margin-top: 20px;
  width: 650px;
  height: 50px;
  color: white;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;
const Button = styled.div`
  margin-top: 10px;
  width: 650px;
  height: 50px;
  color: white;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;
