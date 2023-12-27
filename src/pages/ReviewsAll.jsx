import React, { useState, useEffect, useRef } from "react";
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
import { AppProvider, useGlobalContext } from "../context";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";

const ReviewsAll = () => {
  // const { data, isLoading: reviewsLoading } = useGetAllReviews();
  const { getFormattedDate } = useGlobalContext();
  const { data: userData } = useGetUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);
  const [isNotHelpful, setIsNotHelpful] = useState(false);
  const [clickedID, setClickedID] = useState([]);
  const [clickedIDUnhelpful, setClickedIDUnhelpful] = useState([]);
  const { mutate, isLoading: helpfulLoading } = useUpdateHelpful();
  const [rating, setRating] = useState({});
  const [selectedRating, setSelectedRating] = useState("");
  // const [numRatings, setNumRatings] = useState(null);
  const [ratingsAvg, setRatingsAvg] = useState(0);
  let ratingData;

  // function insertZerosBetweenElements(arr) {
  //   return arr.flatMap((num, index) => (index === 0 ? [num] : [5, num]));
  // }
  // const newRatingData = [...insertZerosBetweenElements(ratingData)];
  // const starsArray = Array(5).fill(<FaRegStar />);

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
      mutate(
        { id, helpful: 0, unhelpful: -1 },
        {
          onSuccess: () => {
            setIsNotHelpful(false);
          },
        }
      );
    } else {
      setClickedIDUnhelpful([...clickedIDUnhelpful, id]);
      mutate(
        { id, helpful: isHelpful ? -1 : 0, unhelpful: 1 },
        {
          onSuccess: () => {
            setIsNotHelpful(true);
          },
        }
      );
    }
  };

  const handleRatings = (e) => {
    e.preventDefault();
    setSelectedRating(e.target.value);
  };
  useEffect(() => {
    const handleRatings = async (e) => {
      try {
        let response;
        if (selectedRating === "all")
          response = await customFetch(`/api/v1/reviews`);
        else
          response = await customFetch(
            `/api/v1/reviews?rating=${selectedRating}`
          );
        setData(response.data.data.reviews);
      } catch (err) {
        console.log(err);
      } finally {
        console.log("succcess");
      }
    };
    handleRatings();
  }, [selectedRating]);
  useEffect(() => {
    const handleSearch = async () => {
      try {
        setIsLoading(true);
        const response = await customFetch(
          `/api/v1/reviews/searchReviews/?s=${searchTerm}`
        );
        const ratings = await customFetch(`/api/v1/reviews/review-stats`);
        setData(response.data.data.reviews);
        // setRating(ratings?.data?.data?.stats[0]?.eachTotals);
        // setNumRatings(ratings?.data?.data?.stats[0]?.groupTotals[0].numReviews);
        // // setRatingsAvg(ParseFloat(ratings?.data?.data?.stats[0]?.groupTotals[0]?.avgRating?.toFixed(1)));
        // setRatingsAvg(
        //   parseFloat(
        //     ratings?.data?.data?.stats[0]?.groupTotals[0].avgRating?.toFixed(1)
        //   )
        // );
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    handleSearch();
  }, [searchTerm]);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const ratings = await customFetch(`/api/v1/reviews/review-stats`);
        console.log(ratings);
        // setRating(ratings?.data?.data?.stats[0]?.eachTotals);
        setRating(ratings);
        // setNumRatings(ratings?.data?.data?.stats[0]?.groupTotals[0].numReviews);
        // setRatingsAvg(ParseFloat(ratings?.data?.data?.stats[0]?.groupTotals[0]?.avgRating?.toFixed(1)));
        // setRatingsAvg(
        //   parseFloat(
        //     ratings?.data?.data?.stats[0]?.groupTotals[0].avgRating?.toFixed(1)
        //   )
        // );
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    handleSearch();
  }, []);


//   useEffect(() => {
//     const avg =
//       rating?.data?.data?.stats[0]?.groupTotals[0]?.avgRating?.toFixed(1);
//       const {stats} = {...rating?.data?.data}
//       if(avg)
//       setRatingsAvg(
//         parseFloat(
//           avg
//         )
//       );
//   }, [rating]);
// console.log(ratingsAvg);

