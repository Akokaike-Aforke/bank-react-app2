import React from "react";
import { useRef, useState } from "react";
import { useGlobalContext } from "../context";
import { FaTimes } from "react-icons/fa";
import { useEditUser, useTransfer } from "../ReactQueryCustomHooks";
import { toast } from "react-toastify";
import styled from "styled-components";
import Cookies from "js-cookie";

const Transfer = () => {
  const [description, setDescription] = useState("");
  const { transfer, isLoading } = useTransfer();
  const { person, setPerson } = useGlobalContext();

  let transferAmountRef = useRef(null);
  let receiverUsernameRef = useRef(null);
  let pinRef = useRef(null);

  const handleTransfer = (e) => {
    e.preventDefault();
    const receiverUsername = receiverUsernameRef.current.value;
    const transferAmount = transferAmountRef.current.value * 1;
    const pin = pinRef.current.value;
    console.log(typeof transferAmount);
    transfer(
      { receiverUsername, transactionAmount: transferAmount, pin, description, },
      {
        onSuccess: (data) => {
          transferAmountRef.current.value = "";
          receiverUsernameRef.current.value = "";
          pinRef.current.value = "";
          setDescription("");
          toast.success(
            `N${transferAmount} transfer to ${receiverUsername} was successful`
          );
          // Cookies.get("token");
          console.log(data);
        },
        onError: (err) => {
          toast.error(err.response.data.message);
          console.log(err.response.data.message);
        },
      }
    );
  };

  return (
    <TransferSection className="dashboard-popup-section">
      <div className="dashboard-popup-div">
        <button
          className="close-transfer-popup"
          onClick={() => setPerson({ ...person, transferLog: false })}
        >
          <FaTimes />
        </button>
        <h3 className="transfer-h3">TRANSFER FUNDS</h3>
        <form onSubmit={handleTransfer}>
          <label htmlFor="">Amount</label>
          <input
            type="number"
            className="transfer-amount"
            placeholder="amount"
            ref={transferAmountRef}
          />
          <label htmlFor="">Transfer to:</label>
          <input
            type="text"
            placeholder="transfer to"
            className="transfer-person"
            ref={receiverUsernameRef}
          />
          <label htmlFor="">Pin</label>
          <input
            type="number"
            placeholder="pin"
            className="transfer-pin"
            ref={pinRef}
          />
          <label htmlFor="">Description</label>
          <input
            type="text"
            className="transfer-description"
            placeholder="not more than 30 characters"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="transfer-btn">transfer</button>
        </form>
      </div>
    </TransferSection>
  );
};

const TransferSection = styled.section``;

export default Transfer;
