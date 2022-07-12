import React from "react";
import './MainBoard.scss';
import BoardContent from "../BoardContent/BoardContent";
import FilterColumn from "../FilterColumn/FilterColumn";
const MainBoard = () => {
    return (
        <div className='main-board'>
            <FilterColumn/>
            <BoardContent />
        </div>
    )
}
export default MainBoard