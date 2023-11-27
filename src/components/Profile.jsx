import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaLessThanEqual, FaTimes } from "react-icons/fa";
import styled from "styled-components";
import { useGlobalContext } from "../context";
import { useEditUser, useDeleteUser, useEditProfilePhoto } from "../ReactQueryCustomHooks";
import { toast } from "react-toastify";
import { ImEye } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import customFetch from "./../utils";
import { BiEdit } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";


const Profile = ({ data, isLoading, profileOpen }) => {
  const { getFormattedDate, selectedAccount, person } = useGlobalContext();
  const { deleteUser } = useDeleteUser();

  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState({})
  const {editUser, isLoading: editUserLoading} = useEditUser();
  // const {editUser: editProfilePhoto, isLoading: profileLoading} = useEditProfilePhoto();
  // const {mutate} = useEditProfilePhoto();
  const { editUser: editProfilePhoto, isLoading: profileLoading } =
    useEditProfilePhoto();
  const [editName, setEditName] = useState(false)
  const [showBVN, setShowBVN] = useState(false)
  const [customerName, setCustomerName] = useState(data?.data?.user?.fullname)

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePhoto", file);
    editProfilePhoto(formData);
  };

  const handleEditName = (e) =>{
    e.preventDefault();
    if(customerName && customerName !== data?.data?.user?.fullname && editName)
    editUser(customerName, 
      {
        onSuccess: (data) =>{
          setEditName(false);
        }
      })
  }

  const handleChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);
    } 
    else if (data?.data?.user?.profilePhoto) {
      setImageURL(data?.data?.user?.profilePhoto);
    } 
    else setImageURL(null);
  }, [file, data?.data?.user.profilePhoto]);

 
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <SectionProfile className="profileSection fade-in">
      <div className="profile-div">
        <div className="photo-div">
          <h5 className="profile-h5">PROFILE</h5>
          <form className="photo-form" onSubmit={handleSaveProfile}>
            {profileLoading && (
              <div className="spinner">
                <TailSpin width="30" height="30" color="#002082" radius="3" />
              </div>
            )}
            <label className="photo-label" htmlFor="profile-photo">
              <BiEdit className="photo-edit-icon" />
              <BsPersonFill className="photo-save-icon" />
              {imageURL && (
                <img className="image-blob" src={imageURL} alt="Selected" />
              )}
            </label>
            <input
              id="profile-photo"
              type="file"
              // accept=".jpg, .jpeg, .png"
              accept="image/"
              onChange={handleChange}
              style={{ display: "none" }}
              name="profilePhoto"
            />
            <button className="profile-btn" onClick={handleSaveProfile}>
              SAVE
            </button>
          </form>
        </div>
        <div className="info-div">
          <h5 className="info-h5">INFO</h5>
          <form className="info-form" action="">
            <label className="info-label" htmlFor="profile-customer-name">
              Customer Name
            </label>
            {editUserLoading && (
              <div className="spinner">
                <TailSpin width="30" height="30" color="#002082" radius="3" />
              </div>
            )}
            <input
              className={!editName ? "info-input disabled" : "info-input"}
              id="profile-customer-name"
              type="text"
              disabled={!editName}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <BiEdit
              className={editName ? "editName editNameOn" : "editName"}
              onClick={editName ? handleEditName : () => setEditName(true)}
            />
          </form>
          <h5 className="info-h">Username</h5>
          <p className="info-p1">{data?.data?.user?.username}</p>
          <h5 className="info-h">User Type</h5>
          <p className="info-p2">Retail Customer</p>
          {profileOpen && showBVN && (
            <p className="info-p3">{data?.data?.user?.bvn}</p>
          )}
          <button className="info-btn" onClick={() => setShowBVN(!showBVN)}>
            SHOW BVN
          </button>
        </div>
        <div className="links-div">
          <h5 className="links-h5">LINKS</h5>
          <div>
            <Link to="/updatePassword" className="links-password">
              Change Password
            </Link>
            <Link to="/updatePin" className="links-pin">
              Change Pin
            </Link>
            <Link to="/forgotPin" className="links-pin">
              Forgot Pin
            </Link>
          </div>
        </div>
      </div>
    </SectionProfile>
  );
};

const SectionProfile = styled.section`
  width: 97%;
  position: relative;
  margin-right: auto;
  margin-left: auto;

  .profile-div {
    display: grid;
    width: 100%;
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
  }

  .profile-h5,
  .info-h5,
  .links-h5 {
    padding: 1rem;
    background-color: rgb(251, 251, 251);
    margin-bottom: 1rem;
    color: rgb(128, 128, 128);
  }

  .photo-div,
  .info-div,
  .links-div {
    background-color: white;
    width: 100%;
    height: 350px;
    box-shadow: 0 4px 9px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
  .heading-profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .photo-form {
    padding-left: 1rem;
  }
  .photo-label {
    display: block;
    width: 10rem;
    background-color: rgb(241, 241, 241);
    height: 12rem;
    position: relative;
    text-align: center;
    cursor: pointer;
  }
  .image-blob {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: block;
  }
  .photo-save-icon {
    color: rgb(10, 10, 10);
    font-size: 10rem;
    height: 12rem;
    cursor: pointer;
  }
  .photo-edit-icon {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.23rem;
    cursor: pointer;
    z-index: 2;
  }

  .profile-btn {
    width: 5rem;
    padding: 0.3rem;
    font-family: "Open Sans", sans-serif;
    text-align: center;
    color: rgb(128, 128, 128);
    background-color: rgb(224, 224, 224);
    border: none;
    margin-top: 0.5rem;
    cursor: pointer;
    transition: all 0.4s ease;
  }
  .profile-btn:hover {
    color: rgb(34, 34, 34);
    background-color: rgb(165, 165, 165);
  }
  .info-label {
    display: block;
  }
  .info-input {
    width: 20rem;
    height: 2rem;
    border: 1px solid green;
    border-radius: 3px;
    padding: 5px;
    font-size: 1rem;
    text-transform: capitalize;
  }
  .disabled{
    border: none;
    background-color: transparent;
  }
  .editName{
    cursor: pointer;
  }
  .editNameOn{
    color: green;
  }
  .info-form {
    margin-bottom: 2rem;
    margin-left: 1rem;
  }
  .info-h {
    margin-left: 1rem;
  }
  .info-p1,
  .info-p2, .info-p3 {
    margin-bottom: 1rem;
    margin-left: 1rem;
  }
  .info-p1{
    text-transform: capitalize;
  }
  .info-btn {
    padding: 0.5rem;
    border: 1px solid rgb(33, 153, 232);
    color: rgb(33, 153, 232);
    background-color: transparent;
    margin-left: 1rem;
    cursor: pointer;
    transition: all 0.4s ease;
  }

  .links-password,
  .links-pin {
    color: rgb(33, 153, 232);
    margin-bottom: 1rem;
    padding-left: 1rem;
    display: block;
    text-decoration: none;
  }
  @media screen and (min-width: 770px) {
    .profile-div {
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 2rem;
      margin-top: 3rem;
    }
    .photo-div,
    .info-div,
    .links-div {
      height: 450px;
    }
    .info-input {
      width: 80%;
    }
  }
`;

export default Profile;
