// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TaskContract {
  event AddTask(address recipient, uint taskId);

  event DeleteTask(uint taskId, bool isDeleted);

  struct Task{
    uint id;
    string taskText;
    bool isDeleted;
  }

  Task [] tasks;

  mapping (uint256 => address) public taskToOwner;

  function addTask(string memory _taskText, bool isDeleted) external{
    uint taskId = tasks.length;
    tasks.push(Task(taskId, _taskText, isDeleted));
    taskToOwner[taskId] = msg.sender;
    emit AddTask(msg.sender, taskId);
  }

  function getMyTasks() external view returns (Task[] memory){
    Task[] memory temporaryTaskArray = new Task[](tasks.length);
    uint taskCounter = 0;

    for (uint i = 0; i < tasks.length; i++){
      if (taskToOwner[i] == msg.sender && tasks[i].isDeleted == false){
        temporaryTaskArray[taskCounter] = tasks[i];
        taskCounter++;
      }
    }

    Task[] memory myTasks = new Task[](taskCounter);
    for (uint i = 0; i < taskCounter; i++){
      myTasks[i] = temporaryTaskArray[i];
    }
    return myTasks;
  }

  function deleteTask(uint _taskId) external{
    require(taskToOwner[_taskId] == msg.sender, "You are not the owner of this task");
    tasks[_taskId].isDeleted = true;
    emit DeleteTask(_taskId, true);
  }
}
