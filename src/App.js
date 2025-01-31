import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Auth from "./Auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const auth = getAuth();
  
  // Listen for login/logout
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Fetch tasks when user logs in
  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]); // Clear tasks on logout
    }
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const userTasks = querySnapshot.docs
      .filter((doc) => doc.data().userId === user.uid)
      .map((doc) => ({ id: doc.id, ...doc.data() }));
    setTasks(userTasks);
  };

  const addTask = async (text) => {
    if (!user) return;
    const newTask = { text, completed: false, userId: user.uid };
    const docRef = await addDoc(collection(db, "tasks"), newTask);
    setTasks([...tasks, { id: docRef.id, ...newTask }]);
  };

  const toggleTask = async (taskId) => {
    const taskRef = doc(db, "tasks", taskId);
    const task = tasks.find((task) => task.id === taskId);
    if (!task) return;

    await updateDoc(taskRef, { completed: !task.completed });

    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = async (taskId) => {
    await deleteDoc(doc(db, "tasks", taskId));
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="app-container">
      {!user ? (
        <Auth onUserChange={setUser} />
      ) : (
        <>
          <h1 className = "app-heading-1">Welcome to the Task Tracker</h1>
          <h3 className = "app-heading-2">The best place where you can save and maintain your important daily tasks</h3>
          <br></br><br></br>
          <TaskForm onAdd={addTask} />
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
          <button className="logout-button" onClick={() => auth.signOut()}>Logout</button>
        </>
      )}
    </div>
  );
};

export default App;
