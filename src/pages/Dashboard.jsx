import React, { useEffect, useRef, useState } from 'react'
import Movements from '../components/Movements';
import { useGlobalContext } from '../context';
import { useEditUser } from '../ReactQueryCustomHooks';
import covid from '../Images/Fidelity-bank-covid.jpg';
import logo from '../Images/Fidelity-Bank-Logo.png'
import { GrFormClose } from 'react-icons/gr';
import { BiPowerOff } from 'react-icons/bi';
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { FaGreaterThan } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import Transfer from '../components/Transfer';
import SelfDeposit from '../components/SelfDeposit';
import image1 from '../Images/phone-image.png';
import image2 from '../Images/phone-image2.png';
import styled from 'styled-components'
import Profile from '../components/Profile';
import startLogOutTimer from '../components/Timer';
import Profiles from './Profiles';

const Dashboard = () => {
  const{loggedUser, getUser, person, setPerson, setAllMovements, allMovements,startTime} = useGlobalContext();
  const {data3} = getUser();
  const[receiver, setReceiver] = useState({})
  const[isInfo, setIsInfo] = useState(true);
  const[value, setValue] = useState(0);
  const[profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate();
  const [num, setNum] = useState("")

  const handleValue = () =>{
    if(value === 0)setValue(1)
    else if(value === 1)setValue(0)
  }  
  const dashboardUser = data3?.users?.find(person => person.username === loggedUser.username)
  const sumOfMovements = dashboardUser?.transactions.reduce((total, cur)=>{
    return total += cur.amount;
  }, 0)
  const availableBalance = sumOfMovements;
  const clearedBalance = sumOfMovements - 1000;
const timerRef = useRef(null);
useEffect(()=>{
  startTime && startLogOutTimer(timerRef);
},[])

  
useEffect(() => {
  let slider = setInterval(() => {
    handleValue();
  }, 3000);
  return () => clearInterval(slider);
}, [value]);

  if(!dashboardUser){
    return<h1>loading...</h1>
  }
  
  return (
    <DashboardMain className="covid-main">
      {isInfo && (
        <section className="covid-section fade-in">
          <div className="covid-div">
            <button className="covid-close" onClick={() => setIsInfo(false)}>
              <GrFormClose className="covid-close" />
            </button>
            <a href="https://www.who.int/health-topics/coronavirus#tab=tab_1">
              <img src={covid} alt="" className="covid-img" />
            </a>
          </div>
        </section>
      )}

      <section>
        <div className="dashboard-div">
          <img src={logo} className="dashboard-img"></img>
          <button className="dashboard-close-btn" onClick={() => navigate("/")}>
            <BiPowerOff />
            LOGOUT
          </button>
        </div>
        <nav className="dashboard-nav">
          <div className="dashboard-nav-div">
            <p className="dashboard-nav-p">
              Hi, <span className="dashboard-name">{loggedUser.fullname}</span>
            </p>
            <button className="dashboard-profile-btn">
              <span className="view-profile-span" onClick={()=>setProfileOpen(true)}>View profile</span>
              <FaGreaterThan />
            </button>
          </div>
          <button
            className="dashboard-nav-btn pulse"
            onClick={() =>
              setPerson({ ...person, openDashboard: !person.openDashboard })
            }
          >
            {person.openDashboard ? <FaTimes /> : <FaBars />}
          </button>
        </nav>
        {person.openDashboard && (
          <article className="dashboard-options">
            <div className="dashboard-underline-div"></div>
            {person.transferLog && (
              <Transfer
                data3={data3}
                sumOfMovements={sumOfMovements}
                clearedBalance={clearedBalance}
                dashboardUser={dashboardUser}
                setReceiver={setReceiver}
                setNum={setNum}
              />
            )}
            {person.openDeposit && (
              <SelfDeposit dashboardUser={dashboardUser} />
            )}

            <button
              className="dashboard-options-btn"
              onClick={() => setPerson({ ...person, openDashboard: false })}
            >
              <h4>DASHBOARD</h4>
            </button>
            <button
              className="dashboard-options-btn"
              onClick={() => setPerson({ ...person, openDeposit: true })}
            >
              <h4>DEPOSIT MONEY</h4>
            </button>
            <button
              className="dashboard-options-btn"
              onClick={() => setPerson({ ...person, transferLog: true })}
            >
              <h4>TRANSFERS</h4>
            </button>
            <button className="dashboard-options-btn">
              <h4>MY ACCOUNT AND CARDS</h4>
            </button>
            <button className="dashboard-options-btn">
              <h4>BULK TRANSACTIONS</h4>
            </button>
            <button className="dashboard-options-btn">
              <h4>AIRTIME</h4>
            </button>
            <button className="dashboard-options-btn">
              <h4>PAYMENTS AND BILLS</h4>
            </button>
            <button className="dashboard-options-btn">
              <h4>GAMING</h4>
            </button>
            <button className="dashboard-options-btn">
              <h4>ACCOUNT MAINTENACE</h4>
            </button>
            <button
              onClick={() => setProfileOpen(true)}
              className="dashboard-options-btn"
            >
              <h4>PROFILE AND SETTINGS</h4>
            </button>
            <button className="dashboard-options-btn">
              <h4>TRADE</h4>
            </button>
            <button className="dashboard-options-btn">
              <h4>SELF SERVICE</h4>
            </button>
          </article>
        )}
        <div className="dashboard-main-div">
          {/* <div className="timer">
            <h5>
              You will be logged out in <span ref={timerRef}>5secs</span>
            </h5>
          </div> */}
          <div className="dashboard-summary-image-div">
            <article className="dashboard-summary">
              <div className="savings-div">
                <section className="savings-section">
                  <h3>{loggedUser.accountType}</h3>
                  <h3>{dashboardUser.accountNumber}</h3>
                </section>
              </div>
              <div className="savings-div2">
                <section className="savings-section2">
                  <h1 className="savings-section2-name">
                    {loggedUser.fullname}
                  </h1>
                  <div className="balance-div">
                    <h5>AVAILABLE BALANCE</h5>
                    <h5>CLEARED BALANCE</h5>
                  </div>
                  <div className="balance-div-amount">
                    <h2 className="main-balance">
                      &#8358;{availableBalance.toFixed(2)}
                    </h2>
                    <h1>&#8358;{clearedBalance.toFixed(2)}</h1>
                  </div>
                </section>
                <div className="status-div1">
                  <section className="status-section">
                    <Link className="status-view-btn">
                      <span className="status-view-span">
                        view account details{" "}
                      </span>
                      <FaGreaterThan />
                    </Link>
                    <div className="status-div2">
                      <p>STATUS</p>
                      <h2>ACTIVE</h2>
                    </div>
                  </section>
                </div>
              </div>
              <div className="do-more-div">
                <p className="do-more-p">Do More</p>
              </div>
            </article>

            <article
              className="dashboard-article2"
            >
              <img
                className="fade-in2"
                src={value === 0 ? image1 : image2}
                alt="fidelity-logo3"
              />
            </article>
          </div>

          <article>
            <Movements
              dashboardUser={dashboardUser}
              receiver={receiver}
              sumOfMovements={sumOfMovements}
              data3={data3}
              num={num}
            />
            <div className="view-all-div">
              <h5 onClick={() => setAllMovements(!allMovements)}>
                {allMovements ? "HIDE TRANSACTIONS" : "VIEW ALL TRANSACTIONS"}
              </h5>
            </div>
          </article>
        </div>
      </section>
      {profileOpen && (
        <section className="profile-section">
            <Profile
              setProfileOpen={setProfileOpen}
              dashboardUser={dashboardUser}
            />
        </section>
      )}
    </DashboardMain>
  );
}

const DashboardMain = styled.main`
  .profile-section {
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(2, 2, 0, 0.557), rgba(0, 0, 0, 0.435));
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    display: flex;
    justify-content: center;
  }
  
  .timer {
    border: 1px solid black;
    width: 95%;
    margin: 0 auto;
    text-align: right;
  }
  .pulse {
    animation: pulse 1s ease-in-out forwards infinite;
  }
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  .fade-in {
    opacity: 0;
    animation: fadeIn 0.8s ease-in-out forwards;
  }
  .fade-in2 {
    opacity: 0;
    border-radius: 4px;
    animation: fadeIn 3s ease-in-out forwards infinite;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
export default Dashboard
