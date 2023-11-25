import React, { useEffect, useRef, useState} from 'react'
import { useGlobalContext } from '../context';
import { FaTimes } from 'react-icons/fa';
import { useCreateDeposit } from "../ReactQueryCustomHooks";
import { toast } from 'react-toastify';
import Cookies from "js-cookie";
import { AiOutlineConsoleSql } from 'react-icons/ai';

const SelfDeposit = () => {
    const { person, setPerson} = useGlobalContext();
    const depositAmount = useRef(null);
    const pinRef = useRef(null);
    const[description, setDescription] = useState("")
    const {mutate, isLoading} = useCreateDeposit();
    console.log(mutate)
    
  const handleDeposit = (e) => {
    e.preventDefault();
    const pin = pinRef.current.value;
    mutate({
      transactionAmount: (depositAmount.current.value) * 1, pin, 
      description,
    },
    {
      onSuccess: ()=>{
        depositAmount.current.value = "";
        pinRef.current.value = "";
        setDescription("");
        setPerson({ ...person, openDeposit: false });
      },
      onError: (err)=>{
       console.log(err)
      }
    }
    )
    
  };
  const handleClose = () =>{
    setPerson({ ...person, openDeposit: false})
  }
  if(isLoading){
    console.log("Loading")
  }
  return (
    <section
      className={
        person.openDeposit
          ? "dashboard-popup-section scale-animation"
          : "dashboard-popup-section scale-animation-back"
      }
    >
      <div className="dashboard-popup-div">
        <button className="close-transfer-popup" onClick={handleClose}>
          <FaTimes />
        </button>
        <p>loading</p>
        <h3 className="deposit-h3">DEPOSIT MONEY</h3>
        <form onSubmit={handleDeposit}>
          <label htmlFor="depositAmount" className="register-new-label">
            Amount
          </label>
          <div className="deposit-input-div">
            <input
              type="number"
              placeholder="amount"
              id="depositAmount"
              ref={depositAmount}
            />
          </div>

          <label htmlFor="pin" className="register-new-label">
            Pin
          </label>
          <div className="deposit-input-div">
            <input id="pin" type="number" placeholder="pin" ref={pinRef} />
          </div>

          <label htmlFor="pin" className="register-new-label">
            Description
          </label>
          <div className="deposit-input-div">
            <input
              type="text"
              placeholder="not more than 30 characters"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button className="deposit-btn">Deposit</button>
        </form>
      </div>
    </section>
  );
}

export default SelfDeposit