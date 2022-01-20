import { ethers } from "ethers";
import React, { useEffect,useState } from "react";
import styled from "styled-components";
import contractAbi from "../artifacts/contracts/Todolist.sol/ToDoList.json"

const TaskTile = ({ index, contractAddress, _task, completed }) => {
  const [checked, setChecked] = useState(completed);

  const handleCheck = async () => {
    try {
    const { ethereum } = window
    if(ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer)
      const completeTxn = await contract.changeIsCompleteValue(index)
      await completeTxn.wait()
      let completeValue = await contract.getTask(index)
      setChecked(completeValue.toString())
      
    }
    }catch(error) {
        console.log(error)
    }
  };

  useEffect(() => {

  }, [checked])
  return (
    <Main>
      <Container>
        <TaskTitle>Task: {_task}</TaskTitle>
        <IsCompleteContainer >
          Is the item completed? {checked}
        </IsCompleteContainer>
      </Container>
      <CheckBox type="checkbox"  onChange={handleCheck}/>
    </Main>
  );
};

export default TaskTile;
const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 650px;
`;
const TaskTitle = styled.div`
  font-size: 30px;
  font-weight: 900;
  margin: 10px 0;
`;
const IsCompleteContainer = styled.div`
  font-size: 22px;
  font-weight: 300;
`;
const Container = styled.div``;
const CheckBox = styled.input`
  background-color: purple;
`;
