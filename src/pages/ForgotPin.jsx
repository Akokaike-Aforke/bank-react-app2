import React, { useState } from "react";
import logo from "../Images/Fidelity-Bank-Logo.png";
import { useForgotPin } from "../ReactQueryCustomHooks";
import { ImEye } from "react-icons/im";
import { TailSpin } from "react-loader-spinner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [seePassword, setSeePassword] = useState(false);
  const { mutate, isLoading } = useForgotPin();
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({email: email.trim(), password: password.trim()}, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };
  return (
    <main className="home-main">
      <section className="forgot-password-section">
        <img src={logo} alt="fidelity logo" className="home-logo" />
        <h1 className="home-h1">Welcome to Fidelity Online Banking</h1>
        <p className="home-p1">
          Forgot Your Pin? Please provide your email address and password.
        </p>
        {isLoading && (
          <div className="spinner">
            <TailSpin width="30" height="30" color="#002082" radius="3" />
          </div>
        )}
        <div className="forgot-password-form-div">
          <form onSubmit={handleSubmit} className="forgot-password-form">
            <div className="home-input-icon-div">
              <input
                type="email"
                className="reset-password-input"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="home-input-icon-div">
              <input
                type={seePassword ? "text" : "password"}
                className="reset-password-input"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ImEye
                className="icon2"
                onClick={() => setSeePassword(!seePassword)}
              />
            </div>
            <button className="forgot-password-btn">Submit</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;
