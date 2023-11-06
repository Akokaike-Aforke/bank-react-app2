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
    <MyAccountsMain className="dashboard-popup-section">
      <div className="dashboard-popup-div">
        <button className="close-transfer-popup" onClick={handleClose}>
          <FaTimes />
        </button>
        <h3 className="deposit-h3">MY ACCOUNTS</h3>
        <div className="myAccountsDiv">
          <p>Account Number</p>
          <p>Cleared Balance</p>
          <p>Account Balance</p>
          <p>Account Type</p>
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
            <div className="myAccountsDiv" key={index}>
              <p>{accountNumber}</p>
              <p>{clearedBalance}</p>
              <p>{accountBalance}</p>
              <p>{accountType}</p>
              <p>{dateCreated}</p>
              <button onClick={() => setSelectedAccount(index)}>switch</button>
            </div>
          );
        })}
      </div>
    </MyAccountsMain>
  );
}

const MyAccountsMain = styled.main`
  .myAccountsDiv {
    display: flex;
    justify-content: space-between;
  }
`;

export default MyAccounts;
