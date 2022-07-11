import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
const FormAddHashtag = (props) => {
  const { onCreateHashtag } = props;
  const [name, setName] = useState("");
  const onChange = (e) => {
    setName(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newHashtag = {
      name,
    };
    onCreateHashtag(newHashtag);
  };
  return (
    <Form className="bg-dark" onSubmit={onSubmit}>
      <FormGroup>
        <Label>Name</Label>
        <Input
          type="text"
          value={name}
          onChange={onChange}
          name="name"
          placeholder="Enter hashtag"
          required
        ></Input>
      </FormGroup>
      <div className="col d-flex justify-content-center">
        <Button type="submit">Submit</Button>
        <Link to="/dashboard" className="btn btn-danger ml-2">
          Cancel
        </Link>
      </div>
    </Form>
  );
};
export default FormAddHashtag;