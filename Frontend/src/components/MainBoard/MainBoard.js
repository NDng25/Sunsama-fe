import React from "react";
import './MainBoard.scss';
import BoardContent from "../BoardContent/BoardContent";
import BoardBar from "../BoardBar/BoardBar";
const MainBoard = () => {
    return (
        <>
            <div className='main-board'>
                <BoardContent/>
            </div>

        </>
    )
}
export default MainBoard