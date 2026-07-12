
import { useEffect, useState } from 'react';
import { getTodos, createTodo, deleteTodo,  updateTodo } from '../api/todoApi';
import './App.css'

function App() {
  let [todolist, setTodolist] = useState([]);

  useEffect(() => {
  fetchTodos();
}, []);

const fetchTodos = async () => {
  try {
    const response = await getTodos();
    setTodolist(response.data);
  } catch (error) {
    console.log(error);
  }
};
  


  let saveToDoList = async (event) => {
    event.preventDefault();
    let toname = event.target.toname.value.trim();
    if(toname === "") return;
    const exists = todolist.some(
  todo => todo.title.trim().toLowerCase() === toname.toLowerCase()
);

if (!exists) {
      await createTodo({
  title: toname,
});

await fetchTodos();

event.target.toname.value = "";
    }
    else{
      alert("ToDo name already exists...");
    }
      event.preventDefault();
    }

    const handleDeleteTodo = async (id) => {
  try {
    await deleteTodo(id);
    await fetchTodos();
  } catch (error) {
    console.log(error);
  }
};

  const handleToggleComplete = async (todo) => {
  try {
    await updateTodo(todo._id, {
      title: todo.title,
      completed: !todo.completed,
    });

    await fetchTodos();
  } catch (error) {
    console.log(error);
  }
};

    let list = todolist.map((todo) => {
      return (
        <ToDoListItem
  value={todo}
  key={todo._id}
  onDelete={handleDeleteTodo}
  onToggle={handleToggleComplete}
/>
      )
    })


  return (
   <div className="App">
    
    <h1>ToDo List</h1>
    <form onSubmit={saveToDoList}>
      <input type='text' name='toname'/> <button>Save</button>
    </form>
  <div className="outerDiv">
    <ul>
      {list}
    </ul>
  </div>
   </div>
  )
}

export default App


function ToDoListItem({ value, onDelete, onToggle }){

 const deleteRow = async (e) => {
  e.stopPropagation();

  await onDelete(value._id);
};


  return(
    <li
  className={value.completed ? "completetodo" : ""}
  onClick={() => onToggle(value)}
> {value.title} <span onClick={deleteRow}>&times;</span></li>
  );
}