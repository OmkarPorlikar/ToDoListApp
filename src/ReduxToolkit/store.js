// // src/app/store.js

// import { configureStore } from '@reduxjs/toolkit';
// import todosReducer from '../ReduxToolkit/todoSlice.js';

// export default configureStore({
//   reducer: {
//     todos: todosReducer,
//   },
// });


import { configureStore , getDefaultMiddleware} from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import todosReducer from './todoSlice.js';

const store = configureStore({
reducer:{
    todos:todosReducer
},
})

export default store;