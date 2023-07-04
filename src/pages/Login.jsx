import React, { useEffect } from "react";
import { useState } from "react";
import { useGlobalContext } from "../context";
import { useNavigate, Link } from "react-router-dom";
import logo from "../Images/Fidelity-Bank-Logo.png";
import { BsFillPersonFill } from "react-icons/bs";
import { ImEye } from "react-icons/im";
import imgData from "../data";
import { toast } from "react-toastify";
import startLogOutTimer from "../components/Timer";

const Login = () => {
  const {setLoggedUser, setLoggedUserPin, loggedUser, getUser, setStartTime} = useGlobalContext();
  const {data3, loading} = getUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const[btnActive, setBtnActive] = useState(true);
  const[value, setValue] = useState(2);
  // const[loading, setLoading] = useState(false);
  const handleLogin = (e) =>{
    e.preventDefault();
    const user = data3.users.find(user => user.username === username);
    console.log(user)
    if(!user){
      toast.warning("You are not registered. Please register")
    }
    if(user.password !== userPassword){
      toast.warning("Invalid Username or Password!");
    }
    if(user && user.password === userPassword){
      setLoggedUser(user)
      navigate('/dashboard')
      setStartTime(true)
    }
  
  }
  
  useEffect(()=>{
    if(value > imgData.length-1)
    setValue(0);
    if(value < 0)
    setValue(imgData.length-1)
  }, [value])
  useEffect(() => {
    if (username && userPassword) {
      setBtnActive(false);
    }
    else{
      setBtnActive(true)
    }
  }, [username, userPassword]);

  useEffect(()=>{
    let slider = setInterval(()=>{
      setValue(value=>value+1)
      
    }, 3000)
    return ()=>clearInterval(slider)
  }, [value])
    if (loading) {
      return <h3>Loading.....</h3>
    }
  return (
    <main className="home-main">
      <section className={`image-section`}>
        {imgData.map((image, index)=>{
          let position='invisible';
          if(index === value)
          position='visible';
          return <div key={index} className={`image-div ${position} ${image.title}`}></div>
        })}
      </section>
      <section className="home-section">
        <img src={logo} alt="fidelity logo" className="home-logo" />
        <h1 className="home-h1">Welcome to Fidelity Online Banking</h1>
        <p className="home-p1">
          Please log in safely. Protect your login information.
        </p>
        <div className="home-form-div">
          <form onSubmit={handleLogin} className="home-form">
            <div className="home-input-icon-div">
              <input
                type="text"
                className="home-username"
                placeholder="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
              />
              <BsFillPersonFill className="icon1" />
            </div>
            <div className="home-input-icon-div">
              <input
                type="number"
                className="home-password"
                placeholder="password"
                value={userPassword}
                onChange={(e)=>setUserPassword(e.target.value)}
              />
              <ImEye className="icon2" />
            </div>
            <p className="home-forgot-p">forgot your password?</p>
            <button className={btnActive ? "home-signin-btn activebtn" : "home-signin-btn"} disabled={btnActive}>Sign in</button>
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
