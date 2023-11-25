import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import Movements from "../components/Movements";
import { useGlobalContext } from "../context";
import {
  useEditUser,
  useGetUser,
  useGetSpecifiedTransactions,
} from "../ReactQueryCustomHooks";
import covid from "../Images/Fidelity-bank-covid.jpg";
import logo from "../Images/Fidelity-Bank-Logo.png";
import { GrFormClose } from "react-icons/gr";
import { BiPowerOff } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaGreaterThan } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Transfer from "../components/Transfer";
import SelfDeposit from "../components/SelfDeposit";
import MyAccounts from "./../components/MyAccounts";
import image1 from "../Images/phone-image.png";
import image2 from "../Images/phone-image2.png";
import styled from "styled-components";
import Profile from "../components/Profile";
import startLogOutTimer from "../components/Timer";
import Profiles from "./Profiles";
import { BsNodeMinusFill } from "react-icons/bs";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";

const Dashboard = ({ isAuthenticated }) => {
  const {
    loggedUser,
    person,
    setPerson,
    setAllMovements,
    allMovements,
    selectedAccount,
    setAccount,
    setSelectedAccount,
    startTime,
    userId,
    userSpecificData,
    getFormattedDate2,
  } = useGlobalContext();
  const { data: userData, isLoading, isError, error } = useGetUser();

  const [data, setData] = useState({});
  const [isInfo, setIsInfo] = useState(true);
  const [value, setValue] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(130);
  // const isAuthenticated = !!Cookies.get("token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [specifiedTransactions, setSpecifiedTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [doMoreForm, setDoMoreForm] = useState({
    startDate: "",
    endDate: "",
    activity: "",
    clientUsername: "",
    selectedAccount: "",
  });
  const { mutate, isLoading: transactionsLoading } =
    useGetSpecifiedTransactions();
  const getSpecifiedTransactions = (e) => {
    e.preventDefault();
    mutate(
      { startDate, endDate },
      {
        onSuccess: (data) => {
          console.log(data.data.data.specifiedTransactions);
          setSpecifiedTransactions(data?.data?.data?.specifiedTransactions);
        },
      }
    );
  };

  const handleDoMoreSubmit = (e) => {
    e.preventDefault();
    mutate(
      {
        startDate: doMoreForm.startDate,
        endDate: doMoreForm.endDate,
        activity: doMoreForm.activity,
        clientUsername: doMoreForm.clientUsername,
        selectedAccount: Number(doMoreForm.selectedAccount),
      },
      {
        onSuccess: (data) => {
          console.log(data?.data?.data?.specifiedTransactions);
          setSpecifiedTransactions(data?.data?.data?.specifiedTransactions);
        },
      }
    );
  };

  const handleDoMore = (e) => {
    const { name, value, type, checked } = e.target;
    setDoMoreForm((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  // Cookies.get("token");

  //   const min = String(Math.trunc(seconds / 60)).padStart(2, 0);
  //   const sec = String(seconds % 60).padStart(2, 0);

  //   const handleValue = () =>{
  //     if(value === 0)setValue(1)
  //     else if(value === 1)setValue(0)
  //   }
  //   let availableBalanceFixed, clearedBalanceFixed, dashboardUser;
  // const timerRef = useRef(null);

  const handleLogOut = () => {
    setPerson({ ...person, viewDashboard: false, openDashboard: false });
    navigate("/login");
    Cookies.remove("token");
  };

  // useEffect(()=>{
  //   startTime && startLogOutTimer(timerRef);
  // },[])

  // useEffect(() => {
  //   let slider = setInterval(() => {
  //     handleValue();
  //   }, 3000);
  //   return () => clearInterval(slider);
  // }, [value]);

  // useEffect(()=>{
  //   const timer = setInterval(()=>{
  //     setSeconds(seconds=>seconds-1)
  //   }, 1000)
  //   const resetTimer = () => {
  //     setSeconds(130);
  //   };
  //   window.addEventListener("keydown", resetTimer);
  //   window.addEventListener("mousemove", resetTimer);
  //   return () => {
  //     clearInterval(timer);
  //     window.removeEventListener("mousemove", resetTimer);
  //     window.removeEventListener("keydown", resetTimer);
  //   };

  // },[])

  // useEffect(()=>{
  //   if(seconds === -1){
  //     Cookies.remove("token")
  //     navigate("/login")
  //   }
  // }, [seconds])

  // useEffect(() => {
  //   if(!isLoading)
  //   setUser(data);
  // }, [isLoading, data]);

  // useEffect(()=>{
  //   if(isAuthenticated){setIsLoggedIn(true)
  //   }
  //   else {
  //     setIsLoggedIn(false)
  //   }
  // }, [isAuthenticated])
  // if(isLoading || !user || !dashboardUser|| !{...dashboardUser}){
  //   return<h1>loading...</h1>
  // }

  useEffect(() => {
    if (isAuthenticated && userData) {
      setData(userData)
    }
  }, [isAuthenticated, userData, isLoading]);
  useEffect(() => {
    setPerson({ ...person, dashboardMain: true });
  }, []);
  if(isError){
    console.log(error)
  }

  if (isLoading) {
    return (
      <div className="spinner">
        <TailSpin color="#002082" radius={"8px"} />
      </div>
    );
    // return <TailSpin color="red" radius={"8px"} />;

  }
  console.log(data);
  // if (transactionsLoading) {
  //   return <article className="view-more-div"></article>
  // }

  // if(!isLoggedIn){
  //   return <Navigate to="/login" />
  // }
  const transactionsLength =
    data?.data?.user?.accounts[selectedAccount]?.transactions?.length;
  return (
    <DashboardMain className="covid-main">
      {/* <p className="timer-p">You will be logged out in {`${min}:${sec}`}secs</p> */}
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

      {person.viewDashboard && (
        <section className="dashboard-main">
          {/* <section className="dashboard-main"> */}
          <div className="fixed-nav-div">
            <div className="dashboard-div">
              <img src={logo} className="dashboard-img"></img>
              <button className="dashboard-close-btn" onClick={handleLogOut}>
                <BiPowerOff />
                LOGOUT
              </button>
            </div>
            <nav className="dashboard-nav">
              <div className="dashboard-nav-div">
                <p className="dashboard-nav-p">
                  Hi,{" "}
                  <span className="dashboard-name">
                    {`${data?.data?.user?.fullname}`?.split(" ")[0]}
                  </span>
                </p>
                <button className="dashboard-profile-btn">
                  <span
                    className="view-profile-span"
                    onClick={() => {
                      setProfileOpen(true);
                      setPerson({
                        ...person,
                        dashboardMain: false,
                        viewMyAccounts: false,
                        doMoreView: false,
                        viewMore: false,
                      });
                    }}
                  >
                    View profile
                  </span>
                  <FaGreaterThan />
                </button>
              </div>
              <button
                className="dashboard-nav-btn pulse"
                onClick={
                  person.viewMore
                    ? () => {
                        setPerson({
                          ...person,
                          viewMore: false,
                          dashboardMain: true,
                        });
                        setStartDate("");
                        setEndDate("");
                        setSpecifiedTransactions([]);
                      }
                    : person.doMoreView
                    ? () => {
                        setPerson({
                          ...person,
                          doMoreView: false,
                          dashboardMain: true,
                        });
                        setDoMoreForm({
                          startDate: "",
                          endDate: "",
                          activity: "",
                          clientUsername: "",
                          selectedAccount: "",
                        });
                        setSpecifiedTransactions([]);
                      }
                    : person.viewMyAccounts
                    ? () => {
                        setPerson({
                          ...person,
                          viewMyAccounts: false,
                          dashboardBackground: true,
                          dashboardOptionShow: true,
                          dashboardMain: true,
                        });
                      }
                    : profileOpen
                    ? () => {
                        setProfileOpen(false);
                        setPerson({
                          ...person,
                          dashboardMain: true,
                          dashboardBackground: true,
                          dashboardOptionShow: true,
                        });
                      }
                    : () =>
                        setPerson({
                          ...person,
                          openDashboard: !person.openDashboard,
                        })
                }
              >
                {person.openDashboard ? <FaTimes /> : <FaBars />}
              </button>
            </nav>
          </div>
          {person.openDashboard && (
            <section>
              {person.dashboardBackground && (
                <article className="dashboard-options">
                  <div className="dashboard-underline-div"></div>
                  {person.transferLog && <Transfer />}
                  {person.openDeposit && <SelfDeposit />}

                  {person.dashboardOptionShow && (
                    <div className="dashboard-options-innerdiv">
                      <button
                        className="dashboard-options-btn"
                        onClick={() =>
                          setPerson({ ...person, openDashboard: false })
                        }
                      >
                        <h4>DASHBOARD</h4>
                      </button>
                      <button
                        className="dashboard-options-btn"
                        onClick={() =>
                          setPerson({ ...person, openDeposit: true })
                        }
                      >
                        <h4>DEPOSIT MONEY</h4>
                      </button>
                      <button
                        className="dashboard-options-btn"
                        onClick={() =>
                          setPerson({ ...person, transferLog: true })
                        }
                      >
                        <h4>TRANSFERS</h4>
                      </button>
                      <button
                        className="dashboard-options-btn"
                        onClick={() =>
                          setPerson({
                            ...person,
                            viewMyAccounts: true,
                            dashboardOptionShow: false,
                            dashboardBackground: false,
                            dashboardMain: false,
                          })
                        }
                      >
                        <h4>MY ACCOUNTS</h4>
                      </button>

                      <button
                        onClick={() => {
                          setProfileOpen(true);
                          setPerson({
                            ...person,
                            dashboardMain: false,
                            dashboardOptionShow: false,
                            dashboardBackground: false,
                          });
                        }}
                        className="dashboard-options-btn"
                      >
                        <h4>PROFILE AND SETTINGS</h4>
                      </button>
                    </div>
                  )}
                </article>
              )}
              {person.viewMyAccounts && <MyAccounts />}
            </section>
          )}

          {person.doMoreView && (
            <section
              className={
                person.doMoreView
                  ? "doMore-view-section fade-in"
                  : "doMore-view-section"
              }
            >
              <article className="doMore-view-article1">
                {/* <article className="view-more-div"> */}
                <div>
                  <div className="view-more-h3-div">
                    <h3 className="view-more-h3">YOUR TRANSACTIONS</h3>
                  </div>
                  <div className="view_more_form_div">
                    <h5 className="view_more_h5">Select Time Period</h5>
                    <form
                      className="doMore-view-form1"
                      onSubmit={handleDoMoreSubmit}
                    >
                      <div className="doMore-view-input-div1">
                        <input
                          className="doMore-input-date1"
                          type="date"
                          value={doMoreForm.startDate}
                          name="startDate"
                          onChange={handleDoMore}
                        />
                        <input
                          className="doMore-input-date1"
                          type="date"
                          value={doMoreForm.endDate}
                          name="endDate"
                          onChange={handleDoMore}
                        />
                      </div>
                      <select
                        className="doMoreForm1-select1"
                        name="activity"
                        id=""
                        value={doMoreForm.activity}
                        onChange={handleDoMore}
                      >
                        <option value="" selected>
                          --Activity--
                        </option>
                        <option value="self transfer">self transfer</option>
                        <option value="credit">credit</option>
                        <option value="debit">debit</option>
                      </select>
                      <select
                        className="doMoreForm1-select2"
                        value={doMoreForm.selectedAccount}
                        onChange={handleDoMore}
                        name="selectedAccount"
                      >
                        <option value="" selected>
                          --Acount--
                        </option>
                        {data?.data?.user?.accounts?.map((account, index) => {
                          return (
                            <option key={account.id} value={index}>
                              {account?.accountNumber}
                            </option>
                          );
                        })}
                      </select>
                      <input
                        className="doMore-input-name1"
                        type="text"
                        value={doMoreForm.clientUsername}
                        name="clientUsername"
                        onChange={handleDoMore}
                        placeholder="Enter client's username"
                      />
                      <button className="doMore-form-button1">Show</button>
                    </form>
                  </div>
                  {transactionsLoading && <p>Loading...</p>}
                  {specifiedTransactions.length === 0 && (
                    <p>You do not have any transactions within this period</p>
                  )}
                  {specifiedTransactions.map((transaction) => {
                    return (
                      <div
                        key={transaction.id}
                        className="specified_trans_div1"
                      >
                        <h5 className="doMore-form1-h5-date">DATE</h5>
                        <p className="doMore-form1-h5-p">
                          {getFormattedDate2(transaction?.timeOfTransaction)}
                        </p>
                        <h5>TYPE</h5>
                        <p>{transaction?.type}</p>
                        <h5>DESC</h5>
                        <p>
                          <span className="domore-desc-span1">
                            ONB TRF{" "}
                            {transaction.transactionAmount > 0 ? "FROM" : "TO"}{" "}
                            {`${transaction?.clientFullname}`.toUpperCase()}***
                            {`${transaction?.clientAccountNumber}`?.slice(-4)}
                          </span>{" "}
                          {transaction?.description}
                        </p>
                        <h5>ACCOUNT</h5>
                        <p>
                          {
                            data.data.user.accounts[
                              Number(doMoreForm.selectedAccount)
                            ].accountNumber
                          }
                        </p>
                        <h5>STATUS</h5>
                        <p>Successful</p>
                        <h5>AMOUNT</h5>
                        <p>
                          &#8358;
                          {Math.abs(transaction?.transactionAmount)?.toFixed(2)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </article>

              <article className="doMore-view-article2">
                <form
                  className="doMore-view-form"
                  onSubmit={handleDoMoreSubmit}
                >
                  <div className="doMore-view-input-div">
                    <input
                      className="doMore-input-date"
                      type="date"
                      value={doMoreForm.startDate}
                      name="startDate"
                      onChange={handleDoMore}
                    />
                    <input
                      className="doMore-input-date"
                      type="date"
                      value={doMoreForm.endDate}
                      name="endDate"
                      onChange={handleDoMore}
                    />
                  </div>
                  <select
                    className="doMore-select1"
                    name="activity"
                    id=""
                    value={doMoreForm.activity}
                    onChange={handleDoMore}
                  >
                    <option value="" selected>
                      --Activity--
                    </option>
                    <option value="self transfer">self transfer</option>
                    <option value="credit">credit</option>
                    <option value="debit">debit</option>
                  </select>
                  <select
                    className="doMore-select2"
                    value={doMoreForm.selectedAccount}
                    onChange={handleDoMore}
                    name="selectedAccount"
                  >
                    <option value="" selected>
                      --Acount--
                    </option>
                    {data?.data?.user?.accounts?.map((account, index) => {
                      return (
                        <option key={account.id} value={index}>
                          {account?.accountNumber}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    className="doMore-input-name"
                    type="text"
                    value={doMoreForm.clientUsername}
                    name="clientUsername"
                    onChange={handleDoMore}
                    placeholder="Enter client's username"
                  />
                  <button>Show</button>
                </form>
                <div className="domore-trans-h5">
                  <h5>YOUR TRANSACTIONS</h5>
                </div>
                <div className="domore-heading-grid">
                  <h5>DATE</h5>
                  <h5>TRANSACTION TYPE</h5>
                  <h5>DESCRIPTION</h5>
                  <h5>ACCOUNT</h5>
                  <h5>STATUS</h5>
                  <h5>AMOUNT</h5>
                </div>
                {transactionsLoading && <p>Loading...</p>}
                {specifiedTransactions.length === 0 && (
                  <p>You do not have any transactions within this period</p>
                )}
                {specifiedTransactions.map((transaction) => {
                  return (
                    <div className="domore-table-grid" key={transaction.id}>
                      <p>{getFormattedDate2(transaction?.timeOfTransaction)}</p>
                      <p>{transaction?.type}</p>
                      <p>
                        <span className="domore-desc-span">
                          ONB TRF{" "}
                          {transaction.transactionAmount > 0 ? "FROM" : "TO"}{" "}
                          {`${transaction?.clientFullname}`.toUpperCase()}***
                          {`${transaction?.clientAccountNumber}`?.slice(-4)}
                        </span>{" "}
                        {transaction?.description}
                      </p>
                      <p>
                        {
                          data.data.user.accounts[
                            Number(doMoreForm.selectedAccount)
                          ].accountNumber
                        }
                      </p>
                      <p>Successful</p>
                      <p>
                        &#8358;
                        {Math.abs(transaction?.transactionAmount)?.toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </article>
            </section>
          )}

          {person.viewMore && (
            <section>
              {/* <article className="view-more-div fade-in"> */}
              <article
                className={
                  person.viewMore ? "view-more-div fade-in" : "view-more-div"
                }
              >
                <div>
                  <div className="view-more-h3-div">
                    <h3 className="view-more-h3">YOUR TRANSACTIONS</h3>
                  </div>
                  <div className="view_more_form_div">
                    <h5 className="view_more_h5">Select Time Period</h5>
                    <form className="view_more_form">
                      <div className="view_more_input_div">
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                      <button onClick={getSpecifiedTransactions}>Show</button>
                    </form>
                  </div>
                  {transactionsLoading && <p>Loading...</p>}
                  <h4 className="view_more_h4">
                    OPENING BALANCE &#8358;
                    {specifiedTransactions[0]?.balance?.toFixed(2)}
                  </h4>
                  {specifiedTransactions.map((transaction) => {
                    return (
                      <div key={transaction.id} className="specified_trans_div">
                        <p>TRANSACTION DATE</p>
                        <p>
                          {getFormattedDate2(transaction?.timeOfTransaction)}
                        </p>
                        <p>DEPOSIT</p>
                        <p>
                          {transaction.transactionAmount > 0 && (
                            <span>&#8358;</span>
                          )}
                          {transaction.transactionAmount > 0
                            ? transaction?.transactionAmount?.toFixed(2)
                            : null}
                        </p>
                        <p>WITHDRAWAL</p>
                        <p>
                          {transaction.transactionAmount < 0 && (
                            <span>&#8358;</span>
                          )}
                          {transaction.transactionAmount < 0
                            ? Math.abs(transaction?.transactionAmount)?.toFixed(
                                2
                              )
                            : ""}
                        </p>
                        <p>BALANCE</p>
                        <p>&#8358;{transaction?.balance?.toFixed(2)}</p>
                      </div>
                    );
                  })}
                  <h4 className="view_more_h4">
                    CLOSING BALANCE &#8358;
                    {specifiedTransactions[
                      specifiedTransactions.length - 1
                    ]?.balance?.toFixed(2)}
                  </h4>
                </div>
              </article>

              <article className="view-more-table-article fade-in">
                <div className="view-more-table">
                  <div className="view-more-table-flex1">
                    <h4>{data?.data?.user?.fullname?.toUpperCase()}</h4>
                    <span className="view-more-table-span">
                      <p>
                        {
                          data?.data?.user?.accounts[selectedAccount]
                            ?.accountType
                        }
                      </p>
                      <p>
                        {
                          data?.data?.user?.accounts[selectedAccount]
                            ?.accountNumber
                        }
                      </p>
                    </span>
                  </div>
                  <div className="view-more-table-flex2">
                    <p>Available Balance</p>
                    <p>Ledger Balance</p>
                    <h4>
                      &#8358;
                      {
                        data?.data?.user?.accounts[selectedAccount]
                          ?.accountBalance
                      }
                    </h4>
                    <h4>
                      &#8358;
                      {
                        data?.data?.user?.accounts[selectedAccount]
                          ?.clearedBalance
                      }
                    </h4>
                  </div>
                </div>
                <div className="view-more-table-form-trans">
                  <form className="view-more-table-form">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    <button onClick={getSpecifiedTransactions}>Show</button>
                  </form>
                  <div className="view-more-table-trans">
                    <div className="view-more-table-h4">
                      <h5>YOUR TRANSACTIONS</h5>
                      <h5>
                        OPENING BALANCE<span> </span>
                        &#8358;{specifiedTransactions[14]?.balance?.toFixed(2)}
                      </h5>
                    </div>
                    <div className="view-more-table-grid1">
                      <h5>TRANSACTION DATE</h5>
                      <h5>DESCRIPTION</h5>
                      <h5>DEPOSIT</h5>
                      <h5>WITHDRAWAL</h5>
                      <h5>BALANCE</h5>
                    </div>
                    {transactionsLoading && <p>Loading...</p>}
                    {specifiedTransactions.length === 0 && (
                      <p>You do not have any transactions within this period</p>
                    )}
                    {specifiedTransactions.map((transaction) => {
                      return (
                        <div
                          key={transaction.id}
                          className="view-more-table-grid2"
                        >
                          <p>
                            {getFormattedDate2(transaction?.timeOfTransaction)}
                          </p>
                          <p>{transaction?.description}</p>
                          <p>
                            {transaction.transactionAmount > 0 && (
                              <span>&#8358;</span>
                            )}
                            {transaction.transactionAmount > 0
                              ? transaction?.transactionAmount?.toFixed(2)
                              : null}
                          </p>
                          <p>
                            {transaction.transactionAmount < 0 && (
                              <span>&#8358;</span>
                            )}
                            {transaction.transactionAmount < 0
                              ? Math.abs(
                                  transaction?.transactionAmount
                                )?.toFixed(2)
                              : ""}
                          </p>
                          <p>&#8358;{transaction?.balance?.toFixed(2)}</p>
                        </div>
                      );
                    })}
                    <h5 className="view-more-table-closing-h5">
                      CLOSING BALANCE &#8358;
                      {specifiedTransactions[
                        specifiedTransactions.length - 1
                      ]?.balance?.toFixed(2)}
                    </h5>
                  </div>
                </div>
              </article>
            </section>
          )}

          {person.dashboardMain && (
            <section>
              {/* <div className="dashboard-main-div fade-in"> */}
              <div
                className={
                  person.dashboardMain
                    ? "dashboard-main-div fade-in"
                    : "dashboard-main-div"
                }
              >
                {/* <div className="timer-div">
            <p className="timer-p">
              You will be logged out in {`${min}:${sec}`}secs
            </p>
          </div> */}
                <div className="dashboard-summary-image-div">
                  <article className="dashboard-summary">
                    <div className="savings-div">
                      <section className="savings-section">
                        <h3>
                          {
                            data?.data?.user?.accounts[selectedAccount]
                              ?.accountType
                          }
                        </h3>
                        <h3>
                          {
                            data?.data?.user?.accounts[selectedAccount]
                              ?.accountNumber
                          }
                        </h3>
                      </section>
                    </div>
                    <div className="savings-div2">
                      <section className="savings-section2">
                        <h1 className="savings-section2-name">
                          {data?.data?.user?.fullname}
                        </h1>
                        <div className="balance-div">
                          <h5>AVAILABLE BALANCE</h5>
                          <h5>CLEARED BALANCE</h5>
                        </div>
                        <div className="balance-div-amount">
                          <h2 className="main-balance">
                            &#8358;
                            {data?.data?.user?.accounts[
                              selectedAccount
                            ]?.accountBalance?.toFixed(2)}
                          </h2>
                          <h1>
                            &#8358;
                            {data?.data?.user?.accounts[
                              selectedAccount
                            ]?.clearedBalance?.toFixed(2)}
                          </h1>
                        </div>
                      </section>
                      <div className="status-div1">
                        <section className="status-section">
                          <Link className="status-view-btn">
                            <span
                              className="status-view-span"
                              onClick={() =>
                                setPerson({
                                  ...person,
                                  viewMore: true,
                                  dashboardMain: false,
                                })
                              }
                            >
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
                      <div className="do-more-content">
                        <button
                          onClick={() =>
                            setPerson({
                              ...person,
                              viewMore: true,
                              dashboardMain: false,
                            })
                          }
                        >
                          Manage Accounts
                        </button>
                        <button
                          onClick={() => {
                            setPerson({
                              ...person,
                              doMoreView: true,
                              dashboardMain: false,
                            });
                          }}
                        >
                          View Transactions
                        </button>
                      </div>
                    </div>
                  </article>

                  <article className="dashboard-article2">
                    <img
                      className="fade-in2"
                      src={value === 0 ? image1 : image2}
                      alt="fidelity-logo3"
                    />
                  </article>
                </div>

                <article>
                  <section className="movements-section">
                    <Movements
                      data={data}
                      isLoading={isLoading}
                      transactionsLength={transactionsLength}
                    />
                  </section>
                  <div className="view-all-div">
                    {transactionsLength < 1 ? (
                      <h5>NO TRANACTIONS</h5>
                    ) : (
                      <h5 onClick={() => setAllMovements(!allMovements)}>
                        {allMovements
                          ? "HIDE TRANSACTIONS"
                          : "VIEW ALL TRANSACTIONS"}
                      </h5>
                    )}
                  </div>
                </article>
              </div>
            </section>
          )}
          {profileOpen && (
            <section className="profile-section">
              <Profile
                setProfileOpen={setProfileOpen}
                profileOpen={profileOpen}
                data={data}
                isLoading={isLoading}
              />
            </section>
          )}
        </section>
      )}
    </DashboardMain>
  );
};

const DashboardMain = styled.main`
  .profile-section {
  }

  .timer-div {
    width: 95%;
    margin: 0 auto;
    text-align: right;
    color: #002082;
  }
  /* .timer-p{
    z-index: 5
  } */
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
export default Dashboard;
