import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//Momentjs
import moment from "moment";

//React-bootstrap
import {
    Card,
    Col,
    Container,
    Form,
    Row,
    Table,
    InputGroup,
    Spinner
} from "react-bootstrap";

//Images
import defaultUserAvatar from "../../../../assets/images/login.png";

//Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// CSS
import './StaffDetail.scss'
import { Avatar } from "@mui/material";

//API
import { useGetStaffByIdQuery } from "../../../../services/slices/staff/staffApi";


const StaffDetail = () => {

    //local state
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
    const [staff, setStaff] = useState([]);

    const slots = [1, 2, 3, 4, 5, 6];
    const slotTimes = [
        "08:00 - 10:00",
        "10:00 - 12:00",
        "12:00 - 14:30",
        "14:00 - 16:00",
        "16:00 - 18:30",
        "18:30 - 20:00",
    ];


    //API
    const { employeeId } = useParams();

    const {
        data: StaffDetailData = [],
        refetch: refetch,
        isFetching: isFetching,
        error,
    } = useGetStaffByIdQuery(employeeId);

    useEffect(() => {
        if (!isFetching) {
            setStaff(StaffDetailData)
        }
    }, [isFetching]);


    //SpecialTy for Staff
    const checkSpecialty = (specialtyId) => {
        if (specialtyId === 1) {
            return "Sửa ghế Gỗ";
        }

        if (specialtyId === 3) {
            return "Đang thực hiện";
        }

        if (specialtyId === 6) {
            return "Hoàn tất đơn";
        }

        return "";
    };


    return (
        <>
            <Container fluid>
                <Card className="staff-detail-container">
                    <Card className="Staff-info-container">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Title>
                                        <ArrowBackIcon
                                            onClick={() => {
                                                navigate('/manager/staff');
                                            }}
                                        />
                                        Thông tin nhân viên
                                    </Card.Title>
                                </Col>
                            </Row>

                            {/* Tải dữ liệu khi có api */}
                            {isFetching ? (
                                <div className="loading">
                                    <Spinner animation="border" />
                                    <div className="loading-text">Đang tải dữ liệu...</div>
                                </div>
                            ) : (
                                <Row>
                                    <Col>
                                        <Row>
                                            {/* <Col>
                                            <Form.Group>
                                                <Form.Label>Tài khoản:</Form.Label>
                                                <Form.Control
                                                    readOnly
                                                    defaultValue={'0001'} // Tên tài khoản
                                                />
                                            </Form.Group>
                                        </Col> */}
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Họ và tên:</Form.Label>
                                                    <Form.Control
                                                        readOnly
                                                        defaultValue={staff.employeeName} // tên khách hàng
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Chuyên môn:</Form.Label>
                                                    <Form.Control
                                                        readOnly
                                                        defaultValue={checkSpecialty(staff.specialtyId)} // thời gian
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Số điện thoại:</Form.Label>
                                                    <Form.Control
                                                        readOnly
                                                        defaultValue={staff.employeePhoneNumber} // Số điện thoại
                                                    />
                                                </Form.Group>
                                            </Col>
                                            {/* <Col>
                                            <Form.Group>
                                                <Form.Label>Số địa chỉ:</Form.Label>
                                                <Form.Control
                                                    readOnly
                                                    defaultValue={'23/24 Nguyễn Văn Hoàng'} // Địa chỉ
                                                />
                                            </Form.Group>
                                        </Col> */}
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Email:</Form.Label>
                                                    <Form.Control
                                                        readOnly
                                                        defaultValue={staff.email} // Email
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
                        </Card.Body>
                    </Card>

                    {/* Lịch làm việc của nhân viên */}
                    <Card className="staff-booking-container">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Title>Lịch làm việc của nhân viên</Card.Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {/* Trạng Thái dịch vụ */}
                                    <InputGroup>
                                        <InputGroup.Text>
                                            Từ ngày:
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="date"
                                            name="status"
                                            value={startDate}
                                            onChange={(e) => {
                                                setStartDate(e.target.value);
                                            }}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col>
                                    {/* Thứ tự */}
                                    <InputGroup>
                                        <InputGroup.Text>
                                            Đến ngày:
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="date"
                                            name="status"
                                            value={endDate}
                                            onChange={(e) => {
                                                setEndDate(e.target.value);
                                            }}
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>

                            <Row className="table-filter-container mt-2">
                                <Col>
                                    <div className="box-container">
                                        <div className="box" />
                                        <span>Không có lịch làm việc</span>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="box-container">
                                        <div className="box box-checked" />
                                        <span>Đã có đơn</span>
                                    </div>
                                </Col>
                                <Col xs={5}>
                                    <div className="box-container">
                                        <div className="box box-day-off" />
                                        <span>
                                            Xin nghỉ
                                        </span>
                                    </div>
                                </Col>
                            </Row>

                            {/* Lịch làm việc nhân viên */}
                            <Row className="mt-2">
                                <Col className="table-container">
                                    <Table bordered>
                                        <thead>
                                            <tr>
                                                <th className="date-th"> Thời gian biểu</th>
                                                {slots.map((slot, index) => {
                                                    return (
                                                        <th key={slot} className="slot-th">
                                                            Slot {slot} <br />
                                                            {slotTimes[index]}
                                                        </th>
                                                    );
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{moment().format("MM/DD/YYYY")}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Card>
            </Container>
        </>
    );
}

export default StaffDetail;