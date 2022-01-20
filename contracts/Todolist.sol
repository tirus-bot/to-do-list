// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ToDoList {
    uint256 taskCount;

    struct Task {
        address owner;
        string task;
        bool completed;
    }

    Task[] tasks;

    constructor(){
        taskCount += 1;
        tasks.push(Task(msg.sender, "Have lunch", false));
    }

    function createTask(string memory _task) public {
        taskCount += 1;
        tasks.push(Task(msg.sender, _task, false));
        console.log("You have successfully created a task");
    }
    function getAllTasks() public view returns(Task[] memory) {
        return tasks;
    }
    function getTaskCount() public view returns (uint256) {
        console.log("You have %d tasks!", taskCount);
        return taskCount;
    }
    function changeIsCompleteValue(uint256 _index) public  {
         Task memory task = tasks[_index];
         bool isCompleteValue = !task.completed;
         tasks[_index] = Task(msg.sender, task.task, isCompleteValue);
    }

    function getTask(uint256 _index) public view returns(bool) {
        return tasks[_index].completed;
    }
}