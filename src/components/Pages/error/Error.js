import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentRole } from "../../../services/slices/auth/authSlice";
//CSS
import "./Error.scss";

const Error = () => {
  return (
    <Container fluid className="error-detail-container">
      <Card body className="error-info-container">
        <Row>
          <Col>
            <Card.Title>Không tìm thấy trang</Card.Title>
            <Card.Text>
              Đường link bạn nhập vào đã bị lỗi hoặc không tồn tại. Xin hãy thử
              lại sau.
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

export default Error;
