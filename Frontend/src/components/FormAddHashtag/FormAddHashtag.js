import React from "react";
import './FormAddHashtag.scss';
import {Link} from "react-router-dom";
function AddNewHashtag () {
    window.location.replace('/dashboard');
}
const FormAddHashtag = () => {
    return (
        <div className="body-form">
            <h2 className="Topic-form"> Create channel </h2>
            <div  className="input-name">
                <div>Name</div>
                <input type="text" name="name" id="name-hashtag"/>
            </div>
            <div className="buttons" >
                <button className="create-button" onClick={AddNewHashtag}> Create </button>
                <button className="cancel-button">
                    <Link to="/dashboard" className="return-dashboard"> Cancel </Link>
                </button>
            </div>
        </div>
    )
}
export default FormAddHashtag