import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import fidelityIcon from "../Images/fidelity-icon.png";
import { useGetUser } from '../ReactQueryCustomHooks';
import customFetch from '../utils';

const Complete = () => {
  const { data, isLoading } = useGetUser();
  const { data: data1} = {...data}
  const { user } = {...data1}
  const {fullname} = {...user}
  if(isLoading){
    return <div><p>Loading...</p></div>
  }
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
          <h1>Welcome {fullname}</h1>
          <h4>Your Registration was Successful</h4>
          <p>Transact with your username or account number</p>
          <button className="navigateToLogin">
            <Link to="/dashboard" className='navigateToDashboardLink'>Continue to Dashboard?</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Complete