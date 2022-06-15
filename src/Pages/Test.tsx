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
import { useDispatch } from 'react-redux';
import { addTodoAsync, fetchList } from '../Components/listSlice';
import { AppDispatch, useAppDispatch, useAppSelector } from '..';
import { useSelector } from 'react-redux';


const Test = () => {

      const dispatch = useAppDispatch()
    
    
      const[task, setTask] = useState<string>("")
      const[todoList, setTodoList] = useState<Array<iTodo>>([])
    
    //   useEffect(()=> {
    //     instance.get('/api').then(res => {
    //       console.log(res.data)
    //       setTodoList(res.data)
    //     })
    //   },[])
    useEffect(() => {
        dispatch(fetchList())
    }, [])

    const currList = useAppSelector((state)=> state.list)
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        //if event calling change is from task input
        setTask(event.target.value)
    }

    const onSubmit = () => {
        if (task) {
            dispatch(
                addTodoAsync({
                    task: task
                })
            )
        }
    }
    
    //   const addTask = async () => {
    //     if (task == "") {
    //       console.log("submit fail")
    //       alert("Please enter task")
    //     } else {
    //       let res = await instance.post('/api/create', {content: task})
    //       console.log(res)
    //       setTask('')
    //       getLatestTasks()
    //     }
    //   }
    
    //   const getLatestTasks = () => {
    //     instance.get('/api').then(res => {
    //       console.log(res.data)
    //       console.log(typeof(res.data))
    //       setTodoList(res.data)
    //     })
    //   }
    
      const {register, handleSubmit, formState: {errors}, control, watch} = useForm();
    
      const [, updateState] = React.useState<any>()
    
      const forceUpdate = React.useCallback(() => updateState({}),[])
    
    
    //   const onSubmit2 = async (data: any) => {

    //     console.log(data)
    //     console.log(data.task1)
    //     setTask(data.task1)
    //     console.log('adding task')
   
    //     addTask()
    
    //   }
    

	return (
		<>
            
            <div className = "loginform3">
                {/* <form> */}
                <form onSubmit={handleSubmit(onSubmit)}>
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

           
            <div className="todoList">
                <br></br>
                <Typography variant='h6' component='h3' align='center'>
                <Card listOfTodos={currList}/>  
                </Typography>
            </div>
        </>
	);
};

export default Test;
