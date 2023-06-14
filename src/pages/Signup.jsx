import React from "react";
import { Link } from "react-router-dom";
import fidelityIcon from "../Images/fidelity-icon.png";

const Signup = () => {
  return (
    <div className="signup-article-div">
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
    </div>
  );
};

export default Signup;
