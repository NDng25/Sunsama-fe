import React from "react";
import './MainBoard.scss';
import BoardContent from "../BoardContent/BoardContent";
import BoardBar from "../BoardBar/BoardBar";
import FilterColumn from "../FilterColumn/FilterColumn";
const MainBoard = () => {
    return (
        <>
            <div className='main-board'>
                <FilterColumn/>
                <BoardContent/>
            </div>

        </>
    )
}
export default MainBoard