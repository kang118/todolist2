import { Box } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React, {useState, ChangeEvent, useEffect} from 'react';
import { Card } from '../Components/card';
import { iTodo } from '../Interfaces';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import {Login} from '../Components/Login';

export const TodoPage = () => {

  const instance = axios.create({
    baseURL: `http://localhost:3000/`
  })

  const[task, setTask] = useState<string>("")
  const[todoList, setTodoList] = useState<Array<iTodo>>([])

  // useEffect(()=> {
  //   fetch('/api').then(response => {
  //     if(response.ok) {
  //       console.log(response)
  //       return response.json()
  //       //testing branch config
  //     }
  //   }).then(data => {
  //     console.log(data)
  //     setTodoList(data)})
  // },[])
  useEffect(()=> {
    instance.get('/api').then(res => {
      console.log(res.data)
      setTodoList(res.data)
    })
  },[])

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    //if event calling change is from task input
    setTask(event.target.value)
  }

  const addTask = async () => {
    if (task == "") {
      // to make sure task is not empty
      console.log("submit fail")
    } else {
      let res = await instance.post('/api/create', {content: task})
      console.log(res)
      setTask('')
      getLatestTasks()
    }
  }

  // const addTask = () => {
  //   fetch('/api/create', {
  //       method:'POST',
  //       body: JSON.stringify({
  //           content: task
  //       }),
  //       headers: {
  //           "Content-type": "application/json; charset=UTF-8"
  //       }
  //   }).then(response => response.json())
  //   .then(message => {
  //       console.log(message)
  //       setTask('')
  //       getLatestTasks()
  //   })
  // }

  // const getLatestTasks = () => {
  //   fetch('/api').then(response => {
  //       if (response.ok) {
  //           return response.json()
  //       }
  //   }).then(data => setTodoList(data))
  // }

  const getLatestTasks = () => {
    instance.get('/api').then(res => {
      console.log(res.data)
      setTodoList(res.data)
    })
  }

  return (
  <>
    <div className="logstate">
      <Login/>
    </div>
    <div className="header">
      <Container maxWidth="sm">
        <Typography variant='h2' component='h2' align='center'>
            {/* <div className='inputContainer'>
            <input type="text" placeholder='Task..' name='task' value={task} onChange={handleChange} />
            </div> */}
          <br></br>
          <TextField required id="filled-required" placeholder="Task.." value={task} onChange={handleChange} 
          style={{
            backgroundColor: "white"
          }}/>
          {/* <button onClick={addTask}>Add to List</button> */}
          <br></br>
          <Button onClick={addTask} variant ="contained" color="primary">Add to List</Button>
        </Typography>
      </Container>
    </div>
    <div className="todoList">
        <br></br>
        <Typography variant='h6' component='h3' align='center'>
          <Card listOfTodos={todoList}/>  
        </Typography>
    </div>
  </>
  );
}