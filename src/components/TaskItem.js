import React from "react";

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className="task-item">

      <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)}/>

      <span className={task.completed ? "completed" : ""}>{task.text}</span>

      <button onClick={() => onDelete(task.id)}>❌</button>
      
    </div>
  );
};

export default TaskItem;
