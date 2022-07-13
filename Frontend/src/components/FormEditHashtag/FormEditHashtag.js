import React, { useState, useContext, useEffect } from "react";
import './FormEditHashtag.scss';
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../index";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
const FormEditHashtag = (props) => {
  const { onEditHashtag, modalVisible, id } = props;
  const [name, setName] = useState("");
  const [isVisible, setIsVisible] = useState(modalVisible);
  const getData = () => {
    fetch(`${BASE_URL}/hashtags/${id}`)
      .then((res) => res.json())
      .then((res) => {
        const hashtag = res;
        setName(hashtag.name);
      })
      .catch((error) => {
        alert(error.data);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const onChange = (e) => {
    setName(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();
    const newHashtag = {
      id,
      name,
    };
    onEditHashtag(newHashtag);
    setIsVisible(false);
  };
  const handleClick = (event) => {
    setIsVisible((current) => !current);
  };
  if (isVisible) {
    return (
      <Form className="edit-hashtag-form" onSubmit={onSubmit}>
        <FormGroup>
          <Label>Channel title</Label>
          <Input
            className="edit-hashtag-input"
            type="text"
            value={name}
            onChange={onChange}
            name="name"
            placeholder=""
            required
          ></Input>
        </FormGroup>
        <div className="edit-hashtag-group-btn">
          <Button type="submit">Edit</Button>
          <Button
            onClick={handleClick}
            to="/dashboard"
            className="btn btn-danger ml-2"
          >
            Cancel
          </Button>
        </div>
      </Form>
    );
  } else {
    return <></>;
  }
};
export default FormEditHashtag;
