import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
} from "react-bootstrap";


// //Stepper
// import { Step, StepLabel, Stepper } from "@mui/material";

//Icons
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Images
import defaultUserAvatar from "../../../../assets/images/login.png";

// CSS
import './Order_detail.scss'
import { Avatar } from "@mui/material";

//Api
import { useGetOrderDetailByIdQuery, usePostChangeWorkingStatusMutation, usePutDeleteStaffAssignMutation } from "../../../../services/slices/order/orderApi";


const OrderDetail = () => {

    // local state
    const navigate = useNavigate();
    const [order, setOrder] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const { orderId } = useParams();
    const [active, setActive] = useState(1);
    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const { workingStatus } = 2;
    const { workingStatus2 } = 1002;
    //API

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

    const startTime = (timeInput) => {
        if (timeInput === null || timeInput === undefined) {
            return "Chưa có giờ hẹn"
        } else {
            const time = moment(timeInput).format("HH:mm")
            return time;
        }
    }

    //Order Detail
    const {
        data: orderDetailData = [],
        refetch: refetch,
        isFetching: isFetching,
    } = useGetOrderDetailByIdQuery(orderId);

    console.log("Data:", orderDetailData);
    useEffect(() => {
        if (!isFetching) {
            setOrder(orderDetailData)
            setEmployeeData(orderDetailData.listEmployeeAssign)
            setServiceData(orderDetailData.listOrderServiceInfor)
            setDate(orderDetailData.implementationDate)
            setTime(orderDetailData.implementationTime)
        }
    }, [isFetching]);


    //Working Status
    const [orderWorkingStatus] = usePostChangeWorkingStatusMutation();

    const changeWorkingStatus = async () => {
        try {
            await orderWorkingStatus(orderId, workingStatus)
                .unwrap()
                .then(
                    navigate("/manager/order")
                )
        } catch (error) {
            console.log("Show error: ", error)
        }
    }

    const changeWorkingStatus2 = async () => {
        try {
            await orderWorkingStatus(orderId, workingStatus2)
                .unwrap()
                .then(
                    navigate("/manager/order")
                )
        } catch (error) {
            console.log("Show error: ", error)
        }
    }

    //Remove Staff
    const [removeStaffAssign] = usePutDeleteStaffAssignMutation();
    const removeStaff = (assignId, employeeId) => {
        if (assignId != 0) {
            handleRemoveStaff(assignId, employeeId)
        }
    }

    const handleRemoveStaff = async (assignId, employeeId) => {
        try {
            await removeStaffAssign({ assignId: assignId, employeeId: employeeId })
                .unwrap().then((res) => {
                    if (res) {
                        refetch()
                    }
                })

        } catch (error) {
            console.log("Show error: ", error)
        }
    }

    const uniqueNames = [];

    const uniqueServiceData = serviceData.filter(element => {
        const isDuplicate = uniqueNames.includes(element.categoryName);

        if (!isDuplicate) {
            uniqueNames.push(element.categoryName);

            return true;
        }

        return false;
    });

    const uniqueNamesStaff = [];

    const uniqueStaffData = employeeData.filter(element => {
        const isDuplicate = uniqueNamesStaff.includes(element.employeeId);

        if (!isDuplicate) {
            uniqueNamesStaff.push(element.employeeId);

            return true;
        }

        return false;
    });

    console.log("Data:", order);

    return (
        <>
            <Container fluid className="order-detail-container">
                <Card body className="order-info-container">
                    <Row>
                        <Col>
                            <Card.Title>
                                <ArrowBackIcon onClick={() => {
                                    navigate('/manager/order');
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
                                                defaultValue={startDate(date)} // Địa chỉ
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        {/* Lịch hẹn */}
                                        <Form.Group>
                                            <Form.Label>Giờ hẹn:</Form.Label>
                                            <Form.Control
                                                readOnly
                                                defaultValue={startTime(time)} // Địa chỉ
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

                        <Row>
                            <Col>
                                <Card.Title>Nhân viên</Card.Title>
                            </Col>
                        </Row>
                        {isFetching ? (<div className="loading">
                            <Spinner animation="border" />
                            <div className="loading-text">Đang tải dữ liệu...</div>
                        </div>) : (
                            <Row className="mt-2">
                                <Col className="table-staff">
                                    <Table bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Tên nhân viên</th>
                                                <th>Chuyên môn</th>
                                                <th>Loại bỏ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {uniqueStaffData
                                                .map((employee, index) => {
                                                    if (employee.workingStatus === true) {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{employee.employeeName}</td>
                                                                <td>{employee.specialtyName}</td>
                                                                <td>
                                                                    {isFetching ? (<div className="loading">
                                                                        <Spinner animation="border" />
                                                                        <div className="loading-text">Đang tải dữ liệu...</div>
                                                                    </div>) : (
                                                                        <Button
                                                                            onClick={() => {

                                                                                removeStaff(employee.assignId, employee.employeeId)
                                                                                // navigate('/manager/order-detail/' + orderId);
                                                                            }}
                                                                        >
                                                                            <PersonRemoveIcon />
                                                                        </Button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                })
                                            }
                                        </tbody>
                                    </Table>

                                </Col>
                            </Row>
                        )}
                        <Row>
                            <Col className="add-staff-btn">
                                <Button
                                    onClick={() => {
                                        navigate('/manager/assign-staff/' + orderId);
                                    }}
                                >
                                    Thêm nhân viên
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col>
                                <Button
                                    onClick={() => {
                                        changeWorkingStatus()
                                        // navigate('/manager/order-detail/' + orderId);
                                    }}
                                >
                                    Xác nhận
                                </Button>
                            </Col>
                            <Col>
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

        </>
    )
}

export default OrderDetail;