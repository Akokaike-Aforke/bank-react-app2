import React, { useEffect, useRef, useState } from 'react'
import { FaBars, FaLessThanEqual, FaTimes } from 'react-icons/fa';
import styled from 'styled-components'
import { useGlobalContext } from '../context'
import { useEditUser, useDeleteUser } from '../ReactQueryCustomHooks';
import { toast } from 'react-toastify';
import { ImEye } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

const Profile = ({dashboardUser, setProfileOpen,}) => {
    const {getFormattedDate} = useGlobalContext();
    const {deleteUser} = useDeleteUser();
    
      const navigate = useNavigate();
    const [editButtons, setEditButtons] = useState({
      editName: false,
      editDate: false,
      editDateOfBirth: false,
      isEditDate: false,
      editEmail: false,
      editAccounType: false,
      editUsername: false,
      changeSecureLog: false,
      changePin: false,
      changePassword: false,
      notActivePin: true,
      notActivePassword: true,
      isEditing: false,
      seeCurrentPin: false,
      seeNewPin: false,
      seeConfirmPin: false,
      seeCurrentPassword: false,
      seeNewPassword: false,
      seeConfirmPassword: false,
      closeAccount: false,
      editCloseAccount: false,
      closeAccountName: false,
      closeAccountPassword: false,
      closeAccountPin: false,
      deleteAccount: false,
      showAccountNameInput: false
    });
      const editUser = useEditUser();
      const changeDateFormat = (item) =>{
          return new Date(item).toISOString().slice(0, 10);
      }
      const usTime = changeDateFormat(dashboardUser.dateOfBirth)
      const[formData, setFormData] = useState({fullname:dashboardUser.fullname,  dateOfBirth:usTime, email: dashboardUser.email, username: dashboardUser.username, accountType: dashboardUser.accountType, pin: dashboardUser.pin,currentPin: "", newPin:"", confirmNewPin: "", currentPassword: "", newPassword: "", confirmNewPassword: "", password: dashboardUser.password, closeAccountName: "", closeAccountPassword: "", closeAccountPin: ""})
    const handleSubmit=(e)=>{
      e.preventDefault();
      editUser({userId:dashboardUser._id, fullname:formData.fullname, dateOfBirth:formData.dateOfBirth, email:formData.email, username:formData.username, accountType:formData.accountType},
        {onSuccess:()=>{
          toast.success("Your details have been successfully edited")
          
    setEditButtons({
      editName: false,
      editDate: false,
      editDateOfBirth: false,
      isEditDate: false,
      editEmail: false,
      editAccounType: false,
      editUsername: false,
      changePin: false,
      changePassword: false,
      
    });
        }},
        )
    }
    const handleSubmitPin = (e) =>{
      console.log("pin")
      e.preventDefault;
      editUser({userId:dashboardUser._id, pin: formData.newPin},
        {
          onSuccess: () =>{setEditButtons({...editButtons, changePin: false})}
        },
        {
          onError:(error)=>{console.log(error)}
        }
        )
    }

    const handleSubmitPassword = (e) =>{
      e.preventDefault;
      editUser({userId:dashboardUser._id, password: formData.newPassword},
        {
          onSuccess: () =>{setEditButtons({...editButtons, changePassword: false})}
        },
        {
          onError:(error)=>{console.log(error)}
        }
      )
    }
    const handleCloseAccount=()=>{
      setEditButtons({...editButtons, closeAccount:true, changeSecureLog:true})
    }
      
    const handleDeleteAccount = () =>{
      return deleteUser(dashboardUser._id, 
        {
          onSuccess:()=>{
            toast.success("You no longer have an account with Fidelity Bank");
            navigate("/")
          }
        },
        {
          onError:()=>{
            toast.error("Your account could not be deleted")
          }
        }
        )
    }
    const handleChange = (e) => {
      const { value, name, checked, type } = e.target;
      setFormData((prevData) => {
        return { ...prevData, [name]: type === "checkbox" ? checked : value };
      });
    };
    const handleDate = () =>{
      setEditButtons({ ...editButtons, editDateOfBirth: true, isEditDate:true, isEditing: true })
    }
    const handleCloseUpdate=()=>{
      setProfileOpen(true);
      setEditButtons({...editButtons, changeSecureLog: false, changePin: false, changePassword: false})
      setFormData({...formData, currentPin:"", newPin:"", confirmNewPin:"", currentPassword:"", newPassword:"", confirmNewPassword:""})
    }
    const handleCloseAccountForm = () =>{
      setEditButtons({
        ...editButtons,
        closeAccount: false,
        changeSecureLog: false,
        showAccountNameInput: false,
      });
    }


    useEffect(()=>{
      if (
        editButtons.changePin &&
        formData.currentPin == dashboardUser.pin &&
        formData.newPin === formData.confirmNewPin && formData.newPin != formData.currentPin
      ) {
        setEditButtons({ ...editButtons, notActivePin: false });
      } else setEditButtons({ ...editButtons, notActivePin: true });
    }, [formData.currentPin, formData.newPin, formData.confirmNewPin, editButtons.changePin, dashboardUser.pin])

      useEffect(()=>{
      if (
        editButtons.changePassword &&
        formData.currentPassword == dashboardUser.password &&
        formData.newPassword === formData.confirmNewPassword && formData.newPassword !== formData.currentPassword
      ) {
        setEditButtons({ ...editButtons, notActivePassword: false });
        console.log("good change pin");
      } else setEditButtons({ ...editButtons, notActivePassword: true });
    }, [formData.currentPassword, formData.newPassword, formData.confirmNewPassword, editButtons.changePassword, dashboardUser.passsword])



    useEffect(()=>{
      if(editButtons.showAccountNameInput){
        setEditButtons({...editButtons, closeAccountName: true})
      }
        else{
          setEditButtons({
          ...editButtons,
          closeAccountName: false,
          closeAccountPassword: false,
          closeAccountPin: false,
          deleteAccount: false,
        });
        setFormData({
          ...formData,
          closeAccountPassword: "",
          closeAccountPin: "",
          closeAccountName: ""
        });
      }
      
    }, [editButtons.showAccountNameInput])


    useEffect(()=>{
      if(editButtons.closeAccountName && formData.closeAccountName === dashboardUser.fullname){
        setEditButtons({...editButtons, closeAccountPassword: true})
      }
      else {
        setEditButtons({...editButtons, closeAccountPassword: false, closeAccountPin: false, deleteAccount: false})
        setFormData({...formData, closeAccountPassword:"", closeAccountPin:""})
      }
    },[formData.closeAccountName])

    useEffect(()=>{
     if (
       formData.closeAccountPassword === dashboardUser.password &&
       formData.closeAccountName === dashboardUser.fullname &&
       editButtons.closeAccountName
     ) {
       setEditButtons({ ...editButtons, closeAccountPin: true });
     } else {
       setEditButtons({
         ...editButtons,
         closeAccountPin: false,
         deleteAccount: false,
       });
       setFormData({
         ...formData,
         closeAccountPin: "",
       });
     }
    }, [formData.closeAccountPassword])

    useEffect(()=>{
      if (
        formData.closeAccountPin == dashboardUser.pin &&
        formData.closeAccountPassword === dashboardUser.password &&
        formData.closeAccountName === dashboardUser.fullname && editButtons.closeAccountName
      ) {
        setEditButtons({ ...editButtons, deleteAccount: true });
      }
      else{setEditButtons({...editButtons, deleteAccount: false})}
    },[formData.closeAccountPin])
  return (
    <SectionProfile className="profileSection">
      <div className="profile-div">
        {!editButtons.changeSecureLog ? (
          <div>
            <div className="heading-profile">
              <h3>PROFILE</h3>
              <button
                className="btn-close"
                onClick={() => setProfileOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="profile-details-name">
                <h5 className="h5Input">NAME</h5>
                <input
                  className="input-profile-name"
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  disabled={!editButtons.editName}
                />
                <button
                  className="btn-input-name"
                  type="button"
                  onClick={() =>
                    setEditButtons({
                      ...editButtons,
                      editName: true,
                      isEditing: true,
                    })
                  }
                >
                  edit
                </button>
              </div>
              <div className="profile-details-noInput">
                <h5 className="h5NoInput">BVN</h5>
                <h5 className="h5NoInput">{dashboardUser.bvn}</h5>
              </div>
              <div className="profile-details">
                <h5 className="h5Input">DATE OF BIRTH</h5>
                <input
                  type={editButtons.isEditDate ? "date" : "text"}
                  onChange={handleChange}
                  name="dateOfBirth"
                  // value={getFormattedDate(formData.dateOfBirth).datetime}
                  value={formData.dateOfBirth}
                  disabled={!editButtons.editDateOfBirth}
                />
                <button type="button" onClick={handleDate} className="btnInput">
                  edit
                </button>
              </div>
              <div className="profile-details">
                <h5 className="h5Input">EMAIL</h5>
                <input
                  type="email"
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                  disabled={!editButtons.editEmail}
                />
                <button
                  className="btnInput"
                  type="button"
                  onClick={() =>
                    setEditButtons({
                      ...editButtons,
                      editEmail: true,
                      isEditing: true,
                    })
                  }
                >
                  edit
                </button>
              </div>
              <div className="profile-details">
                <h5 className="h5Input">USERNAME</h5>
                <input
                  type="text"
                  value={formData.username}
                  name="username"
                  onChange={handleChange}
                  disabled={!editButtons.editUsername}
                />
                <button
                  className="btnInput"
                  type="button"
                  onClick={() =>
                    setEditButtons({
                      ...editButtons,
                      editUsername: true,
                      isEditing: true,
                    })
                  }
                >
                  edit
                </button>
              </div>
              <div className="profile-details">
                <h5 className="h5Input">ACCOUNT TYPE</h5>
                <input
                  type="text"
                  value={formData.accountType}
                  name="accountType"
                  onChange={handleChange}
                  disabled={!editButtons.editAccounType}
                />
                <button
                  className="btnInput"
                  type="button"
                  onClick={() =>
                    setEditButtons({
                      ...editButtons,
                      editAccounType: true,
                      isEditing: true,
                    })
                  }
                >
                  edit
                </button>
              </div>
              <div className="profile-details-noInput">
                <h5 className="h5NoInput">ACCOUNT NUMBER</h5>
                <h5 className="h5NoInput">{dashboardUser.accountNumber}</h5>
              </div>
              <div className="profile-details-noInput">
                <h5 className="h5NoInput">DATE OF ACCOUNT CREATION</h5>
                <h5 className="h5NoInput">
                  {getFormattedDate(dashboardUser.dateCreated)}
                </h5>
              </div>
              <button
                className="btnSubmitUpdate"
                type="submit"
                disabled={!editButtons.isEditing}
              >
                update
              </button>
            </form>
            <div className="change-pin-div">
              <button
                className="btn-change-pin"
                onClick={() =>
                  setEditButtons({
                    ...editButtons,
                    changeSecureLog: true,
                    changePin: true,
                    changePassword: false,
                  })
                }
              >
                change pin
              </button>
              <button
                className="btn-change-pin"
                onClick={() =>
                  setEditButtons({
                    ...editButtons,
                    changeSecureLog: true,
                    changePassword: true,
                    changePin: false,
                  })
                }
              >
                change password
              </button>
              <button
                className="btn-close-account"
                onClick={handleCloseAccount}
              >
                close account
              </button>
            </div>
          </div>
        ) : (
          <div className="update-close-div">
            <div className="heading-profile">
              <h3>{editButtons.closeAccount ? "CLOSE ACCOUNT" : "PROFILE"}</h3>
              <button
                className="btn-close"
                onClick={
                  editButtons.closeAccount
                    ? handleCloseAccountForm
                    : handleCloseUpdate
                }
              >
                <FaTimes />
              </button>
            </div>
            {editButtons.changePin && (
              <div className="update-pin-div">
                <h4 className="heading-pin">UPDATE PIN</h4>
                <form onSubmit={handleSubmitPin}>
                  <div className="current-pin-label-div">
                    <label htmlFor="currentPin">Current Pin:</label>
                    <div className="current-pin-div">
                      <input
                        type={editButtons.seeCurrentPin ? "text" : "password"}
                        className="currentPin"
                        id="currentPin"
                        name="currentPin"
                        value={formData.currentPin}
                        onChange={handleChange}
                      />
                      <ImEye
                        className="current-pin-icon"
                        onClick={() =>
                          setEditButtons({
                            ...editButtons,
                            seeCurrentPin: !editButtons.seeCurrentPin,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="new-pin-label-div">
                    <label htmlFor="newPin">New Pin:</label>
                    <div className="new-pin-div">
                      <input
                        type={editButtons.seeNewPin ? "text" : "password"}
                        className="newPin"
                        id="newPin"
                        name="newPin"
                        onChange={handleChange}
                      />
                      <ImEye
                        className="new-pin-icon"
                        onClick={() =>
                          setEditButtons({
                            ...editButtons,
                            seeNewPin: !editButtons.seeNewPin,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="confirm-pin-label-div">
                    <label htmlFor="confirmPin">Confirm New Pin:</label>
                    <div className="confirm-pin-div">
                      <input
                        type={editButtons.seeConfirmPin ? "text" : "password"}
                        className="confirmPin"
                        id="confirmNewPin"
                        name="confirmNewPin"
                        onChange={handleChange}
                      />
                      <ImEye
                        className="confirm-pin-icon"
                        onClick={() =>
                          setEditButtons({
                            ...editButtons,
                            seeConfirmPin: !editButtons.seeConfirmPin,
                          })
                        }
                      />
                    </div>
                  </div>
                  <button
                    className="btn-update-pin"
                    disabled={editButtons.notActivePin}
                    onClick={handleSubmitPin}
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}

            {editButtons.changePassword && (
              <div className="update-password-div">
                <h4 className="heading-password">UPDATE PASSWORD</h4>
                <form onSubmit={handleSubmitPassword}>
                  <div className="current-password-label-div">
                    <label htmlFor="currentPassword">Current Password:</label>
                    <div className="current-password-div">
                      <input
                        type="text"
                        className="currentPassword"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                      />
                      <ImEye
                        className="current-password-icon"
                        onClick={() =>
                          setEditButtons({
                            ...editButtons,
                            seeCurrentPassword: !editButtons.seeCurrentPassword,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="new-password-label-div">
                    <label htmlFor="newPassword">New Password:</label>
                    <div className="new-password-div">
                      <input
                        type="text"
                        className="currentPassword"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                      <ImEye
                        className="new-password-icon"
                        onClick={() =>
                          setEditButtons({
                            ...editButtons,
                            seeNewPassword: !editButtons.seeNewPassword,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="confirm-password-label-div">
                    <label htmlFor="confirmNewPassword">
                      Confirm New Password:
                    </label>
                    <div className="confirm-password-div">
                      <input
                        type="text"
                        className="currentPassword"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                      />
                      <ImEye
                        className="confirm-password-icon"
                        onClick={() =>
                          setEditButtons({
                            ...editButtons,
                            seeConfirmPassword: !editButtons.seeConfirmPassword,
                          })
                        }
                      />
                    </div>
                  </div>
                  <button
                    className="btn-update-password"
                    disabled={editButtons.notActivePassword}
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
        {editButtons.closeAccount && (
          <div className="closeAccount-div1">
            <p>Are you sure you want to permanently delete your account?</p>
            <div className="closeAccount-div2">
              <button
                className="btn-closeAccount-yes"
                onClick={() =>
                  setEditButtons({ ...editButtons, showAccountNameInput: true })
                }
              >
                YES
              </button>
              <button
                className="btn-closeAccount-no"
                onClick={() =>
                  setEditButtons({
                    ...editButtons,
                    closeAccount: false,
                    changeSecureLog: false,
                    showAccountNameInput: false,
                  })
                }
              >
                NO
              </button>
              {editButtons.closeAccountName && (
                <div className="close-account-name-div">
                  <label htmlFor="closeAccountName">Enter Name:</label>
                  <input
                    type="text"
                    id="closeAccountName"
                    value={formData.closeAccountName}
                    name="closeAccountName"
                    onChange={handleChange}
                    placeholder="lowercase"
                  />
                </div>
              )}
              {editButtons.closeAccountPassword && (
                <div className="close-account-password-div">
                  <label htmlFor="closeAccountPassword">
                    Input your password
                  </label>
                  <input
                    type="text"
                    name="closeAccountPassword"
                    value={formData.closeAccountPassword}
                    onChange={handleChange}
                  />
                </div>
              )}
              {editButtons.closeAccountPin && (
                <div className="close-account-pin-div">
                  <label htmlFor="closeAccountPin">Input your pin</label>
                  <input
                    type="text"
                    name="closeAccountPin"
                    value={formData.closeAccountPin}
                    onChange={handleChange}
                  />
                </div>
              )}
              {editButtons.deleteAccount && (
                <button
                  onClick={handleDeleteAccount}
                  className="btn-deleteAccount"
                >
                  DELETE ACCOUNT
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </SectionProfile>
  );
}

const SectionProfile = styled.section`
  width: 80%;
  position: relative;
  button:disabled {
    background-color: #e0e0e0;
    border: 1px solid #dedede;
    color: rgb(127, 127, 128);
    cursor: not-allowed;
  }
  button {
    border-radius: 4px;
    background: #569d4b;
    border: none;
    transition: all 0.3s ease;
  }
  
  .profile-div {
    width: 100%;
    height: auto;
    background-color: white;
    padding: 0 15px;
    margin-top: 2rem;
    border-radius: 4px;
    position: relative;
    padding-top: 40px;
  }
  .heading-profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .btn-close {
    display: block;
    border: none;
    background-color: transparent;
    font-size: 20px;
    color: #bc0707;
    cursor: pointer;
    margin-right: 2rem;
  }
  .profile-details,
  .profile-details-noInput {
    margin-bottom: 1rem;
  }
  .profile-details-name {
    margin-bottom: 1rem;
  }
  .input-profile-name,
  input {
    width: 78%;
    border: 1px solid black;
    margin-right: 5%;
    padding: 10px;
    border-radius: 4px;
  }
  .btn-input-name,
  .btnInput {
    width: 17%;
    border: none;
    padding: 10px;
    border-radius: 4px;
    border: 2px solid green;
    cursor: pointer;
    background-color: transparent;
  }
  .btnSubmitUpdate {
    border: none;
    display: block;
    margin: 2rem auto;
    padding: 10px 25px;
    font-size: 16px;
    letter-spacing: 0.5;
    border-radius: 4px;
    background-color: #78b945;
    cursor: pointer;
  }
  .change-pin-div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 2rem 0rem;
  }
  .btn-change-pin,
  .btn-change-password,
  .btn-close-account {
    padding: 10px;
    border: 2px solid green;
    border-radius: 4px;
    width: 200px;
    cursor: pointer;
  }
  .change-pin-content-div {
    width: 100%;
  }
  .current-pin-div,
  .new-pin-div,
  .confirm-pin-div,
  .current-password-div,
  .new-password-div,
  .confirm-password-div {
    margin-bottom: 1rem;
    position: relative;
  }
  .current-pin-div input,
  .new-pin-div input,
  .confirm-pin-div input,
  .current-password-div input,
  .new-password-div input,
  .confirm-password-div input {
    width: 100%;
  }

  .current-pin-icon,
  .new-pin-icon,
  .confirm-pin-icon,
  .current-password-icon,
  .new-password-icon,
  .confirm-password-icon {
    position: absolute;
    top: 10px;
    right: 5px;
  }
  .update-close-div {
    width: 90%;
    margin: 0 auto;
  }

  .update-pin-div label,
  .update-password-div label {
    width: 200px;
    display: inline-block;
  }
  .btn-update-pin,
  .btn-update-password {
    padding: 10px 40px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4px;
    margin-bottom: 2rem;
  }
  .heading-password,
  .heading-pin {
    margin-bottom: 3rem;
  }
  .closeAccount-div1 {
    margin-bottom: 4rem;
  }
  .btn-closeAccount-yes,
  .btn-closeAccount-no {
    padding: 10px 35px;
    cursor: pointer;
    margin: 1.5rem 0;
    margin-right: 0.8rem;
    border-radius: 4px;
    background: #569d4b;
    border: none;
    transition: all 0.3s ease;
  }
  .btn-closeAccount-yes:hover,
  .btn-closeAccount-no:hover {
    background: #35612e;
  }

  .close-account-name-div,
  .close-account-password-div,
  .close-account-pin-div {
    margin-bottom: 1rem;
  }
  .closeAccount-div1 label {
    width: 180px;
    display: inline-block;
  }
  .btn-deleteAccount {
    padding: 10px 20px;
    margin: 1rem 180px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    background: #569d4b;
  }
  .btn-deleteAccount:hover {
    background: #35612e;
  }

  @media screen and (min-width: 420px) {
    .current-pin-label-div,
    .new-pin-label-div,
    .confirm-pin-label-div,
    .current-password-label-div,
    .new-password-label-div,
    .confirm-password-label-div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .current-pin-div,
    .new-pin-div,
    .confirm-pin-div,
    .current-password-div,
    .new-password-div,
    .confirm-password-div {
      margin: 0;
    }
    .update-pin-div label,
    .update-password-div label {
      width: 50%;
    }
    .update-close-div {
      max-width: 400px;
    }
  }
  @media screen and (min-width: 580px) {
    .profile-details-name,
    .profile-details {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .input-profile-name,
    input {
      width: 50%;
    }
    .btn-input-name,
    .btnInput {
      width: 20%;
    }
    .profile-details-name h5,
    .h5Input {
      width: 30%;
    }
  }
  @media screen and (min-width: 880px) {
    .profile-details-name,
    .profile-details,
    .profile-details-noInput {
      width: 700px;
      display: block;
      margin: 0 auto 1rem 0;
    }
    .input-profile-name,
    input {
      width: 300px;
      margin-right: 30px;
    }
    .btn-input-name,
    .btnInput {
      width: 100px;
    }
    .profile-details-name h5,
    .h5Input,
    .h5NoInput {
      display: inline-block;
      width: 220px;
    }
  }
`;

export default Profile
