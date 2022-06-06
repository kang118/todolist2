import React from "react";
import  { useNavigate } from 'react-router-dom';

interface Props {
    id: string
}

// id passed in as a prop when clicking on delete
export const Delete = ({id}:Props) => {

    const navigate = useNavigate()
    const deleteTodo = () => {
        fetch(`/api/${id}`,{
            method: 'POST',
            body: JSON.stringify({
                id: id
            })
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            navigate('/') //to push back to home page after deleting
        })
    }
    return (
        <>
            <button onClick={deleteTodo}>Delete</button>
        </>
    )
}