import React, {useState,useEffect} from "react";
import'./FilterColumn.scss';
import Calendar from 'react-calendar';
import {initHashtag} from "../../action/intiData";
import Hashtag from "../Hashtag/Hashtag";
import {mapOrder} from "../../utilities/sorts";
const FilterColumn = () =>{
    const [value, onChange] = useState(new Date());
    const [HashtagList,setHashtagList] = useState([]);
    const [Hashtags,setHashtags] = useState([]);
    useEffect(()=>{
        const HashtagList = initHashtag.hashtaglists;
        if(HashtagList){
            setHashtagList((HashtagList));
            setHashtags(mapOrder(HashtagList.hashtags,HashtagList.HashtagOrder,'id'));
        }
    },[]);
    return (
            <div className="filter-column">
                <Calendar className="calendar"
                          onChange={onChange}
                          value={value}
                />
                <div className="list-hashtag"> Channels
                    {Hashtags && Hashtags.length > 0 && Hashtags.map((hashtag  ,index) =>{
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