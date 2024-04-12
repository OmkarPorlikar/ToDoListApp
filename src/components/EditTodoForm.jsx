import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTodo } from '../ReduxToolkit/todoSlice.js';

export const EditTodoForm = ({ task }) => {
  const [value, setValue] = useState(task.task);
  const dispatch = useDispatch();

  console.log(task , "send to edit")
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTodo({
      id: task.id,
      task: value.trim(),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Update task"
      />
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
};
