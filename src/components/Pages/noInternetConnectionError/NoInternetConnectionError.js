import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

//CSS
import "./NoInternetConnectionError.scss";

const NoInternetConnectionError = () => {
  return (
    <Container fluid className="no-internet-connection-error-detail-container">
      <Card body className="error-info-container">
        <Row>
          <Col>
            <Card.Title>Không có kết nối mạng</Card.Title>
            <Card.Text>
              Mạng internet của bạn hiện không có kết nối. Xin hãy thử lại sau.
            </Card.Text>
            <Card.Link as={Link} to="/dashboard">
              Quay lại trang Dashboard
            </Card.Link>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default NoInternetConnectionError;
