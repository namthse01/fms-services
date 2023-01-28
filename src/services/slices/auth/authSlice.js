import { createSlice } from "@reduxjs/toolkit";

const initState = {
    accountId: "",
    username: null,
    token: null,
    rememberMe: JSON.parse(localStorage.getItem("rememberMe")) || false,
    profile: {
        name: "",
        phonenum: "",
    },
    roleName: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {
        setCredentials: (state, action) => {
            const { username, accessToken, userLoginBasicInformationDto } = action.payload;
            return { ...state, username: username, token: accessToken, roleName: userLoginBasicInformationDto.roleName, accountId: userLoginBasicInformationDto.accountId };
        },

        setRememberMe: (state, action) => {
            const { rememberMe } = action.payload;
            return { ...state, rememberMe: rememberMe };
        },
        setProfile: (state, action) => {
            // console.log("Action", action.payload);
            return { ...state, profile: { ...action.payload } };
        },
    },

});

export const { setCredentials, setRememberMe, setProfile } = authSlice.actions;

export default authSlice.reducer;


export const selectCurrentUsername = (state) => state.auth.username;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentAccountId = (state) => state.auth.accountId;
export const selectCurrentRememberMe = (state) => state.auth.rememberMe;
export const selectCurrentProfile = (state) => state.auth.profile;
export const selectCurrentRole = (state) => state.auth.roleName;
