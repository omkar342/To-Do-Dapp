import WrongNetworkMessage from "../components/WrongNetworkMessage";
import ConnectWalletButton from "../components/ConnectWalletButton";
import TodoList from "../components/TodoList";
import { TaskContractAddress, TaskContractABI } from "../config";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

/* 
const tasks = [
  { id: 0, taskText: 'clean', isDeleted: false }, 
  { id: 1, taskText: 'food', isDeleted: false }, 
  { id: 2, taskText: 'water', isDeleted: true }
]
*/

export default function Home() {
  const [contractAddress, setContractAddress] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [isUserLoggedin, setIsUserLoggedin] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);

  // useEffect

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get Metamask!");
        return;
      }
      const chainId = await ethereum.request({ method: "eth_chainId" });

      if (chainId !== "0xaa36a7") {
        alert("Please switch to Sepolia Test Network");
        setCorrectNetwork(false);
        return;
      } else {
        setCorrectNetwork(true);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setIsUserLoggedin(true);
      setContractAddress(accounts[0]);
    } catch (e) {
      console.log(e);
    }
  };

  // Just gets all the tasks from the contract
  const getAllTasks = async () => {
    try{
      const { ethereum } = window;
      
      if (!ethereum) {
        alert("Get Metamask!");
        return;
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const taskContract = new ethers.Contract(
        TaskContractAddress,
        TaskContractABI,
        signer
      );
      const allTasks = await taskContract.getMyTasks();
      setTasks(allTasks);
    }
    catch(e){
      console.log(e);
    }
  };

  // Add tasks from front-end onto the blockchain
  const addTask = async (e) => {
    // e.prventDefault();
    const task = {
      taskText: taskInput,
      isDeleted: false,
    };

    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get Metamask!");
        return;
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const taskContract = new ethers.Contract(
        TaskContractAddress,
        TaskContractABI,
        signer
      );
      const transaction = await taskContract.addTask(
        task.taskText,
        task.isDeleted
      );
      setTasks([...tasks, task]);
    } catch (e) {
      console.log(e);
    }
  };

  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
  const deleteTask = (taskId) => async () => {
    try{
      const { ethereum } = window;
      console.log(taskId)
      if (!ethereum) {
        alert("Get Metamask!");
        return;
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const taskContract = new ethers.Contract(
        TaskContractAddress,
        TaskContractABI,
        signer
      );
      const transaction = await taskContract.deleteTask(
        taskId,
      );
      const allTasks = await taskContract.getMyTasks();
      setTasks(allTasks);
    }catch(e){
      console.log(e);
    }
  };

  useEffect(() => {
    connectWallet();
    getAllTasks();
  }, []);

  return (
    <div className="bg-[#97b5fe] h-screen w-screen flex justify-center py-6">
      {!isUserLoggedin ? (
        <ConnectWalletButton connectWallet={connectWallet} />
      ) : correctNetwork ? (
        <TodoList addTask={addTask} setTaskInput={setTaskInput} tasks={tasks} deleteTask={deleteTask} />
      ) : (
        <WrongNetworkMessage />
      )}
    </div>
  );
}
