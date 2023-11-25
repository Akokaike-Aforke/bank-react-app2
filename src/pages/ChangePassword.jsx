import React, { useState } from "react";
import logo from "../Images/Fidelity-Bank-Logo.png";
import { useUpdatePassword } from "../ReactQueryCustomHooks";
import { ImEye } from "react-icons/im";
import { TailSpin } from "react-loader-spinner";


const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [seePasswordConfirm, setSeePasswordConfirm] = useState(false);
  const [seePasswordCurrent, setSeePasswordCurrent] = useState(false);
  const { mutate, isLoading } = useUpdatePassword();
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      { password, passwordConfirm, passwordCurrent },
      {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };
  return (
    <main className="home-main">
      <section className="reset-password-section">
        <img src={logo} alt="fidelity logo" className="home-logo" />
        <h1 className="home-h1">Welcome to Fidelity Online Banking</h1>

        <p className="home-p1">Please enter your new password</p>
        {isLoading && <div className="spinner">
          <TailSpin width="30" height="30" color="#002082" radius="3" />
        </div>}
        <div className="reset-password-form-div">
          <form onSubmit={handleSubmit} className="reset-password-form">
            <div className="home-input-icon-div">
              <input
                type={seePasswordCurrent ? "text" : "password"}
                className="reset-password-input"
                placeholder="current password"
                value={passwordCurrent}
                onChange={(e) => setPasswordCurrent(e.target.value)}
              />
              <ImEye
                className="icon2"
                onClick={() => setSeePasswordCurrent(!seePasswordCurrent)}
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
            <div className="home-input-icon-div">
              <input
                type={seePasswordConfirm ? "text" : "password"}
                className="reset-password-input"
                placeholder="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <ImEye
                className="icon2"
                onClick={() => setSeePasswordConfirm(!seePasswordConfirm)}
              />
            </div>
            <button className="reset-password-btn">Submit</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ChangePassword;
