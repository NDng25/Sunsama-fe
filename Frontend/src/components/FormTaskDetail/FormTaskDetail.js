import React,{useState} from "react";
import './FormTaskDetail.scss'
import {Link} from "react-router-dom";
import SubTask from "../SubTask/SubTask";
import {initTask} from "../../action/intiData";
import DatePicker from 'react-date-picker';
import {IoIosAddCircleOutline, RiDeleteBack2Line} from "react-icons/all";
const FormAddTaskDetail = (props) => {
    const task = initTask;
    const subtasks = task.subtasks;
    const [isShowAddNewTask , setIsShowAddNewTask] = useState(false);
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
                <input type="text" name="name" id="name-hashtag"/>
            </div>
            <div className="input-description">
                <label className="name-description">Description : </label>
                <textarea name="textValue" className="description-task"/>
            </div>
            <div className="day-task">
                <div> Day of Task </div>
                <DatePicker/>
            </div>
            <div className="due-day">
                <div> Due Day </div>
                <DatePicker/>
            </div>
            <div className="list-hashtag">
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