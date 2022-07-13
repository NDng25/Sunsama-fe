import React, { useEffect, useRef, useState } from "react";
import './Column.scss';
import Task from "../Task/Task";
import { Container, Draggable } from "react-smooth-dnd";
import { FormatDateToAdd } from "../../utilities/formatDate";
import { useSearchParams } from "react-router-dom";
const Column = (props) => {
    const [isShowAddNewTask, setIsShowAddNewTask] = useState(false);
    const textAreaRef = useRef(null);
    const [valueTextArea, setValueTextArea] = useState("");
    const [searchParam, setSearchParams] = useSearchParams();
    const { column, onTaskDrop, AddNewTask } = props;
    const tasks = column.tasks;
    useEffect(() => {
        if (isShowAddNewTask === true) {
            textAreaRef.current.focus();
        }
    }, [isShowAddNewTask])
    function handleAddNewTask() {
        if (valueTextArea != null) {
            const dateTask = new Date(column.id);
            let idHashtag = searchParam.get('hashtag');
            let newTask = '';
            if (idHashtag != 'null' && idHashtag != 0) {
                newTask = {
                    "title": valueTextArea,
                    "describe": "",
                    "date": FormatDateToAdd(dateTask) + " 00:00:00",
                    "dueDate": FormatDateToAdd(dateTask) + " 00:00:00",
                    "hashtagsId": [idHashtag],
                    "isStatus": false,
                    "parentId": 0,
                    "userId": 1
                };
            }
            else {
                newTask = {
                    "title": valueTextArea,
                    "describe": "",
                    "date": FormatDateToAdd(dateTask) + " 00:00:00",
                    "dueDate": FormatDateToAdd(dateTask) + " 00:00:00",
                    "hashtagsId": [],
                    "isStatus": false,
                    "parentId": 0,
                    "userId": 1
                };
            }
            AddNewTask(newTask);
            setValueTextArea('');
            setIsShowAddNewTask(false);
        }
    }
    const setTaskInColumn = (tasks) => {
        return (tasks && tasks.length > 0 && tasks.map((task, index) => {
            return (
                <Draggable key={task.id}>
                    <Task
                        key={task.id}
                        task={task}
                    />
                </Draggable>
            )
        }))
    }
    function ShowAddNewTask(e) {
        if (isShowAddNewTask === true) setIsShowAddNewTask(false);
        else setIsShowAddNewTask(true);
    }
    return (
        <>
            <div className="column">
                <header className="column-drag-handle">
                    {column.title}
                </header>
                <div className="date_column">  {column.describe}  </div>
                {isShowAddNewTask === true &&
                    <div className='add-new-task'>
                        <div className="input-form">
                            <textarea
                                rows="1"
                                className='form-control'
                                placeholder="Task's title..."
                                ref={textAreaRef}
                                value={valueTextArea}
                                onChange={(event) => setValueTextArea(event.target.value)}
                            ></textarea>
                        </div>
                        <div className='group-btn'>
                            <button className='btn btn-success' onClick={handleAddNewTask}>
                                Add Task
                            </button>
                            {/* <i className='fa fa-times icon' onClick={ShowAddNewTask}></i> */}
                            <div class="close-container" onClick={handleAddNewTask}>
                                <div class="leftright"></div>
                                <div class="rightleft"></div>
                                <label class="close">close</label>
                            </div>
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
                        onDrop={(dropResult) => onTaskDrop(dropResult, column.id)}
                        getChildPayload={index => tasks[index]}
                        dragClass="card-ghost"
                        dropClass="card-ghost-drop"
                        dropPlaceholder={{
                            animationDuration: 200,
                            showOnTop: true,
                            className: 'task-drop-preview'
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