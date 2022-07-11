/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  useSearchParams,
} from "react-router-dom";
import Popup from "reactjs-popup";
import "./Hashtag.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import axios from "axios";
import { ListGroupItem, Button } from "reactstrap";
import FormAddHashtag from "../FormAddHashtag/FormAddHashtag";
import { BASE_URL } from "../../index";
const Hashtag = (props) => {
  const [deleteStatus, setDeleteStatus] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const generateColor = () => {
    return "#" + Math.random().toString(16).substr(-6);
  };
  const [listHashtag, setChannel] = useState([]);
  const getData = () => {
    fetch(BASE_URL + "/hashtags")
      .then((res) => res.json())
      .then((res) => {
        setChannel(res);
      })
      .catch((error) => {
        alert(error.data);
      });
  };

  const deleteHashtag = (e) => {
    axios.delete(BASE_URL + "/hashtags/" + e).then((response) => {
      if (response.data != null) {
        setDeleteStatus(!deleteStatus);
      }
    });
  };
  const onCreateHashtag = (e) => {
    axios
      .post(BASE_URL + "/hashtags/", e)
      .then((response) => {
        setDeleteStatus(!deleteStatus);
      })
      .catch((error) => {
        alert(error.data);
      });
  };
  const findByHashtag = (e) => {
    setSearchParams({ hashtag: e });
  };
  useEffect(() => {
    getData();
  }, [deleteStatus]);
  const loadHashtag = listHashtag.map((listHashtag) => {
    return (
      <ListGroupItem
        onClick={() => findByHashtag(listHashtag.id)}
        className="d-flex sub-hash-tag"
        key={listHashtag.id}
      >
        <p style={{ color: generateColor() }}># {listHashtag.name}</p>
        <div className="ml-auto active">
          <Link to={`/edit/${listHashtag.id}`} size="sm" className="btn  mr-1">
            <AiFillEdit />
          </Link>
          <Button
            color="white"
            size="sm"
            onClick={() => deleteHashtag(listHashtag.id)}
          >
            <AiOutlineDelete />
          </Button>
        </div>
      </ListGroupItem>
    );
  });
  return (
    <div className="hashtags">
      <div className="hashtags-list">
        <div className="hashtags-list-item">
          <ul>{loadHashtag}</ul>
        </div>

        <Popup
          trigger={<button> + Manage Channels</button>}
          position="top left"
        >
          <div className="popup">
            <FormAddHashtag onCreateHashtag={onCreateHashtag} />
          </div>
        </Popup>
      </div>
    </div>
  );
};
export default Hashtag;
