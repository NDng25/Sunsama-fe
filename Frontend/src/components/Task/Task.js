import React, {useState} from "react";
import './Task.scss';
import SubTask from "../SubTask/SubTask";
import {AiOutlineInfoCircle} from "react-icons/all";
const Task = (props)=>{
    const { task } = props;
    const subtasks = task.subtasks;
    const [check, setCheck] = useState(task.status);
    const handleTaskChange = (e) => {
        setCheck(e.target.checked);
    };
    function OpenTaskDetail () {
        console.log("Openning...");
    }
    return (
        <>
            <div className="task-item" >
                <div className="header-task">
                    <input
                        type="checkbox"
                        className="check-task checker"
                        checked= {check}
                        onChange={handleTaskChange}
                    />
                    <div className="title-task">{task.title}</div>
                    <AiOutlineInfoCircle className="info-task"/>
                </div>
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