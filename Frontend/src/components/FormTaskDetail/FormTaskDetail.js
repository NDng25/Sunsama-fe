import React,{useEffect,useState} from "react";
import './FormTaskDetail.scss'
import {Link, useParams} from "react-router-dom";
import SubTask from "./SubTask/SubTask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {IoIosAddCircleOutline, RiDeleteBack2Line} from "react-icons/all";
import axios from "axios";
import {BASE_URL} from "../../index";
import Select from 'react-select';
const FormAddTaskDetail = () => {
    const { idtask } = useParams();
    const [task,setTask] = useState({});
    const [hashtags, setHashTags] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [startDueDate, setStartDueDate] = useState(new Date());
    const [isShowAddNewSubTask , setIsShowAddNewSubTask] = useState(false);
    const [subtasks, setSubTasks] = useState([]);
    const [optionHashTags , setOptionHashTags] = useState([]);
    useEffect( () => {
        const fetchTasks = async () => {
            try {
                let options = [];
                let dataTask = await axios.get(`${BASE_URL}/tasks/` + idtask + '/');
                let dataSubTask = await axios.get(`${BASE_URL}/tasks/` + idtask + '/subtasks');
                let dataHashTags = await axios.get(`${BASE_URL}/hashtags/`);
                setTask(dataTask.data);
                setHashTags(dataHashTags.data);
                setSubTasks(dataSubTask.data);
                setStartDate(new Date(dataTask.data.date.slice(0, 10)));
                setStartDueDate(new Date(dataTask.data.date.slice(0, 10)));
                dataHashTags.data.forEach((hashtag)=>{
                    options.push({
                        value: hashtag.id,
                        label: hashtag.name
                    });
                });
                console.log(options);
                setOptionHashTags(options);
            } catch (e) {
                console.log(e);
            }
        }
            fetchTasks();
    },[]);
    function LoadComboboxHashtag () {
        const dataComboBox = [];
        hashtags.map((hashtag) => {
            dataComboBox.push(hashtag.name);
            return 0;
        });
    }

    function ShowAddNewSubTask(e) {
        if(isShowAddNewSubTask === true) setIsShowAddNewSubTask(false);
        else setIsShowAddNewSubTask(true);
    }
    function AcceptChangeTask(){
        window.location.replace('/dashboard');
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
                            <IoIosAddCircleOutline className="add-button" onClick={ShowAddNewSubTask}/>
                            <RiDeleteBack2Line className="cancel-button"onClick={ShowAddNewSubTask}/>
                        </div>
                    </div>
                </div>
            <div className="list-hashtag">
                <div>Hashtag : </div>
                <Select
                    defaultValue= {[]}
                    isMulti
                    name="colors"
                    options={optionHashTags}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
            </div>
            </div>
            <div className="buttons" >
                <button className="edit-button" onClick={AcceptChangeTask}> Edit </button>
                <button className="cancel-button">
                    <Link to="/dashboard" className="return-dashboard">Cancel</Link>
                </button>
                <button className="delete-button" onClick={DeleteTask}> Delete </button>
            </div>
        </div>
    )
}
export default FormAddTaskDetail