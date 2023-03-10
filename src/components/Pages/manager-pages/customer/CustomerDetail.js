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

    const handleFilterStatusChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setfilterWorking({ ...filterWorking, [name]: value });
        refetch()
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
                                        Th??ng tin kh??ch h??ng
                                    </Card.Title>
                                </Col>
                            </Row>

                            {/* T???i d??? li???u khi c?? api */}

                            <Row>
                                <Col>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>H??? v?? t??n:</Form.Label>
                                                    <Form.Control
                                                        readOnly
                                                        defaultValue={customerName} // t??n kh??ch h??ng
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>S??? ??i???n tho???i:</Form.Label>
                                                    <Form.Control
                                                        readOnly
                                                        defaultValue={customerPhone} // S??? ??i???n tho???i
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Row>
                                                    <Col>
                                                        <Form.Label>???nh ?????i di???n:</Form.Label>
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
                                    <Card.Title>L???ch s??? d???ch v???</Card.Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {/* Tr???ng Th??i d???ch v??? */}
                                    <Form.Label>Tr???ng Th??i:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="status"
                                        value={filterWorking.status}
                                        onChange={handleFilterStatusChange}
                                    >
                                        <option value="6">Ho??n t???t ????n</option>
                                        <option value="1">???? ti???p nh???n</option>
                                        <option value="1002">H???y</option>
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label>Th??? t???:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="sort"
                                        value={sort}
                                        onChange={handleSort}
                                    >
                                        <option value="asc">C?? ?????n m???i</option>
                                        <option value="desc">M???i ?????n c??</option>
                                    </Form.Control>
                                </Col>
                                <Col xs={6}>
                                    <Form.Label>T??m ki???m theo t??n:</Form.Label>
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
                                            T??m ki???m
                                        </Button>
                                    </InputGroup>
                                </Col>
                            </Row>

                            {/* Danh s??ch ????n */}
                            <Row className="mt-2">
                                {isFetching ? (<div className="loading">
                                    <Spinner animation="border" />
                                    <div className="loading-text">??ang t???i d??? li???u...</div>
                                </div>) : (
                                    <Col className="table-container">
                                        <Table bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>M?? ????n</th>
                                                    <th>T??n kh??ch h??ng</th>
                                                    <th>S??? ??i???n tho???i</th>
                                                    <th>Th???i gian t???o</th>
                                                    <th>Chi ti???t</th>
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
                                                                                    Xem chi ti???t
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