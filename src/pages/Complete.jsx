import React from 'react'
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import fidelityIcon from "../Images/fidelity-icon.png";

const Complete = () => {
  const {newSignup}= useGlobalContext();
  console.log(newSignup);
  return (
    <div className="signup-article-div">
      <img src={fidelityIcon} alt="fidelity-icon" className="fidelity-icon" />
      <div className="register-steps-div">
        <h6 className="register-steps-h1">Complete</h6>
        <div className="enrol-div">
          <span className="verify-span">
            <p>1.verify</p>
          </span>
          <span className="register-span registered-span">
            <p>2.register</p>
          </span>
          <span className="complete-span completed-span">
            <p>3.complete</p>
          </span>
        </div>
        <div className="signin-welcome-div">
          <h1>Welcome {newSignup.fullname}</h1>
          <h4>Your Registration was Successful</h4>
          <p>Transact with your username or account number</p>
          <button className="navigateToLogin">
            <Link to="/login" className='navigateToLoginLink'>Continue to Login?</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Complete