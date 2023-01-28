import React, { useEffect, useState } from "react";
import './Customer.scss';
import { useNavigate } from "react-router-dom";

import {
    Button,
    Card,
    Col,
    Container,
    Form,
    FormControl,
    InputGroup,
    OverlayTrigger,
    Row,
    Table,
    Tooltip,
    Spinner,
} from "react-bootstrap";
import RefreshIcon from '@mui/icons-material/Refresh';
import BorderColorIcon from '@mui/icons-material/BorderColor';

//Api
import { useGetAllCustomersQuery } from "../../../../services/slices/customer/customerApi";


import CustomPagination from "../../../customPagination/CustomPagination";


const Customer = () => {

    // local state
    const navigate = useNavigate();
    const [active, setActive] = useState(1);
    const [Customers, setCustomers] = useState([]);


    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("desc");


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

    //Api
    const {
        data: customersData = [],
        refetch: refetch,
        isFetching: isFetching,
    } = useGetAllCustomersQuery();

    useEffect(() => {
        if (!isFetching) {
            if (sort === "asc") {

                setCustomers(customersData.filter((x) => x.customerName.includes(search)));
            } else {
                setCustomers(customersData.filter((x) => x.customerName.includes(search)).reverse());
            }
        }
    }, [isFetching]);

    return (
        <React.Fragment>
            <Container fluid className="customer-container">
                <Card body className="customer-content-container">
                    <Row>
                        <Col>
                            <Card.Title>Danh sách khách hàng</Card.Title>
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-end justify-content-between">
                        <Col xs={6}>
                            <Form.Label>Tìm kiếm theo tên khách hàng:</Form.Label>
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
                        <Col xs={2}>
                            <Button
                                // disabled={isFetching}
                                style={{ width: "100%" }}
                                variant="dark"
                                onClick={() => {
                                    refetch();
                                }}
                            >
                                Tải lại dữ liệu{" "}
                                <RefreshIcon />
                            </Button>
                        </Col>
                    </Row>

                    {/* Danh sách đơn */}
                    <Row className="mt-2">
                        <Col className="table-container">
                            {isFetching ? (<div className="loading">
                                <Spinner animation="border" />
                                <div className="loading-text">Đang tải dữ liệu...</div>
                            </div>) : (
                                <Table bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Mã số khách hàng</th>
                                            <th>Tên Khách hàng</th>
                                            <th>Số điện thoại</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Customers
                                            .slice(5 * (active - 1), 5 * active)
                                            .map((customer, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{customer.customerId}</td>
                                                        <td>{customer.customerName}</td>
                                                        <td>{customer.customerPhone}</td>
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
                                                                    {/* navigate to staff detail */}
                                                                    <Button
                                                                        onClick={() => {
                                                                            navigate('/manager/customer-detail/' + customer.customerPhone);
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
                                </Table>)
                            }
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <CustomPagination
                                count={Math.ceil(Customers.length / 5)}
                                handlePaginationClick={handlePaginationClick}
                                page={active}
                            />
                        </Col>
                    </Row>
                </Card>
            </Container>
        </React.Fragment>
    )

}

export default Customer;