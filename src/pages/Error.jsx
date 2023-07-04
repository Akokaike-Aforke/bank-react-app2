import React from 'react'
import { useGetAllUsers } from './../ReactQueryCustomHooks'
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const data = useGetAllUsers();
  const navigate = useNavigate();
  console.log(data)
  return (
    <div>
      <p>error...</p>
      <button onClick={()=>navigate("/")}>back home</button>
    </div>
  )
}

export default Error
