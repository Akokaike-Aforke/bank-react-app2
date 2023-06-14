import React from 'react'
import { useGlobalContext } from '../context'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const {loggedUser} = useGlobalContext();
  if(!loggedUser){
  return <Navigate to='/' />}
  return children
}

export default ProtectedRoute