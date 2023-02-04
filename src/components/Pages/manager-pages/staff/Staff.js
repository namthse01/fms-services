import React, { useEffect, useState } from "react";
import './Staff.scss';
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

//Icons
import RefreshIcon from '@mui/icons-material/Refresh';
import BorderColorIcon from '@mui/icons-material/BorderColor';

//Api
import { useGetAllStaffsQuery } from "../../../../services/slices/staff/staffApi";

import CustomPagination from "../../../customPagination/CustomPagination";

const Staff = () => {

    //local state
    const navigate = useNavigate();
    const [active, setActive] = useState(1);
    const [staffs, setStaffs] = useState([]);

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
        data: staffsData = [],
        refetch: refetch,
        isFetching: isFetching,
    } = useGetAllStaffsQuery();

    useEffect(() => {
        if (!isFetching) {

            if (sort === "asc") {
                setStaffs(staffsData.filter((x) => x.employeeName.includes(search)));
            } else {
                setStaffs(staffsData.filter((x) => x.employeeName.includes(search)).reverse());
            }
        }
    }, [isFetching]);

    const checkStatus = (status) => {
        if (status === true) {
            return "Đang có đơn";
        }

        if (status === false) {
            return "Đang trống đơn";
        }

        return "";
    };



    return (
        <React.Fragment>
            <Container fluid className="staff-container">
                <Card body className="staff-content-container">
                    <Row>
                        <Col>
                            <Card.Title>Danh sách nhân viên</Card.Title>
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-end justify-content-between">
                        <Col xs={6}>
                            <Form.Label>Tìm kiếm theo tên nhân viên:</Form.Label>
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
                                            <th>Tên nhân viên</th>
                                            <th>Số điện thoại</th>
                                            <th>Chuyên môn</th>
                                            <th>Trạng thái</th>
                                            {/* <th>Hành động</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staffs
                                            .slice(5 * (active - 1), 5 * active)
                                            .map((staff, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{staff.employeeName}</td>
                                                        <td>{staff.employeePhoneNumber}</td>
                                                        <td>{staff.specialtyName}</td>
                                                        <td>{checkStatus(staff.workingStatus)}</td>
                                                        {/* <td>
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

                                                               
                                                                    <Button
                                                                        onClick={() => {
                                                                            navigate('/manager/staff-detail/' + staff.employeeId);
                                                                        }}
                                                                    >
                                                                        <BorderColorIcon />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            </div>
                                                        </td> */}
                                                    </tr>
                                                )
                                            })

                                        }
                                    </tbody>
                                </Table>
                            )}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <CustomPagination
                                count={Math.ceil(staffs.length / 5)}
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

export default Staff