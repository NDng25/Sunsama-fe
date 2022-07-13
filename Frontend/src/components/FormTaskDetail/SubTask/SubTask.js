import React, {useEffect, useState} from "react";
import './SubTask.scss';
import {Form} from "react-bootstrap";
import {AiOutlineDelete, AiOutlineEdit, FiPlay} from "react-icons/all";
const SubTask = (props) =>{
    const { subtask ,onUpdateSubTask,onDeleteSubTask} = props;
    const [TitleSubTask, setTitleSubTask] = useState("");
    const [disable, setDisable] = useState(true);
    useEffect(()=>{
        if(subtask && subtask.title){
            setTitleSubTask(subtask.title);
        }
    },[subtask]);
    function onChangeTitleSubTask(e){
        setTitleSubTask(e.target.value);
    }
    const EnableEditSubTask = () => {
        setDisable(false);
    }
    function onUpdateTitleSubTask(event){
        if(event.target.value !== subtask.name){
            onUpdateSubTask(subtask.id,event.target.value);
        }
        setDisable(true);
    }
    function DeleteSubTask(event) {
        onDeleteSubTask(subtask.id);
    }
    return (
        <div className="subtask-item">
            <FiPlay className="subtask-icon"/>
            <Form.Control
            size={"sm"}
            type="text"
            value={TitleSubTask}
            className="subtask"
            disabled={disable}
            onChange={onChangeTitleSubTask}
            onBlur={onUpdateTitleSubTask}
        />
            <div className="edit-button">
                <AiOutlineEdit
                    className="edit-title-button"
                    onClick={EnableEditSubTask}
                />
                <AiOutlineDelete
                    className="delete-button"
                    onClick={DeleteSubTask}
                />
            </div>
        </div>
    )
}
export default SubTask