import React, {useEffect, useRef, useState} from "react";
import './Column.scss';
import Task from "../Task/Task";
import {Container,Draggable} from "react-smooth-dnd";
const Column = (props) => {
    const { column ,onTaskDrop } = props;
    const tasks = column.tasks;
    const [isShowAddNewTask , setIsShowAddNewTask] = useState(false);
    const textAreaRef = useRef(null);
    const [valueTextArea,setValueTextArea] = useState("");
    useEffect(()=>{
        if(isShowAddNewTask === true){
            textAreaRef.current.focus();
        }
    },[isShowAddNewTask])
    function handleAddNewTask () {
        if(!valueTextArea){
            textAreaRef.current.focus();
            return;
        }
    }
    const setTaskInColumn = (tasks) => {
        return (tasks && tasks.length > 0 && tasks.map((task,index)=>{
            return(
                <Draggable key = {task.id}>
                    <Task
                        task={task}
                    />
                </Draggable>
            )
        }))
    }
    function ShowAddNewTask(e) {
        if(isShowAddNewTask === true) setIsShowAddNewTask(false);
        else setIsShowAddNewTask(true);
    }
    return (
        <>
            <div className="column">
                <header className="column-drag-handle">
                        {column.title}
                </header>
                {isShowAddNewTask === true &&
                    <div className='add-new-task'>
                    <textarea
                        rows="1"
                        className='form-control'
                        placeholder='Enter a title for this task'
                        ref={textAreaRef}
                        value={valueTextArea}
                        onChange={(event) => setValueTextArea(event.target.value)}
                    ></textarea>
                        <div className='group-btn'>
                            <button className='btn btn-success' onClick={handleAddNewTask}>
                                Add Task
                            </button>
                            <i className='fa fa-times icon' onClick={ShowAddNewTask}></i>
                        </div>
                    </div>
                }
                {isShowAddNewTask === false &&
                    <footer>
                        <div className="footer-action" onClick={ShowAddNewTask}>
                            <i className='fa fa-plus icon' >
                            </i> Add another task
                        </div>
                    </footer>
                }
                <div className="list-task">
                    <Container
                        {...column.props}
                        groupName="col"
                        onDrop={(dropResult) => onTaskDrop(dropResult,column.id)}
                        getChildPayload={index => tasks[index]
                        }
                        dragClass="card-ghost"
                        dropClass="card-ghost-drop"
                        dropPlaceholder={{
                            animationDuration: 150,
                            showOnTop: true,
                            className: 'drop-preview'
                        }}
                        dropPlaceholderAnimationDuration={200}
                    >
                        {setTaskInColumn(tasks)}
                    </Container>
                </div>
            </div>
        </>
    )
}
export default Column;