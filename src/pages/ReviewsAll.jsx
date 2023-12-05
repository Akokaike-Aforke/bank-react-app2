import React, { useState, useEffect } from "react";
import {
  useCreateReview,
  useGetAllReviews,
  useUpdateHelpful,
  useGetUser,
} from "../ReactQueryCustomHooks";
import customFetch from "./../utils";
import styled from "styled-components";
import { FaRegStar } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdThumbDownOffAlt } from "react-icons/md";
import { MdThumbUpOffAlt } from "react-icons/md";
import Highlighter from "react-highlight-words";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Dna } from "react-loader-spinner";

const ReviewsAll = () => {
  // const { data, isLoading: reviewsLoading } = useGetAllReviews();
  const { data: userData } = useGetUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);
  const [isNotHelpful, setIsNotHelpful] = useState(false);
  const [clickedID, setClickedID] = useState([]);
  const [clickedIDUnhelpful, setClickedIDUnhelpful] = useState([]);
  const { mutate, isLoading: helpfulLoading } = useUpdateHelpful();
  const handleHelpful = (id) => {
    setClickedIDUnhelpful(
      clickedIDUnhelpful.filter((removeId) => removeId !== id)
    );
    if (clickedID?.includes(id)) {
      setClickedID(clickedID.filter((removeId) => removeId !== id));
      mutate({ id, helpful: -1, unhelpful: 0 });
    } else {
      mutate({ id, helpful: 1, unhelpful: isNotHelpful ? -1 : 0 });
      setClickedID([...clickedID, id]);
      setIsHelpful(true);
    }
  };

  const handleUnhelpful = (id) => {
    setClickedID(clickedID.filter((removeId) => removeId !== id));
    if (clickedIDUnhelpful?.includes(id)) {
      setClickedIDUnhelpful(
        clickedIDUnhelpful.filter((removeId) => removeId !== id)
      );
      mutate({ id, helpful: 0, unhelpful: -1 }, {
        onSuccess: () => {
          setIsNotHelpful(false)
        }
      });
    } else {
      setClickedIDUnhelpful([...clickedIDUnhelpful, id]);
      mutate({ id, helpful: isHelpful ? -1 : 0, unhelpful: 1 },
      {
        onSuccess: () => {
      setIsNotHelpful(true);}
      });
    }
  };

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setIsLoading(true);
        const response = await customFetch(
          `/api/v1/reviews/searchReviews/?s=${searchTerm}`
        );
        setData(response.data.data.reviews);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    handleSearch();
  }, [searchTerm]);
  useEffect(() => {
    const getHelpfulArray = localStorage.getItem(
      `${userData?.data?.user?.id}_helpfulArray`
    );
    const getUnhelpfulArray = localStorage.getItem(
      `${userData?.data?.user?.id}_unhelpfulArray`
    );
    if (getHelpfulArray) {
      setClickedID(JSON.parse(getHelpfulArray));
    }
    if (getUnhelpfulArray) {
      setClickedIDUnhelpful(JSON.parse(getUnhelpfulArray));
    }
  }, [userData?.data?.user?.id]);
  useEffect(() => {
    localStorage.setItem(
      `${userData?.data?.user?.id}_helpfulArray`,
      JSON.stringify(clickedID)
    );
    localStorage.setItem(
      `${userData?.data?.user?.id}_unhelpfulArray`,
      JSON.stringify(clickedIDUnhelpful)
    );
  }, [clickedID, clickedIDUnhelpful]);
  // useEffect(() => {
  //   const storedData = localStorage.getItem("helpfulArray");
  //   const data = JSON.parse(storedData)
  //   if (storedData) {
  //     // Parse the JSON string to get the original array
  //     setClickedID(data);
  //   }
  // }, []);
  if (isLoading) {
    console.log("Loading...");
  }
  console.log(clickedID);
  console.log(userData?.data?.user?.id);

  return (
    <ReviewDiv>
      <div className="main-div">
        <h2>User feedback</h2>
        <div className="ratings-avg-div"></div>
        <h2>Reviews</h2>
        <div className="form-div">
          <form action="" className="search-form">
            <div className="search-div">
              <input
                type="text"
                className="search-input"
                placeholder="Search reviews"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              <span className="search-span">
                <FaSearch className="search-icon" />
              </span>
            </div>
          </form>
          <form action="" className="rating-form">
            <h4 className="rating-h4">Filter ratings</h4>
            <select className="rating-select">
              <option value="">All ratings</option>
              <option value="">Five stars</option>
              <option value="">Four stars</option>
              <option value="">Three stars</option>
              <option value="">Two stars</option>
              <option value="">One star</option>
            </select>
          </form>
        </div>
        {isLoading ? (
          <span className="dna-wrapper">
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </span>
        ) : (
          data.length === 0 && (
            <div>
              <p className="p-no-reviews1">{`No Reviews matching '${searchTerm}'`}</p>
              <p className="p-no-reviews2">
                No reviews matched your search. Try searching with another term.
              </p>
            </div>
          )
        )}
        {data?.map((datum) => (
          <article className="profile-article" key={datum.id}>
            <div className="profilePhoto-div">
              <img
                src={datum?.createdBy?.profilePhoto}
                className="profilePhoto"
              />
            </div>

            <div className="star-rating-div">
              <p className="fullname">{datum?.createdBy?.fullname}</p>
              <div className="star-div">
                {[1, 2, 3, 4, 5].map((star, index) => {
                  return (
                    <span key={index} className="star-span">
                      <FaRegStar
                        className={
                          index < datum?.rating
                            ? "active-star"
                            : "inactive-star"
                        }
                      />
                    </span>
                  );
                })}
                <span className="date-span">{datum?.createdAt}</span>
              </div>
              <p>
                {searchTerm ? (
                  <Highlighter
                    highlightClassName="search"
                    searchWords={searchTerm.split(" ")}
                    autoEscape={true}
                    textToHighlight={datum.review}
                  />
                ) : (
                  <span>
                    <p className="p-review">{datum.review}</p>
                  </span>
                )}
              </p>
              <p className="thumb-p">Was this review helpful?</p>
              <span className="thumb-span">
                <button
                  className={
                    clickedID?.includes(datum.id)
                      ? "thumb-btn1 helpful"
                      : "thumb-btn1"
                  }
                  onClick={() => handleHelpful(datum.id)}
                >
                  <MdThumbUpOffAlt />
                </button>
                <button
                  className={
                    clickedIDUnhelpful?.includes(datum.id)
                      ? "thumb-btn2 helpful"
                      : "thumb-btn2"
                  }
                  onClick={() => handleUnhelpful(datum.id)}
                >
                  <MdThumbDownOffAlt />
                </button>
              </span>
            </div>
          </article>
        ))}
      </div>
    </ReviewDiv>
  );
};
const ReviewDiv = styled.main`
  .main-div {
    width: 90%;
    margin: 2rem auto;
  }
  .ratings-avg-div {
    width: 100%;
    height: 170px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid black;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
  .form-div {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    margin-bottom: 1rem;
  }
  .search-form {
    width: 100%;
    height: 50px;
  }
  .search-div {
    border: 1px solid black;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
  }
  .search-input {
    border: none;
    height: 100%;
    flex-grow: 1;
    font-size: 1.1rem;
    padding: 0 10px;
    letter-spacing: 0.5px;
  }
  .search-input:focus {
    outline: none;
  }
  .search-span {
    height: 100%;
    display: inline-block;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    /* text-align: center; */
  }
  .search-icon {
    color: white;
  }
  .rating-h4 {
    margin-bottom: 0.6rem;
    margin-top: 1rem;
  }
  .rating-form {
    width: 100%;
  }
  .rating-select {
    height: 50px;
    width: 100%;
    font-size: 1.1rem;
    padding-left: 10px;
    letter-spacing: 0.5px;
    cursor: pointer;
  }
  .rating-select:focus {
    outline: none;
  }
  .review-textarea {
    display: flex;
    align-items: center;
  }
  .profile-article {
    width: 100%;
    height: 180px;
    border: 1px solid red;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1rem 0;
  }

  .profilePhoto-div {
    height: 60px;
    width: 60px;
    margin-right: 1rem;
    border: 1px solid black;
    min-width: 60px;
  }
  .profilePhoto {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }
  .fullname {
    margin-bottom: 0.5rem;
    text-transform: capitalize;
  }
  .star-div {
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
  }
  .search {
    color: red;
    background-color: transparent;
  }
  .dna-wrapper {
    display: block;
    margin: 0 auto;
  }
  .p-review {
    width: 90%;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
  .p-no-reviews1,
  .p-no-reviews2 {
    font-size: 1.05rem;
  }
  .p-no-reviews1 {
    margin-bottom: 1rem;
  }
  .thumb-p {
    font-size: 0.8rem;
    margin-bottom: 1.3rem;
  }
  .thumb-span {
    display: flex;
    margin-bottom: 1.3rem;
  }
  .thumb-btn1,
  .thumb-btn2 {
    width: 40px;
    height: 40px;
    background-color: transparent;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
  }
  .thumb-btn1 {
    margin-right: 1rem;
  }
  .helpful {
    background-color: black;
    color: white;
  }
  .review-span {
    display: block;
    font-size: 0.7rem;
  }
  .date-span {
    margin-left: 1rem;
    font-size: 0.9rem;
  }
  .star-rating-div {
    text-align: center;
    margin-bottom: 1.5rem;
    flex-grow: 1;
    text-align: left;
  }
  .star-span {
    display: flex;
    align-items: center;
  }
  .active-star {
    color: #032fb3;
    display: inline;
  }
  .inactive-star {
    color: #797979;
  }
  @media screen and (min-width: 510px) {
    .form-div {
      flex-direction: row;
    }
    .search-form {
      flex-grow: 1;
      margin-right: 2rem;
    }
    .rating-form {
      width: 270px;
    }
    .rating-h4 {
      margin-top: 0;
    }
  }
`;
export default ReviewsAll;
