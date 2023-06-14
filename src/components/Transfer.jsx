import React from 'react'
import { useRef } from 'react';
import { useGlobalContext } from '../context';
import { FaTimes } from "react-icons/fa";
import { useEditUser } from '../ReactQueryCustomHooks';

const Transfer = ({data3, sumOfMovements, dashboardUser, setReceiver}) => {
    const{person, setPerson} =useGlobalContext();
    const editUser = useEditUser();
    
    
  const transferAmount = useRef(null);
  const transferUsername = useRef(null);
  const transferPin = useRef(null);
const handleTransfer = (e) =>{
  e.preventDefault();
  const name = transferUsername.current.value;
  const amount = transferAmount.current.value * 1;
  const pin = transferPin.current.value;
  const receiver = data3.users.find(person => person.username === name);
  if(!receiver) return;
  if(receiver && amount > 20 && amount < sumOfMovements - 1000 && dashboardUser.password === pin && receiver.username !== dashboardUser.username){
    
    editUser({userId:receiver._id, transactions:[...receiver.transactions, {amount, client:dashboardUser.username, timeOfTransaction: new Date()}]})
    editUser({
      userId: dashboardUser._id,
      transactions: [
        ...dashboardUser.transactions,
        {
          amount: amount * -1,
          client: receiver.username,
          timeOfTransaction: new Date(),
        },
      ],
    });
    // console.log(receiver)
    transferUsername.current.value='';
    transferAmount.current.value='';
    transferPin.current.value='';
    
  }}
// console.log(dashboardUser)

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