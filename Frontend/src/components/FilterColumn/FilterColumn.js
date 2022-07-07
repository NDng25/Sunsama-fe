import React, {useState,useEffect} from "react";
import'./FilterColumn.scss';
import Calendar from 'react-calendar';
import Hashtag from "../Hashtag/Hashtag";
import axios from "axios";
import {Link} from "react-router-dom";
import {BASE_URL} from "../../index";
const FilterColumn = () =>{
    const [value, onChange] = useState(new Date());
    const [Hashtags,setHashtags] = useState([]);
    const [ReloadHashtag, isReloadHashtag] = useState(true);
    useEffect(() => {
        const fetchHashTags = async () => {
            try{
                let res = await axios.get(`${BASE_URL}/hashtags/`);
                setHashtags(res.data);
                isReloadHashtag(false);
            }
            catch (e){
                console.log(e);
            }
        }
        fetchHashTags();
    },[ReloadHashtag]);
    const onUpdateHashtag = async (hashtag) => {
            try{
                await axios.put(`${BASE_URL}/hashtags/`+hashtag.id,hashtag);
                isReloadHashtag(true);
            }
            catch (e){
                console.log(e);
            }
    }
    const onDeleteHashtag = (hashtag) => {
    }
    return (
            <div className="filter-column">
                <Calendar className="calendar"
                          onChange={onChange}
                          value={value}
                />
                <div className="list-hashtag"> Channels
                    {Hashtags && Hashtags.length > 0 && Hashtags.map((hashtag  ,index) =>{
                        return (
                            <div className="channel-row">
                                <Hashtag
                                    key = {hashtag.id}
                                    hashtag = {hashtag}
                                    onUpdateHashtag = {onUpdateHashtag}
                                    onDeleteHashtag = {onDeleteHashtag}
                                />
                            </div>
                        )
                    })}
                    <div  className="add-new-hashtag">
                        <Link to="/add-hashtag" className="link-form-add-hashtag">
                            + Add new hashtag
                        </Link>
                    </div>
                </div>
            </div>
    )
}
export default FilterColumn