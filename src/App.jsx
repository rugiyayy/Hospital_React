import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

import Layout from "./layouts/Layouts";
import Home from "./pages/user/Home";
import Department from "./pages/user/Department";
import Doctor from "./pages/user/Doctor";
import Appointment from "./pages/user/Appointment";
import AppointmentDetails from "./pages/user/AppointmentDetails";
import ListAppointmnets from "./pages/user/ListAppointmnets";
import SingleDoctor from "./pages/user/SingleDoctor";
import {
  ProtectedRoute,
  ProtectedRoute2,
  ProtectedRoute3,
} from "./utils/ProtectedRoute";
import DoctorListAppointments from "./pages/user/DoctorListAppointments";
import SendEmail from "./pages/SendEmail";
import ForgotPassword from "./pages/user/ForgotPassword";
import ResetPassword from "./pages/user/ResetPassword";
import DoctorTodaysAppList from "./pages/user/DoctorTodaysAppList";
import SentEmailsList from "./pages/user/SentEmailsList";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {/* <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} /> */}
            <Route path="/singleDoctor" element={<SingleDoctor />} />
            <Route path="/" element={<Home />} />
            <Route path="/department" element={<Department />} />
            <Route path="/doctors" element={<Doctor />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword" element={<ResetPassword />} />

            <Route
              path="/appointment-details"
              element={
                <ProtectedRoute2>
                  <AppointmentDetails />
                </ProtectedRoute2>
              }
            />
            <Route
              path="/appList"
              element={
                <ProtectedRoute2>
                  <ListAppointmnets />
                </ProtectedRoute2>
              }
            />

            <Route
              path="/docAppList"
              element={
                <ProtectedRoute3>
                  <DoctorListAppointments />
                </ProtectedRoute3>
              }
            />
            <Route
              path="/docTodaysAppList"
              element={
                <ProtectedRoute3>
                  <DoctorTodaysAppList />
                </ProtectedRoute3>
              }
            />

            <Route
              path="/sendEmail"
              element={
                <ProtectedRoute3>
                  <SendEmail />
                </ProtectedRoute3>
              }
            />
            <Route
              path="/sentEmailsList"
              element={
                <ProtectedRoute3>
                  <SentEmailsList/>
                </ProtectedRoute3>
              }
            />

            <Route path="/*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
