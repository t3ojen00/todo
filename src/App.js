import './App.css';
import { useState } from 'react';

function App() {

  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const addTask =() =>{
    setTasks([...tasks, task])
    setTask('')
  }
  const deleteTask=(deleted) =>{
    const withoutRemoved = tasks.filter((item)=> item !==deleted)
    setTasks(withoutRemoved)
  }

  return (
<div id="container">
<h1>Todos</h1>

<form>
  <input
  placeholder='add new task'
  value={task}
  onChange={e => setTask(e.target.value)}
  onKeyDown={e =>{
    if (e.key === 'Enter'){
      e.preventDefault()
      addTask()
    }
  }}>
  
  </input>
</form>
<ul>
  {
    tasks.map(item=>(
      <li>{item}
      <button className='delete-button' onClick={()=> deleteTask(item)}>Delete</button>
      </li>
    ))
  }
</ul>
</div>
  );
}

export default App;
