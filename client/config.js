export const TaskContractAddress = "0xE25bbEa2eDF630F914543a90E3Be80117a391020";

export const TaskContractABI = [
    {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "taskId",
            "type": "uint256"
          }
        ],
        "name": "AddTask",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "taskId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "bool",
            "name": "isDeleted",
            "type": "bool"
          }
        ],
        "name": "DeleteTask",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "taskToOwner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_taskText",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isDeleted",
            "type": "bool"
          }
        ],
        "name": "addTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getMyTasks",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "taskText",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "isDeleted",
                "type": "bool"
              }
            ],
            "internalType": "struct TaskContract.Task[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_taskId",
            "type": "uint256"
          }
        ],
        "name": "deleteTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];