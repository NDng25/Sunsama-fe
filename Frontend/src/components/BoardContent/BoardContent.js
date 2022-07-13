import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Link,
    useSearchParams,
  } from "react-router-dom";
import './BoardContent.scss'
import Column from "../Column/Column";
import { Container, Draggable } from "react-smooth-dnd";
import {applyDrag} from "../../utilities/dragDrop";
import axios from "axios";
import {BASE_URL} from "../../index";
import moment from "moment";
import FormTaskDetail from "../FormTaskDetail/FormTaskDetail";
import task from "../Task/Task";
const axiosHeaders =  {
    'Content-Type': 'application/json',
    'Accept':'*/*'
    }
const BoardContent = (props)  =>{
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);
    const [searchParam, setSearchParams] = useSearchParams();
    const [ReLoadBoardContent, setReLoadBoardContent] = useState(false);
    useEffect(()=>{
        setReLoadBoardContent(true);
    },[searchParam])
    useEffect(() => {
        const fetchHashTags = async () => {
            const idHashtag=searchParam.get('hashtag');
            const valueDate=searchParam.get('date');
            var bonusCondition = '';
            if(idHashtag && idHashtag!= 0 && idHashtag != 'null') {bonusCondition = '?hashtagId='+idHashtag;}
            let dataColumn = [];
            const date = moment(valueDate,'DD-MM-YYYY');
            for (let i=0;i<4;i++)
            {
                let res = await axios.get(`${BASE_URL}/tasks/date/`+date.format("YYYY-MM-DD")+bonusCondition);
                dataColumn.push({
                    id:date.format("YYYY-MM-DD"),
                    title: date.format("dddd"),
                    describe: date.format("MMMM Do"),
                    tasks:res.data
                });
                date.add(1, 'day');
            }
            setColumns(dataColumn);
            setReLoadBoardContent(false);
            props.setHashtagChange(false);
        }
        fetchHashTags();
    },[ReLoadBoardContent, props.hashtagChange]);
    const AddNewTask = async (newTask) => {
        await axios.post(`${BASE_URL}/tasks/`,newTask,{headers:axiosHeaders});
        setReLoadBoardContent(true);
    }
    const onTaskDrop = (dropResult,columnId) => {
        if(dropResult.removedIndex !== null || dropResult.addedIndex !== null )
        {
            ChangeDateOfTask(dropResult.payload,columnId);
            let newColumns = [...columns];
            let currentColumn = newColumns.find(column => column.id === columnId);
            currentColumn.tasks = applyDrag(currentColumn.tasks,dropResult);
            currentColumn.taskOrder = currentColumn.tasks.map(task =>task.id);
            setColumns(newColumns)
        }
    }
    const ChangeDateOfTask = (task, dateChange) => {
        const changeDate = async (id_task,dateChange) => {
            const updateDate = {
                "newDate": dateChange
            }
            await axios.put(`${BASE_URL}/tasks/`+id_task+`/change_date/`,updateDate);
        }
        if(task.date.slice(0,10) != dateChange) changeDate(task.id,dateChange);
    }
    const setColumnInBoard = (columns) => {
        return ( columns && columns.length > 0 && columns.map((column  ,index) =>{
            return (
                    <Column
                        key = {column.id}
                        column = {column}
                        onTaskDrop = {onTaskDrop}
                        AddNewTask = {AddNewTask}
                    />
            )
        }))
    }
    return (
            <div className="board-columns">
                {setColumnInBoard(columns)}
            </div>
    )
}
export default BoardContent