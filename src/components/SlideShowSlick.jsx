// src/components/SlideshowSlick.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  { id: 1, content: "Slide 1 Content" },
  { id: 2, content: "Slide 2 Content" },
  { id: 3, content: "Slide 3 Content" },
  // Add more slides as needed
];

const SlideshowSlick = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {slides.map((slide) => (
        <div key={slide.id}>
          <h3>{slide.content}</h3>
        </div>
      ))}
    </Slider>
  );
};

export default SlideshowSlick;
