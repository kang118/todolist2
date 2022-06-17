import { Container } from '@mui/system';
import React, {useState, ChangeEvent, useEffect} from 'react';
import { Card } from '../Components/card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import {Login} from '../Components/Login';
import { useForm } from 'react-hook-form';
import { addTodoAsync, fetchList } from '../Components/listSlice';
import { useAppDispatch, useAppSelector } from '../Components/hooks';


export const TodoPage = () => {
  const dispatch = useAppDispatch()

  const {register, handleSubmit, formState: {errors}, reset} = useForm();

  const[task, setTask] = useState<string>("")

  const currList:any = useAppSelector((state)=> state.list)
    
  useEffect(() => {

    dispatch(fetchList())

  }, [dispatch])

    
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    //if event calling change is from task input
    setTask(event.target.value)
  }

  // const onSubmit = () => {
  //   dispatch(
  //     addTodoAsync({
  //       task: task
  //     })
  //     )
  //   setTask('')
  // }
  const onSubmit = async (data: any) => {
    console.log(data)
    console.log(data.task1)
    dispatch(addTodoAsync({
      task:data.task1
    }))
    reset()
  }


	return (
		<>
      <div className="logstate">
        <Login/>
      </div>
      <div className ="header">
            <div className = "loginform3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Container maxWidth="sm">
                        <Typography variant='h2' component='h2' align='center'>
                            <br></br>
                            <TextField label="Task"
                            //name="task1"
                            // onChange={handleChange} 
                            // value={task} 
                            {...register("task1",{required:"Task is required."})}
                            error={Boolean(errors.task1)}
                            helperText={errors.task1?.message}
                            style={{
                            backgroundColor: "white"
                            }}/>
                            <br></br>
                            <Button type='submit' variant ="contained" color="primary">Add to List</Button>
                            
                        </Typography>
                        
                    </Container>
                </form>
            </div>
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