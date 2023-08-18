// import './App.css';
// import { useState, useRef } from 'react';
// function App() {
//   // ? ... : ... - This is a conditional (ternary) operator. If the condition before the ? is true,
//   // it executes the expression after the ?, otherwise, it executes the expression after the :.
//   let localData = localStorage.getItem('lists') ? JSON.parse(localStorage.getItem('lists')) : []
//   let [list, setlist] = useState(localData);
//   // let [newTask, setNewTask] = useState("")
//   let newTask = useRef("")
//   let [serach , updateSearch] = useState("");
// console.log(list)
 

// // Adding the task to the list 
// function addTask() {
//   const updatedList = [...list, newTask.current.value];
//   localStorage.setItem('lists', JSON.stringify(updatedList)); // Store updatedList in local storage
//   setlist(updatedList);
//   newTask.current.value = ""; // Clear the input field
// }

//   // Updating or Editing the list
//   function updateTask(e, i){
//     const update = [...list]
//     update.splice(i,1,e.target.value) // i = at where change should happena and 1 means no element should change
//     setlist(update)
//     localStorage.setItem('lists', JSON.stringify(update))
//     // localStorage.getItem('u')

//   }

//   // Deleting the task
//   function deleteTask(i){
//     // we can direcltyle acesses the list still we are creating the copy of it
//     const deletes = [...list]
//     deletes.splice(i,1)
//     setlist(deletes)
//       localStorage.setItem('lists', JSON.stringify(deletes))
//   }
//   const handleKeyDown = (e) => {
//     console.log(e.keyCode)
//     if (e.key === 'Enter') {
//       addTask(); // Call addTask when Enter key is pressed
//     }
//   };
  

// return (
//   <>
//   <div className='search'>
//   <input  type='text' onChange={(e) => updateSearch(e.target.value)} placeholder='search 🔍'/>
// </div>
//   <div className="App">
//     <h1 className="heading"> To Do List App 👀 </h1>
//     <div className='inputs'> 
//     <input type='text'  ref={newTask} onKeyDown={handleKeyDown }/> 
//     <button className='btn' onClick={addTask}  >Add Task 👍 </button>
//     </div>
//     <div className='container'> 

//     {
//     list.map((val,i)=> {
//       if(val.toLowerCase().includes(serach.toLowerCase())){
// return(
// <div className='list' key={i}> 
// <input type='text' value={val}  onChange={(e) =>{updateTask(e,i)}} />
// <span className='icon' onClick={(e )=> {deleteTask(i)}}>❌ </span> 
//  </div>
// ) }
// }) 
// }
//     </div>
//   </div>
// </>

// );


// }

// export default App;
// // let  [list , setlist] = useState([])
// // const newinp = (e) =>{
// //   // console.log(e)
// //   // setNewTask(e.target.value)
// //   // Both of the code will work the same 
// //   newTask = e.target.value;
// // }
// // here manily we have used the useSatate not useRef as we need to render the search constantly to get the appropiate search result
// //   function filterlist (val){
// //     return val.toLowerCase().includes(serach.toLowerCase())
// //   }
// //   return (
// //     <>
// //     <div className='search'>
// //     <input  type='text' onChange={(e) => updateSearch(e.target.value)} placeholder='search 🔍'/>
// //   </div>
// //     <div className="App">
// //       <h1 className="heading"> To Do List App 👀 </h1>
// //       <div className='inputs'> 
// //       <input type='text'  ref={newTask} onKeyDown={handleKeyDown }/> 
// //       <button className='btn' onClick={addTask}  >Add Task 👍 </button>
// //       </div>
// //       <div className='container'> 

// //       {
// //       list.filter(filterlist).map((val,i)=> {
// // return(
// // <div className='list' key={i}> 
// //   <input type='text' value={val}  onChange={(e) =>{updateTask(e,i)}} />
// //   <span className='icon' onClick={(e )=> {deleteTask(i)}}>❌ </span> 
// //    </div>
// // )
// // })
// // }
// //       </div>
// //     </div>
// // </>

// //  );


// // }
// // }




