import React, { useEffect } from "react";
import { useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../slices/auth/authSlice";

//React-bootstrap
import { Spinner } from "react-bootstrap";

const PersistLogin = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const token = useSelector(selectCurrentToken);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                // console.log(error);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        !token ? verifyRefreshToken() : setIsLoading(false);

        return () => (isMounted = false);
    }, []);

    return isLoading ? (
        <div
            style={{
                width: "100%",
                padding: "10px 0 0 0",
                textAlign: "center",
            }}
        >
            <Spinner animation="border" />
            <div style={{ fontSize: "30px" }}>Đang tải trang...</div>
        </div>
    ) : (
        children
    );
};

export default PersistLogin;
