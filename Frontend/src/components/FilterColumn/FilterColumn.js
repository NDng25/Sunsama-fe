import React, {useEffect, useState} from "react";
import'./FilterColumn.scss';
import Calendar from 'react-calendar';
import Hashtag from "../Hashtag/Hashtag";
import {FormatDateToAdd} from "../../utilities/formatDate";
import {useSearchParams} from "react-router-dom";
const FilterColumn = () =>{
    const [value, onChange] = useState(new Date());
    const [searchParam, setSearchParams] = useSearchParams();
        useEffect(() => {
            const hashtag= searchParam.get('hashtag');
           setSearchParams({
               hashtag:hashtag,
            date: FormatDateToAdd(value)
        });
    }, [value]);
    return (
            <div className="filter-column">
                <Calendar className="calendar"
                          onClickDay={(value) => onChange(value)}
                          value={value}
                          selectRange={false}
                          minDetail="month"
                />
                <div className="list-hashtag"> Channels
                <Hashtag/>           
                </div>
            </div>
    )
}
export default FilterColumn