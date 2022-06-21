import React from 'react';
import { Link } from 'react-router-dom';
import { iTodo } from '../Interfaces';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import Container from '@mui/material/Container';
import { useAppSelector } from './hooks';


interface Props {
    listOfTodos: Array<iTodo>
}

export const Card = ({listOfTodos}:Props) => {
    const curr:any = useAppSelector((state)=> state.list)

    return (
    <>
        <Stack divider={<Divider orientation="horizontal" flexItem/>} spacing={2}>
            {listOfTodos.map((todo, index) => {
                return(
                    <ul key={index}>
                        <Container>
                            <Link to={`${todo.id}`}>
                                <Paper variant="outlined" sx={{
                                    backgroundColor:"#ef9a9a"
                                }}>
                                    {todo.id}
                                    <br></br>
                                    {todo.content}
                                </Paper>
                            </Link>
                        </Container>
                    </ul>
                )
            })}
        </Stack>
        
    </>
    )
}