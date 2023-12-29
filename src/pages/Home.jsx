import React, { useState, useEffect } from 'react'
import logo from '../Images/Fidelity-Bank-Logo.png'
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import {
  useGetAllReviews
} from "../ReactQueryCustomHooks";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import Slider from "react-slick";

const Home = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const[blur, setBlur] = useState(false)
   const handleResize = () => {
     setWindowWidth(window.innerWidth);
   };
  const {data, isLoading} = useGetAllReviews();
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      // slidesToShow: 4,
      slidesToShow: windowWidth < 340 ? 1 : windowWidth < 600 ? 2 : windowWidth < 800 ? 3 : 4,
      slidesToScroll: 1,
      autoplay: true,
      // margin-left: "15px"
    };
  // if(isLoading){
  //   return <p></p>
  // }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // const smallestScreen = windowWidth < 427;

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
          <div
            className="home-main-div-dropdown"
            onMouseEnter={() => setBlur(true)}
            onMouseLeave={() => setBlur(false)}
          >
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
            <div
              className="dropdown-personal"
              onMouseEnter={() => setBlur(true)}
              onMouseLeave={() => setBlur(false)}
            >
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
            <div
              className="dropdown-personal"
              onMouseEnter={() => setBlur(true)}
              onMouseLeave={() => setBlur(false)}
            >
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
            <div
              className="dropdown-personal"
              onMouseEnter={() => setBlur(true)}
              onMouseLeave={() => setBlur(false)}
            >
              <button>Corporate</button>
              <div className="dropdown-content">
                <ul>
                  <li>
                    <a href="#">Exchange Rates</a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="dropdown-personal"
              onMouseEnter={() => setBlur(true)}
              onMouseLeave={() => setBlur(false)}
            >
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
      <div className={blur ? "div-p blur" : "div-p"}>
        <p className="p1">Thank you for your time in assessing my app.</p>
        <p className="p2">
          Kindly navigate to your profile and leave a review when done.
        </p>
        <p className="p3">
          Ideas on how to fix any bugs observed will be greatly appreciated.
        </p>
      </div>
      <div className={blur ? "reviews-div blur" : "reviews-div"}>
        {/* <article className="review-article"> */}
        <Slider className="review-article" {...settings}>
          {data?.data?.reviews.map((review, index) => {
            return (
              <div className="review-profile">
                <div className="pad-div">
                  <div className="img-name-div">
                    <div className="img-div">
                      {review?.createdBy?.profilePhoto ? (
                        <img
                          className="photo"
                          src={review?.createdBy?.profilePhoto}
                          alt=""
                        />
                      ) : (
                        <span className="p-initials">
                          {review?.createdBy?.fullname
                            .split(" ")
                            .filter((ini, index) => index < 2)
                            .map((ini) => ini.charAt(0).toUpperCase())
                            .join("")}
                        </span>
                      )}
                    </div>
                    <p>{review?.createdBy?.fullname}</p>
                  </div>
                  <p className="review-p">
                    {review?.review?.substring(0, 100)}
                  </p>
                  <div className="star-div">
                    {[1, 2, 3, 4, 5].map((star, index) => {
                      return (
                        <span key={index} className="star-span">
                          {/* <FaRegStar */}
                          {index < review?.rating ? (
                            <FaStar className="colored" />
                          ) : (
                            <FaRegStar className="not-colored" />
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
        {/* </article> */}
      </div>
    </HomeMain>
  );
}
const HomeMain = styled.main`
  width: 100%;
  max-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .home-main-section {
    width: 100%;
    margin-bottom: auto;
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
    height: 23px;
    padding: 2px 10px;
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
  .div-p{
    margin: 1rem;
    transition: all 0.3s ease;
  }
  .blur{
    opacity: 0.1;
  }
  .reviews-div {
    width: 95%;
    height: 300px;
    margin: 0 auto 5rem;
    transform: skewY(-7deg);
    display: flex;
    align-items: center;
    background-color: #012168;
    transition: all 0.4s ease;
  }
  .review-article {
    width: 95%;
    height: 180px;
    transform: skewY(5deg);
    margin: 0 auto;
  }
  .review-profile {
    box-sizing: border-box;
    width: 200px;
    height: 180px;
    padding-right: 1rem;
    min-height: 100%;
  }
  .pad-div {
    width: 100%;
    height: 180px;
    display: block;
    background-color: white;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }
  .img-name-div {
    display: flex;
    flex-direction: column;
    column-gap: 0.9rem;
    align-items: center;
    text-transform: uppercase;
    font-size: 0.8rem;
    margin-bottom: 1rem;
    font-size: 0.5rem;
  }
  .img-div {
    width: 20px;
    height: 20px;
    min-width: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    background-color: rgb(45, 47, 49);
  }

  .photo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: block;
    object-fit: cover;
  }
  .p-initials {
    color: white;
    font-size: 1.2rem;
    letter-spacing: 2px;
  }
  .review-p {
    display: block;
    margin-bottom: auto;
    font-size: 0.5rem;
  }
  .colored {
    color: #6cc049;
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
    .dropdown-content-personal {
      margin-left: 0;
    }
    .img-name-div {
      flex-direction: row;
      font-size: 0.6rem;
    }
    .img-div {
      width: 30px;
      height: 30px;
      min-width: 30px;
    }
    .review-p {
      font-size: 0.85rem;
    }
  }
`;
export default Home