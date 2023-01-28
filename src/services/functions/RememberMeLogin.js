// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { useRefreshTokenMutation } from "../slices/auth/authApi";
// import {
//     selectCurrentToken,
//     setCredentials
// } from "../slices/auth/authSlice";
// import { Navigate, useLocation } from "react-router-dom";

// //React-bootstrap
// import { Spinner } from "react-bootstrap";

// //JWT-decode
// import jwt_decode from "jwt-decode";

// const RememberMeLogin = ({ children }) => {
//     //Local state
//     const [isLoading, setIsLoading] = useState(true);

//     //Global state
//     const token = useSelector(selectCurrentToken);
//     // const rememberMe = useSelector(selectCurrentRememberMe);
//     const rememberMe = JSON.parse(localStorage.getItem("rememberMe")) || false;

//     //API
//     // const [refreshToken, { isFetching: isRefreshLoading }] =
//     //     useRefreshTokenMutation();

//     //Utilities
//     const dispatch = useDispatch();
//     const location = useLocation();

//     // const refresh = async () => {
//     //     await refreshToken()
//     //         .unwrap()
//     //         .then(async (res) => {
//     //             await dispatch(
//     //                 setCredentials({
//     //                     accessToken: res.accessToken,
//     //                     username: jwt_decode(res.accessToken).username,
//     //                     role: jwt_decode(res.accessToken).roleName,
//     //                 })
//     //             );
//     //         });
//     // };

//     // useEffect(() => {
//     //     if (token === null && rememberMe) {
//     //         // refresh();
//     //     }
//     // }, []);

//     return isRefreshLoading ? (
//         <div
//             style={{
//                 width: "100%",
//                 padding: "10px 0 0 0",
//                 textAlign: "center",
//             }}
//         >
//             <Spinner animation="border" />
//             <div style={{ fontSize: "30px" }}>Đang tải trang...</div>
//         </div>
//     ) : token ? (
//         rememberMe ? (
//             <Navigate to="/dashboard" state={{ from: location }} replace />
//         ) : (
//             children
//         )
//     ) : (
//         children
//     );
// };

// export default RememberMeLogin;
