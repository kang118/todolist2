import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { createSvgIcon } from '@mui/material/utils';
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../Components/hooks";
import { useForm } from "react-hook-form";
import { editTodoAsync, fetchList, fetchTodo } from "../Components/listSlice";
import CompleteDialog from "../Components/CompleteDialog";

const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
    'Home',
  );

export const Show = () => {

    const { id } = useParams<string>()
    const [task, setTask] = useState<string>("")

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const curr:any = useAppSelector((state)=> state.list.list)
    const currSelect:any = useAppSelector((state)=> state.list.selected)
    const currState:any = useAppSelector((state)=> state.list.load)

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const instance = axios.create({
        baseURL: `http://localhost:3000/`
    })
    
    //when trying to call using createAsyncThunk, encounter an error on refresh due to data not loading in time
    useEffect(()=> {
        dispatch(fetchTodo({id:id}))
        console.log("in useeffect curr")
        console.log(curr)
        console.log(currSelect)
        // console.log(currSelect[0].content)
        console.log(currState)
        if (currSelect) {
            console.log("in current select")
            console.log(currSelect)
            // setTask(currSelect[0].content)
        } 
        setTask(currSelect)
        // if (curr != "") {
        //     setTask(curr[0].content)
        // } else {
        //     //curr is not fetched yet
            
        // }
        // console.log(curr[0].content)
        // setTask(curr[0].content)
        // setTask(curr)
    }, [])

    // useEffect(()=> {
    //     instance.get(`/api/${ id }`).then(res => {
    //         //res.data is an object containing the task
    //         //display task content and set using useState
    //         setTask(res.data.map((data: { content: any; })=> data.content))
    //         console.log(task)
    //     })
    // }, [])

    const onSubmit = async(data:any) =>{
        console.log(data)
        //call api to edit current task data
        dispatch(editTodoAsync({
            id:id,
            edit:data.editTask
        }))
        //update value displayed
        setTask(data.editTask)
        reset() //reset textfield
    }

    const goHome = () => {
        console.log("trying to go home")
        dispatch(fetchList())
        navigate(`/`)
    }

    if (!currSelect) {
        return (<h1>LOADING</h1>)
    } else if (currSelect === null) {
        return (<h1>no data</h1>)
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
                            <IconButton onClick={goHome}><HomeIcon /></IconButton>
                        </Grid>
                    </Grid>
                </Container>
                
                <Container>
                    <br></br>
                    <Grid container alignItems="flex-end">
                        <Grid item xs={4}>
                            <Typography variant="subtitle1" align='center'>
                                <strong>
                                    Task:
                                </strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="subtitle1" align='left'>
                                    <TextField
                                    variant="standard"
                                    label={currSelect}
                                    {...register("editTask",{required:"Cannot be null"})}
                                    error={Boolean(errors.editTask)}
                                    helperText={errors.editTask?.message}/>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </div>
    )
}