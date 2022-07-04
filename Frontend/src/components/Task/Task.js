import React, {useState} from "react";
import './Task.scss';
import {Draggable} from "react-smooth-dnd";
import SubTask from "../SubTask/SubTask";
import Hashtag from "../Hashtag/Hashtag";
const Task = (props)=>{
    const { task } = props;
    const subtasks = task.subtasks;
    const [check, setCheck] = useState(task.status);
    const handleTaskChange = (e) => {
        setCheck(e.target.checked);
    };
    return (
        <>
            <div className="task-item">
                <input
                    type="checkbox"
                    className="check-task checker"
                    checked= {check}
                    onChange={handleTaskChange}
                />
                {task.title}
                {subtasks && subtasks.length > 0 && subtasks.map((subtask  ,index) =>{
                    return (
                        <SubTask
                            key = {subtask.id}
                            subtask = {subtask}
                        />
                    )
                })}
                <div className="decription-task">
                    {task.description}
                </div>
                <div className="hashtag-of-task">
                    #{task.hashtag.name}
                </div>
            </div>
        </>
    )
}
export default Task