import React, { useState, useEffect } from 'react';
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
const BoardContent = ()  =>{
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);
    const [ReLoadBoardContent, setReLoadBoardContent] = useState(false);
    useEffect(() => {
        const fetchHashTags = async () => {
            try{
                let dataColumn = [];
                const date = moment();
                for (let i=0;i<3;i++)
                {
                    let res = await axios.get(`${BASE_URL}/tasks/date/`+date.format("YYYY-MM-DD"));
                    dataColumn.push({
                        id:date.format("YYYY-MM-DD"),
                        title: date.format("dddd"),
                        describe: date.format("MMMM Do"),
                        tasks:res.data
                    });
                    date.add(1, 'day');
                }
                setColumns(dataColumn);
            }
            catch (e){
                alert(e);
            }
            setReLoadBoardContent(false);
        }
        fetchHashTags();
    },[ReLoadBoardContent]);
    const AddNewTask = async (newTask) => {
        try{
            await axios.post(`${BASE_URL}/tasks/`,newTask,{headers:axiosHeaders});
            setReLoadBoardContent(true);
        }
        catch (e){
            console.log(e);
        }
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