import React, { useState } from "react";
import logo from "../Images/Fidelity-Bank-Logo.png";
import { useResetPin } from "../ReactQueryCustomHooks";
import { ImEye } from "react-icons/im";

const ResetPin = () => {
  const [pin, setPin] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const [seePin, setSeePin] = useState(false);
  const [seePinConfirm, setSeePinConfirm] = useState(false);
  const { mutate, isLoading } = useResetPin();
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      { pin, pinConfirm },
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

        <p className="home-p1">Please enter your new pin</p>
        <div className="reset-password-form-div">
          <form onSubmit={handleSubmit} className="reset-password-form">
            <div className="home-input-icon-div">
              <input
                type={setSeePin ? "text" : "password"}
                className="reset-password-input"
                placeholder="pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
              <ImEye
                className="icon2"
                onClick={() => setSeePin(!seePin)}
              />
            </div>
            <div className="home-input-icon-div">
              <input
                type={seePinConfirm ? "text" : "password"}
                className="reset-password-input"
                placeholder="passwordConfirm"
                value={pinConfirm}
                onChange={(e) => setPinConfirm(e.target.value)}
              />
              <ImEye
                className="icon2"
                onClick={() => setSeePinConfirm(!seePinConfirm)}
              />
            </div>
            <button className="reset-password-btn">Submit</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ResetPin;
