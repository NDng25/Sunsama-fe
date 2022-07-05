import React,{useState} from "react";
import './FormTaskDetail.scss'
import {Link} from "react-router-dom";
function AddNewHashtag () {
    console.log(document.getElementById("name-hashtag").value);
}
const FormAddHashtag = () => {
    return (
        <div className="body-form">
            <h2 className="Topic-form"> Create channel </h2>
            <div  className="input-name">
                Name : <input type="text" name="name" id="name-hashtag"/>
            </div>
            <div className="buttons" >
                <button className="create-button" onClick={AddNewHashtag}> Create </button>
                <button className="cancel-button">
                    <Link to="/dashboard" className="return-dashboard">Cancel</Link>
                </button>
            </div>
        </div>
    )
}
export default FormAddHashtag