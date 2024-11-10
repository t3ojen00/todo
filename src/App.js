import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Row from './components/Row';

const url = 'http://localhost:3001'

function App() {

  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  // axios added
  useEffect(() => {
    axios.get(url)
    .then(response => {
      setTasks(response.data)
    }).catch(error=> {
      alert(error.response.data.error ? error.response.data.error : error)
    })
  }, [])


  //add task updated to reach backend
  const addTask =() =>{
    axios.post(url+'/create',{
      description: task
    })
    .then(response =>{
      setTasks([...tasks,{id: response.data.id,description: task}])
      setTask('')
    }).catch(error => {
      alert(error.response.data.error ? error.response.data.error : error)
    })
  }

  //delete task updated to reach backend
  const deleteTask= (id) => {
    axios.delete(url + '/delete/' + id)
      .then(response => {
        const withoutRemoved = tasks.filter((item) => item.id !== id)
        setTasks(withoutRemoved)
      }).catch(error =>{
        alert(error.response.data.error ? error.response.data.error : error)
      })
  }


  //app updated
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
    tasks.map(item => (
      <Row key={item.id} item={item} deleteTask={deleteTask}/>
    ))
  }
</ul>
</div>
  );
}

export default App;
