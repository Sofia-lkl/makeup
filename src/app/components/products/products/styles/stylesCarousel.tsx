import styled from "styled-components";
const breakpoints = {
  tablet: "768px",
  mobile: "480px",
};

export const CarouselContainer = styled.div`
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 50px 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(245, 245, 245, 1) 50%,
    rgba(255, 255, 255, 0.9) 100%
  );
  position: relative;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    width: 10%;
    height: 100%;
    background: linear-gradient(to right, white, transparent);
  }

  &:after {
    right: 0;
    background: linear-gradient(to left, white, transparent);
  }

  @media only screen and (max-width: ${breakpoints.tablet}) {
    padding: 10px 0;
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    padding: 40px 0;
  }
`;

export const HighlightedProductCardContainer = styled.div`
  margin: 25px;
  width: 240px;
  min-height: 350px;
  transition: transform 0.5s, opacity 0.5s;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
  opacity: 0.7;

  &.slick-center {
    transform: scale(1.2) perspective(1000px) rotateY(0deg);
    opacity: 1;
    z-index: 2;
  }

  &.slick-slide:not(.slick-center) {
    transform: scale(0.9) perspective(1000px) rotateY(30deg);
    opacity: 0.6;
    z-index: 1;
  }

  .productOptions {
    display: none;
  }

  &:hover .productOptions {
    display: block;
  }

  @media only screen and (max-width: ${breakpoints.tablet}) {
    width: 220px;
    min-height: 330px;
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    width: 200px;
    min-height: 310px;
  }
`;
