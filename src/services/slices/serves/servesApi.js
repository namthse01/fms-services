import { apiSlice } from "../apiSlice";
import moment from "moment";

export const servesAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // ServiceById
        getServiceById: builder.query({
            query: (serviceId) => `/api/service/findServiceById/${serviceId}`,
            method: "GET",
            keepUnusedDataFor: 0,
        }),

        // ALl Service
        getAllServices: builder.query({
            query: () => "/api/service/getAllService",
            method: "GET",
            keepUnusedDataFor: 0,
        }),


        //Crreate Services
        postCreateService: builder.mutation({
            query: (newService) => ({
                url: `/api/service/addNewService`,
                method: "POST",
                body: {
                    serviceName: newService.serviceName,
                    serviceDescription: newService.serviceDescription,
                    price: newService.price,
                    type: newService.serviceType,
                    "categoryId": 0,
                    createAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                    updateAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                    status: true
                },
            }),
        }),
    })
});

export const { useGetAllServicesQuery, useGetServiceByIdQuery, usePostCreateServiceMutation } = servesAPI;
