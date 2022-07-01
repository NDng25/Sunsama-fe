import React, {useState} from "react";
import './Task.scss';
import {Draggable} from "react-smooth-dnd";
import SubTask from "../SubTask/SubTask";
import Hashtag from "../Hashtag/Hashtag";
import TaskDetail from "../TaskDetail/TaskDetail";
const Task = (props)=>{
    const { task } = props;
    const subtasks = task.subtasks;
    const [check, setCheck] = useState(task.status);
    const handleTaskChange = (e) => {
       setCheck(e.target.checked);
    };
    const setSubtaskInTask = (subtasks) => {
        return (subtasks && subtasks.length > 0 && subtasks.map((subtask  ,index) =>{
            return (
                <SubTask
                    key = {subtask.id}
                    subtask = {subtask}
                />
            )
        }))
    }
    function OpenDetailOfTask () {
        return (
            <TaskDetail
            task = {task}
            />
        )

    }
    return (
        <>
            <div className="task-item" onClick={OpenDetailOfTask}>
                <input
                    type="checkbox"
                    className="check-task checker"
                    checked= {check}
                    onChange={handleTaskChange}
                />
                {task.title}
                {setSubtaskInTask(subtasks)}
                <div className="decription-task">
                    {task.description}
                </div>
                <Hashtag
                    key = {task.hashtag.id}
                    hashtag = {task.hashtag}
                />
            </div>
        </>
    )
}
export default Task