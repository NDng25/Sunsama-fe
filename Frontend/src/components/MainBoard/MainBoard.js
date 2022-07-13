import React, { useEffect } from "react";
import './MainBoard.scss';
import BoardContent from "../BoardContent/BoardContent";
import FilterColumn from "../FilterColumn/FilterColumn";
import { useState } from "react";
const MainBoard = () => {
    const [hashtagChange, setHashtagChange] = useState(false);
    return (
        <div className='main-board'>
            <FilterColumn
                setHashtagChange={(value) => setHashtagChange(value)}
            />
            <BoardContent 
                hashtagChange={hashtagChange}
                setHashtagChange={(value) => setHashtagChange(value)}
            />
        </div>
    )
}
export default MainBoard