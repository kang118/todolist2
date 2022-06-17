import axios from "axios";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { iTodo } from "../Interfaces";
import { Button, TextField } from "@mui/material";
import { createSvgIcon } from '@mui/material/utils';
import { Typography } from "@mui/material";
import { Login } from "../Components/Login";

const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
    'Home',
  );

export const EditPg = () => {

    const [todo, setTodo] = useState<Array<iTodo>>([])
    const [newTodo, setNewTodo] = useState('')
    const { id } = useParams<string>()

    const instance = axios.create({
        baseURL: `http://localhost:3000/`
    })

    useEffect(()=> {
        console.log({id})
        instance.get(`/api/${id}`).then(res => {
          console.log(res.data)
          setTodo(res.data)
        })
      },[])

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setNewTodo(event.target.value)
        console.log(newTodo)
    }

    // const handleFormSubmit = () => {
    //     fetch(`/api/edit/${id}`, {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             id: id,
    //             content: newTodo
    //         }),
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8"
    //         }
    //     }).then(response => response.json())
    //     .then(message => {
    //         console.log(message)
    //         setNewTodo('')
    //         getLatestTodos()
    //     })
    // }

    const handleFormSubmit = async () => {
        console.log({id})
        if (newTodo == "") {
            console.log("Submit error")
        } else {
            let res = await instance.post(`/api/edit/${id}`, {id: id, content: newTodo})
            console.log(res)
            setNewTodo('')
            getLatestTodos()
        }
    }

    const getLatestTodos = () => {
        instance.get(`/api/${ id }`).then(res => {
            console.log(res.data)
            setTodo(res.data)
        })
    }

    // const getLatestTodos = () => {
    //     fetch(`/api/${ id }`).then(response => {
    //         if (response.ok) {
    //             return response.json()
    //         }
    //     }).then(data => setTodo(data))
    // }

    return(
        <>
            <div className="logstate">
                <Login/>
            </div>
            <Typography variant='h5' component='h3' align='center'>
                <br></br>
                {todo.length > 0 && todo.map(data => <div key='id'>{data.content}</div>)}
                <br></br>           
                {/* <div className='inputContainer'>
                    <input type="text" placeholder='Task..' name='task' value={newTodo} onChange={handleFormChange} />
                </div> */}
                <TextField required id="outlined-required" placeholder="Edit Task" value={newTodo} onChange={handleFormChange} />

                {/* <button onClick={handleFormSubmit}>Edit</button> */}
                <br></br>
                <br></br>
                <div>
                    <Button onClick={handleFormSubmit} variant="contained" color="success">Edit</Button>
                </div>
                <Link to='/'><HomeIcon /></Link>
            </Typography>
        </>
    )
}