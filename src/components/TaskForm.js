import React, { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">

      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter a new task..."/>

      <button type="submit">Add Task</button>
      
    </form>
  );
};

export default TaskForm;
