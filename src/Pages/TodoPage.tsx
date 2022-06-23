import { Container } from '@mui/system';
import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { addTodoAsync, fetchList } from '../Components/listSlice';
import { useAppDispatch, useAppSelector } from '../Components/hooks';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledButton1 = styled(Button)`
background-color:blue;
&:hover {
  background-color:darkblue;
}
color:white;
height:100%;
margin-left: 5px
`

const StyledDiv = styled.div`
background-color: rgb(164, 168, 168);
height:50px
`

const StyledDiv2 = styled.div`
align-items:center;
justify-content: center;
display:flex;
height: 150px
`

const StyledTableRow = styled(TableRow)`
&:hover {
  background-color:lightgrey;
}
`

const StyledTableCell = styled(TableCell)`
align:left
`

export const TodoPage = () => {

  const dispatch = useAppDispatch()
  const {register, handleSubmit, formState: {errors}, reset} = useForm();
  const navigate = useNavigate()
  const currList:any = useAppSelector((state)=> state.list.list)
  const currState:any = useAppSelector((state)=> state.list.load)
    
  useEffect(() => {
    dispatch(fetchList())
  }, [dispatch])

  const onSubmit = async (data: any) => {
    console.log(data.task)
    dispatch(addTodoAsync({
      task:data.task
    }))
    reset()
  }

  //function to navigate to individual task page to delete/edit task
  const taskLink = (id: any) => {
    navigate(`/${id}`)
  }

  if (!currState) {
    console.log(currState)
    return (
      <h1>LOADING...</h1>
    )
  }

	return (
		<>
      <StyledDiv></StyledDiv>
      <Container maxWidth="md">
        <StyledDiv2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid item xs={8}>
                <Typography variant='h3' component='h2' align='center'>
                  <TextField label="Enter your Task"
                  {...register("task",{required:"Task is required."})}
                  error={Boolean(errors.task)}
                  helperText={errors.task?.message}
                  />
                </Typography>
              </Grid>
              <Grid item xs={4}>
                  <StyledButton1 type='submit'>Add Task</StyledButton1>
              </Grid>
            </Grid>
          </form>
        </StyledDiv2>

        <div className="resultTable">
          <TableContainer component={Paper}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell><strong>No.</strong></TableCell>
                  <StyledTableCell><strong>Task</strong></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currList.map((row:any) => (
                  <StyledTableRow onClick={()=>taskLink(row.id)}
                    key={row.id}
                  >
                    <TableCell component="th" scope="row">
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