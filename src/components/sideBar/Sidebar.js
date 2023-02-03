import React, { useState } from 'react';
import './Sidebar.scss';
import { useNavigate } from "react-router-dom";
import { Button, Nav, Navbar, Accordion, Image } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";
import { setToast } from "../../services/toast/toastSlice";

//Redux
import { selectCurrentRole, setCredentials, selectCurrentUsername, selectCurrentAccountId } from '../../services/slices/auth/authSlice';

import defaultUserAvatar from "../../assets/images/login.png";

//icons 
import LogoutIcon from '@mui/icons-material/Logout';

//React-redux
import { useDispatch, useSelector } from "react-redux";

//API
import { useLogoutMutation } from '../../services/slices/auth/authApi';

const Sidebar = () => {

    //Global state
    const isManager = "manager";
    const username = JSON.parse(localStorage.getItem("userLoginBasicInformationDto")).fullUserName;
    const accountId = JSON.parse(localStorage.getItem("userLoginBasicInformationDto")).accountId;

    //Local state
    const [isCollapse, setIsCollapse] = useState(false);
    const [imgLoading, setImgLoading] = useState(true);

    //API
    const [logout, { isLoading }] = useLogoutMutation();

    //Utilities
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout(accountId)
                .unwrap()
                .then((res) => {
                    if (res) {
                        // dispatch(
                        //     setCredentials({ username: null, accessToken: null, role: "" })
                        // );
                        localStorage.clear();
                        navigate("/");
                    }
                });
        } catch (error) {
            if (error) {
                if (error.data) {
                    dispatch(
                        setToast({
                            show: true,
                            title: "Đăng xuất",
                            time: "just now",
                            content: error.data,
                            color: {
                                header: "#ffcccc",
                                body: "#e60000",
                            },
                        })
                    );
                } else {
                    dispatch(
                        setToast({
                            show: true,
                            title: "Đăng xuất",
                            time: "just now",
                            content: "Đã xảy ra lỗi. Xin thử lại sau",
                            color: {
                                header: "#ffcccc",
                                body: "#e60000",
                            },
                        })
                    );
                }
            }
        }
    };


    return (
        <>
            <div className="nav-bar">
                <Navbar expand="lg">
                    <Nav className="nav flex-column" activeKey={location.pathname}>
                        <Nav.Item className="user-avatar">
                            <Nav.Link as={Link} to="/userProfile">
                                <Avatar
                                    src={defaultUserAvatar
                                        // !data?.imgURL || imgLoading
                                        //     ? defaultUserAvatar
                                        //     : data.imgURL
                                    }
                                    // onLoad={() => setImgLoading(false)}
                                    sx={{
                                        width: "150px",
                                        height: "150px",
                                        border: "1px solid #000000",
                                    }}
                                />
                            </Nav.Link>
                        </Nav.Item>

                        <div
                            style={{ fontSize: "20px", fontWeight: "500" }}
                            className="text-center"
                        >
                            {username}
                        </div>
                        {/* 
                        <Nav.Item className="menu-button mt-3">
                            <Nav.Link as={Link} to="/dashboard" eventKey="/dashboard">
                                Dashboard
                            </Nav.Link>
                        </Nav.Item> */}

                        {isManager && (
                            <Nav.Item className="menu-button mt-3">
                                <Nav.Link as={Link} to="/manager/order">
                                    Hóa đơn
                                </Nav.Link>
                            </Nav.Item>
                        )}

                        {isManager && (
                            <Nav.Item className="menu-button mt-3">
                                <Nav.Link as={Link} to="/manager/customer">
                                    Khách Hàng
                                </Nav.Link>
                            </Nav.Item>
                        )}

                        {isManager && (
                            <Nav.Item className="menu-button mt-3">
                                <Nav.Link as={Link} to="/manager/staff">
                                    Nhân viên
                                </Nav.Link>
                            </Nav.Item>
                        )}

                        {isManager && (
                            <Nav.Item className="menu-button mt-3">
                                <Nav.Link as={Link} to="/manager/StaffDayOff">
                                    Ngày nghỉ nhân viên
                                </Nav.Link>
                            </Nav.Item>
                        )}

                        {/* {isAdmin && (
                            <Nav.Item className="menu-button mt-3">
                                <Nav.Link as={Link} to="/admin/Service">
                                    Service
                                </Nav.Link>
                            </Nav.Item>
                        )}

                        {isAdmin && (
                            <Nav.Item className="menu-button mt-3">
                                <Nav.Link as={Link} to="/admin/account">
                                    Account
                                </Nav.Link>
                            </Nav.Item>
                        )} */}

                        <Nav.Item className="log-out-button menu-button">
                            <Nav.Link
                                disabled={isLoading}
                                onClick={handleLogout}
                                eventKey="/logout"
                            >
                                Đăng xuất
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            </div>
        </>
    );
}



export default Sidebar;