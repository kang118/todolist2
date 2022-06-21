import React, { useState, useEffect } from "react";
import { Delete } from "../Components/delete";
import { useParams, Link } from "react-router-dom";
import { Edit } from "../Components/edit";
import { iTodo } from "../Interfaces";
import axios from "axios";
import { createSvgIcon } from '@mui/material/utils';
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Login } from "../Components/Login";
import { useAppDispatch, useAppSelector } from "../Components/hooks";
import { registerStyles } from "@emotion/utils";
import { useForm } from "react-hook-form";
import { editTodoAsync } from "../Components/listSlice";
import CompleteDialog from "../Components/CompleteDialog";

const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
    'Home',
  );

export const Show = () => {

    const { id } = useParams<string>()
    const [todo, setTodo] = useState<Array<iTodo>>([])
    const [task, setTask] = useState<string>("")


    const dispatch = useAppDispatch()
    const curr:any = useAppSelector((state)=> state.list)
    const {register, handleSubmit, formState: {errors}, reset} = useForm();



    const instance = axios.create({
        baseURL: `http://localhost:3000/`
    })
    
    useEffect(()=> {
        console.log({id})
        console.log(curr)
        instance.get(`/api/${ id }`).then(res => {
            console.log(res.data)
            console.log(res.data.map((data: { content: any; })=> data.content))
            console.log(typeof(res.data.map((data: { content: any; })=> data.content)))

            setTodo(res.data)
            setTask(res.data.map((data: { content: any; })=> data.content))
            console.log(task)
        })
    }, [id])

    const onSubmit = async(data:any) =>{
        console.log(data)
        dispatch(editTodoAsync({
            id:id,
            edit:data.editTask
        }))
        setTask(data.editTask)
        reset()
    }

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="top">
                    <br></br>
                    <br></br>
                </div>
                <br></br>
                <br></br>
                <Container maxWidth="md">
                    <Grid container alignItems="center">
                        <Grid item xs={8.9}>
                        </Grid>
                        <Grid item xs={1.5}>
                            <CompleteDialog/>
                        </Grid>
                        <Grid item xs={1.1}>
                            <Button type='submit' variant ="contained" color="primary">Edit</Button>
                        </Grid>
                        <Grid item xs={0.5}>
                            <Link to='/'><HomeIcon /></Link>
                        </Grid>
                    </Grid>
                </Container>
                
                <Container>
                    <br></br>
                    <Grid container alignItems="flex-end">
                        <Grid item xs={4}>
                            <Typography variant="subtitle1" component='h5' align='center'>
                                <strong>
                                    Task:
                                </strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="subtitle1" component='h5' align='left'>
                                {/* <div className="todo">
                                    {todo.length > 0 && todo.map(data => <div className='id' key='id'>{data.content}</div>)}
                                </div> */}
                                <div className="todo1">
                                        <TextField
                                        variant="standard"
                                        label={task}
                                        {...register("editTask",{required:"Cannot be null"})}
                                        error={Boolean(errors.editTask)}
                                        helperText={errors.editTask?.message}/>
                                </div>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </form>
            
        </div>
    )
}