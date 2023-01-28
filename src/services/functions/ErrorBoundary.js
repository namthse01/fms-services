import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container fluid style={{ padding: "5px 0 0 0" }}>
          <Card body style={{ boxShadow: "0px 3px 8px #a6a6a6" }}>
            <Row>
              <Col>
                <Card.Title>Đã xảy ra lỗi</Card.Title>
                <Card.Text>
                  Ứng dụng đã xảy ra lỗi. Xin hãy thử lại sau.
                </Card.Text>
                <Card.Link as={Link} to="/manager/dashboard">
                  Quay lại trang Dashboard
                </Card.Link>
              </Col>
            </Row>
          </Card>
        </Container>
      );
    }
    return this.props.children;
  }
}
