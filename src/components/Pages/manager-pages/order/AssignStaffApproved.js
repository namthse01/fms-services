import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AssignStaffApproved.scss"

//React-bootstrap
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    FormControl,
    Row,
    Table,
    InputGroup,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";

//Icons
import RefreshIcon from '@mui/icons-material/Refresh';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

//API 
import { useGetAllStaffsQuery } from "../../../../services/slices/staff/staffApi";
import { usePostAssignOrderMutation } from "../../../../services/slices/order/orderApi";


const AssignStaffApproved = () => {

    //API
    const {
        data: staffsData = [],
        isFetching: isFetching,
        refetch
    } = useGetAllStaffsQuery();

    //local state
    const navigate = useNavigate();
    const [active, setActive] = useState(1);
    const { orderId } = useParams();

    //Staff
    const [staffs, setStaffs] = useState([]);
    const [staffList, setStaffList] = useState({
        managerId: '',
        orderID: '',
        employeeIds: [],

    });

    //Work Status
    const [filterStaffWorkStatus, setfilterStaffWorkStatus] = useState({
        status: "false",
    });

    //Work Status
    const handleFilterStaffWorkChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setfilterStaffWorkStatus({ ...filterStaffWorkStatus, [name]: value });
        refetch()
    };

    const [search, setSearch] = useState("");

    const handleSearch = () => {
        setActive(1);
        refetch();
    };

    useEffect(() => {
        if (!isFetching) {
            if (search == "") {
                setStaffs(staffsData.filter((x) => JSON.stringify(x.workingStatus) == filterStaffWorkStatus.status))
            }
            else {
                setStaffs(staffsData.filter((x) => x.employeeName.includes(search) && JSON.stringify(x.workingStatus) == filterStaffWorkStatus.status));
            }
        }
    }, [isFetching]);




    //Assign Employee API
    const [assignEmployee] = usePostAssignOrderMutation();

    //Handle Assign
    const changeButtonIcon = (employeeId) => {
        let tempStaffList = [...staffs]
        const tempIndex = tempStaffList.findIndex(staff => staff.employeeId === employeeId);

        let tempStaff = staffs.find((x) => x.employeeId === employeeId);

        tempStaff = {
            ...tempStaff, workingStatus: !tempStaff.workingStatus
        }

        tempStaffList[tempIndex] = tempStaff;

        setStaffs([...tempStaffList]);

        setStaffList({
            employeeIds: [...staffList.employeeIds, { employeeId }],
            orderID: orderId,
        })
    }


    const handleAssign = async () => {
        if (staffList.employeeIds.length > 0) {
            try {
                await assignEmployee(staffList)
                    .unwrap()
                    .then((res) => {
                        (
                            navigate("/manager/order-approved/" + orderId)
                        )
                    })
            } catch (error) {
                console.log("Show error: ", error)
            }
        } else {
            navigate("/manager/order-approved/" + orderId)
        }
    }

    return (
        <>
            <Container fluid className="assign-staff-container">

                {/* Danh s??ch nh??n vi??n  */}

                <Card className="staff-table-container">
                    <Card.Body>
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
                                <Form.Label>Tr???ng Th??i c???a th???:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="status"
                                    value={filterStaffWorkStatus.status}
                                    onChange={handleFilterStaffWorkChange}
                                >
                                    <option value="false">Tr???ng ????n</option>
                                    <option value="true">??ang c?? ????n</option>
                                </Form.Control>
                            </Col>
                            <Col xs={2}>
                                <Button
                                    disabled={isFetching}
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
                                <Table bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>T??n nh??n vi??n</th>
                                            <th>S??? ??i???n tho???i</th>
                                            <th>Chuy??n m??n</th>
                                            <th>H??nh ?????ng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staffs
                                            .map((staff, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index}</td>
                                                        <td>{staff.employeeName}</td>
                                                        <td>{staff.employeePhoneNumber}</td>
                                                        <td>{staff.specialtyName}</td>
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
                                                                            th??m v??o ????n h??ng
                                                                        </Tooltip>
                                                                    }
                                                                >

                                                                    {/* Assign to order */}
                                                                    <Button
                                                                        onClick={() => changeButtonIcon(staff.employeeId)
                                                                        }
                                                                    >
                                                                        {staff.workingStatus ? <PersonAddAlt1Icon /> : <PersonRemoveIcon />}
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
                        </Row>
                    </Card.Body>

                    {/* Confirm assign success */}
                    <Card.Footer>
                        <Row>
                            <Col className="d-flex flex-row-reverse">
                                <Button
                                    onClick={() => {
                                        handleAssign()
                                        // navigate('/manager/order-detail/' + orderId);
                                    }}
                                >
                                    X??c nh???n
                                </Button>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>

            </Container>
        </>
    );

}

export default AssignStaffApproved;