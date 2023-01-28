import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

//React-bootstrap
import {
    Card,
    Col,
    Container,
    Form,
    Row,
    Table,
    Spinner,
} from "react-bootstrap";


// //Stepper
// import { Step, StepLabel, Stepper } from "@mui/material";

//Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Images
import defaultUserAvatar from "../../../../assets/images/login.png";

// CSS
import './OrderHistory.scss'
import { Avatar } from "@mui/material";

//Api
import { useGetOrderDetailByIdQuery } from "../../../../services/slices/order/orderApi";


const OrderHistoryDetail = () => {

    // local state
    const navigate = useNavigate();
    const [order, setOrder] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const { orderId } = useParams();
    const [active, setActive] = useState(1);
    //API

    //Date and time 
    const startDate = () => {
        if (order.implementationDate === null || order.implementationDate === undefined) {
            return "Chưa có ngày đến hẹn"
        } else {
            console.log("Date:", order.implementationDate);
            const date = moment(order.implementationDate).format("MM/DD/YYYY")

            return date;
        }
    }

    const startTime = () => {
        if (order.implementationTime === null || order.implementationTime === undefined) {
            return "Chưa có giờ hẹn"
        } else {
            console.log("Time:", order.implementationTime);
            const time = moment(order.implementationDate).format("HH:mm")
            return time;
        }
    }

    //Order Detail
    const {
        data: orderDetailData = [],
        refetch: refetch,
        isFetching: isFetching,
    } = useGetOrderDetailByIdQuery(orderId);

    useEffect(() => {
        if (!isFetching) {
            setOrder(orderDetailData)
            setServiceData(orderDetailData.listOrderServiceInfor)
        }
    }, [isFetching]);

    const uniqueNames = [];

    const uniqueServiceData = serviceData.filter(element => {
        const isDuplicate = uniqueNames.includes(element.categoryName);

        if (!isDuplicate) {
            uniqueNames.push(element.categoryName);

            return true;
        }

        return false;
    });

    return (
        <>
            <Container fluid className="order-detail-container">
                <Card body className="order-info-container">
                    <Row>
                        <Col>
                            <Card.Title>
                                <ArrowBackIcon onClick={() => {
                                    navigate('/manager/customer-detail/' + order.customerPhone);
                                }} />
                                Thông tin đơn hàng
                            </Card.Title>
                        </Col>
                    </Row>

                    {/* Tải dữ liệu khi có api */}
                    {isFetching ? (<div className="loading">
                        <Spinner animation="border" />
                        <div className="loading-text">Đang tải dữ liệu...</div>
                    </div>) : (
                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Mã đơn:</Form.Label>
                                            <Form.Control
                                                readOnly
                                                defaultValue={order.orderId} // Mã đơn
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Họ và tên:</Form.Label>
                                            <Form.Control
                                                readOnly
                                                defaultValue={order.customerName} // tên khách hàng
                                            />
                                        </Form.Group>
                                    </Col>
                                    {/* <Col>
                                    <Form.Group>
                                        <Form.Label>Ngày hẹn:</Form.Label>
                                        <Form.Control
                                            readOnly
                                            defaultValue={'1/9/2024'} // thời gian
                                        />
                                    </Form.Group>
                                </Col> */}
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Số điện thoại:</Form.Label>
                                            <Form.Control
                                                readOnly
                                                defaultValue={order.customerPhone} // Số điện thoại
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Số địa chỉ:</Form.Label>
                                            <Form.Control
                                                readOnly
                                                defaultValue={order.address} // Địa chỉ
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        {/* Lịch hẹn */}
                                        <Form.Group>
                                            <Form.Label>Ngày hẹn:</Form.Label>
                                            <Form.Control
                                                readOnly
                                                defaultValue={startDate()} // Địa chỉ
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        {/* Lịch hẹn */}
                                        <Form.Group>
                                            <Form.Label>Giờ hẹn:</Form.Label>
                                            <Form.Control
                                                readOnly
                                                defaultValue={startTime()} // Địa chỉ
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={3}>
                                <Row>
                                    <Col>
                                        <Form.Label>Ảnh đại diện:</Form.Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="d-flex justify-content-center align-items-center">
                                        <Avatar
                                            src={defaultUserAvatar}
                                            sx={{
                                                width: "120px",
                                                height: "120px",
                                                border: "1px solid #000000",
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    )}
                </Card>

                {/* Dịch Vụ */}
                <Card className="order-booking-container">
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Title>Dịch vụ</Card.Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {/* Trạng Thái đơn */}
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column xs={6} md={2}>
                                        Trạng Thái
                                    </Form.Label>
                                    <Col xs={6} md={2}>
                                        <Form.Control readOnly defaultValue="Đang xử lí" />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            {/* Thên Dịch vụ */}
                            <Col className="table-service">
                                <Table bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Loại dịch vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {uniqueServiceData
                                            .slice(10 * (active - 1), 10 * active)
                                            .map((service, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{service.categoryName}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container >

        </>
    )
}

export default OrderHistoryDetail;