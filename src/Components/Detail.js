import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GET_CUSTOMER_BY_ID } from "../GraphQL/Queries";

const Detail = (props) => {
  const CustomerId = props.match.params.id;
  const [state, setState] = useState({
    name: "",
    age: "",
    email: "",
    contactNumber: "",
    address: "",
  });

  const { data, loading, error } = useQuery(GET_CUSTOMER_BY_ID, {
    variables: { Id: CustomerId },
  });

  useEffect(() => {
    if (data) {
      setState(data.customerByid)
    }
  }, [data])


  if (loading) return (
    <div className="loadingSpinner">
      <Spinner animation="border" variant="primary" />
    </div>
  );
  if (error) return (
    <div className="errorMessage">
      <b>Error:</b> {error}!
    </div>
  );
  else return (
    <Container>
      <h2 className="title" style={{ color: "blue", marginTop: "50px" }}>
        Customer Detail
      </h2>
      <Card className="text-center">
        <Card.Header>
          <h2>
            Name: <b>{state.name}</b>
          </h2>
        </Card.Header>
        <Card.Body>
          <h4>
            Email: <b>{state.email}</b> | Contact Number:{" "}
            <b>{state.contactNumber}</b>
          </h4>
          <h4>
            Age: <b>{state.age}</b> | Address: <b>{state.address}</b>
          </h4>
        </Card.Body>
        <div style={{ fontSize: "20px" }}>
          <Link to={`/`} style={{ color: "green" }}>
            Back
          </Link>{" "}
          &nbsp; | &nbsp;
          <Link to={`/AddOrUpdate/${CustomerId}`} style={{ color: "orange" }}>
            <i className="fas fa-edit"></i> Edit
          </Link>{" "}
          &nbsp; | &nbsp;
          <Link
            to={`/Customer/Delete/${CustomerId}`}
            style={{ color: "orangered" }}
          >
            <i className="fas fa-trash-alt"></i> Delete
          </Link>
        </div>
      </Card>
      <h3>{error}</h3>
    </Container>
  );
};

export default Detail;
