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

const getUser = ()=>{
    const { data, loading } = useGetAllUsers();
    const data1 = { ...data };
    const data2 = { ...data1.data };
    const data3 = { ...data2 };
    return {data,data3, loading};
}

    return(
        <AppContext.Provider value={{setLoggedUser, setLoggedUserPin, loggedUser, getUser, accountNumber, setAccountNumber, person, setPerson, newSignup, setNewSignup, allMovements, setAllMovements}}>
            {children}
        </AppContext.Provider>
    )
}
export const useGlobalContext = () =>{
    return useContext(AppContext)
}