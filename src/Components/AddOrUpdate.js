import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import {
  CREATE_CUSTOMER,
  GET_CUSTOMER_BY_ID,
  UPDATE_CUSTOMER,
} from "../GraphQL/Queries";
import { AddedMessage, UpdateMessage } from "../utils/TostifyMessage";

const AddOrUpdate = (props) => {
  let history = useHistory();
  const [state, setState] = useState({
    name: "",
    age: 0,
    email: "",
    contactNumber: "",
    address: "",
  });
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const CustomerId = props.match.params.id;

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    //debugger;
    setState({ ...state, [name]: value });
  };

  const { data, loading, error } = useQuery(GET_CUSTOMER_BY_ID, {
    variables: { Id: CustomerId },
  });

  const [createCustomer, { data: CreatedData }] = useMutation(CREATE_CUSTOMER);
  const [updateCustomer, { data: UpdatedData }] = useMutation(UPDATE_CUSTOMER);

  useEffect(() => {
    if (data) {
      setState(data.customerByid);
    }
  }, [data]);

  console.log(props);

  const handleSubmit = (event) => {
    event.preventDefault();
    validationChecking(event);
    //debugger;

    if (CustomerId) {
      updateCustomer({
        variables: {
          Id: CustomerId,
          CustomerData: {
            name: state.name,
            age: state.age,
            email: state.email,
            contactNumber: state.contactNumber,
            address: state.address,
          },
        },
      });
      UpdateMessage();
      window.location.href = "/";
    } else {
      createCustomer({ variables: { Customer: state } });
      AddedMessage();
      window.location.href = "/";
    }
  };

  function validationChecking(event) {
    const form = event.currentTarget;
    //console.log("val:", form);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      //setValidated(true);
    }
    setValidated(true);
  }
  const renderErrorMessage = () => {
    if (errorMessage) {
      <div className="errorMessage">
        <b>Error:</b> {errorMessage}!
      </div>;
    }
  };

  let ButtonName;
  if (CustomerId) {
    ButtonName = (
      <Button
        type="submit"
        variant="info"
        size="small"
        style={{ width: "8rem" }}
      >
        Update
      </Button>
    );
  } else {
    ButtonName = (
      <Button
        type="Submit"
        variant="success"
        size="small"
        style={{ width: "8rem" }}
      >
        Submit
      </Button>
    );
  }

  return (
    <Container>
      <h2 className="title">Add a Customer</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              placeholder="Customer Name"
              onChange={handleChange}
              value={state.name || ""}
            />
            <Form.Control.Feedback type="invalid">
              Please provide Customer Name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Age</Form.Label>
            <Form.Control
              required
              type="number"
              name="age"
              placeholder="Age"
              onChange={(e) =>
                setState({ ...state, age: parseInt(e.target.value) })
              }
              value={state.age || ""}
            />
            <Form.Control.Feedback type="invalid">
              Please provide Customer Age.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={state.email || ""}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              required
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              onChange={handleChange}
              value={state.contactNumber || ""}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Contact Number.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustom05">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              value={state.address || ""}
            />
            <Form.Control.Feedback type="invalid">
              Please provide Address.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        {ButtonName} &nbsp; | &nbsp;
        <Link to={`/`} style={{ color: "green" }}>
          Back
        </Link>
      </Form>
      {renderErrorMessage()}
    </Container>
  );
};

export default AddOrUpdate;
