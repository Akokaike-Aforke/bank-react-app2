import React, { useEffect } from "react";
import { useState } from "react";
// import { useGlobalContext, AppProvider } from "../context";
import { useNavigate, Link, Navigate } from "react-router-dom";
import logo from "../Images/Fidelity-Bank-Logo.png";
import { BsFillPersonFill } from "react-icons/bs";
import { ImEye } from "react-icons/im";
import imgData from "../data";
import { toast } from "react-toastify";
import startLogOutTimer from "../components/Timer";
import { useLogin } from "../ReactQueryCustomHooks";
import Cookies from "js-cookie";
import { AppProvider, useGlobalContext } from "../context";
import { TailSpin } from "react-loader-spinner";

const Login = () => {
  const { setPerson, person } = useGlobalContext();
  const { userId, login } = useGlobalContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [btnActive, setBtnActive] = useState(true);
  const [value, setValue] = useState(2);
  const [seePassword, setSeePassword] = useState(false);
  const [navigateToDashboard, setNavigateToDashboard] = useState(false)
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userData, setUserData] = useState({});
  const { loginUser, isLoading } = useLogin();
  // const [userId, setUserId] = useState(null)
  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(
      { username: username.toLowerCase().trim(), password: userPassword.trim() },
      {
        onSuccess: (data) => {
          const { token } = data.data;
          Cookies.set("token", token, { path: "/" });
          const user_id = data.data.data.user.id;
          login(user_id);
          // navigate("/dashboard");
          setNavigateToDashboard(true);
          // setPerson({ ...person, viewDashboard: true, dashboardMain: true });
        },
        onError: (err) => {
          console.log(err.response.data.message);
          toast.error(err.response.data.message);
        },
      }
    );
  
  };
  // console.log(isLoggedIn);
  // console.log(userData);
  useEffect(() => {
    if (value > imgData.length - 1) setValue(0);
    if (value < 0) setValue(imgData.length - 1);
  }, [value]);
  useEffect(() => {
    if (username && userPassword) {
      setBtnActive(false);
    } else {
      setBtnActive(true);
    }
  }, [username, userPassword]);

  useEffect(() => {
    let slider = setInterval(() => {
      setValue((value) => value + 1);
    }, 3000);
    return () => clearInterval(slider);
  }, [value]);

  // useEffect(() => {
  //   if(isLoggedIn && userInfo){
  //     setUserData(userInfo)
  //   }
  // }, [isLoggedIn, userInfo]);

  // useEffect(()=>{console.log(userId)}, [userId])

  useEffect(()=>{
    if(navigateToDashboard){
      navigate("/dashboard");
      setPerson({ ...person, viewDashboard: true, dashboardMain: true });
    }
  }, [navigateToDashboard, person.viewDashboard, person.dashboardMain])

  if (isLoading) {
    return (
      <div className="spinner">
        <TailSpin color="#002082" radius={"6px"} />
      </div>
    );
  }


  // if (isLoggedIn) {
  //   return <Navigate to="/dashboard" />;
  // }

  return (
    <main className="home-main fade-in">
      <AppProvider userId={userId}></AppProvider>
      <section className={`image-section`}>
        {imgData.map((image, index) => {
          let position = "invisible";
          if (index === value) position = "visible";
          return (
            <div
              key={index}
              className={`image-div ${position} ${image.title}`}
            ></div>
          );
        })}
      </section>
      <section className="home-section">
        <img src={logo} alt="fidelity logo" className="home-logo" />
        <h1 className="home-h1">Welcome to Fidelity Online Banking</h1>
        <p className="login-p1">
          Please log in safely. Protect your login information.
        </p>
        <div className="home-form-div">
          <form onSubmit={handleLogin} className="home-form">
            <div className="home-input-icon-div">
              <input
                type="text"
                className="home-username login-username"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <BsFillPersonFill className="icon1" />
            </div>
            <div className="home-input-icon-div">
              <input
                type={seePassword ? "text" : "password"}
                className="home-password"
                placeholder="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <ImEye
                className="icon2"
                onClick={() => setSeePassword(!seePassword)}
              />
            </div>
            <Link to="/forgotPassword" className="home-forgot-p">forgot your password?</Link>
            <button
              className={
                btnActive ? "home-signin-btn activebtn" : "home-signin-btn"
              }
              disabled={btnActive}
            >
              Sign in
            </button>
          </form>
          <div className="home-last-div">
            <p>
              <Link to="/signup">New Account? Register here I</Link>
            </p>
            <p>
              <a href="#">Corporate Sole Account User? Register Here</a>
            </p>
            <p>
              <a href="#">I Create An Account Number Here</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
