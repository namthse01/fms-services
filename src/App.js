import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from './components/layout/Layout';

import Login from "./components/login/Login.js";

// import Dashboard from './components/Pages/Dashboard';

import Customer from './components/Pages/manager-pages/customer/Customer';
import CustomerDetail from './components/Pages/manager-pages/customer/CustomerDetail';
import OrderHistoryDetail from './components/Pages/manager-pages/customer/OrderHistoryDetail';

import Staff from './components/Pages/manager-pages/staff/Staff';
import StaffDetail from './components/Pages/manager-pages/staff/StaffDetail';
import StaffDayOff from './components/Pages/manager-pages/staff/StaffDayOff';

import Order from './components/Pages/manager-pages/order/Order';
import OrderDetail from './components/Pages/manager-pages/order/Order_detail';
import OrderApproved from './components/Pages/manager-pages/order/Order_approved';
import AssignStaff from './components/Pages/manager-pages/order/AssignStaff';
import AssignStaffApproved from './components/Pages/manager-pages/order/AssignStaffApproved';

import Services from './components/Pages/manager-pages/serviceApp/ServiceApp';

// import Service from './components/Pages/admin-pages/services/Services';
// import Account from './components/Pages/admin-pages/accounts/Account';

import "moment/locale/vi";
//Service
import RequireAuth from "./services/functions/RequireAuth";
// import PersistLogin from "./services/functions/PersistLogin";
// import RememberMeLogin from "./services/functions/RememberMeLogin";
// import CheckInternetConnection from "./services/functions/CheckInternetConnection";
// import ErrorBoundary from "./services/functions/ErrorBoundary";
import ProtectedRoute from "./services/functions/ProtectedRoute";

import Error from "./components/Pages/error/Error"

import './App.scss'


const App = () => {

  return (
    <>
      <Router>
        <Routes>

          {/* Login */}
          <Route
            index
            element={
              <Login />
            }
          />

          <Route path="/error" element={<Error />} />

          <Route
            path='/'
            element={
              // <PersistLogin>
              <RequireAuth>
                <Layout />
              </RequireAuth>
              // </PersistLogin>
            }
          >


            {/* <Route path='/dashboard' element={<Dashboard />} /> */}

            <Route path='/manager/order' element={
              <ProtectedRoute user={["manager"]}>
                <Order />
              </ProtectedRoute>
            }
            />
            <Route path='/manager/order-detail/:orderId' element={
              <ProtectedRoute user={["manager"]}>
                <OrderDetail />
              </ProtectedRoute>
            }
            />

            <Route path='/manager/order-approved/:orderId' element={
              <ProtectedRoute user={["manager"]}>
                <OrderApproved />
              </ProtectedRoute>
            }
            />
            <Route path='/manager/staff' element={
              <ProtectedRoute user={["manager"]}>
                <Staff />
              </ProtectedRoute>
            } />

            <Route path='/manager/staff-detail/:employeeId' element={
              <ProtectedRoute user={["manager"]}>
                <StaffDetail />
              </ProtectedRoute>
            } />

            <Route path='/manager/customer' element={
              <ProtectedRoute user={["manager"]}>
                <Customer />
              </ProtectedRoute>
            } />
            <Route path='/manager/customer-detail/:customerPhone' element={
              <ProtectedRoute user={["manager"]}>
                <CustomerDetail />
              </ProtectedRoute>
            } />

            <Route path='/manager/order-history/:orderId' element={
              <ProtectedRoute user={["manager"]}>
                <OrderHistoryDetail />
              </ProtectedRoute>
            }
            />

            <Route path='/manager/assign-staff/:orderId' element={
              <ProtectedRoute user={["manager"]}>
                <AssignStaff />
              </ProtectedRoute>
            } />

            <Route path='/manager/assign-staffApproved/:orderId' element={
              <ProtectedRoute user={["manager"]}>
                <AssignStaffApproved />
              </ProtectedRoute>
            } />

            <Route path='/manager/StaffDayOff' element={
              <ProtectedRoute user={["manager"]}>
                <StaffDayOff />
              </ProtectedRoute>
            } />

            <Route path='/manager/Services' element={
              <ProtectedRoute user={["manager"]}>
                <Services />
              </ProtectedRoute>
            }
            />


            {/* <Route path='/admin/service' element={
              <ProtectedRoute user={["admin"]}>
                <Service />
              </ProtectedRoute>
            } /> */}


            {/* <Route path='/admin/account' element={
              <ProtectedRoute user={["admin"]}>
                <Account />
              </ProtectedRoute>
            } /> */}


          </Route>
        </Routes>
      </Router>
    </>
    // {/* <Router>
    //   <Routes>
    //     <Route exact path="/" element={<Login />} />
    //     <Route path="/manager" element={<Manager />} >
    //       <Route path='/manager/order' element={<Order />} />
    //       <Route path='/manager/order-detail' element={<OrderDetail />} />
    //       <Route path='/manager/order-approved' element={<OrderApproved />} />
    //       <Route path='/manager/staff' element={<Staff />} />
    //       <Route path='/manager/staff-detail' element={<StaffDetail />} />
    //       <Route path='/manager/customer' element={<Customer />} />
    //       <Route path='/manager/customer-detail' element={<CustomerDetail />} />
    //       <Route path='/manager/dashboard' element={<Dashboard />} />
    //     </Route>
    //   </Routes>
    // </Router> */}


  );
}

export default App;
