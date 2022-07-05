import React,{useState} from "react";
import './SubTask.scss';
const SubTask = (props)=>{
    const { subtask } = props;
    const [checkSubTask, setCheckSubTask] = useState(subtask.status);
    const handleSubTaskChange = (e) => {
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