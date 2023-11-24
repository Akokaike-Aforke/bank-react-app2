import React, { useState } from "react";
import logo from "../Images/Fidelity-Bank-Logo.png";
import { useUpdatePin } from "../ReactQueryCustomHooks";
import { ImEye } from "react-icons/im";

const ChangePin = () => {
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [pinCurrent, setPinCurrent] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [seePin, setSeePin] = useState(false);
  const [seePinConfirm, setSeePinConfirm] = useState(false);
  const [seePinCurrent, setSeePinCurrent] = useState(false);
  const { mutate, isLoading } = useUpdatePin();
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      { password, pin, pinConfirm, pinCurrent },
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

        <p className="home-p1">
          Please enter the details below to change your pin
        </p>
        <div className="reset-password-form-div">
          <form onSubmit={handleSubmit} className="reset-password-form">
            <div className="home-input-icon-div">
              <input
                type={seePassword ? "text" : "password"}
                className="reset-password-input"
                placeholder="current password"
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
                type={seePinCurrent ? "number" : "password"}
                className="reset-password-input"
                placeholder="current pin"
                value={pinCurrent}
                onChange={(e) => setPinCurrent(e.target.value)}
              />
              <ImEye
                className="icon2"
                onClick={() => setSeePinCurrent(!seePinCurrent)}
              />
            </div>
            <div className="home-input-icon-div">
              <input
                type={seePin ? "number" : "password"}
                className="reset-password-input"
                placeholder="new pin"
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
                type={seePinConfirm ? "number" : "password"}
                className="reset-password-input"
                placeholder="confirm new pin"
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

export default ChangePin;
