import React, { useState, useEffect } from "react";
import { useContext } from "react";
const AppContext = React.createContext();

import io from "socket.io-client";



export const AppProvider = ({children}) =>{
  // const socket = io.connect("http://localhost:5000");
  // console.log(socket);

const[loggedUser, setLoggedUser] = useState({});
const[loggedUserPin, setLoggedUserPin] = useState('');
const[accountNumber, setAccountNumber] = useState('');
const[newSignup, setNewSignup] = useState({})
const[person, setPerson] = useState({transferLog:false, openDeposit:false, openDashboard:false, viewMyAccounts: false, viewMore: false, doMoreView: false, dashboardMain: true, dashboardOptionShow: true, dashboardBackground: true})
const [allMovements, setAllMovements] = useState(false);
const [startTime, setStartTime] = useState(false);
const [account, setAccount] = useState({});
const[userId, setUserId] = useState(null)
  const [userSpecificData, setUserSpecificData] = useState(0);


const initialSelectedAccount = parseInt(localStorage.getItem("selectedAccount")) || 0;
// const userId = useGlobalContext()

const login =(userId)=>setUserId(userId)
const [selectedAccount, setSelectedAccount] = useState(initialSelectedAccount);
useEffect(() => {
  localStorage.setItem("selectedAccount", selectedAccount);
}, [selectedAccount]);

useEffect(()=>{
  if(userId){
  const userValue = parseInt(localStorage.getItem(`user_${userId}_key`)) || 0;
  setSelectedAccount(userValue)
  }
}, [userId, selectedAccount])
const getFormattedDate = (dateTime) =>{
    const options = {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    const options2 = {
      hour: "2-digit",
      hour12: true,
      minute: "2-digit",
    };
    const currentDate = new Date(dateTime);
    if (new Date().getDate() - currentDate.getDate() === 0) {
        const ukDateFormat = `TODAY ${new Intl.DateTimeFormat(
          "en-UK",
          options2
        ).format(new Date(dateTime))}`;
      return ukDateFormat;
    }
      if (new Date().getDate() - currentDate.getDate() === 1) {
        const ukDateFormat = `YESTERDAY ${new Intl.DateTimeFormat(
          "en-UK",
          options2
        ).format(new Date(dateTime))}`;
        return ukDateFormat;
      }
    const ukDateFormat = `${new Intl.DateTimeFormat("en-UK", options).format(new Date(dateTime))}`;
    return ukDateFormat;
}



const getFormattedDate2 = (dateTime) => {
  const options = {
    // hour: "numeric",
    // hour12: true,
    // minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  // const options2 = {
  //   hour: "2-digit",
  //   hour12: true,
  //   minute: "2-digit",
  // };
  const currentDate = new Date(dateTime);
  const ukDateFormat = `${new Intl.DateTimeFormat("en-UK", options).format(
    new Date(dateTime)
  )}`;
  const formattedDate = ukDateFormat.replace(/\//g, "-")
  return formattedDate;
};

    return(
        <AppContext.Provider value={{setLoggedUser, setLoggedUserPin, loggedUser, accountNumber, setAccountNumber, person, setPerson, newSignup, setNewSignup, allMovements, setAllMovements, getFormattedDate, startTime, setStartTime, selectedAccount, setSelectedAccount, account, setAccount, userId, login, userSpecificData, setUserSpecificData, getFormattedDate2}}>
            {children}
        </AppContext.Provider>
    )
}
export const useGlobalContext = () =>{
    return useContext(AppContext)
}