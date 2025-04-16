import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);
  useEffect(() => {
    localStorage.setItem("iteam", JSON.stringify(tasks));
  }, [tasks]);
  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };
  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };
  const deleteTask = (index) => {
    const updateTask = tasks.filter((_, idx) => idx !== index);
    setTasks(updateTask);
  };
  return (
    <>
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold mb-4">📋 To-Do List</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-grow p-2 border rounded-xl"
            placeholder="add new Task"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-black px-4 py-2 rounded-xl hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(index)}
                />
                <span
                  className={task.completed ? "line-through text-gray-500" : ""}
                >
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
