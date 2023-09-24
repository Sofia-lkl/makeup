import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Button } from "@mui/material";

export const colors = {
  neutralLight: "#FAF3E0",
  pinkDark: "#FF69B4",
};

export const PreviewContainer = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${colors.neutralLight};
  padding: 4rem 0;
  font-family: "Arial", sans-serif;
`;

export const ProductSlide = styled.div<{ $imageUrl: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  position: relative;
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
  background-position: center;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
`;

export const ViewAllButton = styled(Button)`
  position: absolute;
  bottom: 2rem;
  left: 43%;
  transform: translateY(-50%);
  background-color: ${colors.pinkDark};
  color: white;
  transition: transform 0.3s, background-color 0.3s;

  &:hover {
    transform: translateX(-5px);
    background-color: ${colors.pinkDark};
    opacity: 0.9;
  }
`;
export const ProductFlowAnimation = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
`;

export const ProductFlowContainer = styled.div`
  position: absolute;
  top: 23%;
  left: 0;
  transform: translateY(50%);
  width: 250%;
  height: 250%;

  display: flex;
  overflow-x: hidden;
  animation: ${ProductFlowAnimation} 45s linear infinite;
`;

export const ProductDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  width: 300px;
  height: 250px;
  padding: 1.5rem;
  margin-right: 60px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;

  transition: width 0.3s, height 0.3s, border-radius 0.3s, transform 0.3s;
  transform-origin: center center;

  &:hover {
    width: 370px;
    height: 300px;
    border-radius: 50px;
    transform: scale(1.1);
  }
  img {
    max-width: 100%;
    max-height: 70%;
    object-fit: cover;
    margin-bottom: 1rem;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    transition: transform 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  }

  h4,
  p {
    margin: 0;
    min-height: 25px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 90%;
  }

  h4 {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
  }

  p {
    font-size: 1rem;
    color: #555;
  }
`;
