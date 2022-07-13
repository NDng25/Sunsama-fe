/* eslint-disable no-undef */
import React, { useState, useEffect, createRef } from "react";
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
import FormEditHashtag from "../FormEditHashtag/FormEditHashtag";

const Hashtag = (props) => {
  const [deleteStatus, setDeleteStatus] = useState(true);
  const [searchParam, setSearchParams] = useSearchParams();
  const [listHashtag, setChannel] = useState([]);
  const getData = () => {
    fetch(BASE_URL + "/hashtags")
      .then((res) => res.json())
      .then((res) => {
        const allHashtag = { id: 0, name: "All" };
        setChannel([
          allHashtag,
          ...res.sort((a, b) => (a.name > b.name ? 1 : -1)),
        ]);
      })
      .catch((error) => {
        alert(error.data);
      });
  };
  const onEditHashtag = (e) => {
    axios
      .put(`${BASE_URL}/hashtags/${e.id}`, e)
      .then((response) => {
        setDeleteStatus(!deleteStatus);
        props.setHashtagChange(true);
      })
      .catch((error) => {
        alert(error.data);
      });
  };
  const deleteHashtag = (e) => {
    axios.delete(BASE_URL + "/hashtags/" + e).then((response) => {
      if (response.data != null) {
        setDeleteStatus(!deleteStatus);
        props.setHashtagChange(true);
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
    const date= searchParam.get('date');
    setSearchParams({ hashtag: e,
      date:date });
  };
  useEffect(() => {
    getData();
  }, [deleteStatus]);
  const loadHashtag = listHashtag.map((listHashtag) => {
    return (
      <ListGroupItem
        tabIndex={0}
        onClick={(e) => findByHashtag(listHashtag.id)}
        className="d-flex sub-hash-tag"
        key={listHashtag.id}
      >
        <p style={{ color: 'salmon' }}># </p>
        <p>{listHashtag.name}</p>
        {listHashtag.id ? (
          <div className="ml-auto active">
            <Popup
              trigger={
                <button className="popup_edit_btn">
                  <AiFillEdit />
                </button>
              }
              position="top left"
            >
              <div className="popup">
                <FormEditHashtag
                  onEditHashtag={onEditHashtag}
                  modalVisible={true}
                  id={listHashtag.id}
                />
              </div>
            </Popup>
            <Button
              className="popup_delete-btn"
              color="white"
              size="sm"
              onClick={() => deleteHashtag(listHashtag.id)}
            >
              <AiOutlineDelete />
            </Button>
          </div>
        ) : null}
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
          trigger={<button className="add-popup-btn"> + Add Channels</button>}
          position="top left"
        >
          <div className="popup">
            <FormAddHashtag
              onCreateHashtag={onCreateHashtag}
              modalVisible={true}
            />
          </div>
        </Popup>
      </div>
    </div>
  );
};
export default Hashtag;
