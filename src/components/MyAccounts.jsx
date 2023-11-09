import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useEditSelectedAccount, useGetUser } from "../ReactQueryCustomHooks";
import styled from "styled-components";

import { useGlobalContext } from "../context";

function MyAccounts() {
  const { data, isLoading } = useGetUser();
  const {
    person,
    setPerson,
    setSelectedAccount,
    selectedAccount,
    userId,
    getFormattedDate2
  } = useGlobalContext();
  const editSelectedAccount = useEditSelectedAccount();
  const handleClose = () => {
    setPerson({ ...person, viewMyAccounts: false });
  };

  useEffect(() => {
    editSelectedAccount({ selectedAccount });
    localStorage.setItem(`user_${userId}_key`, selectedAccount);
  }, [selectedAccount, editSelectedAccount, userId]);


  if (isLoading) {
    return <p>Loading...</p>;
  }
  const accounts = data.data.user.accounts;
  console.log(selectedAccount);
  return (
    <MyAccountsMain className="">
      <div className="my-accounts-main-div">
        <div className="my-accounts-grid1">
          <h3 className="my-accounts-h3">MY ACCOUNTS</h3>
          {accounts.map((account, index) => {
            const {
              accountNumber,
              clearedBalance,
              accountBalance,
              accountType,
              dateCreated,
            } = account;
            return (
              <div
                className={
                  selectedAccount === index
                    ? "myAccountsDiv1 selectedAccount"
                    : "myAccountsDiv1"
                }
                key={index}
              >
                <h5>ACCOUNT NUMBER</h5>
                <p>{accountNumber}</p>
                <h5>CLEARED BALANCE</h5>
                <p>&#8358;{clearedBalance.toFixed(2)}</p>
                <h5>AVAILABLE BALANCE</h5>
                <p>&#8358;{accountBalance.toFixed(2)}</p>
                <h5>ACCOUNT TYPE</h5>
                <p>{accountType}</p>
                <h5>DATE CREATED</h5>
                <p>{getFormattedDate2(dateCreated)}</p>
                <button onClick={() => setSelectedAccount(index)}>
                  switch
                </button>
              </div>
            );
          })}
        </div>
        <div className="my-accounts-grid2">
          <h3 className="my-accounts-h3">MY ACCOUNTS</h3>
          <div className="my-accounts-heading2">
            <h5>ACCOUNT NUMBER</h5>
            <h5>CLEARED BALANCE</h5>
            <h5>AVAILABLE BALANCE</h5>
            <h5>ACCOUNT TYPE</h5>
            <h5>DATE CREATED</h5>
            <h5></h5>
          </div>
          {accounts.map((account, index) => {
            const {
              accountNumber,
              clearedBalance,
              accountBalance,
              accountType,
              dateCreated,
            } = account;
            return (
              <div
                className={
                  selectedAccount === index
                    ? "my-accounts-grid2-table selectedAccount"
                    : "my-accounts-grid2-table"
                }
                key={index}
              >
                <p>{accountNumber}</p>
                <p>&#8358;{clearedBalance.toFixed(2)}</p>
                <p>&#8358;{accountBalance.toFixed(2)}</p>
                <p>{accountType}</p>
                <p>{getFormattedDate2(dateCreated)}</p>
                <button onClick={() => setSelectedAccount(index)}>
                  Switch
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </MyAccountsMain>
  );
}

const MyAccountsMain = styled.main`
  .my-accounts-main-div {
    /* background-color: wheat; */
  }
  .myAccountsDiv1 {
    display: grid;
    grid-template-columns: auto auto;
    padding: 1rem;
    border-bottom: 1px solid rgb(204, 204, 204);
  }
  /* .myAccountsDiv1:first-child {
    border-top: 1px solid rgb(204, 204, 204);
  } */
  .my-accounts-h3 {
    padding: 1rem;
    border-bottom: 1px solid rgb(204, 204, 204);
  }
  .myAccountsDiv1 button,
  .my-accounts-grid2-table button {
    width: 5rem;
    padding: 4px;
    border-radius: 4px;
    border: none;
    background-color: rgb(206, 206, 206);
    color: rgb(14, 35, 139);
    cursor: pointer;
    transition: all 0.4s ease;
  }
  .my-accounts-grid2-table button:hover {
    /* background-color: rgb(206, 206, 206); */
   color: white;
    background-color: rgb(14, 35, 139);
  }
  .selectedAccount {
    color: #038b03;
    /* font-weight: bold; */
    background-color: white;
  }
  .my-accounts-heading2,
  .my-accounts-grid2-table {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
  .my-accounts-grid2-table {
    padding: 1rem;
    border-bottom: 1px solid rgb(204, 204, 204);
  }
  .my-accounts-heading2 {
    padding: 1rem;
    border-bottom: 1px solid rgb(204, 204, 204);
  }
  .my-accounts-grid2 {
    display: none;
  }

  @media screen and (min-width: 700px) {
    .my-accounts-grid1 {
      display: none;
    }
    .my-accounts-grid2 {
      display: block;
    }
  }
`;

export default MyAccounts;
