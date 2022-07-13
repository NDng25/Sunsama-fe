import React, {useState,useEffect} from "react";
import './Task.scss';
import SubTask from "../SubTask/SubTask";
import {AiOutlineInfoCircle} from "react-icons/all";
import {Link} from "react-router-dom";
import moment from "moment";
import axios from "axios";
import {BASE_URL} from "../../index";
import Checkbox from "../Checkbox/Checkbox";
const Task = (props)=>{
    const { task } = props;
    //const subtasks = task.subtasks;
    const hashtags = task.hashtags;
    const [check, setCheck] = useState(task.status);
    const [subtasks,setSubTasks] = useState([]);
    const [isReLoadSubTask , setReLoadSubTask] = useState(false);
    useEffect(() => {
        const fetchSubTasks= async () => {
                let res = await axios.get(`${BASE_URL}/tasks/`+task.id+'/subtasks');
                setSubTasks(res.data);
                setReLoadSubTask(false);
        }
        fetchSubTasks();
    },[isReLoadSubTask]);
    const handleTaskChange = async (e) => {
        setCheck(e.target.checked);
        await axios.post(`${BASE_URL}/tasks/`+task.id+'/complete');
        if(e.target.checked == true) setReLoadSubTask(true);
    };
    const onCheckSubTask = async (id_subtask,status_subtask) => {
        try {
            if(status_subtask == false) setCheck(false);
            await axios.post(`${BASE_URL}/tasks/`+id_subtask+'/complete');
        }
        catch (e) {
        }
    }
    function OpenFormTaskDetail() {
        window.location.replace(`/task-detail/`+task.id);
    }
    return (
            <div className="task-item">
                <div className="header-task">
                    {/* <input
                        type="checkbox"
                        className="checker"
                        checked= {check}
                        onChange={handleTaskChange}
                    /> */}
                    <label>
                    <Checkbox 
                        className='checker'
                        checked= {check}
                        onChange={handleTaskChange}
                    />
                    </label>
                    <div className="title-task" onClick={OpenFormTaskDetail}>{task.title}</div>
                    <Link to={`/task-detail/`+task.id}>
                        <AiOutlineInfoCircle className="info-task"/>
                    </Link>
                </div>
                {subtasks && subtasks.length > 0 && subtasks.map((subtask  ,index) =>{
                    return (
                        <SubTask
                            key = {subtask.id}
                            subtask = {subtask}
                            onCheckSubTask = {onCheckSubTask}
                            isTaskCompleted = {check}
                        />
                    )
                })}
                <div className="decription-task">
                    {task.describe}
                </div>
                <div className="hashtag-of-task">
                    {hashtags && hashtags.length > 0 && hashtags.map((hashtag ,index) =>{
                        return (
                            <div className="task-hashtag-label">
                                #{hashtag.name}
                            </div>
                        )
                    })}
                </div>
            </div>
    )
}
export default Task