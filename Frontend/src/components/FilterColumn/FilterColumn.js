import React, {useState} from "react";
import'./FilterColumn.scss';
import Calendar from 'react-calendar';
import {initHashtag} from "../../action/intiData";
import Hashtag from "../Hashtag/Hashtag";
const FilterColumn = () =>{
    const boardInitHashtag = initHashtag.hashtaglists;
    const hashtags = boardInitHashtag.hashtags;
    const [value, onChange] = useState(new Date());
    return (
            <div className="filter-column">
                <Calendar className="calendar"
                          onChange={onChange}
                          value={value}
                />
                <div className="list-hashtag"> Channels
                    {hashtags && hashtags.length > 0 && hashtags.map((hashtag  ,index) =>{
                        return (
                            <Hashtag
                                key = {hashtag.id}
                                hashtag = {hashtag}
                            />
                        )
                    })}
                    <div className="add-new-hashtag">
                        + Add new hashtag
                    </div>
                </div>
            </div>
    )
}
export default FilterColumn