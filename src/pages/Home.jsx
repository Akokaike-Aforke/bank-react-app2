import React from 'react'
import logo from '../Images/Fidelity-Bank-Logo.png'
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const Home = () => {
  const navigate = useNavigate();
  return (
    <HomeMain>
      <section className="home-main-section">
        <div className="home-main-div1">
          <nav className="home-main-nav">
            <button className="home-main-fabars-btn">
              <FaBars className="home-main-fabars" />
            </button>
            <button
              className="home-main-login-btn"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
            <button
              className="home-main-signup-btn"
              onClick={() => navigate("/signup")}
            >
              OPEN AN ACCOUNT
            </button>
            <img src={logo} alt="fidelity logo" className="home-main-logo" />
          </nav>
          <div className="home-main-div-dropdown">
            <div className="dropdown-personal">
              <button className="btn-personal">Personal</button>
              <div className="dropdown-content dropdown-content-personal">
                <ul>
                  <li>
                    <a href="#">Savings Account</a>
                  </li>
                  <li>
                    <a href="#">Current Account</a>
                  </li>
                  <li>
                    <a href="#">Diaspora Banking</a>
                  </li>
                  <li>
                    <a href="#">Investment Services</a>
                  </li>
                  <li>
                    <a href="#">Personal Loans</a>
                  </li>
                  <li>
                    <a href="#">Money Transfer</a>
                  </li>
                  <li>
                    <a href="#">Self Services</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="dropdown-personal">
              <button>Digital</button>
              <div className="dropdown-content">
                <ul>
                  <li>
                    <a href="#">Online Banking</a>
                  </li>
                  <li>
                    <a href="#">Online Banking App</a>
                  </li>
                  <li>
                    <a href="#">Instant Banking *770#</a>
                  </li>
                  <li>
                    <a href="#">Fidelity Card</a>
                  </li>
                  <li>
                    <a href="#">PayGate</a>
                  </li>
                  <li>
                    <a href="#">Fidelity POS</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="dropdown-personal">
              <button>SME</button>
              <div className="dropdown-content">
                <ul>
                  <li>
                    <a href="#">Current Account</a>
                  </li>
                  <li>
                    <a href="#">SME Loans</a>
                  </li>
                  <li>
                    <a href="#">Fidelity SME Academy</a>
                  </li>
                  <li>
                    <a href="#">Loan Calculator</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="dropdown-personal">
              <button>Corporate</button>
              <div className="dropdown-content">
                <ul>
                  <li>
                    <a href="#">Exchange Rates</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="dropdown-personal">
              <button>Private</button>
              <div className="dropdown-content">
                <ul>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Services</a>
                  </li>
                  <li>
                    <a href="#">Testimonials</a>
                  </li>
                  <li>
                    <a href="#">Contact Private Banking</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HomeMain>
  );
}
const HomeMain = styled.main`
  width: 100%;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  position: relative;
  display: flex;

  .home-main-section {
    width: 100%;
  }
  .home-main-div1 {
    width: 100%;
  }
  .home-main-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
  }
  .home-main-login-btn,
  .home-main-signup-btn {
    height: 20px;
    /* padding: 2px 10px; */
    letter-spacing: 0.5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.65rem;
  }
  .home-main-login-btn {
    background: #6cc049;
    color: #47653b;
  }
  .home-main-signup-btn {
    background: #012168;
    color: #effff6;
  }
  .home-main-fabars-btn {
    border: none;
    color: #6cc048;
    background: transparent;
    font-size: 15px;
    cursor: pointer;
  }
  .home-main-logo {
    height: 20px;
  }
  .home-main-div-dropdown {
    display: flex;
    justify-content: space-around;
    width: 100%;
    color: #343434;
    background-color: #fafafa;
    padding: 0 20%;
  }
  .home-main-div-dropdown button {
    background: transparent;
    border: none;
    font-size: 13px;
    cursor: pointer;
    height: 100%;
    padding: 10px 5px;
    transition: all 0.4s ease;
    font-family: "Open Sans", sans-serif;
  }
  .home-main-div-dropdown button:hover {
    border-bottom: 2px solid black;
    padding: 10px 10px;
  }
  .dropdown-personal {
    position: relative;
    display: inline-block;
  }
  .dropdown-content {
    position: absolute;
    width: 250px;
    left: 50%;
    transform: translateX(-50%);
    display: none;
    z-index: 1;
  }
  .dropdown-content-personal {
    margin-left: 2rem;
  }
  .dropdown-personal:hover .dropdown-content {
    display: block;
  }
  ul {
    width: 70%;
    margin: 0 auto;
  }
  li {
    list-style-type: none;
  }
  a {
    text-decoration: none;
    display: block;
    padding: 14px 0 18px 25px;
    font-size: 13px;
    transition: all 0.4s ease;
    color: #33373d;
  }
  a:hover {
    background-color: #33373d;
    color: wheat;
  }
  .personal-btn {
  }
  @media screen and (min-width: 450px) {
    .home-main-logo {
      height: 30px;
    }
    .home-main-fabars-btn {
      font-size: 20px;
    }
    .home-main-login-btn,
    .home-main-signup-btn {
      height: 40px;
      padding: 2px 10px;
    }
    .dropdown-content-personal{
      margin-left: 0;
    }
  }
`;
export default Home