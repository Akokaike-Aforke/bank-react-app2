import React, { useState } from "react";
import { useGlobalContext } from "../context";

const Movements = ({ dashboardUser, sumOfMovements}) => {
  const dashUser = {...dashboardUser}
const transactions = [...dashUser.transactions].reverse();
const{allMovements} = useGlobalContext();
let value = 4;

const calcDaysPassed=(date)=>{
  const daysPassed = new Date() - date;
  return date;
}
if(allMovements) value = dashUser.transactions.length;
  return (
    <section className="movements-section">
      <div className="recent-title-div">
        <h5>RECENT TRANSACTIONS</h5>
      </div>
      {transactions.map((transaction, index) => {
        const eachTransaction = { ...transaction };
        
        if(index < value)
        return (
          <div
            className={
              transaction.amount > 1
                ? "transactions-div deposit"
                : "transactions-div withdrawal"
            }
            key={index}
          >
            <div className="recent-div">
              <h5>
                DATE&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <span className="recent-div-span">
                  {eachTransaction?.timeOfTransaction}
                </span>
              </h5>
            </div>
            <div className="recent-div">
              <h5>
                TYPE&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <span className="recent-div-span">INTERTRANSFER</span>
              </h5>
            </div>
            <div className="recent-div">
              <h5>
                ACCOUNT&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <span className="recent-div-span">
                  {dashUser.accountNumber}
                </span>
              </h5>
            </div>
            <div className="recent-div">
              <h5>
                AMOUNT&nbsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <span className="recent-div-span">
                  &#8358;
                  {Math.abs(eachTransaction.amount)}
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
                    eachTransaction.amount > 0
                      ? "recent-div-span transaction-positive"
                      : "recent-div-span transaction-negative"
                  }`}
                >
                  ONB TRF {eachTransaction.amount > 0 ? "FROM" : "TO"}{" "}
                  {eachTransaction.amount > 0
                    ? dashUser.username
                    : eachTransaction.client}{" "}
                  A**7353 GTB Up
                </span>
              </h5>
            </div>
            <div className="recent-div">
              <h5>
                CHARGES&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <span className="recent-div-span">
                  &#8358;{Math.abs(eachTransaction.amount * 0.015)}
                </span>
              </h5>
            </div>
          </div>
        );
      })}
      <div className="transactions-div-table">
        <table>
          <tr className="row-heading">
            <th>DATE</th>
            <th>TRANSACTION TYPE</th>
            <th>ACCOUNT</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
            <th>DESCRIPTION</th>
            <th>CHARGES</th>
          </tr>
          {transactions.map((transaction, index) => {
            const eachTransaction = { ...transaction };
            if (index < value)
              return (
                <tr>
                  <td>{eachTransaction?.timeOfTransaction}</td>
                  {/* <td>{calcDaysPassed(eachTransaction?.timeOfTransaction)}</td> */}
                  <td>INTERTRANSFER</td>
                  <td>{dashUser.accountNumber}</td>
                  <td>&#8358;{Math.abs(eachTransaction.amount)}</td>
                  <td>Succesful</td>
                  <td>
                    <span className={`${eachTransaction.amount < 0 ? 'transaction-positive' : 'transaction-negative'}`}>
                      ONB TRF {eachTransaction.amount > 0 ? "FROM " : "TO "}
                      {eachTransaction.client}
                      A**7353 GTB Up
                    </span>
                  </td>
                  <td>&#8358;{Math.abs(eachTransaction.amount * 0.015)}</td>
                </tr>
              );
          })}
        </table>
      </div>
    </section>
  );
};

export default Movements;
