import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createSvgIcon } from '@mui/material/utils';
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../Components/hooks";
import { useForm } from "react-hook-form";
import { editTodoAsync, fetchTodo } from "../Components/listSlice";
import CompleteDialog from "../Components/CompleteDialog";
import styled from "@emotion/styled"

const StyledButton1 = styled(Button)`
background-color:blue;
&:hover {
  background-color:darkblue;
}
color:white;
`

const StyledDiv = styled.div`
background-color: rgb(164, 168, 168);
height:50px
`

const StyledGrid = styled(Grid)`
height:100px;
`

const StyledGrid2 = styled(Grid)`
height:50px;
`

const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
    'Home',
  );

export const IndivTask = () => {

    const { id } = useParams<string>()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const currSelect:any = useAppSelector((state)=> state.list.selected)
    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    useEffect(()=> {
        dispatch(fetchTodo({id:id}))
    }, [])

    const onSubmit = async(data:any) =>{
        console.log(data)
        //call api to edit current task data
        dispatch(editTodoAsync({
            id:id,
            edit:data.editTask
        }))
        reset() //reset textfield
    }

    const goHome = () => {
        navigate(`/`)
    }

    //check for whether state has been loaded
    if (!currSelect) {
        return (<h1>LOADING...</h1>)
    }

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <StyledDiv></StyledDiv>
                <Container maxWidth="xl">
                    <StyledGrid container alignItems="center">
                        <Grid item xs={1}>
                            <IconButton onClick={goHome}><HomeIcon /></IconButton>
                        </Grid>
                        <Grid item xs={9}>
                        </Grid>
                        <Grid item xs={1}>
                            <CompleteDialog/>
                        </Grid>
                        <Grid item xs={1}>
                            <StyledButton1 type='submit'>Edit</StyledButton1>
                        </Grid>
                    </StyledGrid>
                </Container>
                
                <Container>
                    <StyledGrid2 container alignItems="flex-end">
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
                    </StyledGrid2>
                </Container>
            </form>
        </div>
    )
}