import React, { useEffect, useState } from "react";
import './Services.scss';
//React-bootstrap
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    FormControl,
    InputGroup,
    Row,
    Table,
    Spinner,
    Modal
} from "react-bootstrap";

//Icons
import RefreshIcon from '@mui/icons-material/Refresh';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate } from "react-router-dom";

//Api
import { usePostCreateServiceMutation, useGetAllServicesQuery } from "../../../../services/slices/serves/servesApi";

//pagination
import CustomPagination from "../../../customPagination/CustomPagination";

//Momentjs
import moment from "moment";

const Services = () => {

    // local state
    const [active, setActive] = useState(1);

    //pageination

    const handlePaginationClick = (number) => {
        refetch();

        setActive(number);
    };

    //Service Data
    const [services, setServices] = useState([]);

    const {
        data: serviceData = [],
        refetch,
        isFetching,
    } = useGetAllServicesQuery();

    useEffect(() => {
        if (!isFetching) {
            setServices(serviceData);
        }
    }, [isFetching]);

    //Create Serivce
    const [addNewService, setNewService] = useState({
        serviceName: "",
        serviceDescription: "",
        price: "",
        type: "",
        "categoryId": 0,
        createAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updateAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
    const [newService] = usePostCreateServiceMutation();
    const [showCreateService, setShowCreateService] = useState(false);

    const handleCreate = async () => {
        try {
            await newService(addNewService)
                .unwrap()
        } catch (error) {
            console.log("Show error: ", error)
        }
    }

    const [validation, setValidation] = useState({
        serviceName: {
            message: "",
            isInvalid: false,
        },
        serviceDescription: {
            message: "",
            isInvalid: false,
        },
        description: {
            message: "",
            isInvalid: false,
        },
        time: {
            message: "",
            isInvalid: false,
        },
        slot: {
            message: "",
            isInvalid: false,
        },
        street: {
            message: "",
            isInvalid: false,
        },
    });

    const handleCreateServiceChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name == "serviceName") {
            if (value === "") {
                setNewService({ ...addNewService, [name]: value });
                setValidation({
                    ...validation,
                    serviceName: {
                        message: "Tên dịch vụ không được để trống",
                        isInvalid: true,
                    },
                });
                return;
            } else {
                setNewService({ ...addNewService, [name]: value });
                setValidation({
                    ...validation,
                    serviceName: {
                        message: "",
                        isInvalid: false,
                    },
                });
                return;
            }
        }

        if (name == "serviceDescription") {
            if (value.length > 200) {
                setNewService({ ...addNewService, [name]: value });
                setValidation({
                    ...validation,
                    serviceName: {
                        message: "Số lượng từ quá giới hạn",
                        isInvalid: true,
                    },
                });
                return;
            } else {
                setNewService({ ...addNewService, [name]: value });
                setValidation({
                    ...validation,
                    serviceName: {
                        message: "",
                        isInvalid: false,
                    },
                });
                return;
            }
        }
    }

    return (

        < React.Fragment >
            <Container fluid className="service-main-container">
                <Card body className="service-content-container">
                    <Row>
                        <Col>
                            <Card.Title>Danh sách đơn</Card.Title>
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
                        <Col xs={6}>
                            <Button onClick={() => {
                                setShowCreateService(true);
                            }} >
                                Tạo dịch vụ mới
                            </Button>
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
                        {isFetching ? (<div className="loading">
                            <Spinner animation="border" />
                            <div className="loading-text">Đang tải dữ liệu...</div>
                        </div>) : (
                            <Col className="table-container">
                                <Table bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Mã dịch vụ</th>
                                            <th>Tên dịch vụ</th>
                                            <th>Mô tả dịch vụ</th>
                                            <th>Giá cả</th>
                                            <th>Thời gian tạo</th>
                                            <th>Thời gian cập nhật</th>
                                            <th>Loại dịch vụ</th>
                                            <th>Cập nhật</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {services
                                            .slice(10 * (active - 1), 10 * active)
                                            .map((service, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{service.serviceId}</td>
                                                        <td>{service.serviceName}</td>
                                                        <td>{service.serviceDescription}</td>
                                                        <td>{service.price}</td>
                                                        <td>
                                                            {moment(service.createAt).format("MM/DD/YYYY")}
                                                        </td>
                                                        <td>
                                                            {moment(service.updateAt).format("MM/DD/YYYY")}
                                                        </td>
                                                        <td>{service.categoryName}</td>
                                                        <td>Cập nhật</td>
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
                                count={Math.ceil(services.length / 10)}
                                handlePaginationClick={handlePaginationClick}
                                page={active}
                            />
                        </Col>
                    </Row>
                </Card>
            </Container>

            {/*Đổi trạng thái đơn */}
            < Modal
                show={showCreateService}
                onHide={() => {
                    setShowCreateService(false);
                }}
                centered
                dialogClassName="change-status-modal"
            >
                <Modal.Body>
                    <Row>
                        <Col>
                            <Card.Title>Tạo dịch vụ mới</Card.Title>
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-end justify-content-between">
                        <Col>
                            <Form.Group controlId="formCreateBookingDescription">
                                <Form.Label>
                                    Tên dịch vụ
                                </Form.Label>
                                <Form.Control
                                    isInvalid={validation.description.isInvalid}
                                    as="textarea"
                                    rows={5}
                                    name="description"
                                    onChange={handleCreateServiceChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {validation.description.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShowCreateService(false);
                        }}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShowCreateService(false);
                            handleCreate()
                        }}
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal >
        </React.Fragment >
    );
}

export default Services;