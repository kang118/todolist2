import React, {useState, ChangeEvent, useEffect} from 'react';
import { Card } from '../Components/card';
import { iTodo } from '../Interfaces';

export const TodoPage = () => {

  const[task, setTask] = useState<string>("")
  const[todoList, setTodoList] = useState<Array<iTodo>>([])

  useEffect(()=> {
    fetch('/api').then(response => {
      if(response.ok) {
        console.log(response)
        return response.json()
        //testing branch config
      }
    }).then(data => {
      console.log(data)
      setTodoList(data)})
  },[])

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    //if event calling change is from task input
    setTask(event.target.value)
  }

  const addTask = () => {
    fetch('/api/create', {
        method:'POST',
        body: JSON.stringify({
            content: task
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => response.json())
    .then(message => {
        console.log(message)
        setTask('')
        getLatestTasks()
    })
  }

  const getLatestTasks = () => {
    fetch('/api').then(response => {
        if (response.ok) {
            return response.json()
        }
    }).then(data => setTodoList(data))
  }

  return (
  <>
    <div className="header">
        <div className='inputContainer'>
          <input type="text" placeholder='Task..' name='task' value={task} onChange={handleChange} />
        </div>
        <button onClick={addTask}>Add to List</button>
    </div>
    <div className="todoList">
        <hr></hr>
        <Card listOfTodos={todoList}/>
    </div>
  </>
  );
}