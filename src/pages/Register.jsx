import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { ImEye } from "react-icons/im";
import { AiOutlineMail } from "react-icons/ai";
import { GrShieldSecurity } from "react-icons/gr";
import { AiOutlineLock } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import fidelityIcon from "../Images/fidelity-icon.png";
import { useCreateUser } from '../ReactQueryCustomHooks';
import { useGlobalContext } from '../context';
import { toast } from 'react-toastify';

const Register = () => {
  const{setNewSignup, accountNumber, setAccountNumber} = useGlobalContext();
  const[seePassword, setSeePassword] = useState(false);
  const[seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const[seePin, setSeePin] = useState(false);
  const[seeConfirmPin, setSeeConfirmPin] = useState(false);
  
  const[isDeactivated, setIsDeactivated] = useState(true)
  let passwordInput = useRef('');
  let confirmPasswordInput = useRef('');
  let pinInput = useRef('');
  let confirmPinInput = useRef('');
  let password = passwordInput.current.value;
  let confirmPassword = confirmPasswordInput.current.value;
 let pin = pinInput.current.value * 1;
 let confirmPin = confirmPinInput.current.value * 1;
  const[formData, setFormData] = useState({fullname: "", bvn: "",  dateOfBirth:"", email: "", username: "", password: "", confirmpassword: "", accountType:"", pin:"", confirmPin:"", accountNumber})
  const validateForm = (obj) => {
    return Object.values(obj).every(item => item.length > 0);
  }
  const {mutate} = useCreateUser();
  const navigate = useNavigate();
 const fullnameLength = formData.fullname.split(" ").length;

  const NavigateToComplete = (e) =>{
    e.preventDefault();
    mutate({fullname:formData.fullname, bvn:formData.bvn, dateOfBirth:formData.dateOfBirth,email:formData.email, username:formData.username, password:formData.password, accountType:formData.accountType, accountNumber:formData.accountNumber, pin: formData.pin, }, {
      onSuccess:()=>{
        setFormData({fullname: "", bvn: "",  dateOfBirth:"", email: "", username: "", password: "", accountType:"", accountNumber:"", pin:"",});
        setNewSignup(formData);
        navigate("/signup/complete");
      }
    }, 
    {
      onError:()=>{
        setFormData({
          fullname: "",
          bvn: "",
          dateOfBirth: "",
          email: "",
          username: "",
          password: "",
          confirmpassword: "",
          accountType: "",
          accountNumber: "",
          pin:"",
        });
      }
    })

    
  }
  
  const handleChange = (e) =>{
    const{value, name, checked, type} = e.target;
    setFormData(prevData => {
      return {...prevData, [name]: type === 'checkbox' ? checked : value}})
  }
  const handleChangeBVN = (e) => {
    setFormData({...formData, bvn: e.target.value.slice(0, 14)});
  };
  console.log(formData.bvn.length)
  useEffect(()=>{
    if (validateForm(formData) && password=== confirmPassword && pin === confirmPin && fullnameLength >=2 && fullnameLength < 3 && formData.bvn.length === 14) {
      setIsDeactivated(false);
    }
    else setIsDeactivated(true)
  }, [formData])
  return (
    <div className="signup-article-div">
      <img src={fidelityIcon} alt="fidelity-icon" className="fidelity-icon" />
      <div className="register-steps-div">
        <h6 className="register-steps-h1">Register</h6>
        <div className="enrol-div">
          <span className="verify-span">
            <p>1.verify</p>
          </span>
          <span className="register-span registered-span">
            <p>2.register</p>
          </span>
          <span className="complete-span">
            <p>3.complete</p>
          </span>
        </div>
        <form
          className="register-new-account-form"
          onSubmit={NavigateToComplete}
        >
          <label htmlFor="" className="register-new-label">
            Fullname
          </label>
          <div className="new-register">
            <BsFillPersonFill className="register-new-icon" />
            <input
              type="text"
              className="register-firstname"
              name="fullname"
              placeholder="firstname middlename lastname"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="" className="register-new-label">
           14-digit BVN
          </label>
          <div className="new-register">
            <GrShieldSecurity className="register-new-icon" />
            <input
              type="number"
              className="register-bvn"
              name="bvn"
              // value={formData.bvn.slice(0, 14)}
              value={formData.bvn}
              placeholder="BVN" 
              onChange={handleChangeBVN}
            />
          </div>
          <label htmlFor="" className="register-new-label">
            Date Of Birth
          </label>
          <div className="new-register">
            <input
              type="date"
              className="register-date-of-birth"
              name="dateOfBirth"
              placeholder="date of birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="" className="register-new-label">
            Email
          </label>
          <div className="new-register">
            <AiOutlineMail className="register-new-icon" />
            <input
              type="email"
              className="register-email"
              name="email"
              value={formData.email}
              placeholder="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <fieldset className="register-radio-field">
              <legend>choose account type</legend>
              <div className="register-radio-div">
                <input
                  id="savings"
                  type="radio"
                  className="account-type"
                  name="accountType"
                  value="savings"
                  checked={formData.accountType === "savings"}
                  onChange={handleChange}
                />
                <label htmlFor="savings">Savings</label>
              </div>
              <div className="register-radio-div">
                <input
                  id="current"
                  type="radio"
                  className="account-type"
                  name="accountType"
                  value="current"
                  checked={formData.accountType === "current"}
                  onChange={handleChange}
                />
                <label htmlFor="current">Current</label>
              </div>
              <div className="register-radio-div">
                <input
                  id="fixed-deposit"
                  type="radio"
                  className="account-type"
                  name="accountType"
                  value="fixed deposit"
                  checked={formData.accountType === "fixed deposit"}
                  onChange={handleChange}
                />
                <label htmlFor="fixed-deposit">Fixed Deposit</label>
              </div>
            </fieldset>
          </div>

          <label htmlFor="" className="register-new-label">
            Username
          </label>
          <div className="new-register">
            <BsFillPersonFill className="register-new-icon" />
            <input
              type="text"
              className="register-username"
              name="username"
              value={formData.username}
              placeholder="username"
              onChange={handleChange}
            />
          </div>
          <label htmlFor="" className="register-new-label">
            Password
          </label>
          <div className="new-register">
            <AiOutlineLock className="register-new-icon" />
            <ImEye
              className="seePassword-icon"
              onClick={() => setSeePassword(!seePassword)}
            />
            <input
              type={`${seePassword ? "text" : "password"}`}
              className="register-password"
              name="password"
              value={formData.password}
              placeholder="password"
              onChange={handleChange}
              ref={passwordInput}
            />
          </div>
          <label htmlFor="" className="register-new-label">
            Confirm Password
          </label>
          <div className="new-register">
            <AiOutlineLock className="register-new-icon" />
            <ImEye
              className="seePassword-icon"
              onClick={() => setSeeConfirmPassword(!seeConfirmPassword)}
            />
            <input
              type={`${seeConfirmPassword ? "text" : "password"}`}
              className="register-confirm-password"
              name="confirmpassword"
              value={formData.confirmpassword}
              placeholder="confirm password"
              onChange={handleChange}
              ref={confirmPasswordInput}
            />
          </div>
          <label htmlFor="" className="register-new-label">
            Pin
          </label>
          <div className="new-register">
            <AiOutlineLock className="register-new-icon" />
            <ImEye
              className="seePassword-icon"
              onClick={() => setSeePin(!seePin)}
            />
            <input
              type={`${seePin ? "text" : "password"}`}
              className="register-confirm-password"
              name="pin"
              value={formData.pin}
              placeholder="Pin"
              onChange={handleChange}
              ref={pinInput}
            />
          </div>
          <label htmlFor="" className="register-new-label">
            Confirm Pin
          </label>
          <div className="new-register">
            <AiOutlineLock className="register-new-icon" />
            <ImEye
              className="seePassword-icon"
              onClick={() => setSeeConfirmPin(!seeConfirmPin)}
            />
            <input
              type={`${seeConfirmPin ? "text" : "password"}`}
              className="register-confirm-password"
              name="confirmPin"
              value={formData.confirmPin}
              placeholder="confirm pin"
              onChange={handleChange}
              ref={confirmPinInput}
            />
          </div>
          <button
            className={`${isDeactivated ? 'register-new-account-btn register-new-account-btn-active' : 'register-new-account-btn'}`}
            disabled={isDeactivated}
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register