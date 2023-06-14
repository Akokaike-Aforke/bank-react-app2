import React from 'react'
import logo from '../Images/Fidelity-Bank-Logo.png'
import logo1 from "../Images/Fidelity-Bank-Logo (2).png";
import  { BsFillPersonFill } from 'react-icons/bs';
import { ImEye } from 'react-icons/im'

const Home = () => {
  return (
    <main className="home-main">
      <section className="home-section">
        <img src={logo} alt="fidelity logo" className="home-logo" />
        <h1 className="home-h1">Welcome to Fidelity Online Banking</h1>
        <p className="home-p1">
          Please log in safely. Protect your login information.
        </p>
        <div className="home-form-div">
          <form action="" className="home-form">
            <div className="home-input-icon-div">
              <input
                type="text"
                className="home-username"
                placeholder="username"
              />
              <BsFillPersonFill className="icon1" />
            </div>
            <div className="home-input-icon-div">
              <input
                type="text"
                className="home-password"
                placeholder="password"
              />
              <ImEye className="icon2" />
            </div>
            <p className="home-forgot-p">forgot your password?</p>
            <button className="home-signin-btn">Sign In</button>
          </form>
          <div className="home-last-div">
            <p>
              <a href="#">New Account? Register here I</a>
            </p>
            <p>
              <a href="#">Corporate Sole Account User? Register Here</a>
            </p>
            <p>
              <a href='#'>I Create An Account Number Here</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home