import React, {useState} from 'react'
import logo from "../Images/Fidelity-Bank-Logo.png";
import { useForgotPassword } from '../ReactQueryCustomHooks';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const {mutate, isLoading} = useForgotPassword();
    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(
            email,
            {
                onSuccess: (data) => {
                    console.log(data)
                },
                onError: (err) => {
                    console.log(err)
                }
            })
    }
  return (
    <main className="home-main">
      <section className="forgot-password-section">
        <img src={logo} alt="fidelity logo" className="home-logo" />
        <h1 className="home-h1">Welcome to Fidelity Online Banking</h1>
        <p className="home-p1">Forgot Your Password? Please provide your email address.</p>
        <div className="forgot-password-form-div">
          <form onSubmit={handleSubmit} className="forgot-password-form">
              <input
                type="email"
                className="forgot-password-input"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            <button className='forgot-password-btn'>Submit</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default ForgotPassword
