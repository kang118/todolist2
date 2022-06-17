import React, { useState, useEffect } from "react";
import { Delete } from "../Components/delete";
import { useParams, Link } from "react-router-dom";
import { Edit } from "../Components/edit";
import { iTodo } from "../Interfaces";
import axios from "axios";
import { createSvgIcon } from '@mui/material/utils';
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Login } from "../Components/Login";
import { useAppDispatch } from "../Components/hooks";

const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
    'Home',
  );

export const Show = () => {

    const { id } = useParams<string>()
    const [todo, setTodo] = useState<Array<iTodo>>([])

    const dispatch = useAppDispatch()


    const instance = axios.create({
        baseURL: `http://localhost:3000/`
    })
    
    useEffect(()=> {
        console.log({id})
        instance.get(`/api/${ id }`).then(res => {
            console.log(res.data)
            setTodo(res.data)
        })
    }, [id])

    return(
        <div>
            <div className="logstate">
                <Login/>
            </div>
            <br></br>
            <Container>
                <Typography variant="h5" component='h2' align='center'>
                    <div className="todo">
                        <br></br>
                        {todo.length > 0 && todo.map(data => <div className='id' key='id'>{data.content}</div>)}
                    </div>
                    
                <br></br>
                <Delete id={id!}/>
                <Edit id={id!}/>
                <hr></hr>
                
                <Link to='/'><HomeIcon /></Link>
                </Typography>
            </Container>
            
        </div>
    )
}