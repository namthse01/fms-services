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
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';

//Api
import { useGetStaffDayOffQuery } from "../../../../services/slices/staff/staffApi";

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

    //Status dayy Off change 
    const handleFilterStatusChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setfilterDayoffStatus({ ...filterDayoffStatus, [name]: value });
    };


    //Api
    const {
        data: staffsData = [],
        refetch: refetch,
        isFetching: isFetching,
    } = useGetStaffDayOffQuery();

    useEffect(() => {
        if (!isFetching) {
            setStaffs(staffsData)
        }
    }, [isFetching]);


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
                            <Form.Label>Tìm kiếm theo tên:</Form.Label>
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    name="search"
                                />
                                <Button>
                                    Tìm kiếm
                                </Button>
                            </InputGroup>
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
                                <option value="2">Từ chối</option>
                                <option value="3">Đã duyệt</option>
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
                                            <th>Id nhân viên</th>
                                            {/* <th>Số điện thoại</th> */}
                                            <th>Ngày nghỉ</th>
                                            <th>Lý Do</th>
                                            <th>Trạng thái đơn xin nghỉ</th>
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
                                                        <td>{staff.id}</td>
                                                        {/* <td>{staff.employeePhoneNumber}</td> */}
                                                        <td>{moment(staff.dayOff).format("MM/DD/YYYY")}</td>
                                                        <td>{staff.reason}</td>
                                                        <td></td>
                                                        <td>
                                                            <CheckCircleIcon />
                                                        </td>
                                                        <td>
                                                            <UnpublishedIcon />
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
        </React.Fragment>
    )
}

export default StaffDayOff