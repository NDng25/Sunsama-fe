import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './TaskDetail.scss';
const TaskDetail = (props) => {
    const {task} = props;
    return (
        <Popup>
            <div>Popup content here !!</div>
        </Popup>
    )
}
export default TaskDetail