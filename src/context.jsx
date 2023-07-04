import React, { useState } from "react";
import { useContext } from "react";
const AppContext = React.createContext();
import { useGetAllUsers } from "./ReactQueryCustomHooks";

export const AppProvider = ({children}) =>{
const[loggedUser, setLoggedUser] = useState({});
const[loggedUserPin, setLoggedUserPin] = useState('');
const[accountNumber, setAccountNumber] = useState('');
const[newSignup, setNewSignup] = useState({})
const[person, setPerson] = useState({transferLog:false, openDeposit:false, openDashboard:false})
const [allMovements, setAllMovements] = useState(false);
const [startTime, setStartTime] = useState(false);

const getUser = ()=>{
    const { data, loading } = useGetAllUsers();
    const data1 = { ...data };
    const data2 = { ...data1.data };
    const data3 = { ...data2 };
    return {data,data3, loading};
}
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
console.log(getFormattedDate(new Date()))

    return(
        <AppContext.Provider value={{setLoggedUser, setLoggedUserPin, loggedUser, getUser, accountNumber, setAccountNumber, person, setPerson, newSignup, setNewSignup, allMovements, setAllMovements, getFormattedDate, startTime, setStartTime}}>
            {children}
        </AppContext.Provider>
    )
}
export const useGlobalContext = () =>{
    return useContext(AppContext)
}