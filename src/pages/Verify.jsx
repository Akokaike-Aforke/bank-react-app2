import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import fidelityIcon from "../Images/fidelity-icon.png";

const Verify = () => {
    const {setAccountNumber, accountNumber} = useGlobalContext();
    const navigate = useNavigate();

    const NavigateToRegister = (e) =>{
      e.preventDefault();
      navigate('/signup/register')
    }
    const NavigateToLogin = (e) =>{
        e.preventDefault();
        navigate('/login')
    }
    const handleAccountNumber = (e) =>{
        setAccountNumber(e.target.value.slice(0, 10))
    }
  return (
    <div className="signup-article-div">
      <img src={fidelityIcon} alt="fidelity-icon" className="fidelity-icon" />
      <div className="register-steps-div">
        <h6 className="register-steps-h1">Enrollment</h6>
        <div className="enrol-div">
          <span className="verify-span">
            <p>1.verify</p>
          </span>
          <span className="register-span">
            <p>2.register</p>
          </span>
          <span className="complete-span">
            <p>3.complete</p>
          </span>
        </div>
        <form onSubmit={NavigateToRegister}>
            <label htmlFor="account-num-reg">Enter your 10-digit account number</label>
          <input
            type="number"
            placeholder="Enter Account Number"
            className="account-number-input"
            value={accountNumber}
            name={accountNumber}
            onChange={handleAccountNumber}
          />
          <button className="account-number-btn">GET STARTED</button>
        </form>
        <button className="verify-button" onClick={NavigateToLogin}>
          Already Registered ? Proceed to Login
        </button>
      </div>
    </div>
  );
}

export default Verify
