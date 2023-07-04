import React, { useRef} from 'react'
import { useGlobalContext } from '../context';
import { FaTimes } from 'react-icons/fa';
import { useEditUser } from "../ReactQueryCustomHooks";

const SelfDeposit = ({dashboardUser}) => {
    const { person, setPerson } = useGlobalContext();
    const depositAmount = useRef(null);
    const pin = useRef(null);
    const editUser = useEditUser();
    
  const handleDeposit = (e) => {
    e.preventDefault();
    const amount = depositAmount.current.value * 1;
    editUser({
      userId: dashboardUser._id,
      transactions: [
        ...dashboardUser.transactions,
        { amount, client: "self", timeOfTransaction: new Date(), charges: 0},
      ],
    });
    depositAmount.current.value = "";
  };
  const handleClose = () =>{
    setPerson({ ...person, openDeposit: false, openDashboard: false})
  }
    
  return (
    <section className="dashboard-popup-section">
      <div className="dashboard-popup-div">
        <button className="close-transfer-popup" onClick={handleClose}>
          <FaTimes />
        </button>
        <h3 className='deposit-h3'>DEPOSIT MONEY</h3>
        <form onSubmit={handleDeposit}>
          <label htmlFor="depositAmount" className="register-new-label">
            Amount
          </label>
          <div className="deposit-input-div">
            <input type="number" placeholder="amount" id='depositAmount' ref={depositAmount}/>
          </div>

          <label htmlFor="pin" className="register-new-label">
            Pin
          </label>
          <div className="deposit-input-div">
            <input type="number" placeholder="pin" ref={pin}/>
          </div>
          <button className='deposit-btn'>Deposit</button>
        </form>
      </div>
    </section>
  );
}

export default SelfDeposit