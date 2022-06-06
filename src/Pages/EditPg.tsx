import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { iTodo } from "../Interfaces";


export const EditPg = () => {

    const [todo, setTodo] = useState<Array<iTodo>>([])
    const [newTodo, setNewTodo] = useState('')
    const { id } = useParams<string>()

    useEffect(()=> {
        console.log({id})
        fetch(`/api/${ id }`).then(response => response.json()).then(data => setTodo(data))
    }, [id])

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setNewTodo(event.target.value)
        console.log(newTodo)
    }

    const handleFormSubmit = () => {
        fetch(`/api/edit/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                content: newTodo
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
        .then(message => {
            console.log(message)
            setNewTodo('')
            getLatestTodos()
        })
    }

    const getLatestTodos = () => {
        fetch(`/api/${ id }`).then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => setTodo(data))
    }
    return(
        <>
            <br></br>
            {todo.length > 0 && todo.map(data => <div key='id'>{data.content}</div>)}
            <br></br>           
            <div className='inputContainer'>
                <input type="text" placeholder='Task..' name='task' value={newTodo} onChange={handleFormChange} />
            </div>
            <button onClick={handleFormSubmit}>Edit</button>
            <hr></hr>
            <Link to='/'>Back to Todo List</Link>
        </>
    )
}