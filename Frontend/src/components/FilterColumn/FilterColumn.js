import React from "react";
import'./FilterColumn.scss';
import Calendar from 'react-calendar';
import Hashtag from "../Hashtag/Hashtag";
const FilterColumn = () =>{
    return (
            <div className="filter-column">
                <Calendar className="calendar"
                />
                <div className="list-hashtag"> Channels
                <Hashtag/>           
                </div>
            </div>
    )
}
export default FilterColumn