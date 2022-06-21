import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "./hooks";

interface Props {
    id: string
}

export const Edit = ({id}:Props) => {
    const curr:any = useAppSelector((state)=> state.list)


    const navigate = useNavigate()

    const goToEdit = () => {
        console.log(curr)
        navigate(`/edit/${id}`)
    }
    return (
        <>
            {/* <button onClick={goToEdit}>Edit Task</button> */}
            <Button onClick={goToEdit} variant ="contained" color="success">Edit Task</Button>
        </>
    )
}