"use client";
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import "./style.css";
interface StyledCardProps {
  $imageUrl: string;
  bgUrl: string;
  cutUrl: string;
  title: string;
  description: string;
  price: string; 
  borderStyle?: "lb" | "rb" | "bb";
}
const colors = {
  neutralLight: "#FAF3E0",
  darkerGray: "#808080",
  pinkLight: "#FFD1DC",
  pinkDark: "#FF69B4",
  purpleLight: "#D8BFD8",
  gold: "#FFD700",
  cardShadow: "rgba(0, 0, 0, 0.1)",
};

const StyledCard: React.FC<StyledCardProps> = ({
  price,
  $imageUrl,
  bgUrl,
  cutUrl,
  title,
  description,
  borderStyle,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const angle = 15;

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = (rect.left + rect.right) / 2;
        const centerY = window.scrollY + (rect.top + rect.bottom) / 2;

        // Calculate the relative position of the cursor within the card
        const offsetX = (event.pageX - centerX) / (rect.width / 2);
        const offsetY = (event.pageY - centerY) / (rect.height / 2);

        // Convert the offset values to rotation values
        const rotateX = -angle * offsetY ; // Multiplicado por 0.5 para reducir su impacto
        const rotateY = angle * offsetX;

        cardRef.current.style.setProperty("--rotateX", `${rotateX}deg`);
        cardRef.current.style.setProperty("--rotateY", `${rotateY}deg`);
        
        /* console.log("event.pageY:", event.pageY);
        console.log("centerY:", centerY);
        console.log("offsetY:", offsetY); */
      }
    };

    const handleMouseOut = () => {
      if (cardRef.current) {
        cardRef.current.style.setProperty("--rotateX", "0deg");
        cardRef.current.style.setProperty("--rotateY", "0deg");
      }
    };

    if (cardRef.current) {
      cardRef.current.addEventListener("mousemove", handleMouseMove);
      cardRef.current.addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener("mousemove", handleMouseMove);
        cardRef.current.removeEventListener("mouseout", handleMouseOut);
      }
    };
  }, []);

  return (
    <div className={`block ${borderStyle}`} ref={cardRef}>
      <div
        className="shadowed"
        style={{ backgroundImage: `url(${$imageUrl})` }}
      ></div>
      <div
        className="img bg"
        style={{ backgroundImage: `url(${bgUrl})` }}
      ></div>
      <div
        className="img cut"
        style={{ backgroundImage: `url(${cutUrl})` }}
      ></div>
      <div className="info">
        <h2 className="title">{title}</h2>
        <p className="description">{description}</p>
        <strong className="price">${price}</strong>
        <button className="enroll-button">Inscribirse ahora</button>
      </div>
    </div>
  );
};

export default StyledCard;
