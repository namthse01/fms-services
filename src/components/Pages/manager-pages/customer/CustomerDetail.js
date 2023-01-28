import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//React-bootstrap
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
    Table,
    InputGroup,
    OverlayTrigger,
    Tooltip,
    Spinner
} from "react-bootstrap";

//Images
import defaultUserAvatar from "../../../../assets/images/login.png";

//Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BorderColorIcon from '@mui/icons-material/BorderColor';

// CSS
import './CustomerDetail.scss'
import { Avatar } from "@mui/material";

//API
import { useGetCustomerByPhoneNumbQuery } from "../../../../services/slices/customer/customerApi";

import CustomPagination from "../../../customPagination/CustomPagination";

//Momentjs
import moment from "moment";

const CustomerDetail = () => {

    //local state
    const navigate = useNavigate();
    const [active, setActive] = useState(1);
    const [customerName, setCustomerName] = useState([]);
    const [customerPhone, setCustomerPhone] = useState([]);
    const customerPhoneNumb = useParams();
    const [orders, setOrder] = useState([]);

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("desc");

    const [filterWorking, setfilterWorking] = useState({
        status: "1",
    });



    const handlePaginationClick = (number) => {
        refetch();
        setActive(number);
    };

    const handleSearch = () => {
        setActive(1);
        refetch();
    };


    const handleSort = (e) => {
        setSort(e.target.value);
        setActive(1);
        refetch();
    };


    //API
    const {
        data: customerDetailData = [],
        refetch: refetch,
        isFetching: isFetching,
        error,
    } = useGetCustomerByPhoneNumbQuery(customerPhoneNumb.customerPhone);

    useEffect(() => {
        if (!isFetching) {
            setCustomerName(customerDetailData[0].customerName)
            setCustomerPhone(customerDetailData[0].customerPhone)
            setOrder(customerDetailData[0].orders)

            if (sort === "asc") {
                if (search == "") {
                    setOrder(customerDetailData[0].orders.filter((x) => x.statusId == filterWorking.status))
                }
                else {
                    setOrder(customerDetailData[0].orders.filter((x) => JSON.stringify(x.orderId).includes(search) && x.workingStatusId == filterWorking.status));
                }

            } else {
                if (search == "") {
                    setOrder(customerDetailData[0].orders.filter((x) => x.workingStatusId == filterWorking.status).reverse())
                }
                else {
                    setOrder(customerDetailData[0].orders.filter((x) => JSON.stringify(x.orderId).includes(search) && x.workingStatusId == filterWorking.status).reverse());
                }
            }
        }
    }, [isFetching]);

    console.log("Orders:", orders);

    const handleFilterStatusChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setfilterWorking({ ...filterWorking, [name]: value });
    };

    return (
        <>
            <Container fluid >
                <Card className="customer-detail-container">
                    <Card className="customer-info-container">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Title>
                                        <ArrowBackIcon onClick={() => {
                                            navigate('/manager/customer');
                                        }} />
                                        Thông tin khách hàng
                                    </Card.Title>
                                </Col>
                            </Row>

                            {/* Tải dữ liệu khi có api */}

                            <Row>
                                <Col>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Họ và tên:</Form.Label>
                                                    <Form.Control
                                                        readOnly
                                                        defaultValue={customerName} // tên khách hàng
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Số điện thoại:</Form.Label>
                                                    <Form.Control
                                                        readOnly
                                                        defaultValue={customerPhone} // Số điện thoại
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
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
                                    </Col>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <Card className="order-booking-container">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Title>Lịch sử dịch vụ</Card.Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {/* Trạng Thái dịch vụ */}
                                    <Form.Label>Trạng Thái:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="status"
                                        value={filterWorking.status}
                                        onChange={handleFilterStatusChange}
                                    >
                                        <option value="6">Hoàn tất đơn</option>
                                        <option value="1">Đã tiếp nhận</option>
                                        <option value="1002">Hủy</option>
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label>Thứ tự:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="sort"
                                        value={sort}
                                        onChange={handleSort}
                                    >
                                        <option value="asc">Cũ đến mới</option>
                                        <option value="desc">Mới đến cũ</option>
                                    </Form.Control>
                                </Col>
                                <Col xs={6}>
                                    <Form.Label>Tìm kiếm theo tên:</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            name="search"
                                            value={search}
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                            }}
                                        />
                                        <Button
                                            disabled={isFetching}
                                            variant="primary"
                                            onClick={handleSearch}
                                            className="search-button"
                                        >
                                            Tìm kiếm
                                        </Button>
                                    </InputGroup>
                                </Col>
                            </Row>

                            {/* Danh sách đơn */}
                            <Row className="mt-2">
                                {isFetching ? (<div className="loading">
                                    <Spinner animation="border" />
                                    <div className="loading-text">Đang tải dữ liệu...</div>
                                </div>) : (
                                    <Col className="table-container">
                                        <Table bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Mã đơn</th>
                                                    <th>Tên khách hàng</th>
                                                    <th>Số điện thoại</th>
                                                    <th>Thời gian tạo</th>
                                                    <th>Chi tiết</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orders
                                                    .slice(5 * (active - 1), 5 * active)
                                                    .map((order, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{order.orderId}</td>
                                                                <td>{customerName}</td>
                                                                <td>{customerPhone}</td>
                                                                <td> {moment(order.createAt).format("MM/DD/YYYY")}</td>
                                                                <td>
                                                                    <div className="action-button-container">
                                                                        <OverlayTrigger
                                                                            placement="bottom"
                                                                            delay={{ show: 200, hide: 100 }}
                                                                            overlay={
                                                                                <Tooltip
                                                                                    className="customer-edit-button"
                                                                                    id="edit-button-tooltip"
                                                                                >
                                                                                    Xem chi tiết
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            {/* navigate to order detail */}
                                                                            <Button
                                                                                onClick={() => {
                                                                                    navigate('/manager/order-history/' + order.orderId);
                                                                                }}
                                                                            >
                                                                                <BorderColorIcon />
                                                                            </Button>
                                                                        </OverlayTrigger>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Col>
                                )}
                            </Row>
                            <Row className="mt-2">
                                <Col>
                                    <CustomPagination
                                        count={Math.ceil(orders.length / 5)}
                                        handlePaginationClick={handlePaginationClick}
                                        page={active}
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Card>
            </Container>
        </>
    );
}

export default CustomerDetail;