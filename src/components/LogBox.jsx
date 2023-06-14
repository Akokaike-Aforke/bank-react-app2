import React from 'react'

const LogBox = ({result, loading, dashboardUser}) => {
    const data1 = {...result};
  const data2 = {...data1.data}
  const data3 = {...data2}
  // console.log(data3.users)
//  console.log(dashboardUser.transactions);
  
  
    
    if(loading){
        return <p>Loading....</p>
    }
  return (
    <div>
        {/* {data3.users.map(user=>{
            
            return <h5 key={user.id}>{user.firstname}</h5>
        })} */}
        <h2>{dashboardUser.firstname}</h2>
        <h2>user</h2>
    </div>
  )
}

export default LogBox