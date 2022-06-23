import React from "react";
import './Hashtag.scss';

const Hashtag = (props) =>{
    const { hashtag } = props;
    return (
        <>
            <div className='hashtag-item'>
                #{hashtag.name}
            </div>
        </>
    )
}
export default Hashtag