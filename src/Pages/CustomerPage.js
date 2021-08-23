import React from "react";
import { Container, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomerList from "../Components/CustomerList";
import { GET_ALL_CUSTOMERS } from "../GraphQL/Queries";
import { useQuery } from "@apollo/client";

const CustomerPage = () => {
  const { data, loading, error } = useQuery(GET_ALL_CUSTOMERS);

  function renderCustomerData() {
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
    else return <CustomerList customersData={data.allCustomers} />
  }

  return (
    <div>
      <Container>
        <h2 className="title">Customers List</h2>
        <Link to="/AddOrUpdate">
          <Button
            variant="success"
            size="small"
            style={{ margin: "0 0 10px 0" }}
          >
            <i className="fas fa-plus-square"></i> Add
          </Button>
        </Link>
        {renderCustomerData()}
      </Container>
    </div>
  );
};

export default CustomerPage;
