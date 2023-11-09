import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaLessThanEqual, FaTimes } from "react-icons/fa";
import styled from "styled-components";
import { useGlobalContext } from "../context";
import { useEditUser, useDeleteUser } from "../ReactQueryCustomHooks";
import { toast } from "react-toastify";
import { ImEye } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import customFetch from "./../utils";
import { BiEdit } from "react-icons/bi";
import axios from "axios";
const Profile = ({ data, isLoading, setProfileOpen }) => {
  const { getFormattedDate, selectedAccount } = useGlobalContext();
  const { deleteUser } = useDeleteUser();
  const dashboardUser = data.data.user;

  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const editUser = useEditUser();
  const editUser1 = useEditUser();

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePhoto", file);
    editUser1(formData, {
      onSuccess: (data) => {
        console.log(data?.data?.data?.user?.profilePhoto);
        console.log(data?.data);
        const filename = data?.data?.data?.filename;
        if (filename) {
          setImageURL(`http://localhost:5000/profileImages/${filename}`);
        }
      },
    });

    // const result = await customFetch.patch('/api/v1/users/updateMe', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    // if(file)
    // {
    //   const url = URL.createObjectURL(file);
    //   setImageURL(url);
    // }
    // else setImageURL(null)
  };
  //   console.log(file);
  // useEffect(()=>{
  // //   if(file){
  // // const url = URL.createObjectURL(file);
  // // setImageURL(url);
  // // }
  // // else setImageURL(null)
  // const filename = data?.data?.data?.filename;
  // setImageURL(
  //   `http://localhost:5000/profileImages/1699480350779--PASSPORT PHOTO.jpg`
  // );
  // }, [])

  useEffect(() => {
    if (data?.data?.data?.user?.profilePhoto) {
      const filename = data?.data?.data?.user?.profilePhoto;
      const profilePhotoURL = filename.replace(/\\/g, "/");
      setImageURL(`http://localhost:5000/profileImages/${profilePhotoURL}`);
    } else if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);
    }
    else
    setImageURL(null)
  }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <SectionProfile className="profileSection">
      <div className="profile-div">
        <div className="photo-div">
          <h5 className="profile-h5">PROFILE</h5>
          <form className="photo-form" onSubmit={handleSave}>
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
              accept=".jpg, .jpeg, .png"
              onChange={handleChange}
              style={{ display: "none" }}
              name="profilePhoto"
            />
            <button className="profile-btn" onClick={handleSave}>
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
            <input
              className="info-input"
              id="profile-customer-name"
              type="text"
            />
            <BiEdit />
          </form>
          <h5 className="info-h">Username</h5>
          <p className="info-p1">username</p>
          <h5 className="info-h">User Type</h5>
          <p className="info-p2">Retail Customer</p>
          <button className="info-btn">SHOW BVN</button>
        </div>
        <div className="links-div">
          <h5 className="links-h5">LINKS</h5>
          <div>
            <p className="links-password">Change Password</p>
            <p className="links-pin">Change Pin</p>
            {/* <img src={data?.data?.data?user?.profilePhoto} /> */}
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
    /* border: none; */
  }
  .info-form {
    margin-bottom: 2rem;
    margin-left: 1rem;
  }
  .info-h {
    margin-left: 1rem;
  }
  .info-p1,
  .info-p2 {
    margin-bottom: 1rem;
    margin-left: 1rem;
  }
  .info-btn {
    padding: 0.5rem;
    border: 1px solid rgb(33, 153, 232);
    color: rgb(33, 153, 232);
    background-color: transparent;
    margin-left: 1rem;
  }

  .links-password,
  .links-pin {
    color: rgb(33, 153, 232);
    margin-bottom: 1rem;
    padding-left: 1rem;
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
