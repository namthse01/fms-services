import { apiSlice } from "../apiSlice";

export const staffApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // StaffById
        getStaffById: builder.query({
            query: (staffId) => `/${staffId}`,
            method: "GET",
            keepUnusedDataFor: 0,
        }),

        // ALl Staff
        getAllStaffs: builder.query({
            query: () => "/api/manager/getAllEmployeeInformation",
            keepUnusedDataFor: 0,
        }),

        //Get All Specialty
        getAllSpecialty: builder.query({
            query: () => "/api/specialty/getAllSpecialty",
            keepUnusedDataFor: 0,
        }),

        //DayOff
        getStaffDayOff: builder.query({
            query: () => "/api/employeeDayOff/getAllEmployeeDayOff/cai_nay_BE_test_ko_dung",
            keepUnusedDataFor: 0,
        }),

        //change dayOff status:

        putStaffDayOff: builder.mutation({
            query: (statusData) => ({
                url: `/api/manager/updateEmployeeDayOffStatus/employeeDayOffId/${statusData.id}`,
                method: "PUT",
                body: {
                    status: parseInt(statusData.status),
                },
            }),
        }),
    })
});

export const { useGetAllStaffsQuery, useGetStaffByIdQuery, useGetAllSpecialtyQuery, useGetStaffDayOffQuery, usePutStaffDayOffMutation } = staffApi;


// import axios from '../axios';

// const getAllStaffs = () => {
//     return axios.get(`/getAllEmployee`);
// }

// const getStaffById = (staffId) => {
//     return axios.get(`/${staffId}`);
// }

// export {
//     getAllStaffs,
//     getStaffById
// }