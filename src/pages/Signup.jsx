import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fidelityIcon from "../Images/fidelity-icon.png";
import styled from "styled-components";

const Signup = () => {
  return (
    <SignUp className="signup-article-div">
      <img src={fidelityIcon} alt="fidelity-icon" className="fidelity-icon" />
      <div className="register-steps-div">
        <h6 className="register-steps-h1">3 Simple Ways to Register</h6>

        <div className="steps-div">
          <div className="step-number">
            <p>1</p>
          </div>
          <div>
            <p className="step-p1">Validate your identity</p>
            <p>
              Enter your account number and we will send a code to the mobile
              number tied to your bank account.
            </p>
          </div>
        </div>
        <div className="steps-div">
          <div className="step-number">
            <p>2</p>
          </div>
          <div>
            <p className="step-p1">Choose a username and password</p>
            <p>
              Set your desired username and password that you want to use for
              this service. You will also need to create secret questions and
              answers should you need to reset your password in the future.
            </p>
          </div>
        </div>
        <div className="steps-div">
          <div className="step-number">
            <p>3</p>
          </div>
          <div>
            <p className="step-p1">Complete your sign up</p>
            <p>
              Enter your account number and we will send a code to the mobile
              number tied to your bank account.
            </p>
          </div>
        </div>
        <Link to="/signup/verify" className="register-steps-btn">
          GET STARTED
        </Link>
      </div>
    </SignUp>
  );
};

const SignUp = styled.div`
  .steps-div {
    margin: 2rem 0;
    line-height: 1.2;
    text-align: center;
    font-size: 18px;
  }
  .step-number {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  .step-number p {
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #e0e1e2;
    color: #203386;
  }
  .step-p1 {
    margin-bottom: 0.5rem;
  }
  .register-steps-btn {
    display: block;
    margin: 0 auto;
    width: 200px;
    background: #78b945;
    border: none;
    color: white;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    padding: 10px 0;
    border-radius: 4px;
  }
`; 

export default Signup;
