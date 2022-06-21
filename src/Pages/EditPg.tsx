import axios from "axios";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { iTodo } from "../Interfaces";
import { Button, TextField } from "@mui/material";
import { createSvgIcon } from '@mui/material/utils';
import { Typography } from "@mui/material";
import { Login } from "../Components/Login";
import { useForm } from "react-hook-form";
import { editTodoAsync, fetchList, fetchTodo } from "../Components/listSlice";
import { useAppDispatch, useAppSelector } from "../Components/hooks";

const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
    'Home',
  );

export const EditPg = () => {

    const { id } = useParams<string>()

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    // const curr:any = useAppSelector((state)=> state.list)
    const curr2:any = useAppSelector((state)=> state.list[parseInt(id!)-1].content)

    const [todo, setTodo] = useState<Array<iTodo>>([])
    const [newTodo, setNewTodo] = useState("")

    const dispatch = useAppDispatch()


    // const instance = axios.create({
    //     baseURL: `http://localhost:3000/`
    // })

    useEffect(()=> {
        console.log('in useeffect')
        console.log({id})
        // dispatch(fetchTodo({
        //     id:id
        // }))
        setNewTodo(curr2)
        dispatch(fetchList())
        
        // console.log(curr)
        console.log(curr2)
        // instance.get(`/api/${id}`).then(res => {
        //   console.log(res.data)
        //   setTodo(res.data)
        // })
      },[dispatch])

    // const handleFormChange = (event: ChangeEvent<HTMLInputElement>): void => {
    //     setNewTodo(event.target.value)
    //     console.log(newTodo)
    // }

    // const handleFormSubmit = async () => {
    //     console.log({id})
    //     if (newTodo == "") {
    //         console.log("Submit error")
    //     } else {
    //         let res = await instance.post(`/api/edit/${id}`, {id: id, content: newTodo})
    //         console.log(res)
    //         setNewTodo('')
    //         getLatestTodos()
    //     }
    // }

    const onSubmit = async(data:any) => {
        console.log(data)
        dispatch(editTodoAsync({
            id:id,
            edit:data.edittask
        }))
        setNewTodo(data.edittask)
        reset()
    }

    // const getLatestTodos = () => {
    //     instance.get(`/api/${ id }`).then(res => {
    //         console.log(res.data)
    //         setTodo(res.data)
    //     })
    // }

    return(
        <>
            <div className="top">
                <br></br>
                <br></br>
            </div>
            <br></br>

            <div className="loginform3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant='h5' component='h3' align='center'>
                        <br></br>
                        <div className="currTask">
                            {newTodo}
                            {/* {todo.length > 0 && todo.map(data => <div key='id'>{data.content}</div>)} */}
                        </div>
                        <br></br>           

                        <TextField 
                        label="Edit Task"
                            
                        {...register("edittask",{required:"Can't submit null"})}
                        error={Boolean(errors.edittask)}
                        helperText={errors.edittask?.message}
                        style={{
                        backgroundColor: "white"
                        }}/>
                        <br></br>
                        <br></br>
                        <div>
                            <Button type="submit" variant="contained" color="success">Edit</Button>
                        </div>
                        <Link to='/'><HomeIcon /></Link>
                    </Typography>
                </form>
            </div>
        </>
    )
}