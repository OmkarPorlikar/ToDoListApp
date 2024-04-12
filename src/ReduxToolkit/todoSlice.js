
import { createSlice } from '@reduxjs/toolkit';

// Function to load todos from local storage
const loadTodosFromLocalStorage = () => {
  try {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error('Error loading todos from local storage:', error);
    return [];
  }
};

const initialState = {
  todos: loadTodosFromLocalStorage(), // Load todos from local storage
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos)); // Update local storage
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos)); // Update local storage
    },
    toggleComplete: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem('todos', JSON.stringify(state.todos)); // Update local storage
      }
    },
    editTodo: (state, action) => {
      const { id, task } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        // todo.task = task;
        todo.task = task;
        todo.editCount += 1; // Increment edit count
        todo.isEditing = !todo.isEditing
        localStorage.setItem('todos', JSON.stringify(state.todos)); // Update local storage
      }
    },
  },
});

export const { addTodo, deleteTodo, toggleComplete, editTodo } = todosSlice.actions;

export default todosSlice.reducer;
