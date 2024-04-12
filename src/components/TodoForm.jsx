
// src/TodoForm.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { addTodo } from '../ReduxToolkit/todoSlice.js'
import { v4 as uuidv4 } from 'uuid';

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() !== '') {
      console.log("Submitting todo:", value);
      addTodo(value.trim());
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="What is the task today?"
      />
      <button type="submit" className="todo-btn">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};
