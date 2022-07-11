import React, { useState, useEffect } from 'react';
import './BoardContent.scss'
import Column from "../Column/Column";
import { Container, Draggable } from "react-smooth-dnd";
import {applyDrag} from "../../utilities/dragDrop";
import axios from "axios";
import {BASE_URL} from "../../index";
import moment from "moment";
import FormTaskDetail from "../FormTaskDetail/FormTaskDetail";
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
                        title: date.format("YYYY-MM-DD"),
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
    const onColumnDrop = (dropResult) =>{
        let newColumns = [...columns];
        newColumns = applyDrag(newColumns,dropResult);

        let newBoard = {...board};
        newBoard.ColumnOrder = newColumns.map(column =>column.id);
        newBoard.columns = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);
    }
    const onTaskDrop = (dropResult,columnId) => {
        if(dropResult.removedIndex !== null || dropResult.addedIndex !== null )
        {
            let newColumns = [...columns];
            let currentColumn = newColumns.find(column => column.id === columnId);
            currentColumn.tasks = applyDrag(currentColumn.tasks,dropResult);
            currentColumn.taskOrder = currentColumn.tasks.map(task =>task.id);
            setColumns(newColumns)
        }
    }

    const setColumnInBoard = (columns) => {
        return ( columns && columns.length > 0 && columns.map((column  ,index) =>{
            return (
                <Draggable key = {column.id}>
                    <Column
                        column = {column}
                        onTaskDrop = {onTaskDrop}
                        AddNewTask = {AddNewTask}
                    />
                </Draggable>
            )
        }))
    }
    return (
        <>
            <div className="board-columns">
                <Container
                    orientation="horizontal"
                    onDrop={onColumnDrop}
                    getChildPayload={index =>columns[index]}
                    dragHandleSelector=".column-drag-handle"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'cards-drop-preview'
                    }}
                >
                    {setColumnInBoard(columns)}
                </Container>
            </div>
        </>
    )
}
export default BoardContent