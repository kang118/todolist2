import React from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./User";
import { useSelector } from "react-redux";
import { RootState } from "..";

export const Login = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState)=> state.user.value)
    return (
    <div>
        <h3> Welcome {user.name} </h3>
        <button onClick={() => {
            dispatch(login({ name: "Tk Koh" }))}}>Login </button>
        <button onClick={() => {dispatch(logout())}}>Logout</button>
    </div> 
)}
