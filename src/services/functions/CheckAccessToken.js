import jwt_decode from "jwt-decode";

const CheckAccessToken = () => {
    const token = localStorage.getItem("token");

    return jwt_decode(token).exp * 1000 > Date.now();
};

export default CheckAccessToken;
