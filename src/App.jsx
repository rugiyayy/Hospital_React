import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

import Layout from "./layouts/Layouts";
import Home from "./components/Home";
import Department from "./components/Department";

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

          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
