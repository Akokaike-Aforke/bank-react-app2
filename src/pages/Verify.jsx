import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { useCreateAccount } from "../ReactQueryCustomHooks";
import fidelityIcon from "../Images/fidelity-icon.png";
import styled from 'styled-components';
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import customFetch from '../utils';

const Verify = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const {mutate: createTask, isLoading} = useMutation({
      mutationFn: () => customFetch.post("/api/v1/accounts/accountNumber", {}),
      onSuccess: (data)=>{
        console.log(data);
        setMessage("Your account number was successfully generated");
      },
      onError: (err)=>{console.log(err)}
    });
    const NavigateToRegister = (e) =>{
      e.preventDefault();
      createTask()
      // navigate('/signup/register')
      setTimeout(()=>navigate("/signup/register"), 3000)
    }
    const NavigateToLogin = (e) =>{
        e.preventDefault();
        navigate('/login')
    }

    // useEffect(() => {
    //   const timer = setTimeout(() => {}, 1000);

    //   return () => clearInterval(timer);
    // }, []);

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
        <div>
          <label htmlFor="account-num-reg">
            Generate your 10-digit account number
          </label>
          <div
            type="number"
            placeholder="Enter Account Number"
            className="account-number-input">
              {message}
          </div>
          <button className="account-number-btn" disabled={isLoading} onClick={NavigateToRegister}>
            GET STARTED
          </button>
        </div>
        <button
          className="verify-button"
           onClick={NavigateToLogin}
        >
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
