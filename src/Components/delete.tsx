import Button from "@mui/material/Button";
import React from "react";
import  { useNavigate } from 'react-router-dom';
import { useAppDispatch } from "./hooks";
import { deleteTodoAsync } from "./listSlice";


interface Props {
    id: string
}

// id passed in as a prop when clicking on delete
export const Delete = ({id}:Props) => {

    const dispatch = useAppDispatch()

    // const instance = axios.create({
    //     baseURL: `http://localhost:3000/`
    // })

    const navigate = useNavigate()
    // const deleteTodo = () => {
    //     fetch(`/api/${id}`,{
    //         method: 'POST',
    //         body: JSON.stringify({
    //             id: id
    //         })
    //     }).then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //         navigate('/') //to push back to home page after deleting
    //     })
    // }

    const handleDelete = () => {
        console.log('handling delete')
        dispatch(deleteTodoAsync({
            id:id
        }))
        console.log('navigating')
        navigate('/')
    }

    const goHome = () => {
        navigate('/')
    }

    // const deleteTodo = async () => {
    //     let res = await instance.post(`/api/${id}`,{id:id})
    //     console.log(res)
    //     navigate('/') //to push back to home page after deleting
    // }
    return (
        <>
            {/* <button onClick={deleteTodo}>Delete</button> */}
            <Button onClick={handleDelete} variant ="contained" color="error">Delete</Button>
        </>
    )
}