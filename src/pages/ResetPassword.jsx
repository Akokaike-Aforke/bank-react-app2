import React, {useState} from 'react'
import logo from "../Images/Fidelity-Bank-Logo.png";
import { useResetPassword } from "../ReactQueryCustomHooks";
import { ImEye } from "react-icons/im";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [seePassword, setSeePassword] = useState(false);
    const [seePasswordConfirm, setSeePasswordConfirm] = useState(false);
    const { mutate, isLoading } = useResetPassword();
    const handleSubmit = (e) => {
      e.preventDefault();
      mutate({password, passwordConfirm}, {
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
      <section className="reset-password-section">
        <img src={logo} alt="fidelity logo" className="home-logo" />
        <h1 className="home-h1">Welcome to Fidelity Online Banking</h1>

        <p className="home-p1">Please enter your new password</p>
        <div className="reset-password-form-div">
          <form onSubmit={handleSubmit} className="reset-password-form">
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
}

export default ResetPassword