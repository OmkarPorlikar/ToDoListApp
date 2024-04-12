
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteTodo, toggleComplete, editTodo } from '../ReduxToolkit/todoSlice.js';
import { useSelector, useDispatch } from 'react-redux';

export const Todo = ({ task }) => {
  const todos = useSelector((state) => state.todos);
console.log(todos , "from tod sho")
  const dispatch = useDispatch();

  const handleToggleComplete = () => {
    dispatch(toggleComplete(task.id));
  };

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(task.id));
  };

  const handleEditTodo = () => {
    // console.log('here in edit' , task)
    dispatch(editTodo({
      id: task.id,
      task: task.task,
      isEditing: !task.isEditing,
    }));
    // console.log('after edit' , task)
  };

  console.log(task.isEditing , "editing or not")
  return (
    <div className="Todo">
      <p
        className={`${task.completed ? "completed" : "incompleted"} task`}
        onClick={handleToggleComplete}
      >
        {task.completed ? (
          <FontAwesomeIcon icon={faCheckSquare} />
        ) : (
          <FontAwesomeIcon icon={faSquare} />
        )}
        {task.task}
      </p>
      <div>
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={handleEditTodo} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={handleDeleteTodo} />
      </div>
    </div>
  );
};
