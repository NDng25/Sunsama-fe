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
                console.log(e);
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
        const newSubTask = {
            "title": document.getElementById('title-subtask').value,
            "describe":''
        }
        try{
            await axios.post(`${BASE_URL}/tasks/` + idtask + '/subtasks',newSubTask);
            setReLoadSubTasks(true);
            document.getElementById('title-subtask').value = null;
        }catch (e) {
            alert(e);
        }
    }
    const onDeleteSubTask = async (id_delete_sub_task) => {
        try{
            await axios.delete(`${BASE_URL}/tasks/`+id_delete_sub_task);
            setReLoadSubTasks(true);
        }catch (e) {
            alert(e);
        }
    }
    const onUpdateSubTask = async (id_edit_subtask,title_edit_subtask) => {
        const editSubTask = {
            "title": title_edit_subtask,
            "describe": ''
        }
        try{
            await axios.put(`${BASE_URL}/tasks/`+id_edit_subtask,editSubTask);
            setReLoadSubTasks(true);
        }catch (e) {
            alert(e);
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
                                onDeleteSubTask = {onDeleteSubTask}
                                onUpdateSubTask = {onUpdateSubTask}
                            />
                        )
                    })}
                    <div className='add-new-subtask'>
                        <div  className="name-subtask">
                            Title : <input type="text" name="title" id="title-subtask"/>
                        </div>
                        <button className="add-button" onClick={AddNewSubTaskInTask}> Add </button>
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