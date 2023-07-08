import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import fidelityIcon from "../Images/fidelity-icon.png";
import styled from 'styled-components';

const Verify = () => {
    const {setAccountNumber, accountNumber} = useGlobalContext();
    
  const [notActive, setNotActive] = useState(true);
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
    console.log(accountNumber)
    useEffect(()=>{
      if(accountNumber.length === 10)
      setNotActive(false)
      else{
        setNotActive(true);
      }
    }, [accountNumber])
  return (
    <VerifyDiv className="signup-article-div">
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
          <label htmlFor="account-num-reg">
            Enter your 10-digit account number
          </label>
          <input
            type="number"
            placeholder="Enter Account Number"
            className="account-number-input"
            value={accountNumber}
            name={accountNumber}
            onChange={handleAccountNumber}
          />
          <button className="account-number-btn" disabled={notActive}>
            GET STARTED
          </button>
        </form>
        <button className="verify-button" onClick={NavigateToLogin}>
          Already Registered ? Proceed to Login
        </button>
      </div>
    </VerifyDiv>
  );
}

const VerifyDiv = styled.div`
  .register-steps-div {
    margin: 9rem auto 5rem;
    width: 80%;
    letter-spacing: 0.5px;
  }
  .account-number-input {
    display: block;
    width: 100%;
    height: 50px;
    margin-bottom: 2rem;
  }
  .account-number-btn {
    display: block;
    width: 100%;
    height: 50px;
    margin-bottom: 4rem;
  }
  .verify-button {
    display: block;
    text-align: center;
    color: white;
    width: 100%;
    background: transparent;
    border: none;
    cursor: pointer;
  }
  .account-number-btn {
    width: 100%;
    height: 2.5rem;
    background: #6abf5c;
    color: white;
    border-radius: 5px;
    font-size: 16px;
    border: none;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .account-number-btn:hover {
    background: #569d4b;
  }
  .account-number-btn:disabled {
    background-color: #e0e0e0;
    border: 1px solid #dedede;
    color: rgb(127, 127, 128);
    cursor: not-allowed;
  }
`;

export default Verify
