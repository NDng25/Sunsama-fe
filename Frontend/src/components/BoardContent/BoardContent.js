import React, { useState, useEffect } from 'react';
import './BoardContent.scss'
import Column from "../Column/Column";
import {initData} from "../../action/intiData";
import { Container, Draggable } from "react-smooth-dnd";
import {mapOrder} from "../../utilities/sorts";
import {applyDrag} from "../../utilities/dragDrop";
const BoardContent = ()  =>{
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([])
    useEffect(()=>{
        const boardInitData = initData.boards;
        if(boardInitData){
            setBoard((boardInitData));
            setColumns(mapOrder(boardInitData.columns,boardInitData.columnOrder,'id'));
        }
        },[]);
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