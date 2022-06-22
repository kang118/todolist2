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


export const TodoPage = () => {

  const dispatch = useAppDispatch()
  const {register, handleSubmit, formState: {errors}, reset} = useForm();
  const navigate = useNavigate()
  const currList:any = useAppSelector((state)=> state.list)
    
  useEffect(() => {
    dispatch(fetchList())
    console.log(currList)
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

	return (
		<>
      <div className="top">
        <br></br>
        <br></br>
      </div>
      <br></br>
      <Container maxWidth="md">
        <div className ="header">
          <form onSubmit={handleSubmit(onSubmit)}>
            <br></br>
            <Grid container>
              <Grid item xs={8}>
                <Typography variant='h3' component='h2' align='center'>
                  <TextField label="Enter your Task"
                  {...register("task",{required:"Task is required."})}
                  error={Boolean(errors.task)}
                  helperText={errors.task?.message}
                  style={{
                  backgroundColor: "white"
                  }}/>
                </Typography>
              </Grid>
              <br></br>
              <Grid item xs={4}>
                <Typography variant='h3' component='h3' align='center'>
                  <Button type='submit' variant ="contained" color="primary">Add Task</Button>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </div>
        <br></br>
        <br></br>
        <div className="resultTable">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>No.</strong></TableCell>
                  <TableCell align="left"><strong>Task</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currList.map((row:any) => (
                  <TableRow onClick={()=>taskLink(row.id)}
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.content}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </>
	);
};