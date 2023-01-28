import { apiSlice } from "../apiSlice";

export const customerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // CustomerById
        getCustomerById: builder.query({
            query: (customerId) => `/api/customer/getCustomerDetailById/${customerId}`,
            method: "GET",
            keepUnusedDataFor: 0,
        }),

        // ALl Customer
        getAllCustomers: builder.query({
            query: () => "/api/manager/getAllCustomer",
            method: "GET",
            keepUnusedDataFor: 0,
        }),

        //getCustomerby PhoneNumb
        getCustomerByPhoneNumb: builder.query({
            query: (customerPhone) => `/api/manager/getCustomerInforByCustomerPhone/${customerPhone}`,
            method: "GET",
            keepUnusedDataFor: 0,
        }),
    })
});

export const { useGetCustomerByIdQuery, useGetAllCustomersQuery, useGetCustomerByPhoneNumbQuery } = customerApi;


// import axios from '../axios';

// const getAllCustomers = () => {
//     return axios.get(`/api/customer/getAllCustomer`);
// }

// const getCustomerById = (customerId) => {
//     return axios.get(`/api/customer/${customerId}`);
// }

// export {
//     getAllCustomers,
//     getCustomerById
// }