import React from "react";
import { useNavigate } from "react-router";

interface Props {
    id: string
}

export const Edit = ({id}:Props) => {

    const navigate = useNavigate()

    const goToEdit = () => {
        navigate(`/edit/${id}`)
    }
    return (
        <>
            <button onClick={goToEdit}>Edit Task</button>
        </>
    )
}