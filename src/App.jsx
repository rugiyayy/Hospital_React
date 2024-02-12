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
import Contact from "./pages/user/Contact";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}> 
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<Home />} />
            <Route path="/department" element={<Department />} />
            <Route path="/doctors" element={<Doctor/>} />
            <Route path="/appointment" element={<Appointment/>} />
            <Route path="/appointment-details" element={<AppointmentDetails/>} />
            <Route path="/contact" element={<Contact/>} />

          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
