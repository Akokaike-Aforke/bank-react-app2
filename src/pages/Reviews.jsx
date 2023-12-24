import React, { useState } from "react";
import { useCreateReview, useGetAllReviews } from "../ReactQueryCustomHooks";
import styled from "styled-components";
import { FaRegStar } from "react-icons/fa6";
import { toast } from "react-toastify";

const Reviews = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [value, setValue] = useState(0);
  // const {data, isLoading: reviewsLoading} = useGetAllReviews()
  const { mutate, isLoading } = useCreateReview();
  const submitReview = (e) => {
    e.preventDefault();
    // if(review)
    mutate(
      { review, rating },
      {
        onSuccess: (data) => {
          toast.success("Your review has been sent")
          setReview("")
          setValue(0)
        },
        onError: (error) => {
          toast.error("There was an issue sending your review")
          console.log(error);
        },
      }
    );
  };

  return (
    <ReviewDiv>
      <form className="review-form" onSubmit={submitReview}>
        <h5 className="review-h5">Leave Your Review</h5>
        <div className="review-textarea">
          <label htmlFor="review-text" className="review-label">
            Review:
          </label>
          <textarea
            className="textarea"
            id="review-text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        <div className="rating-div">
          <p className="rating-p">Rating:</p>
          {/* <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        /> */}
          {[1, 2, 3, 4, 5].map((star, index) => {
            return (
              <FaRegStar
                onClick={() => {
                  setRating(index + 1);
                  setValue(index + 1);
                }}
                className={value >= star ? "active-star" : "inactive-star"}
              />
            );
          })}
        </div>
        <button className="submit-btn">submit</button>
      </form>
    </ReviewDiv>
  );
};

const ReviewDiv = styled.main`
  .review-form {
    width: 80%;
    max-width: 700px;
    margin: 5rem auto 0;
  }
  .review-h5{
    margin-bottom: 1rem;
  }
  .review-label {
    width: 70px;
    min-width: 70px;
  }
  .review-textarea {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  .textarea {
    width: 400px;
    height: 60px;
  }
  .rating-div {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  .rating-p {
    margin: 0;
    padding: 0;
    display: inline-block;
    width: 70px;
  }
  .submit-btn {
    padding: 0.3rem 0.8rem;
    border-radius: 4px;
    background-color: #4364c9;
    color: white;
    transition: all 0.4s ease;
    letter-spacing: 0.5;
    cursor: pointer;
    border: none;
  }
  .submit-btn:hover {
    background-color: #0641f1;
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

export default Reviews;
