import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createSvgIcon } from '@mui/material/utils';
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useForm } from "react-hook-form";
import { editTodoAsync, fetchTodo } from "../Slices/todoListSlice";
import CompleteDialog from "../Components/CompleteDialog";
import styled from "@emotion/styled"

const StyledEditButton = styled(Button)`
background-color: blue;
&:hover {
  background-color: darkblue;
}
color: white;
`

const StyledGreyHeaderDiv = styled.div`
background-color: rgb(164, 168, 168);
height: 50px
`

const StyledButtonGrid = styled(Grid)`
height: 100px;
`

const StyledInputGrid = styled(Grid)`
height: 50px;
`

const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
    'Home',
  );

export const IndivTask = () => {

    const { id } = useParams<string>()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const selectedTask: any = useAppSelector((state)=> state.list.selected)
    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    useEffect(()=> {
        dispatch(fetchTodo({id: id}))
    }, [])

    const handleFormSubmit = async(data: any) =>{
        //call api to edit current task data
        dispatch(editTodoAsync({
            id: id,
            edit: data.editTask
        }))
        reset() //reset textfield
    }

    const handleReturnHome = () => {
        navigate(`/`)
    }

    //check for whether state has been loaded
    if (!selectedTask) {
        return (<h1>LOADING...</h1>)
    }

    return(
        <div>
            <form onSubmit = {handleSubmit(handleFormSubmit)}>
                <StyledGreyHeaderDiv/>
                <Container maxWidth = "xl">
                    <StyledButtonGrid container alignItems = "center">
                        <Grid item xs = {1}>
                            <IconButton onClick={handleReturnHome}><HomeIcon /></IconButton>
                        </Grid>
                        <Grid item xs = {9}>
                        </Grid>
                        <Grid item xs = {1}>
                            <CompleteDialog/>
                        </Grid>
                        <Grid item xs = {1}>
                            <StyledEditButton type ='submit'>Edit</StyledEditButton>
                        </Grid>
                    </StyledButtonGrid>
                </Container>
                
                <Container>
                    <StyledInputGrid container alignItems ="flex-end">
                        <Grid item xs = {4}>
                            <Typography variant = "subtitle1" align = 'center'>
                                <strong>
                                    Task:
                                </strong>
                            </Typography>
                        </Grid>
                        <Grid item xs = {8}>
                            <Typography variant = "subtitle1" align = 'left'>
                                    <TextField
                                    variant = "standard"
                                    label = {selectedTask}
                                    {...register("editTask",{required: "Cannot be null"})}
                                    error = {Boolean(errors.editTask)}
                                    helperText = {errors.editTask?.message}/>
                            </Typography>
                        </Grid>
                    </StyledInputGrid>
                </Container>
            </form>
        </div>
    )
}