import { apiSlice } from "../apiSlice";
//Momentjs
import moment from "moment";

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // All orders
        getAllOrders: builder.query({
            query: () => "/api/manager/GetAllOrder",
            method: "GET",
            keepUnusedDataFor: 0,
        }),
        //get All Assign
        getAllAssignStaff: builder.query({
            query: () => "/api/assign/manager/getAllAssign",
            keepUnusedDataFor: 0,
        }),

        //Assign Staff to Order
        postAssignOrder: builder.mutation({
            query: (assign) => ({
                url: `/api/assign/CreateAssignByManager/orderId/${assign.orderID}`,
                method: "POST",
                body: {
                    orderId: parseInt(assign.orderID),
                    managerId: 1,
                    createAssignAt: moment().format("MM/DD/YYYY"),
                    listEmployee: assign.employeeIds
                },
            }),
        }),

        //Delete Staff Assign:
        putDeleteStaffAssign: builder.mutation({
            query: (deleteData) => ({
                url: `/api/assign/manager/deleteAssignByAssignId/${deleteData.assignId}/employeeId/${deleteData.employeeId}`,
                method: "PUT",
                body: {
                    assignId: deleteData.assignId,
                    employeeId: deleteData.employeeId,
                },
            }),
        }),

        //getOrderById
        getOrderDetailById: builder.query({
            query: (orderId) => `/api/manager/getOrderDetailByOrderId/${orderId}`,
            method: "GET",
            keepUnusedDataFor: 0,
        }),

        //Working Status
        postChangeWorkingStatus: builder.mutation({
            query: (orderChangeData) => ({
                url: `/api/manager/updateOrderWorkingStatus/orderId/${orderChangeData.orderId}/orderWorkingStatusId/${orderChangeData.workingStatus}`,
                method: "POST",
                body: {
                    orderId: parseInt(orderChangeData.orderId),
                    workingStatusId: parseInt(orderChangeData.workingStatus),
                },
            }),
        }),

        postChangeWorkingStatusAssign: builder.mutation({
            query: (orderId) => ({
                url: `/api/manager/updateOrderWorkingStatus/orderId/${orderId}/orderWorkingStatusId/${4}`,
                method: "POST",
                body: {
                    orderId: parseInt(orderId),
                    workingStatusId: 4,
                },
            }),
        }),

        postChangeWorkingStatusCancel: builder.mutation({
            query: (orderId) => ({
                url: `/api/manager/updateOrderWorkingStatus/orderId/${orderId}/orderWorkingStatusId/${1002}`,
                method: "POST",
                body: {
                    orderId: parseInt(orderId),
                    workingStatusId: 2,
                },
            }),
        }),

        postChangeWorkingStatusApprove: builder.mutation({
            query: (orderId) => ({
                url: `/api/manager/updateOrderWorkingStatus/orderId/${orderId}/orderWorkingStatusId/${1005}`,
                method: "POST",
                body: {
                    orderId: parseInt(orderId),
                    workingStatusId: 1005,
                },
            }),
        }),
    })
});

export const { useGetAllOrdersQuery,
    usePostAssignOrderMutation,
    useGetAllAssignStaffQuery,
    useGetOrderDetailByIdQuery,
    usePostChangeWorkingStatusMutation,
    usePostChangeWorkingStatusApproveMutation,
    usePostChangeWorkingStatusAssignMutation,
    usePutDeleteStaffAssignMutation,
    usePostChangeWorkingStatusCancelMutation
} = orderApi;
