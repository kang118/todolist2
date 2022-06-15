import { Container } from '@mui/system';
import axios from 'axios';
import React, {useState, ChangeEvent, useEffect} from 'react';
import { Card } from '../Components/card';
import { iTodo } from '../Interfaces';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import {Login} from '../Components/Login';
import { appendErrors, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'; 
import { useDispatch } from 'react-redux';
import { addTodo } from '../Components/todoAPI';

export const TodoPage = () => {

  const instance = axios.create({
    baseURL: `http://localhost:3000/`
  })


  const[task, setTask] = useState<string>("")
  const[todoList, setTodoList] = useState<Array<iTodo>>([])

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
      console.log("submit fail")
      alert("Please enter task")
    } else {
      let res = await instance.post('/api/create', {content: task})
      console.log(res)
      setTask('')
      getLatestTasks()
    }
  }

  const getLatestTasks = () => {
    instance.get('/api').then(res => {
      console.log(res.data)
      console.log(typeof(res.data))
      setTodoList(res.data)
    })
  }

  const {register, handleSubmit, formState: {errors}, control, watch} = useForm();

  const [, updateState] = React.useState<any>()

  const forceUpdate = React.useCallback(() => updateState({}),[])


  const onSubmit2 = async (data: any) => {
    //e.preventDefault()
    console.log(data)
    console.log(data.task1)
    setTask(data.task1)
    console.log('adding task')
    //useEffect(()=> {addTask()}, task)
    //forceUpdate()
    addTask()
    // forceUpdate()
    // console.log(task)
    // console.log("setting task")
    // console.log("task set!")
    // console.log(task)
    // console.log("task is ", task)
    // let res = await instance.post('/api/create', {content:task})
    // console.log(res)
    // getLatestTasks()
  }

  // console.log('watch task', watch('task'))
  
  return (
  <>
    {/* <div className = "loginform3">
      <form onSubmit={handleSubmit(onSubmit2)}>
        <Controller name="task" control={control} defaultValue="" render={({ field}) => (
          <Container maxWidth="sm">
            <Typography variant='h2' component='h2' align='center'>
              <br></br>
              <TextField required label="Task" onChange={handleChange} value={task}
              style={{
                backgroundColor: "white"
              }}/>
              <input type="submit"/>
              <br></br>
              <Button onClick={handleSubmit(onSubmit2)} className="submit-button" variant ="contained" color="primary">Add to List</Button>
              
            </Typography>
            
          </Container>
        )}/>
      </form>
    </div> */}
    <div className = "loginform3">
      <form onSubmit={handleSubmit(onSubmit2)}>
        <Container maxWidth="sm">
          <Typography variant='h2' component='h2' align='center'>
            <br></br>
            <TextField label="Task"
            //name="task1"
            onChange={handleChange} 
            value={task} 
            //{...register("task1",{required:"Task is required."})}
            error={Boolean(errors.task)}
            helperText={errors.task?.message}
            style={{
              backgroundColor: "white"
            }}/>
            <input type="submit"/>
            <br></br>
            <Button type='submit' variant ="contained" color="primary">Add to List</Button>
              
          </Typography>
            
        </Container>
      </form>
    </div>

    {/* <div className="logstate">
      <Login/>
    </div>
    <div className="header">
      <Container maxWidth="sm">
        <Typography variant='h2' component='h2' align='center'>
            {/* <div className='inputContainer'>
            <input type="text" placeholder='Task..' name='task' value={task} onChange={handleChange} />
            </div> */}
          {/* <br></br>
          <TextField required id="filled-required" placeholder="Task.." value={task} onChange={handleChange} 
          style={{
            backgroundColor: "white"
          }}/>
          {/* <button onClick={addTask}>Add to List</button> */}
          {/* <br></br>
          <Button onClick={addTask} variant ="contained" color="primary">Add to List</Button>
        </Typography>
      </Container>
    </div> */}
    <div className="todoList">
        <br></br>
        <Typography variant='h6' component='h3' align='center'>
          <Card listOfTodos={todoList}/>  
        </Typography>
    </div>
  </>
  );
}

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