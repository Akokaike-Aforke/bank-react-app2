import React, { useState } from "react";
import { useGlobalContext } from "../context";
import moment from "moment";

const Movements = ({
  type,
  client,
  description,
  timeOfTransaction,
  transactionsLength,
  transactionAmount,
  data,
  charges,
  isLoading
}) => {
  const { allMovements, selectedAccount, getFormattedDate } = useGlobalContext();
  let value = 4;
  const getFormatDate = (givenDate) => {
    return moment(givenDate).format("DD/MM/YYYY h:mmA");
  };
  if(isLoading)
  {
    return <p>Loading...</p>
  }
  const accountNumber = data?.data?.user?.accounts[selectedAccount]?.accountNumber;
  if (allMovements) value = transactionsLength;
          return (
    <section className="movements-section">
      <div className="recent-title-div">
        <h5>RECENT TRANSACTIONS</h5>
      </div>
      {data?.data?.user?.accounts[selectedAccount]?.transactions.slice().reverse().map((transaction, index) => {
        const {
          type,
          client,
          clientAccountNumber,
          clientFullname,
          description,
          timeOfTransaction,
          transactionAmount,
          charges, id
        } = transaction;
        if (index < value)
  return (
    <div
      className={
        transactionAmount > 1
          ? "transactions-div deposit"
          : "transactions-div withdrawal"
      }
    key={id}>
      <div className="recent-div">
        <h5>
          DATE&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          <span className="recent-div-span">
            {getFormattedDate(timeOfTransaction)}
          </span>
        </h5>
      </div>
      <div className="recent-div">
        <h5>
          TYPE&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          <span className="recent-div-span">{type}</span>
        </h5>
      </div>
      <div className="recent-div">
        <h5>
          ACCOUNT&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          <span className="recent-div-span">
            {data?.data?.user?.accounts[selectedAccount]?.accountNumber}
          </span>
        </h5>
      </div>
      <div className="recent-div">
        <h5>
          AMOUNT&nbsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          <span className="recent-div-span">
            &#8358;
            {Math.abs(transactionAmount)}
          </span>
        </h5>
      </div>
      <div className="recent-div">
        <h5>
          STATUS&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          <span className="recent-div-span">Successful</span>
        </h5>
      </div>
      <div className="recent-div">
        <h5>DESCRIPTION</h5>
        <h5>
          <span
            className={`${
              transactionAmount < 0
                ? "transaction-positive"
                : "transaction-negative"
            }`}
          >
            TRF {transactionAmount > 0 ? "FROM " : "TO "}
            {client} ACC**{" "}
            {client === "self" ? "" : `${clientAccountNumber}`.slice(-4)}{" "}
            {description}
          </span>
        </h5>
      </div>
      <div className="recent-div">
        <h5>
          CHARGES&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          <span className="recent-div-span">
            &#8358;
            {charges?.toFixed(2)}
          </span>
        </h5>
      </div>
    </div>
  );

      })}





      <div className="transactions-div-table">
        <table>
          <thead>
            <tr className="row-heading">
              <th>DATE</th>
              <th>TRANSACTION TYPE</th>
              <th>ACCOUNT</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
              <th>DESCRIPTION</th>
              <th>CHARGES</th>
            </tr>
          </thead>
          {data?.data?.user?.accounts[selectedAccount]?.transactions.slice().reverse().map((transaction, index) => {
            const {
              type,
              client,
              clientAccountNumber,
              clientFullname,
              description,
              timeOfTransaction,
              transactionAmount,
              charges,
            } = transaction;
            if (index < value)
            return (
              <tbody key={transaction.id}>
                <tr>
                  <td>
                    {/* {calcDaysPassed(eachTransaction?.timeOfTransaction)} */}
                    {getFormattedDate(timeOfTransaction)}
                  </td>
                  {/* <td>{calcDaysPassed(eachTransaction?.timeOfTransaction)}</td> */}
                  <td>{type}</td>
                  <td>{accountNumber}</td>
                  {/* <td>{data.data.user.accounts[0].accountNumber}</td> */}
                  <td>&#8358;{Math.abs(transactionAmount)}</td>
                  <td>Succesful</td>
                  <td>
                    <span
                      className={`${
                        transactionAmount < 0
                          ? "transaction-positive"
                          : "transaction-negative"
                      }`}
                    >
                      TRF {transactionAmount > 0 ? "FROM " : "TO "}
                      {client} ACC**{" "}
                      {client === "self" ? "" : `${clientAccountNumber}`.slice(-4)}{" "}
                      {description}
                    </span>
                  </td>
                  <td>
                    &#8358;{charges.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </section>
  );
};

export default Movements;
