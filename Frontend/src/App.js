import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Home/login";
import SignUp from "./pages/Home/signup";
import UserHome from "./pages/User";
import {
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import "antd/dist/antd.css";
import DoctorHome from "./pages/Doctor";

/* Enter URL without ending slash */
export const ROOT_URL = "https://81d6-182-79-4-251.ngrok.io";

function App() {
  return (
    <>
      <HashRouter basename="/">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/user" exact element={<UserHome />} />
          <Route path="/doctor" exact element={<DoctorHome />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
