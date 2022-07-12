import React, {useEffect, useState} from "react";
import './SubTask.scss';
const SubTask = (props)=>{
    const { subtask , onCheckSubTask , isTaskCompleted } = props;
    const [checkSubTask, setCheckSubTask] = useState(subtask.status);
    useEffect(()=>{
        if(isTaskCompleted == true) setCheckSubTask(true);
    },[isTaskCompleted]);
    const handleSubTaskChange = (e) => {
        onCheckSubTask(subtask.id,e.target.checked);
        setCheckSubTask(e.target.checked);
    };
    return (
        <div className="subtask-item">
            <input
                type="checkbox"
                className="check-subtask checker"
                checked={checkSubTask}
                onChange={handleSubTaskChange}
            />
            {subtask.title}
        </div>
    )
}
export default SubTask