import styled from "styled-components";
import { motion } from "framer-motion";
import { colors } from "../../bar/sideBarStyles/sideBarStyle";

const breakpoints = {
  tablet: "768px",
  mobile: "480px",
};

export const ProductName = styled.h3`
  text-decoration: none !important;
  color: #222;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.5em;
  font-weight: 700;
  transition: color 0.3s;

  &:hover {
    color: ${colors.secondary};
  }

  @media only screen and (max-width: ${breakpoints.tablet}) {
    font-size: 1.3em;
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    font-size: 1.1em;
  }
`;

export const ProductImage = styled.img`
  border-radius: 15px;
  width: 150px; /* Ancho fijo */
  height: 150px; /* Alto fijo */
  object-fit: cover;
  object-position: center;
  margin-top: 1rem;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
  }

  @media only screen and (max-width: ${breakpoints.tablet}) {
    width: 130px;
    height: 130px;
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    width: 100px;
    height: 100px;
  }
`;

export const ProductPrice = styled.p`
  color: ${colors.gold};
  font-weight: bold;
  font-size: 1.4em;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease-in-out;

  @media only screen and (max-width: ${breakpoints.tablet}) {
    font-size: 1.2em;
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    font-size: 1em;
  }
`;

export const ProductDescription = styled.p`
  color: #555;
  margin-top: 0.5rem;
  font-style: italic;
  font-size: 0.9em;
  line-height: 1.4;
  transition: transform 0.3s ease-in-out;

  @media only screen and (max-width: ${breakpoints.tablet}) {
    font-size: 0.85em;
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    font-size: 0.8em;
  }
`;

export const ProductColor = styled.p`
  color: #444;
  margin-top: 0.5rem;
  font-weight: bold;
  font-size: 0.95em;
  transition: transform 0.3s ease-in-out;

  &:hover {
    color: ${colors.primary};
  }

  @media only screen and (max-width: ${breakpoints.tablet}) {
    font-size: 0.9em;
  }
`;

export const ProductBrand = styled.p`
  color: #666;
  margin-top: 0.3rem;
  text-transform: uppercase;
  font-size: 0.85em;
  letter-spacing: 1.2px;
  transition: transform 0.3s ease-in-out;

  @media only screen and (max-width: ${breakpoints.tablet}) {
    font-size: 0.8em;
  }
`;

export const ProductOptions = styled.div`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, 50%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease-in-out;
`;

export const ProductCardContainer = styled(motion.div)`
  position: relative;
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease-in-out;
  margin: 15px;
  width: 280px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  @media only screen and (max-width: ${breakpoints.tablet}) {
    width: 240px;
    min-height: 380px;
  }

  @media only screen and (max-width: ${breakpoints.mobile}) {
    width: 220px;
    min-height: 360px;
  }

  &:hover {
    ${ProductPrice} {
      transform: translateY(-5px);
    }
    ${ProductDescription} {
      transform: translateY(-10px);
    }
    ${ProductBrand} {
      transform: translateY(-15px);
    }
  }
  &:hover ${ProductOptions} {
    opacity: 1;
    visibility: visible;
  }
`;

export const AddToCartButton = styled.button`
  padding: 8px 15px;
  background-color: ${colors.secondary};
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  background-color: ${colors.primary};
  &:hover {
    background-color: ${colors.secondary};
    transform: translateY(-5px);
  }
`;