const { stats } = { ...rating?.data?.data };
console.log(stats)

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

  if (isLoading) {
    console.log("");
  }
  // console.log(
  //   parseFloat(
  //     rating?.data?.data?.stats[0]?.groupTotals[0].avgRating?.toFixed(1)
  //   )
  // );

  // ratingData = rating?.map(

  ratingData = rating?.data?.data?.stats[0]?.eachTotals?.map((rate) => {
    //  console.log(rating?.data?.data?.stats[0]?.groupTotals[0]?.numReviews);
    console.log(rate);
    console.log(
      (rate?.numReviewsEach /
        rating?.data?.data?.stats[0]?.groupTotals[0]?.numReviews) *
        100
    );
    return (
      (rate.numReviewsEach /
        rating?.data?.data?.stats[0]?.groupTotals[0]?.numReviews) *
      100
    );
  });
  // console.log(ratingData);
  console.log(rating?.data?.data?.stats[0]);

  const starsInFivePlaces = ratingData?.map((star, index) => (
    <div key={index}>
      <span className="star-span">
        <p className="stars-p">
          {[1, 2, 3, 4, 5].map((star, value) =>
            value < 5 - index ? (
              <FaStar className="colored" key={value} />
            ) : (
              <FaRegStar className="not-colored" key={value} />
            )
          )}
        </p>
        <span className="percent-span">{Math.round(star)}%</span>
      </span>
    </div>
  ));

  


  // const ratingsAvg =
  //   rating?.data?.data?.stats[0];
  // // console.log(ratingsAvg)
  // console.log(rating?.data?.data?.stats[0])

  //  const state = {
  //    labels: starsInFivePlaces,
  //    datasets: [
  //      {
  //        label: "rating",
  //        data: ratingData,
  //        stack: "stack1",
  //        backgroundColor: "#6a6f73",
  //        barPercentage: 0.6,
  //        categoryPercentage: 0.4,
  //        maxBarThickness: 30,
  //      },
  //      {
  //        label: "background",
  //        data: Array(ratingData?.length).fill(100),
  //        backgroundColor: "#d1d7dc",
  //        stack: "stack1",
  //        barPercentage: 0.6,
  //        categoryPercentage: 0.4,
  //        maxBarThickness: 30,
  //      },
  //    ],
  //  };

  //  const chartOptions = {
  //    plugins: {
  //      title: {
  //        display: false,
  //        // text: "Users Gained between 2016-2020",
  //      },
  //      legend: {
  //        display: false,
  //      },
  //    },
  //    indexAxis: "y",
  //    elements: {
  //      line: {
  //        borderWidth: 0, // Hide lines
  //      },
  //      point: {
  //        radius: 0, // Hide data points
  //      },
  //    },
  //    scales: {
  //      x: {
  //        beginAtZero: true,
  //        max: 100,
  //        display: false,
  //      },
  //      y: {
  //        type: "category",
  //        beginAtZero: true,
  //        position: "right",
  //        display: false,
  //        // categoryPercentage: 0.7,
  //        // barPercentage: 0.9
  //      },
  //    },
  //  };

  return (
    <ReviewDiv>
      <div className="main-div">
        <article className="feedback-article">
          <h2>User feedback</h2>
          <div className="ratings-avg-div">
            <div className="avg-rating-div">
              {/* {ratingsAvg && <h1 className="avg-h1">{ratingsAvg}</h1>} */}
              <h1 className="avg-h1">
                {/* {rating?.data?.data?.stats[0]?.groupTotals[0].avgRating?.toFixed(
                  1
                )} */}
              </h1>
              <span className="avg-stars">
                {/* <p className="avg-stars-p">
                  {[1, 2, 3, 4, 5].map((star, index) =>
                    ratingsAvg - index > 0 && ratingsAvg - index < 1 ? (
                      <FaStarHalfAlt className="colored" key={index}/>
                    ) : index < ratingsAvg ? (
                      <FaStar className="colored" key={index} />
                    ) : (
                      <FaRegStar className="not-colored" key={index} />
                    )
                  )}
                </p> */}
                <p className="colored avg-p">Course Rating</p>
              </span>
            </div>
            <div className="bar-div">
              {/* <Bar
                className="bar"
                data={state}
                options={chartOptions}
              /> */}
            </div>
            {/* <div className="stars-div">
              {starsInFivePlaces}
            </div> */}
          </div>
        </article>
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
          <form className="rating-form">
            <h4 className="rating-h4">Filter ratings</h4>
            <select
              className="rating-select"
              name="ratings"
              value={selectedRating}
              onChange={handleRatings}
            >
              <option value="all">All ratings</option>
              <option value="5">Five stars</option>
              <option value="4">Four stars</option>
              <option value="3">Three stars</option>
              <option value="2">Two stars</option>
              <option value="1">One star</option>
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
              {datum?.createdBy?.profilePhoto ? (
                <img
                  src={datum?.createdBy?.profilePhoto}
                  className="profilePhoto"
                />
              ) : (
                <span className="p-initials">
                  {datum?.createdBy?.fullname
                    .split(" ")
                    .filter((ini, index) => index < 2)
                    .map((ini) => ini.charAt(0).toUpperCase())
                    .join("")}
                </span>
              )}
            </div>

            <div className="star-rating-div">
              <p className="fullname">{datum?.createdBy?.fullname}</p>
              <div className="star-div">
                {[1, 2, 3, 4, 5].map((star, index) => {
                  return (
                    <span key={index} className="star-span">
                      {/* <FaRegStar */}
                      {index < datum?.rating ? (
                        <FaStar className="colored" />
                      ) : (
                        <FaRegStar className="not-colored" />
                      )}
                    </span>
                  );
                })}
                <span className="date-span">
                  {getFormattedDate(datum?.createdAt)}
                </span>
              </div>
              <div>
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
              </div>
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
  .feedback-article {
    width: 100%;
    max-width: 800px;
  }
  .ratings-avg-div {
    width: 100%;
    height: auto;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 2rem;
    margin-top: 2rem;
    display: grid;
  }
  .avg-rating-div {
    grid-column: 1 / span 3;
    grid-row: 1;
    margin-right: 0.4rem;
  }

  .bar-div {
    width: 180px;
    margin-right: 0.4rem;
  }
  .avg-h1 {
    font-size: 2rem;
    color: #b4690e;
  }
  .avg-stars {
  }
  .avg-stars-p {
    font-size: 0.8rem;
  }
  .avg-p {
    font-size: 0.8rem;
  }
  .stars-div {
    display: flex;
    flex-direction: column;
    row-gap: 0.1rem;
    margin-top: 0.09rem;
  }
  .star-span {
    display: flex;
    align-items: center;
    color: rgb(122, 83, 218);
  }
  .stars-p {
    margin: 0;
    padding: 0;
    font-size: 0.7rem;
  }
  .colored {
    color: #b4690e;
  }
  .not-colored {
    color: #b4690e;
  }
  .percent-span {
    margin-left: 0.2rem;
    font-size: 0.8rem;
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
    background-color: rgb(45, 47, 49);
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
    height: auto;
    border-bottom: 1px solid rgb(209, 215, 220);
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1rem 0;
  }

  .profilePhoto-div {
    height: 40px;
    width: 40px;
    margin-right: 1rem;
    min-width: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(45, 47, 49);
  }
  .profilePhoto {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }
  .p-initials {
    color: white;
    font-size: 1.2rem;
    letter-spacing: 2px;
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
    margin-bottom: 0.3rem;
  }
  .thumb-span {
    display: flex;
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
    /* margin-bottom: 1.5rem; */
    flex-grow: 1;
    text-align: left;
  }
  .star-span {
    display: flex;
    align-items: center;
  }
  .active-star {
    color: #032fb3;
    /* color: #7edf55; */
    display: inline;
  }
  .inactive-star {
    color: #797979;
  }
  @media screen and (min-width: 427px) {
    .bar-div {
      width: 250px;
    }
    .avg-h1 {
      font-size: 3rem;
    }
    .avg-stars-p {
      font-size: 1rem;
    }
    .stars-div {
      row-gap: 0.3rem;
      margin-top: 0.3rem;
    }
    .stars-p {
      font-size: 0.9rem;
    }
    .profilePhoto-div{
      width: 60px;
      height: 60px;
    }
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
    /* .ratings-avg-div {
      flex-direction: row;
    } */
  }
  @media screen and (min-width: 627px) {
    .bar-div {
      width: 400px;
    }
    .stars-p {
      font-size: 1.2rem;
    }
    .stars-div {
      row-gap: 0.9rem;
      margin-top: 0.6rem;
    }
    .percent-span {
      font-size: 1rem;
    }
    .avg-h1 {
      font-size: 4.6rem;
    }
    .avg-stars-p {
      font-size: 1.2rem;
    }
    .avg-p {
      font-size: 1rem;
    }
  }
  @media screen and (min-width: 742px) {
    .ratings-avg-div {
      grid-template-columns: auto auto auto;
      height: 200px;
    }
    .avg-rating-div {
      grid-column: 1 / 1;
    }
  }
`;
export default ReviewsAll;
