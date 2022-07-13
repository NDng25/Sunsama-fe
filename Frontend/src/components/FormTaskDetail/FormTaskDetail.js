import React,{useEffect,useState} from "react";
import './FormTaskDetail.scss'
import {Link, useParams, useNavigate} from "react-router-dom";
import SubTask from "./SubTask/SubTask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {IoIosAddCircleOutline, RiDeleteBack2Line} from "react-icons/all";
import axios from "axios";
import {BASE_URL} from "../../index";
import {Multiselect} from "multiselect-react-dropdown";
import {FormatDateToAdd} from "../../utilities/formatDate";
const FormAddTaskDetail = () => {
    const { idtask } = useParams();
    const [task,setTask] = useState({});
    const [hashtags, setHashTags] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [startDueDate, setStartDueDate] = useState(new Date());
    const [subtasks, setSubTasks] = useState([]);
    const [optionHashTags , setOptionHashTags] = useState([]);
    const [optionSelectedHashTags , setOptionSelectedHashTags] = useState([]);
    const [isReLoadListSubTasks,setReLoadSubTasks] = useState(false);
    const navigate = useNavigate();
    
    useEffect( () => {
        const fetchTasks = async () => {
            try {
                let options = [];
                let defaultOptions = [];
                let dataTask = await axios.get(`${BASE_URL}/tasks/` + idtask + '/');
                let dataHashTags = await axios.get(`${BASE_URL}/hashtags/`);
                setTask(dataTask.data);
                setHashTags(dataHashTags.data);
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
            }
        }
            fetchTasks();
    },[]);
    useEffect(async ()=>{
        let dataSubTask = await axios.get(`${BASE_URL}/tasks/` + idtask + '/subtasks');
        setSubTasks(dataSubTask.data);
        setReLoadSubTasks(false);
    },[isReLoadListSubTasks])
    function ChangeOptionToHashTags(options){
        let hashtags = [];
        options.map((option) =>{
            hashtags.push(option.cat);
        });
        return hashtags;
    }
    const AcceptChangeTask = async () =>{
        const edit_task = {
            "title": document.getElementById('name-hashtag').value,
            "describe": document.getElementById('valueDescribeTask').value,
            "date": FormatDateToAdd(startDate)+" 00:00:00",
            "dueDate": FormatDateToAdd(startDueDate)+" 00:00:00",
            "hashtagsId": ChangeOptionToHashTags(optionSelectedHashTags),
            "isStatus": task.status,
            "parentId": task.parentId,
            "userId": task.userId
        }
        await axios.put(`${BASE_URL}/tasks/` + idtask + '/',edit_task);
        window.location.replace('/dashboard');
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
    const AddNewSubTaskInTask = async () => {
        if(document.getElementById('title-subtask').value != ''){
            const newSubTask = {
                "title": document.getElementById('title-subtask').value,
                "describe":''
            }
            await axios.post(`${BASE_URL}/tasks/` + idtask + '/subtasks',newSubTask);
            setReLoadSubTasks(true);
            document.getElementById('title-subtask').value = null;
        }
    }
    const onDeleteSubTask = async (id_delete_sub_task) => {
        await axios.delete(`${BASE_URL}/tasks/`+id_delete_sub_task);
        setReLoadSubTasks(true);
    }
    const onUpdateSubTask = async (id_edit_subtask,title_edit_subtask) => {
        const editSubTask = {
            "title": title_edit_subtask,
            "describe": ''
        }
        await axios.put(`${BASE_URL}/tasks/`+id_edit_subtask,editSubTask);
        setReLoadSubTasks(true);
    }
    return (
        <div className="edit-container">
        <div className="body-form" >
            <h2 className="Topic-form"> Task Detail</h2>
            <div  className="input-title">
                <label>Title:</label>
                <input
                    type="text"
                    name="name"
                    id="name-hashtag"
                    defaultValue = {task.title}/>
            </div>
            <div className="input-description">
                <label className="name-description">Description: </label>
                <textarea
                    name="textValue"
                    id="valueDescribeTask"
                    className="description-task"
                    defaultValue = {task.describe}/>
            </div>
            <div className="date-task">
                <label className="name-date">Date of Task</label>
                <DatePicker className="date"
                            dateFormat="dd/MM/yyyy"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}/>
            </div>
            <div className="due-date">
                <label className="name-duedate"> Due Day </label>
                <DatePicker
                            className="duedate"
                            dateFormat="dd/MM/yyyy"
                            selected={startDueDate}
                            onChange={(date) => setStartDueDate(date)} />
            </div>
            <div className="board-subtask">
                <div><label>SubTask: </label></div>
                <div className="detail-list-hashtag">
                    {subtasks && subtasks.length > 0 && subtasks.map((subtask  ,index) =>{
                        return (
                            <SubTask
                                key = {subtask.id}
                                subtask = {subtask}
                                onDeleteSubTask = {onDeleteSubTask}
                                onUpdateSubTask = {onUpdateSubTask}
                            />
                        )
                    })}
                    <div className='add-new-subtask'>
                        <div  className="name-subtask">
                            <label>Title: </label><input className="subtask-title-input" type="text" name="title" id="title-subtask"/>
                        </div>
                        <button className="add-button" onClick={AddNewSubTaskInTask}> Add </button>
                    </div>
                </div>
            <div className="detail-list-hashtag">
                <label>Channels: </label>
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
                <button className="cancel-button" onClick={() => navigate(-1)}>Cancel
                    {/* <Link to="/dashboard" className="return-dashboard"></Link> */}
                </button>
                <button className="delete-button" onClick={DeleteTask}> Delete </button>
            </div>
        </div>
        </div>
    )
}
export default FormAddTaskDetail