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
import { usePostChangeWorkingStatusApproveMutation, usePostChangeWorkingStatusCancelMutation, useGetOrderDetailByIdQuery, usePostChangeWorkingStatusAssignMutation } from "../../../../services/slices/order/orderApi";
import { isEmpty } from "lodash";


const Order_approved = () => {

    const [showViewImg, setShowViewImg] = useState(false);
    const [picture, setPicture] = useState("");
    let imgFirebase = "https://firebasestorage.googleapis.com";
    const { orderId } = useParams();

    //local state
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [serviceDetail, setServiceDetail] = useState([]);
    const [employeeDetail, setEmployeeDetail] = useState([]);
    const [imgList, setImgList] = useState([]);
    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);


    //Order Detail
    const {
        data: orderDetailData = [],
        isFetching: isFetching,
    } = useGetOrderDetailByIdQuery(orderId);

    //Date and time 
    const startDate = (dateInput) => {
        if (dateInput === null || dateInput === undefined) {
            return "Chưa có ngày đến hẹn"
        } else {
            // console.log("Date:", order.implementationDate);
            const date = moment(dateInput).format("MM/DD/YYYY")
            return date;
        }
    }

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


    //Price
    const SumPrice = (quantity, price) => {
        let newPrice = parseFloat(price);
        if (quantity > 0) {
            let sum = newPrice * quantity
            return sum;
        } else {
            return "Phải có số lượng lớn hơn 0";
        }
    }

    const sumTotal = () => {
        let total = 0;
        for (let index = 0; index < serviceDetail.length; index++) {
            let sum = serviceDetail[index].price * serviceDetail[index].quantity;
            total += sum;
        }
        return total;
    }

    //Working Status
    const [orderWorkingStatus] = usePostChangeWorkingStatusApproveMutation();
    const [orderWorkingStatus2] = usePostChangeWorkingStatusCancelMutation();
    const [orderWorkingStatus3] = usePostChangeWorkingStatusAssignMutation();

    const changeWorkingStatus = async () => {
        try {
            await orderWorkingStatus(orderId)
                .unwrap()
                .then((res) => {
                    if (res) {
                        navigate("/manager/order")
                    }
                }
                )
        } catch (error) {
            console.log("Show error: ", error)
        }
    }

    const changeWorkingStatus2 = async () => {
        try {
            await orderWorkingStatus2(orderId)
                .unwrap()
                .then((res) => {
                    if (res) {
                        navigate("/manager/order")
                    }
                }
                )
        } catch (error) {
            console.log("Show error: ", error)
        }
    }

    const changeWorkingStatus3 = async () => {
        try {
            await orderWorkingStatus3(orderId)
                .unwrap()
                .then((res) => {
                    if (res) {
                        navigate("/manager/order")
                    }
                }
                )
        } catch (error) {
            console.log("Show error: ", error)
        }
    }


    //Unique staff
    const uniqueNamesStaff = [];

    const uniqueStaffData = employeeDetail.filter(element => {
        const isDuplicate = uniqueNamesStaff.includes(element.employeeId);

        if (!isDuplicate) {
            uniqueNamesStaff.push(element.employeeId);

            return true;
        }

        return false;
    });

    console.log("Description:", orderDetailData);

    return (
        <>
            <Container fluid className="order-approved-container">
                <Card className="booking-info-container">
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Title>
                                    <ArrowBackIcon onClick={() => {
                                        navigate('/manager/order');
                                    }} />
                                    Thông tin đơn
                                </Card.Title>
                            </Col>
                        </Row>
                        {isFetching ? (<div className="loading">
                            <Spinner animation="border" />
                            <div className="loading-text">Đang tải dữ liệu...</div>
                        </div>) : (
                            <Col>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Mã đơn:</Form.Label>
                                                    <Form.Control
                                                        readOnly
                                                        defaultValue={orderId} // Mã đơn
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Họ và tên:</Form.Label>
                                                    <Form.Control
                                                        readOnly
                                                        defaultValue={orders.customerName} // tên khách hàng
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Label>Số điện thoại:</Form.Label>
                                                {/* API */}
                                                <Form.Control
                                                    readOnly
                                                    defaultValue={orders.customerPhone} // tên khách hàng
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Label>Ngày hẹn:</Form.Label>
                                                <Form.Control
                                                    readOnly
                                                    value={startDate(date)}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Label>Giờ hẹn:</Form.Label>
                                                <Form.Control
                                                    readOnly
                                                    value={time}
                                                />
                                            </Col>
                                        </Row>
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
                                <Row>
                                    <Col className="table-container">
                                        <Form.Label>Danh sách dịch vụ khách hàng đặt:</Form.Label>
                                        <Table bordered size="sm">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Tên dịch vụ</th>
                                                    <th>Số lượng dịch vụ</th>
                                                    <th>Giá tiền một dịch vụ</th>
                                                    <th>Tổng giá tiền</th>
                                                    {/* <th>Xác nhận</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {serviceDetail
                                                    .map((service, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index}</td>
                                                                <td>{service.serviceName}</td>
                                                                <td >{service.quantity}</td>
                                                                <td>{service.price}</td>
                                                                <td>{SumPrice(service.quantity, service.price)}</td>
                                                                {/* <td>
                                                                    <div className="action-button-container">
                                                                        <Form.Check></Form.Check>
                                                                    </div>
                                                                </td> */}
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                        <Form.Label>Tổng giá tiền: {sumTotal()}</Form.Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="table-container">
                                        <Form.Label>Danh sách dịch vụ khách hàng đặt:</Form.Label>
                                        <Table bordered size="sm">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Tên Nhân viên</th>
                                                    <th>Số điện thoại</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {uniqueStaffData
                                                    .map((employee, index) => {
                                                        if (employee.workingStatus === true) {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{index}</td>
                                                                    <td>{employee.employeeName}</td>
                                                                    <td >{employee.employeePhoneNumber}</td>
                                                                </tr>
                                                            )
                                                        }
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="add-staff-btn">
                                        <Button
                                            onClick={() => {
                                                navigate('/manager/assign-staffApproved/' + orderId);
                                            }} >
                                            Thêm nhân viên
                                        </Button>
                                    </Col>
                                </Row>

                                {/* Nếu có ảnh, điều này xảy ra */}

                                {imgList.length !== 0 && (
                                    <>
                                        <Row>
                                            <Col>
                                                <Form.Label>
                                                    Hình ảnh thực tế (nhấn vào ảnh để phóng lớn):
                                                </Form.Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            {imgList.map((img, index) => {
                                                return (
                                                    <Col
                                                        key={index}
                                                        style={{ cursor: "pointer", }}
                                                        onClick={() => {
                                                            setPicture(imgFirebase + img);
                                                            setShowViewImg(true);
                                                        }}
                                                    >
                                                        {console.log("IMage:", img)}
                                                        <img
                                                            src={picture} />
                                                    </Col>
                                                );
                                            })}

                                        </Row>
                                    </>
                                )}
                            </Col>
                        )}
                    </Card.Body>
                    <Card.Footer>
                        <Row className="justify-content-md-center">
                            <Col xs lg="2">
                                <Button
                                    onClick={() => {
                                        changeWorkingStatus()
                                        // navigate('/manager/order-detail/' + orderId);
                                    }}
                                >
                                    Xác nhận
                                </Button>
                            </Col>
                            <Col xs lg="2">
                                <Button
                                    onClick={() => {
                                        changeWorkingStatus3()
                                        // navigate('/manager/order-detail/' + orderId);
                                    }}
                                >
                                    Từ chối
                                </Button>
                            </Col>
                            <Col xs lg="2">
                                <Button
                                    onClick={() => {
                                        changeWorkingStatus2()
                                        // navigate('/manager/order-detail/' + orderId);
                                    }}
                                >
                                    Hủy đơn
                                </Button>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Container >
            <Modal
                show={showViewImg}
                onHide={() => {
                    setShowViewImg(false);
                }}
                centered
                dialogClassName="img-modal"
            >
                <img style={{ width: "100%", height: "auto" }} src={picture} />
            </Modal>
        </>
    );
}


export default Order_approved;