import React from "react";
import {ITask} from "../Interfaces";
import { Link } from 'react-router-dom';


interface Props {
    task: ITask;
    completeTask(nameToDelete: string): void;
}

export const TodoTask = ({ task, completeTask}: Props) => {
    return (
    <div className="task">
        <div className="content">
            <Link to={`/about`}>{task.name}</Link>
            <span>{task.name}</span>
        </div>
        <button onClick={() => {completeTask(task.name)}}>X</button>
    </div>);
};

export default TodoTask