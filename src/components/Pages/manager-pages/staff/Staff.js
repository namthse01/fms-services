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
                if (search == "") {
                    setStaffs(staffsData.filter((x) => JSON.stringify(x.specialtyId) == fileterSpecialty.specialtyId))
                } else {
                    setStaffs(staffsData.filter((x) => x.employeeName.includes(search) && JSON.stringify(x.specialtyId) == fileterSpecialty.specialtyId));
                }
            } else {
                if (search == "") {
                    setStaffs(staffsData.filter((x) => JSON.stringify(x.specialtyId) == fileterSpecialty.specialtyId).reverse())
                }
                else {
                    setStaffs(staffsData.filter((x) => x.employeeName.includes(search) && JSON.stringify(x.specialtyId) == fileterSpecialty.specialtyId).reverse());
                }
            }
        }
    }, [isFetching]);

    const [fileterSpecialty, setFilterSpecialty] = useState({
        specialtyId: "1",
    });
    const handleFilterSpecialtyChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFilterSpecialty({ ...fileterSpecialty, [name]: value });
        refetch()
    };

    const checkStatus = (status) => {
        if (status === true) {
            return "??ang c?? ????n";
        }

        if (status === false) {
            return "??ang tr???ng ????n";
        }
        return "";
    };



    return (
        <React.Fragment>
            <Container fluid className="staff-container">
                <Card body className="staff-content-container">
                    <Row>
                        <Col>
                            <Card.Title>Danh s??ch nh??n vi??n</Card.Title>
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-end justify-content-between">
                        <Col xs={6}>
                            <Form.Label>T??m ki???m theo t??n nh??n vi??n:</Form.Label>
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
                        <Col>
                            <Form.Label>Tr???ng Th??i:</Form.Label>
                            <Form.Control
                                as="select"
                                name="specialtyId"
                                value={fileterSpecialty.specialtyId}
                                onChange={handleFilterSpecialtyChange}
                            >
                                <option value="1">Th??? G???</option>
                                <option value="2">Th??? Kim Lo???i</option>
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
                        <Col xs={2}>
                            <Button
                                // disabled={isFetching}
                                style={{ width: "100%" }}
                                variant="dark"
                                onClick={() => {
                                    refetch();
                                }}
                            >
                                T???i l???i d??? li???u{" "}
                                <RefreshIcon />
                            </Button>
                        </Col>
                    </Row>

                    {/* Danh s??ch ????n */}
                    <Row className="mt-2">
                        <Col className="table-container">
                            {isFetching ? (<div className="loading">
                                <Spinner animation="border" />
                                <div className="loading-text">??ang t???i d??? li???u...</div>
                            </div>) : (
                                <Table bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>T??n nh??n vi??n</th>
                                            <th>S??? ??i???n tho???i</th>
                                            <th>Chuy??n m??n</th>
                                            <th>Tr???ng th??i</th>
                                            {/* <th>H??nh ?????ng</th> */}
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
                                                                            Xem chi ti???t
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