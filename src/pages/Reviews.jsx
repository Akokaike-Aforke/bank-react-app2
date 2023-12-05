import React, { useState } from 'react'
import { useCreateReview, useGetAllReviews } from '../ReactQueryCustomHooks'
import styled from "styled-components";
import { FaRegStar } from "react-icons/fa6";

const Reviews = () => {
  const [review, setReview] = useState("")
  const [rating, setRating] = useState("")
  const[value, setValue] = useState(0);
  const {data, isLoading: reviewsLoading} = useGetAllReviews()
  const { mutate, isLoading } = useCreateReview();
  const submitReview = (e) => {
    e.preventDefault();
    mutate({review, rating}, {
      onSuccess: (data) => {console.log(data)},
      onError: (error) => {console.log(error)}
    })
  }
  // const handleRating = (id) => {
  //   const filtered = 
  // }
  if(isLoading){
    return <p>Loading...</p>
  }
  if(reviewsLoading){
    return <p>Reviews loading...</p>
  }
  return (
    <ReviewDiv>
      <form onSubmit={submitReview}>
        <div className='review-textarea'>
        <label htmlFor="review-text">review:</label>
        <textarea
          id="review-text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        </div>
        rating:
        {/* <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        /> */}
        {[1, 2, 3, 4, 5].map((star, index) => {
          return (
            <span key={index} className="star-span">
              <FaRegStar
                onClick={() => {setRating(index + 1); setValue(index + 1)}}
                className={value >= star ? "active-star" : "inactive-star"}
              />
            </span>
          );
        })}
        <button>submit</button>
      </form>
        {data?.data?.reviews?.map((datum) => (
          <article className="profile-article" key={datum.id}>
            <p className="profile-name">
              <img
                src={datum?.createdBy?.profilePhoto}
                className="profilePhoto"
              />
              <span>{`${datum?.createdBy?.fullname}`.toUpperCase()}</span>
            </p>
            <p className="p-review">
              {datum.review}
              <span className="review-span">{datum?.createdAt}</span>
            </p>
            <div className="star-rating-div">
              {[1, 2, 3, 4, 5].map((star, index) => {
                return (
                  <span key={index} className="star-span">
                    <FaRegStar
                      className={
                        index < datum?.rating ? "active-star" : "inactive-star"
                      }
                    />
                  </span>
                );
              })}
            </div>
          </article>
        ))}
    </ReviewDiv>
  );
}

const ReviewDiv = styled.main`
.review-textarea{
  display: flex;
  align-items: center;
}
  .profile-article {
    width: 220px;
    height: 180px;
    border: 1px solid red;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .profile-name {
    display: flex;
    align-items: center;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    font-size: 0.88rem;
    column-gap: 1rem;
    margin-top: 1.5rem;
  }
  .profilePhoto {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    object-fit: cover;
  }
  .p-review {
    width: 90%;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid black;
    font-size: 0.84rem;
  }
  .review-span {
    display: block;
    font-size: 0.7rem;
  }
  .star-rating-div {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .star-span {
    /* display: flex; */
    /* display: inline;
  width: auto;
  border: 2px solid black; */
  }
  .active-star {
    color: #032fb3;
    display: inline;
    /* border: 2px solid green; */
  }
  .inactive-star {
    color: #797979;
    /* border: 2px solid black; */
  }
`;

export default Reviews