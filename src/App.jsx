import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SharedLayout from "./pages/SharedLayout";
import Error from "./pages/Error";
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import { AppProvider, useGlobalContext } from "./context";
import Verify from "./pages/Verify";
import SharedSignup from "./pages/SharedSignup";
import Register from "./pages/Register";
import Complete from "./pages/Complete";
import Cookies from "js-cookie";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import ForgotPin from "./pages/ForgotPin";
import ResetPin from "./pages/ResetPin";
import ChangePin from "./pages/ChangePin";
import Reviews from "./pages/Reviews";
import ReviewsAll from "./pages/ReviewsAll";


// import io from "socket.io-client";

// const socket = io.connect("http://localhost:5000");
// console.log(socket)

function App() {
  const isAuthenticated = Cookies.get("token");
  const [tokenAvailable, setTokenAvailable] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const{socket} = useGlobalContext();
  // console.log(socket);
  useEffect(() => {
    if (isAuthenticated) {
      setTokenAvailable(true);
    } else {
      setTokenAvailable(false);
    }
  }, [isAuthenticated]);
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<SharedLayout />}> */}
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            {/* render={(props) => <Contact appState={appState} />} */}
            {/* <Route path="login" render={(props) => <Login {...props} isLoggedIn={isLoggedIn} /> } /> */}
            <Route path="signup" element={<SharedSignup />}>
              <Route index element={<Signup />} />
              <Route path="verify" element={<Verify />} />
              <Route path="register" element={<Register />} />
              <Route path="complete" element={<Complete />} />
            </Route>
            <Route
              path="dashboard"
              element={isAuthenticated ? <Dashboard isAuthenticated={isAuthenticated} /> : <Login />}
            />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="resetPassword/:token" element={<ResetPassword />} />
            <Route path="updatePassword" element={tokenAvailable ? <ChangePassword />: <Login />} />
            <Route path="forgotPin" element={tokenAvailable ? <ForgotPin /> : <Login />} />
            <Route path="resetPin/:token" element={<ResetPin />} />
            <Route path="updatePin" element={tokenAvailable ? <ChangePin /> : <Login />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="reviewsAll" element={<ReviewsAll />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