// updated code
import './App.css';
import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [list, setList] = useState([]);
  const newTask = useRef('');
  const [search, setSearch] = useState('');
  const [priorityOptions, setPriorityOptions] = useState(['High', 'Medium', 'Low']);
  const [categoryOptions, setCategoryOptions] = useState(['Work', 'Personal', 'Shopping']);
  
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('lists')) || [];
    setList(localData);
  }, []);

  function updateLocalStorage(updatedList) {
    localStorage.setItem('lists', JSON.stringify(updatedList));
  }

  function addTask() {
    const taskName = newTask.current.value;
    if (taskName) {
      const newTaskItem = {
        name: taskName,
        description: '',
        priority: '',
        dueDate: '',
        category: '',
        completed: false,
      };

      let insertIndex = list.length;

      for (let i = 0; i < list.length; i++) {
        if (
          list[i].priority === 'low' ||
          (list[i].priority === 'medium' && newTaskItem.priority === 'high') ||
          (list[i].priority === 'low' && newTaskItem.priority === 'medium')
        ) {
          insertIndex = i;
          break;
        }
      }

      // Insert the new task at the determined index
      const updatedList = [...list];
      updatedList.splice(insertIndex, 0, newTaskItem);

      setList(updatedList);
      updateLocalStorage(updatedList);

      newTask.current.value = '';
    }
  }
  
  function updateTask(e, i) {
    const updatedList = [...list];
    updatedList[i].name = e.target.value;
    setList(updatedList);
    updateLocalStorage(updatedList);
  }

  function toggleComplete(i) {
    const updatedList = [...list];
    updatedList[i].completed = !updatedList[i].completed;
    setList(updatedList);
    updateLocalStorage(updatedList);
  }

  function deleteTask(i) {
    const updatedList = list.filter((_, index) => index !== i);
    setList(updatedList);
    updateLocalStorage(updatedList);
  }

  function setPriority(i, priority) {
    const updatedList = [...list];
    updatedList[i].priority = priority;

    // Custom sorting function based on priority (high > medium > low)
    updatedList.sort((a, b) => {
      const priorityOrder = ['Low', 'Medium', 'High'];
      return priorityOrder.indexOf(b.priority) - priorityOrder.indexOf(a.priority);
    });

    setList(updatedList);
    updateLocalStorage(updatedList);
  }
  
  // function setDescription(i, description) {
  //   const updatedList = [...list];
  //   updatedList[i].description = description;
  //   setList(updatedList);
  //   updateLocalStorage(updatedList);
  // }

  function setDueDate(i, dueDate) {
    const updatedList = [...list];
    updatedList[i].dueDate = dueDate;
    setList(updatedList);
    updateLocalStorage(updatedList);
  }

  function setCategory(i, category) {
    const updatedList = [...list];
    updatedList[i].category = category;
    setList(updatedList);
    updateLocalStorage(updatedList);
  }

  function markAllCompleted() {
    const updatedList = list.map((task) => {
      return { ...task, completed: true };
    });
    setList(updatedList);
    updateLocalStorage(updatedList);
  }

  return (
    <>
      <div className='search'>
        <input type='text' onChange={(e) => setSearch(e.target.value)} placeholder='Search 🔍' />
      </div>
      <div className='App'>
        <h1 className='heading'>To Do List App 👀</h1>
        <div className='inputs'>
          <input type='text' ref={newTask} onKeyDown={(e) => e.key === 'Enter' && addTask()} />
          <button className='btn' onClick={addTask}>
            Add Task 👍
          </button>
          <button className='btn MarkallCompleted' onClick={markAllCompleted} >
            Mark All Completed
          </button>
        </div>
        <div className='container'>
          {list.map((val, i) => {
            if (val.name && val.name.toLowerCase().includes(search.toLowerCase())) {
              return (
                <div className={`list ${val.completed ? 'completed' : ''}`} key={i}>
                  <input type='text' value={val.name} onChange={(e) => updateTask(e, i)} />
                  {/* // priority */}
                  <select
                    value={val.priority}
                    onChange={(e) => setPriority(i, e.target.value)}
                  >
                    <option value='' disabled>
                      Priority
                    </option>
                    {priorityOptions.map((priority, index) => (
                      <option key={index} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                  {/* date */}
                  <input
                    type='date'
                    value={val.dueDate || ''}
                    onChange={(e) => setDueDate(i, e.target.value)}
                    id='date'
                    // placeholder='Due'
/>
                  <select
                    value={val.category}
                    onChange={(e) => setCategory(i, e.target.value)}
                  >
                    <option value='' disabled>
                      Category
                    </option>
                    {categoryOptions.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                
                  <span className='icon' onClick={() => toggleComplete(i)}>
                    {val.completed ? '✔️' : '✅'}
                  </span>
                  <span className='icon' onClick={() => deleteTask(i)}>
                    ❌
                  </span>
                </div>
                
              );
            }
            return null;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
