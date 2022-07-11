import React,{useEffect,useState} from "react";
import './FormTaskDetail.scss'
import {Link, useParams} from "react-router-dom";
import SubTask from "./SubTask/SubTask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {IoIosAddCircleOutline, RiDeleteBack2Line} from "react-icons/all";
import axios from "axios";
import {BASE_URL} from "../../index";
import {Multiselect} from "multiselect-react-dropdown";
const FormAddTaskDetail = () => {
    const { idtask } = useParams();
    const [task,setTask] = useState({});
    const [hashtags, setHashTags] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [startDueDate, setStartDueDate] = useState(new Date());
    const [subtasks, setSubTasks] = useState([]);
    const [optionHashTags , setOptionHashTags] = useState([]);
    const [optionSelectedHashTags , setOptionSelectedHashTags] = useState([]);
    useEffect( () => {
        const fetchTasks = async () => {
            try {
                let options = [];
                let defaultOptions = [];
                let dataTask = await axios.get(`${BASE_URL}/tasks/` + idtask + '/');
                let dataSubTask = await axios.get(`${BASE_URL}/tasks/` + idtask + '/subtasks');
                let dataHashTags = await axios.get(`${BASE_URL}/hashtags/`);
                setTask(dataTask.data);
                setHashTags(dataHashTags.data);
                setSubTasks(dataSubTask.data);
                setStartDate(new Date(dataTask.data.date.slice(0, 10)));
                setStartDueDate(new Date(dataTask.data.date.slice(0, 10)));
                dataTask.data.hashtags.map((hashtag)=>{
                    defaultOptions.push({
                        cat: hashtag.id,
                        key: hashtag.name
                    });
                });
                setOptionSelectedHashTags(defaultOptions);
                dataHashTags.data.forEach((hashtag)=>{
                    options.push({
                        cat: hashtag.id,
                        key: hashtag.name
                    });
                });
                setOptionHashTags(options);
            } catch (e) {
                console.log(e);
            }
        }
            fetchTasks();
    },[]);
    function ChangeOptionToHashTags(options){
        let hashtags = [];
        options.map((option) =>{
            hashtags.push(option.cat);
        });
        return hashtags;
    }
    function AcceptChangeTask(){
        const ChangedTask = {
            title : document.getElementById('name-hashtag').value,
            describe : document.getElementById('valueDescribeTask').value,
            date : startDate,
            dueDate :  startDueDate,
            hashtags : ChangeOptionToHashTags(optionSelectedHashTags)
        }
        // window.location.replace('/dashboard');
    }
    function ChangeSelectedHashTags(data){
        setOptionSelectedHashTags(data)
    }
    const DeleteTask = async () => {
        if(window.confirm("Do you want to delete this task ?") == true){
            await axios.delete(`${BASE_URL}/tasks/` + idtask + '/');
            window.location.replace('/dashboard');
        }
    }
    return (
        <div className="body-form" >
            <h2 className="Topic-form"> Task Detail</h2>
            <div  className="input-title">
                <div>Title :</div>
                <input
                    type="text"
                    name="name"
                    id="name-hashtag"
                    defaultValue = {task.title}/>
            </div>
            <div className="input-description">
                <label className="name-description">Description : </label>
                <textarea
                    name="textValue"
                    id="valueDescribeTask"
                    className="description-task"
                    defaultValue = {task.describe}/>
            </div>
            <div className="date-task">
                <div className="name-date">Date of Task</div>
                <DatePicker className="date"
                            dateFormat="dd/MM/yyyy"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}/>
            </div>
            <div className="due-date">
                <div className="name-duedate"> Due Day </div>
                <DatePicker
                            className="duedate"
                            dateFormat="dd/MM/yyyy"
                            selected={startDueDate}
                            onChange={(date) => setStartDueDate(date)} />
            </div>
            <div className="board-subtask">
                <div>SubTask : </div>
                <div className="list-hashtag">
                    {subtasks && subtasks.length > 0 && subtasks.map((subtask  ,index) =>{
                        return (
                            <SubTask
                                key = {subtask.id}
                                subtask = {subtask}
                            />
                        )
                    })}
                    <div className='add-new-subtask'>
                        <div  className="name-subtask">
                            Title : <input type="text" name="name" id="name-subtask"/>
                        </div>
                        <div className="buttons-subtask">
                            <IoIosAddCircleOutline className="add-button"/>
                            <RiDeleteBack2Line className="cancel-button"/>
                        </div>
                    </div>
                </div>
            <div className="list-hashtag">
                <div>Hashtag : </div>
                <Multiselect
                    displayValue="key"
                    options={optionHashTags}
                    selectedValues={optionSelectedHashTags}
                    onSelect={ChangeSelectedHashTags}
                    onRemove={ChangeSelectedHashTags}
                />
            </div>
            </div>
            <div className="buttons" >
                <button className="save-button" onClick={AcceptChangeTask}> Save </button>
                <button className="cancel-button">
                    <Link to="/dashboard" className="return-dashboard">Cancel</Link>
                </button>
                <button className="delete-button" onClick={DeleteTask}> Delete </button>
            </div>
        </div>
    )
}
export default FormAddTaskDetail