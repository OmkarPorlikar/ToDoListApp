
// src/TodoWrapper.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addTodo } from '../ReduxToolkit/todoSlice.js'
import { Todo } from './Todo';
import { TodoForm } from './TodoForm';
import { EditTodoForm } from './EditTodoForm';

export const TodoWrapper = () => {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = (todo) => {
    console.log("Adding todo:", todo);
    dispatch(addTodo({
      id: uuidv4(),
      task: todo,
      completed: false,
      isEditing: false,
    }));
  };

  // useEffect(()=>{
// console.log(todos , "todos from store")
  // },[todo])

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={handleAddTodo} />
      {/* Display todos */}
      {(todos.todos)?null:todos?.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
          />
        )
      )}
    </div>
  );
};
