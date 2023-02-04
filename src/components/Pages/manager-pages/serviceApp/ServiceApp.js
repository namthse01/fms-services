import React, { useEffect, useState } from "react";
import './serviceApp.scss';
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
    Tooltip,
    Spinner,
    Modal
} from "react-bootstrap";

//Icons
import RefreshIcon from '@mui/icons-material/Refresh';

//Api
import { useGetAllServicesQuery, usePostCreateServiceMutation } from "../../../../services/slices/serves/servesApi";


import CustomPagination from "../../../customPagination/CustomPagination";

//Momentjs
import moment from "moment";

const ServiceApp = () => {

    // local state
    const [active, setActive] = useState(1);
    const [services, setServices] = useState([]);
    const [filterCategory, setfilterWorking] = useState({
        categoryName: "Vệ sinh",
    });

    const {
        data: servicesData = [],
        refetch,
        isFetching,
    } = useGetAllServicesQuery();

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("desc");

    //pageination

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
            if (search == "") {
                setServices(servicesData.filter((x) => x.categoryName == filterCategory.categoryName))
            }
            else {
                setServices(servicesData.filter((x) => x.serviceName.includes(search) && x.categoryName == filterCategory.categoryName).reverse());
            }

        }
    }, [isFetching]);

    const handleFilterCategoryChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setfilterWorking({ ...filterCategory, [name]: value });
        refetch()
    };


    //Category change
    const [showChangeServicesCategory, setShowCreateService] = useState(false);
    const [filterCreateCategory, setfilterCreateCategoryChange] = useState({
        categoryId: "1",
    });

    const [createCategoryData, setCreateCategoryData] = useState({
        serviceName: "",
        serviceDescription: "",
        price: "",
        type: "",
        categoryId: "",
    })

    const handleCreateServiceChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setfilterCreateCategoryChange({ ...filterCreateCategory, [name]: value });
        setCreateCategoryData({ ...createCategoryData, categoryId: value })
    };

    const [serviceCreateData] = usePostCreateServiceMutation();

    const createService = async () => {
        if (createCategoryData.serviceName != "" && createCategoryData.price != "" && createCategoryData.categoryId != "") {
            try {
                await serviceCreateData(createCategoryData)
                refetch()
            } catch (error) {
                console.log("Show error: ", error)
            }
        } else {
            alert("Không thể để trống")
        }
    }


    return (

        < React.Fragment >
            <Container fluid className="order-main-container">
                <Card body className="order-content-container">
                    <Row>
                        <Col>

                            <Card.Title>Danh sách đơn</Card.Title>
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-end justify-content-between">
                        <Col xs={6}>
                            <Form.Label>Tìm kiếm theo tên dịch vụ:</Form.Label>
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
                            <Form.Label>Chọn loại dịch vụ:</Form.Label>
                            <Form.Control
                                as="select"
                                name="categoryName"
                                value={filterCategory.categoryName}
                                onChange={handleFilterCategoryChange}
                            >
                                <option value="Sửa chữa">Sửa chữa</option>
                                <option value="Vệ sinh">Vệ sinh</option>
                            </Form.Control>
                        </Col>
                        <Col xs={2}>
                            <Button
                                // disabled={isFetching}
                                style={{ width: "100%" }}
                                onClick={() => {
                                    setShowCreateService(true)
                                }}
                            >
                                Tạo dịch vụ
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
                                            <th>Tên dịch vụ</th>
                                            <th>Mô tả</th>
                                            <th>Giá tiền</th>
                                            <th>Loại dịch vụ</th>
                                            <th>Ngày tạo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {services
                                            .slice(5 * (active - 1), 5 * active)
                                            .map((service, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{service.serviceName}</td>
                                                        <td>{service.serviceDescription}</td>
                                                        <td>{service.price}</td>
                                                        <td>{service.categoryName}</td>
                                                        <td>
                                                            {moment(service.createAt).format("MM/DD/YYYY")}
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
                                count={Math.ceil(services.length / 5)}
                                handlePaginationClick={handlePaginationClick}
                                page={active}
                            />
                        </Col>
                    </Row>
                </Card>
            </Container>

            {/*Đổi trạng thái đơn */}
            < Modal
                show={showChangeServicesCategory}
                onHide={() => {
                    setShowCreateService(false);
                }}
                centered
                dialogClassName="change-status-modal"
            >
                <Modal.Body>
                    <Row>
                        <Col>
                            <Card.Title>Trạng thái đơn</Card.Title>
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-end justify-content-between">
                        <Col>
                            <Form.Label>Chọn loại dịch vụ:</Form.Label>
                            <Form.Control
                                as="select"
                                name="categoryId"
                                value={filterCreateCategory.categoryId}
                                onChange={handleCreateServiceChange}
                            >
                                <option value="1">Sửa chữa</option>
                                <option value="2">Vệ sinh</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-end justify-content-between">
                        <Col>
                            <Form.Label>Tên dịch vụ:</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    name="serviceName"
                                    onChange={(e) => {
                                        setCreateCategoryData({ ...createCategoryData, serviceName: e.target.value });
                                    }}
                                />
                            </InputGroup>
                            <Form.Label>Mô tả dịch vụ:</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    name="servcieDescription"
                                    onChange={(e) => {
                                        setCreateCategoryData({ ...createCategoryData, serviceDescription: e.target.value });
                                    }}
                                />
                            </InputGroup>
                            <Form.Label>Giá tiền:</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    name="price"
                                    onChange={(e) => {
                                        setCreateCategoryData({ ...createCategoryData, price: e.target.value });
                                    }}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShowCreateService(false);
                            createService()
                        }}
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal >
        </React.Fragment >
    );
}

export default ServiceApp;