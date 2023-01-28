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
import { usePostChangeWorkingStatusApproveMutation, useGetOrderDetailByIdQuery } from "../../../../services/slices/order/orderApi";


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



    //Order Detail
    const {
        data: orderDetailData = [],
        isFetching: isFetching,
    } = useGetOrderDetailByIdQuery(orderId);

    useEffect(() => {
        if (!isFetching) {
            setOrders(orderDetailData)
            setServiceDetail(orderDetailData.listOrderServiceInfor)
            setEmployeeDetail(orderDetailData.listEmployeeAssign)
            setImgList(orderDetailData.imageUrl)
        }
    }, [isFetching]);

    //Time
    const startDate = () => {
        if (orders.implementationDate === null || orders.implementationDate === undefined) {
            return "Chưa có ngày đến hẹn"
        } else {
            const date = moment(orders.implementationDate).format("MM/DD/YYYY")

            return date;
        }
    }

    const startTime = () => {
        if (orders.implementationTime === null || orders.implementationTime === undefined) {
            return "Chưa có giờ hẹn"
        } else {
            const time = moment(orders.implementationDate).format("HH:mm")

            return time;
        }
    }

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


    //Working Status
    const [orderWorkingStatus] = usePostChangeWorkingStatusApproveMutation();

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

    //Unique service

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
                                        <Card.Title>
                                            <ArrowBackIcon onClick={() => {
                                                navigate('/manager/order');
                                            }} />
                                            Thông tin đơn
                                        </Card.Title>
                                    </Col>
                                </Row>
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
                                                name="status"
                                                value={startDate()}
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
                                                name="status"
                                                value={startTime()}
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
                                                    <th>Chuyên Môn</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {employeeDetail
                                                    .map((employee, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index}</td>
                                                                <td>{employee.employeeName}</td>
                                                                <td >{employee.specialtyName}</td>
                                                            </tr>
                                                        )
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
                                                navigate('/manager/assign-staff/' + orderId);
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
                        <Row>
                            <Col className="d-flex flex-row-reverse">
                                <Button
                                    onClick={() => {
                                        changeWorkingStatus()
                                        // navigate('/manager/order-detail/' + orderId);
                                    }}
                                >
                                    Xác Nhận
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