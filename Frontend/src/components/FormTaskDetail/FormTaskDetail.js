import React,{useEffect,useState} from "react";
import './FormTaskDetail.scss'
import {Link, useParams} from "react-router-dom";
import SubTask from "../SubTask/SubTask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {IoIosAddCircleOutline, RiDeleteBack2Line} from "react-icons/all";
import axios from "axios";
import Combobox from "react-widgets/Combobox";
import {BASE_URL} from "../../index";
const FormAddTaskDetail = () => {
    const [task,setTask] = useState([]);
    const [hashtags, setHashTags] = useState([]);
    useEffect(() => {
        const fetchHashTags = async () => {
            try{
                let res = await axios.get(`${BASE_URL}/tasks/`+idtask);
                let res1 = await axios.get(`${BASE_URL}/hashtags/`);
                setTask(res.data);
                setHashTags(res1.data);
            }
            catch (e){
                console.log(e);
            }
        }
        fetchHashTags();
    });
    function LoadComboboxHashtag () {
        const dataComboBox = [];
        hashtags.map((hashtag) => {
            dataComboBox.push(hashtag.name);
            return 0;
        });
    }
    const { idtask } = useParams();
    const [isShowAddNewTask , setIsShowAddNewTask] = useState(false);
    const subtasks = task.subtasks;
    const [startDate, setStartDate] = useState(new Date());

    function ShowAddNewSubTask(e) {
        if(isShowAddNewTask === true) setIsShowAddNewTask(false);
        else setIsShowAddNewTask(true);
    }
    function AcceptChangeTask(){
        window.location.replace('/dashboard');
    }
    return (
        <div className="body-form">
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
                <DatePicker className="date" selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div className="due-date">
                <div className="name-duedate"> Due Day </div>
                <DatePicker className="duedate" selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div className="list-hashtag">
                <div>SubTask : </div>
                {subtasks && subtasks.length > 0 && subtasks.map((subtask  ,index) =>{
                    return (
                        <SubTask
                            key = {subtask.id}
                            subtask = {subtask}
                        />
                    )
                })}
            {/* Add new subtask form*/}
            {isShowAddNewTask === true &&
                <div className='add-new-subtask'>
                    <div  className="name-subtask">
                        Title : <input type="text" name="name" id="name-subtask"/>
                    </div>
                    <div className="buttons-subtask">
                        <IoIosAddCircleOutline className="add-button" onClick={ShowAddNewSubTask}/>
                        <RiDeleteBack2Line className="cancel-button"onClick={ShowAddNewSubTask}/>
                    </div>
                </div>
            }
            {isShowAddNewTask === false &&
                <footer>
                    <div className="footer-action" onClick={ShowAddNewSubTask}>
                        <i className='fa fa-plus icon' >
                        </i> Add new subtask
                    </div>
                </footer>
            }
            <div>
                <div>Hashtag : </div>
                <Combobox
                    hideCaret
                    hideEmptyPopup
                    data={["Red", "Yellow", "Blue", "Orange"]}
                    placeholder="Search for a color"
                    onClick={LoadComboboxHashtag}
                />
            </div>
            </div>
            <div className="buttons" >
                <button className="edit-button" onClick={AcceptChangeTask}> Edit </button>
                <button className="cancel-button">
                    <Link to="/dashboard" className="return-dashboard">Cancel</Link>
                </button>
            </div>
        </div>
    )
}
export default FormAddTaskDetail