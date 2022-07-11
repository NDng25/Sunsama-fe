import React, {useState} from "react";
import'./FilterColumn.scss';
import Calendar from 'react-calendar';
import Hashtag from "../Hashtag/Hashtag";
const FilterColumn = () =>{
    const [value, onChange] = useState(new Date());
    return (
            <div className="filter-column">
                <Calendar className="calendar"
                          onChange={onChange}
                          value={value}
                />
                <div className="list-hashtag"> Channels
                <Hashtag/>           
                </div>
            </div>
    )
}
export default FilterColumn