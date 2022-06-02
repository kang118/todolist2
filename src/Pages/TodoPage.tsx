import React, {FC, useState, ChangeEvent, useEffect} from 'react';
import TodoTask from '../Components/TodoTask';
import { ITask } from '../Interfaces';

  export const TodoPage = () => {

  const[task, setTask] = useState<string>("")
  const[todoList, setTodoList] = useState<ITask[]>([])

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    //if event calling change is from task input
    setTask(event.target.value)
  }

  const addTask = (): void => {
    const newTask = {name:task}
    setTodoList([...todoList, newTask])
    console.log(todoList);
    //to reset form
    setTask("")
  }


  const completeTask = (nameToDelete: string):void => {
    setTodoList(todoList.filter((task) => {
      return task.name != nameToDelete
    }))
  }

  return (
    <div className="TodoPage">
      <div className="header">
        <div className='inputContainer'>
          <input type="text" placeholder='Task..' name='task' value={task} onChange={handleChange} />
        </div>
        <button onClick={addTask}>Add to List</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
}