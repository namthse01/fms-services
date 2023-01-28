import React, { useEffect, useState } from "react";
import './Login.scss';
// import loginImg from '../../assets/images/login.png';
import { useNavigate } from "react-router-dom";

//boostrap
//React-bootstrap
import {
    Button,
    Card,
    Col,
    Form,
    Row,
    Spinner,
    Toast,
} from "react-bootstrap";

//logo
import logo from "../../assets/images/login.png";


//API
import { useLoginMutation } from "../../services/slices/auth/authApi";
import {
    // selectCurrentToken,
    // selectCurrentRememberMe,
    setCredentials,
    setRememberMe
} from "../../services/slices/auth/authSlice";

//React-redux
import { useDispatch } from "react-redux";

const Login = () => {

    //Global state
    // const token = useSelector(selectCurrentToken);
    // const rememberMe = useSelector(selectCurrentRememberMe);

    //Utilities
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Local state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState({
        username: {
            message: "",
            isInvalid: false,
        },
        password: {
            message: "",
            isInvalid: false,
        },
    });

    const [toast, setToast] = useState({
        show: false,
        title: "",
        time: "",
        content: "",
        color: {
            header: "",
            body: "",
        },
    });

    //API
    const [login, { isLoading }] = useLoginMutation();



    //Login
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (username === "") {
            setValidation({
                ...validation,
                username: {
                    message: "Tên đăng nhập không được để trống",
                    isInvalid: true,
                },
            });
            return;
        }

        if (password === "") {
            setValidation({
                ...validation,
                password: {
                    message: "Mật khẩu không được để trống",
                    isInvalid: true,
                },
            });
            return;
        }

        if (!validation.username.isInvalid && !validation.password.isInvalid) {
            try {
                await login({ username, password })
                    .unwrap()
                    .then((res) => {

                        if (res) {

                            // if (res.userLoginBasicInformationDto.roleName === "manager" || res.userLoginBasicInformationDto.roleName === "admin") {
                            localStorage.setItem("token", res.accessToken);
                            localStorage.setItem("userLoginBasicInformationDto", JSON.stringify(res.userLoginBasicInformationDto));
                            dispatch(setRememberMe({ rememberMe: true }));
                            dispatch(setCredentials({ ...res, username }));
                            navigate("/manager/order");
                            // } else {
                            //         setValidation({
                            //             ...validation,
                            //             username: {
                            //                 message: "Tài khoản không hợp lệ",
                            //                 isInvalid: true,
                            //             },
                            //         });
                            //         return;
                            //     }
                        }    // }
                    });
            } catch (error) {
                // console.log("ERROR:", error);
                if (error) {

                    if (error.data) {
                        if (error.data === "Tài khoản không tồn tại") {
                            setValidation({
                                ...validation,
                                username: {
                                    message: "Tài khoản không tồn tại",
                                    isInvalid: true,
                                },
                            });
                            return;
                        }
                        if (error.data === "Sai mật khẩu") {
                            setValidation({
                                ...validation,
                                password: {
                                    message: "Mật khẩu không chính xác",
                                    isInvalid: true,
                                },
                            });
                            return;
                        }
                    } else {
                        setToast({
                            show: true,
                            title: "Đăng nhập",
                            time: "just now",
                            content: "Đã xảy ra lỗi. Xin thử lại sau",
                            color: {
                                header: "#ffcccc",
                                body: "#e60000",
                            },
                        });
                    }
                }
            }
        }
    };


    const handleToastClose = () => {
        setToast({ ...toast, show: false });
    };

    return (
        <>
            <div className="login-page">
                <Card style={{ width: "750px" }}>
                    <Row>
                        <Col>
                            <Card.Body>
                                <Card.Title>
                                    <Row>
                                        <Col className="text-center">ĐĂNG NHẬP</Col>
                                    </Row>
                                </Card.Title>
                                <Form onSubmit={handleLoginSubmit} className="loginForm">
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="formBasicUsername">
                                                <Form.Label>Tên tài khoản</Form.Label>
                                                <Form.Control
                                                    isInvalid={validation.username.isInvalid}
                                                    type="text"
                                                    value={username}
                                                    onChange={(e) => {
                                                        setUsername(e.target.value);
                                                        setValidation({
                                                            ...validation,
                                                            username: {
                                                                message: "",
                                                                isInvalid: false,
                                                            },
                                                        });
                                                    }}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {validation.username.message}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Mật khẩu</Form.Label>
                                                <Form.Control
                                                    isInvalid={validation.password.isInvalid}
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => {
                                                        setPassword(e.target.value);
                                                        setValidation({
                                                            ...validation,
                                                            password: {
                                                                message: "",
                                                                isInvalid: false,
                                                            },
                                                        });
                                                    }}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {validation.password.message}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="text-center">
                                            <Button
                                                disabled={isLoading}
                                                className="form-button"
                                                variant="primary"
                                                type="submit"
                                            >
                                                {isLoading ? (
                                                    <Spinner animation="border" />
                                                ) : (
                                                    "ĐĂNG NHẬP"
                                                )}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Col>
                        <Col xs={7} className="logo-container">
                            <img src={logo} />
                        </Col>
                    </Row>
                </Card>
            </div>
            <Toast
                show={toast.show}
                onClose={handleToastClose}
                delay={3000}
                autohide
                animation={false}
            >
                <Toast.Header style={{ backgroundColor: toast.color.header }}>
                    <strong className="mr-auto">{toast.title}</strong>
                    <small>{toast.time}</small>
                </Toast.Header>
                <Toast.Body
                    style={{ backgroundColor: toast.color.body, color: "#ffffff" }}
                >
                    {toast.content}
                </Toast.Body>
            </Toast>
        </>
    );
}

export default Login;
