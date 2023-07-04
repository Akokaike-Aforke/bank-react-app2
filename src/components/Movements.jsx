import React, { useState } from "react";
import { useGlobalContext } from "../context";
import moment from 'moment'

const Movements = ({ dashboardUser, sumOfMovements, data3, receiver}) => {
  const dashUser = {...dashboardUser}
const transactions = [...dashUser.transactions].reverse();
const{allMovements,getFormattedDate} = useGlobalContext();
let value = 4;
const getFormatDate =(givenDate)=>{ return moment(givenDate).format("DD/MM/YYYY h:mmA");}

if(allMovements) value = dashUser.transactions.length;
  return (
    <section className="movements-section">
      <div className="recent-title-div">
        <h5>RECENT TRANSACTIONS</h5>
      </div>
      {transactions.map((transaction, index) => {
        const eachTransaction = { ...transaction };
        if (index < value)
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
                    {/* {calcDaysPassed(eachTransaction?.timeOfTransaction)} */}
                    {getFormattedDate(eachTransaction?.timeOfTransaction)}
                    {/* {getFormatDate(eachTransaction?.timeOfTransaction)} */}
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
                    {eachTransaction.amount > 0
                      ? Number(Math.abs(eachTransaction.amount)).toFixed(2)
                      : Number(
                          Math.abs(eachTransaction.amountWithoutCharges)
                        ).toFixed(2)}
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
                      eachTransaction.amount < 0
                        ? "transaction-positive"
                        : "transaction-negative"
                    }`}
                  >
                    TRF {eachTransaction.amount > 0 ? "FROM " : "TO "}
                    {eachTransaction.fullname} ACC** {eachTransaction.client==="self" ? "self" :`${eachTransaction.clientAccountNumber}`.slice(-4)} {`${eachTransaction.description}`.slice(0,31)}
                  </span>
                </h5>
              </div>
              <div className="recent-div">
                <h5>
                  CHARGES&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  <span className="recent-div-span">
                    &#8358;
                    {eachTransaction?.charges?.toFixed(2)}
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
          <tbody>
            {transactions.map((transaction, index) => {
              const eachTransaction = { ...transaction };
              if (index < value)
                return (
                  <tr key={index}>
                    <td>
                      {/* {calcDaysPassed(eachTransaction?.timeOfTransaction)} */}
                      {getFormattedDate(eachTransaction?.timeOfTransaction)}
                    </td>
                    {/* <td>{calcDaysPassed(eachTransaction?.timeOfTransaction)}</td> */}
                    <td>INTERTRANSFER</td>
                    <td>{dashUser.accountNumber}</td>
                    <td>
                      &#8358;
                      {eachTransaction.amount > 0
                        ? Number(Math.abs(eachTransaction.amount)).toFixed(2)
                        : Number(
                            Math.abs(eachTransaction.amountWithoutCharges)
                          ).toFixed(2)}
                    </td>
                    <td>Succesful</td>
                    <td>
                      <span
                        className={`${
                          eachTransaction.amount < 0
                            ? "transaction-positive"
                            : "transaction-negative"
                        }`}
                      >
                        TRF {eachTransaction.amount > 0 ? "FROM " : "TO "}
                        {eachTransaction.fullname} ACC**{" "}
                        {`${eachTransaction.clientAccountNumber}`.slice(-4)}{" "}
                        {`${eachTransaction.description}`.slice(0, 31)}
                      </span>
                    </td>
                    <td>
                      &#8358;
                      {eachTransaction?.charges?.toFixed(2)}
                    </td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Movements;
