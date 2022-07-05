import React, {useEffect, useState} from "react";
import './Hashtag.scss';
import {Form} from "react-bootstrap";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/all";
const Hashtag = (props) =>{
    const { hashtag ,onUpdateHashtag,onDeleteHashtag} = props;
    const [NameHashtag, setNameHashtag] = useState("");
    const [disable, setDisable] = useState(true);
    useEffect(()=>{
        if(hashtag && hashtag.name){
            setNameHashtag(hashtag.name);
        }
    },[hashtag]);
    function onChangeNameHashTag(e){
        setNameHashtag(e.target.value);
    }
    const EnableEditHashtag = () => {
        setDisable(false);
    }
    function onUpdateNameHashtag(event){
        if(event.target.value !== hashtag.name){
            const new_hashtag = {
                id: hashtag.id,
                name: event.target.value
            }
            onUpdateHashtag(new_hashtag);
        }
        setDisable(true);
    }
    function DeleteHashtag(event) {
        const detele_hashtag = {
                id: hashtag.id,
                name: hashtag.name
            }
        onDeleteHashtag(detele_hashtag);
    }
    return (
        <div className="hashtag-item">
            #<Form.Control
            size={"sm"}
            type="text"
            value={NameHashtag}
            className="hashtag"
            disabled={disable}
            onChange={onChangeNameHashTag}
            onBlur={onUpdateNameHashtag}
        />
            <div className="edit-button">
                <AiOutlineEdit
                    className="edit-name-button"
                    onClick={EnableEditHashtag}
                />
                <AiOutlineDelete 
                    className="delete-button"
                    onClick={DeleteHashtag}
                />
            </div>
        </div>
    )
}
export default Hashtag