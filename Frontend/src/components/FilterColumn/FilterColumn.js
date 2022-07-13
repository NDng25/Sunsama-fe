import React, {useEffect, useState} from "react";
import'./FilterColumn.scss';
import Hashtag from "../Hashtag/Hashtag";
import {FormatDateToAdd} from "../../utilities/formatDate";
import {useSearchParams} from "react-router-dom";
import {Calendar} from "react-calendar";
const FilterColumn = (props) =>{
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
                <div className="list-hashtag"> 
                <label className="hashtag-label" >Channels</label>
                <Hashtag
                    setHashtagChange={(value) => props.setHashtagChange(value)}
                />           
                </div>
            </div>
    )
}
export default FilterColumn