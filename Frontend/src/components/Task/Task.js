import React, {useState,useEffect} from "react";
import './Task.scss';
import SubTask from "../SubTask/SubTask";
import {AiOutlineInfoCircle} from "react-icons/all";
import {Link} from "react-router-dom";
import moment from "moment";
import axios from "axios";
import {BASE_URL} from "../../index";
const Task = (props)=>{
    const { task } = props;
    //const subtasks = task.subtasks;
    const hashtags = task.hashtags;
    const [check, setCheck] = useState(task.status);
    const [subtasks,setSubTasks] = useState([]);
    useEffect(() => {
        const fetchHashTags = async () => {
            try{
                let res = await axios.get(`${BASE_URL}/tasks/`+task.id+'/subtasks');
                setSubTasks(res.data);
            }
            catch (e){
                console.log(e);
            }
        }
        fetchHashTags();
    },[]);
    const handleTaskChange = (e) => {
        setCheck(e.target.checked);
    };
    function OpenFormTaskDetail() {
        window.location.replace(`/task-detail/`+task.id);
    }
    return (
            <div className="task-item">
                <div className="header-task">
                    <input
                        type="checkbox"
                        className="check-task checker"
                        checked= {check}
                        onChange={handleTaskChange}
                    />
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
                        />
                    )
                })}
                <div className="decription-task">
                    {task.describe}
                </div>
                <div className="hashtag-of-task">
                    {hashtags && hashtags.length > 0 && hashtags.map((hashtag ,index) =>{
                        return (
                            <div>
                                #{hashtag.name}
                            </div>
                        )
                    })}
                </div>
            </div>
    )
}
export default Task