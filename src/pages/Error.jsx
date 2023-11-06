import React, { useEffect, useState } from 'react'
import { useGetAllUsers, useGetUser } from './../ReactQueryCustomHooks'
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const [datum, setDatum] = useState("")
  // const data = useGetAllUsers();
  const {data, isLoading} = useGetUser();
  const navigate = useNavigate();
console.log(datum?.data)
  
  
  useEffect(()=>{setDatum(data)}, [isLoading, data])
  if (isLoading || !datum) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <p>error...</p>
      <button onClick={()=>navigate("/")}>back home</button>
      <p>{datum.data.user.fullname}</p>
    </div>
  )
}

export default Error
