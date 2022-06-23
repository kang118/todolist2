import { Container } from '@mui/system';
import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { addTodoAsync, fetchList } from '../Slices/todoListSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledAddButton = styled(Button)`
background-color: blue;
&:hover {
  background-color: darkblue;
}
color: white;
height: 100%;
margin-left: 5px
`

const StyledGreyHeaderDiv = styled.div`
background-color: rgb(164, 168, 168);
height: 50px
`

const StyledInputDiv = styled.div`
align-items: center;
justify-content: center;
display: flex;
height: 150px
`

const StyledTableRow = styled(TableRow)`
&:hover {
  background-color: lightgrey;
}
`

const StyledTableCell = styled(TableCell)`
align: left
`

export const TodoPage = () => {

  const dispatch = useAppDispatch()
  const {register, handleSubmit, formState: {errors}, reset} = useForm();
  const navigate = useNavigate()
  const listOfTodos: any = useAppSelector((state)=> state.list.list)
  const loadState: any = useAppSelector((state)=> state.list.load)
    
  useEffect(() => {
    dispatch(fetchList())
  }, [dispatch])

  const handleFormSubmit = async (data: any) => {
    console.log(data.task)
    dispatch(addTodoAsync({
      task: data.task
    }))
    reset()
  }

  //function to navigate to individual task page to delete/edit task
  const handleLink = (id: any) => {
    navigate(`/${id}`)
  }

  if (!loadState) {
    console.log(loadState)
    return (
      <h1>LOADING...</h1>
    )
  }

	return (
		<>
      <StyledGreyHeaderDiv/>
      <Container maxWidth = "md">
        <StyledInputDiv>
          <form onSubmit = {handleSubmit(handleFormSubmit)}>
            <Grid container>
              <Grid item xs = {8}>
                <Typography variant = 'h3' align = 'center'>
                  <TextField label = "Enter your Task"
                  {...register("task",{required: "Task is required."})}
                  error = {Boolean(errors.task)}
                  helperText = {errors.task?.message}
                  />
                </Typography>
              </Grid>
              <Grid item xs = {4}>
                  <StyledAddButton type = 'submit'>Add Task</StyledAddButton>
              </Grid>
            </Grid>
          </form>
        </StyledInputDiv>

        <div className = "resultTable">
          <TableContainer component = {Paper}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell><strong>No.</strong></TableCell>
                  <StyledTableCell><strong>Task</strong></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOfTodos.map((row: any) => (
                  <StyledTableRow onClick = {() => handleLink(row.id)}
                    key = {row.id}
                  >
                    <TableCell component = "th" scope = "row">
                      {row.id}
                    </TableCell>
                    <StyledTableCell>{row.content}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </>
	);
};