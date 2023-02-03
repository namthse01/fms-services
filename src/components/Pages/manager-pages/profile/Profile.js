import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Order_approved.scss';

//Momentjs
import moment from "moment";

//React-bootstrap
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
    Table,
    Spinner,
    InputGroup,
    Modal,
} from "react-bootstrap";

//Icons
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Img
import imgDefault from "../../../../assets/images/login.png";

//API
import { usePostChangeWorkingStatusApproveMutation, usePostChangeWorkingStatusCancelMutation, useGetOrderDetailByIdQuery } from "../../../../services/slices/order/orderApi";
import { isEmpty } from "lodash";


const Profile = () => {

    //local state
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);



    useEffect(() => {
        if (!isFetching) {
            setOrders(orderDetailData)
            setServiceDetail(orderDetailData.listOrderServiceInfor)
            setEmployeeDetail(orderDetailData.listEmployeeAssign)
            setImgList(orderDetailData.imageUrl)
            setDate(orderDetailData.implementationDate)
            setTime(orderDetailData.implementationTime)
        }
    }, [isFetching]);


    return (
        <>
            <Container fluid className="order-approved-container">
                <Card className="booking-info-container">
                    <Card.Body>
                        {isFetching ? (<div className="loading">
                            <Spinner animation="border" />
                            <div className="loading-text">Đang tải dữ liệu...</div>
                        </div>) : (
                            <Col>
                                <Row>
                                    <Col>
                                        <Form.Label>Khách hàng:</Form.Label>
                                        {/* API */}
                                        <p>{orders.customerName}</p>
                                    </Col>
                                    <Col>
                                        <Form.Label>Số điện thoại:</Form.Label>
                                        {/* API */}
                                        <p>{orders.customerPhone}</p>
                                    </Col>
                                    <Col>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                Ngày hẹn:
                                            </InputGroup.Text>
                                            <Form.Control
                                                readOnly
                                                value={startDate(date)}
                                            />
                                        </InputGroup>
                                    </Col>
                                    <Col>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                Giờ hẹn:
                                            </InputGroup.Text>
                                            <Form.Control
                                                readOnly
                                                value={time}
                                            />
                                        </InputGroup>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Mô tả đơn:</Form.Label>
                                        {/* API */}
                                        <Form.Control
                                            readOnly
                                            as="textarea"
                                            rows={3}
                                            value={orders.description}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        <Form.Label>Loại đơn:</Form.Label>
                                        {/* API */}
                                        <p>Sửa chữa đồ gỗ</p>
                                    </Col>
                                    <Col>
                                        <Form.Label>Địa chỉ:</Form.Label>
                                        {/* API */}
                                        <p>{orderDetailData.address}</p>
                                    </Col>
                                </Row>
                            </Col>
                        )}
                    </Card.Body>
                </Card>
            </Container >
        </>
    );
}


export default Profile;