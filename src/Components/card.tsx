import React from 'react';
import { Link } from 'react-router-dom';
import { iTodo } from '../Interfaces';

interface Props {
    listOfTodos: Array<iTodo>
}

export const Card = ({listOfTodos}:Props) => {
    return (
    <>
        {listOfTodos.map(todo => {
            return(
                <ul key={todo.id}>
                    <li>
                        <Link to={`${todo.id}`}>{todo.content}</Link>
                    </li>
                </ul>
            )
        })}
    </>
    )
}