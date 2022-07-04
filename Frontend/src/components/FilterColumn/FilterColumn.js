import React, {useState,useEffect} from "react";
import'./FilterColumn.scss';
import Calendar from 'react-calendar';
import Hashtag from "../Hashtag/Hashtag";
import axios from "axios";
const  BASE_URL= "http://192.168.101.95:4455";
const FilterColumn = () =>{
    const [value, onChange] = useState(new Date());
    const [Hashtags,setHashtags] = useState([]);
    const [ReloadHashtag, isReloadHashtag] = useState(true);
    useEffect(() => {
        const fetchHashtags = async () => {
            console.log("Fetching");
            try{
                let res = await axios.get(`${BASE_URL}/hashtags/`);
                setHashtags(res.data);
                isReloadHashtag(false);
            }
            catch (e){
                console.log(e);
            }
        }
        fetchHashtags();
    },[ReloadHashtag]);
    const onUpdateHashtag = async (hashtag) => {
        console.log("Uploading");
            try{
                await axios.put(`${BASE_URL}/hashtags/`+hashtag.id,hashtag);
                isReloadHashtag(true);
            }
            catch (e){
                console.log(e);
            }
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

                                />
                            </div>
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