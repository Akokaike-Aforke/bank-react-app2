import React from 'react'
import { useRef } from 'react';
import { useGlobalContext } from '../context';
import { FaTimes } from "react-icons/fa";
import { useEditUser } from '../ReactQueryCustomHooks';
import { toast } from 'react-toastify';

const Transfer = ({data3, sumOfMovements, clearedBalance, dashboardUser, setReceiver, setNum}) => {
    const{person, setPerson} =useGlobalContext();
    const editUser = useEditUser();
    
    
  const transferAmount = useRef(null);
  const transferUsername = useRef(null);
  const transferPin = useRef(null);
const handleTransfer = (e) =>{
  e.preventDefault();
  const name = transferUsername.current.value;
  const amount = transferAmount.current.value * 1;
  const charges = amount * 0.015;
  const amountPlusCharges = amount+charges;
  const pin = transferPin.current.value;
  const receiver = data3.users.find(person => person.username === name);
  if(!receiver){
    toast.warning("Invalid recipient. Please crosscheck your input")
  }
  if(amount < 20){
    toast.warning("You cannot transfer less than N20");
  }
  if(amount > clearedBalance){
    toast.warning("Insufficient balance")
  }
  if(receiver && amount > 20 && amount < clearedBalance && dashboardUser.password === pin && receiver.username !== dashboardUser.username){
    editUser({userId:receiver._id, transactions:[...receiver.transactions, {amount, charges: 0.00, client:dashboardUser.username,clientAccountNumber:dashboardUser.accountNumber, timeOfTransaction: new Date()}]})
    editUser({
      userId: dashboardUser._id,
      transactions: [
        ...dashboardUser.transactions,
        {
          amount: -amountPlusCharges,
          amountWithoutCharges: amount *-1,
          charges,
          client: receiver.username,
          clientAccountNumber: receiver.accountNumber,
          timeOfTransaction: new Date(),
        },
      ],
    });
    toast.success(
      `You have successfully transferred ${amount} to ${receiver.username}`
    );
    // console.log(receiver)
    transferUsername.current.value='';
    transferAmount.current.value='';
    transferPin.current.value='';
    setReceiver(receiver)
    setNum(receiver.accountNumber)
    
  }}

  return (
    <section className="dashboard-popup-section">
      <div className="dashboard-popup-div">
        <button
          className="close-transfer-popup"
          onClick={() => setPerson({...person, transferLog:false})}
        >
          <FaTimes />
        </button>
        <h3 className='transfer-h3'>TRANSFER FUNDS</h3>
        <form onSubmit={handleTransfer}>
          <label htmlFor="">Amount</label>
          <input type="number" 
          className='transfer-amount'
          placeholder="amount" ref={transferAmount} />
          <label htmlFor="">Transfer to:</label>
          <input type="text" placeholder="transfer to"
          className='transfer-person'
           ref={transferUsername} />
          <label htmlFor="">Pin</label>
          <input type="number" placeholder="pin"
          className='transfer-pin'
           ref={transferPin} />
          <button className='transfer-btn'>transfer</button>
        </form>
      </div>
    </section>
  );
}

export default Transfer