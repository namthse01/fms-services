import React, { useEffect, useState } from "react";
import './StaffDayOff.scss';
import { useNavigate } from "react-router-dom";
import moment from "moment";

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
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

//Api
import { useGetStaffDayOffQuery, usePutStaffDayOffMutation, usePutStaffDayOffCancelMutation } from "../../../../services/slices/staff/staffApi";

import CustomPagination from "../../../customPagination/CustomPagination";

const StaffDayOff = () => {

    //local state
    const navigate = useNavigate();
    const [active, setActive] = useState(1);
    const [staffs, setStaffs] = useState([]);
    const [filterDayoffStatus, setfilterDayoffStatus] = useState({
        status: "1",
    });

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("desc");

    //Api
    const {
        data: staffsData = [],
        refetch: refetch,
        isFetching: isFetching,
    } = useGetStaffDayOffQuery();

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

    useEffect(() => {
        if (!isFetching) {
            if (sort === "asc") {
                if (search == "") {
                    setStaffs(staffsData.filter((x) => x.status == filterDayoffStatus.status))
                }
                else {
                    setStaffs(staffsData.filter((x) => x.employee.employeeName.includes(search) && x.status == filterDayoffStatus.status));
                }

            } else {
                if (search == "") {
                    setStaffs(staffsData.filter((x) => x.status == filterDayoffStatus.status).reverse())
                }
                else {
                    setStaffs(staffsData.filter((x) => x.employee.employeeName.includes(search) && x.status == filterDayoffStatus.status).reverse());
                }
            }
        }
    }, [isFetching]);

    //Status dayy Off change 
    const handleFilterStatusChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setStatusData({ ...statusData, status: value })
        setfilterDayoffStatus({ ...filterDayoffStatus, [name]: value });
        refetch()
    };

    //Dayoff
    const [statusData, setStatusData] = useState({
        id: "",
        status: "",
    })

    const [changeDayOffStatus] = usePutStaffDayOffMutation();
    const [changeDayOffStatusCancel] = usePutStaffDayOffCancelMutation();


    const changetatus = async (id) => {
        try {
            await changeDayOffStatus(id)
                .unwrap()
                .then(
                    refetch()
                )
        } catch (error) {
            console.log("Show error: ", error)
        }
    }

    const changetatusCancel = async (id) => {
        try {
            await changeDayOffStatusCancel(id)
                .unwrap()
                .then(
                    refetch()
                )
        } catch (error) {
            console.log("Show error: ", error)
        }
    }

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
                        <Col>
                            <Form.Label>Trạng Thái:</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={filterDayoffStatus.status}
                                onChange={handleFilterStatusChange}
                            >
                                <option value="1">Chờ duyệt</option>
                                <option value="3">Đã duyệt</option>
                                <option value="4">Từ chối</option>

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
                                            <th>Ngày nghỉ</th>
                                            <th>Lý Do</th>
                                            <th>Đồng ý</th>
                                            <th>Từ chối</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staffs
                                            .slice(5 * (active - 1), 5 * active)
                                            .map((staff, index) => {
                                                return (

                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{staff.employee.employeeName}</td>
                                                        <td>{staff.employee.employeePhoneNumber}</td>
                                                        <td>{moment(staff.dayOff).format("MM/DD/YYYY")}</td>
                                                        <td>{staff.reason}</td>
                                                        <td>
                                                            <Button
                                                                onClick={() => {
                                                                    changetatus(staff.id, staff.status)
                                                                    // navigate('/manager/order-detail/' + orderId);
                                                                }}
                                                            >
                                                                <PersonAddAlt1Icon />
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                onClick={() => {
                                                                    changetatusCancel(staff.id)
                                                                    // navigate('/manager/order-detail/' + orderId);
                                                                }}
                                                            >
                                                                <PersonRemoveIcon />
                                                            </Button>
                                                        </td>
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
        </React.Fragment >
    )
}

export default StaffDayOff