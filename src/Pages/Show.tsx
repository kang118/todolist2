import React, { useState, useEffect } from "react";
import { Delete } from "../Components/delete";
import { useParams, Link } from "react-router-dom";
import { Edit } from "../Components/edit";
import { iTodo } from "../Interfaces";

export const Show = () => {

    const { id } = useParams<string>()
    const [todo, setTodo] = useState<Array<iTodo>>([])

    useEffect(()=> {
        console.log({id})
        fetch(`/api/${ id }`).then(response => response.json()).then(data => setTodo(data))
    }, [id])
    return(
        <div>
            <br></br>
            {todo.length > 0 && todo.map(data => <div key='id'>{data.content}</div>)}
            <br></br>
            <Delete id={ id! }/>
            <Edit id={id!}/>
            <hr></hr>
            <Link to='/'>Back to Todo List</Link>
        </div>
    )
}