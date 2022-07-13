import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import './FormAddHashtag.scss';
const FormAddHashtag = (props) => {
  const { onCreateHashtag,modalVisible} = props;
  const [name, setName] = useState("");
  const [isVisible, setIsVisible] = useState(modalVisible);
  const onChange = (e) => {
    setName(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newHashtag = {
      name,
    };
    onCreateHashtag(newHashtag);
    setIsVisible(false);
  };
  const handleClick = event => {
    setIsVisible(current => !current);
  };
  // eslint-disable-next-line no-lone-blocks
  {
    if(isVisible){
        return (
            <Form  className="add-hashtag-form" onSubmit={onSubmit}>
              <FormGroup>
                <Label>Channel</Label>
                <Input
                className="add-hashtag-input"
                  type="text"
                  value={name}
                  onChange={onChange}
                  name="name"
                  placeholder="Channel title..."
                  required
                ></Input>
              </FormGroup>
              <div className="add-hashtag-group-btn">
                <Button type="submit">Submit</Button>
                <Button onClick={handleClick} className="btn btn-danger ml-2">
                  Cancel
                </Button>
              </div>
            </Form>
          );
    }
    else {
        return <></>
    }
  }
  
};
export default FormAddHashtag;