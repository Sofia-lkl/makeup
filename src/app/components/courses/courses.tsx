import React, { useRef, useEffect } from "react";
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
    const currentCardRef = cardRef.current;

    if (!currentCardRef) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = currentCardRef.getBoundingClientRect();
      const centerX = (rect.left + rect.right) / 2;
      const centerY = window.scrollY + (rect.top + rect.bottom) / 2;
      const offsetX = (event.pageX - centerX) / (rect.width / 2);
      const offsetY = (event.pageY - centerY) / (rect.height * 1);
      const rotateX = -angle * offsetY;
      const rotateY = angle * offsetX;

      currentCardRef.style.setProperty("--rotateX", `${rotateX}deg`);
      currentCardRef.style.setProperty("--rotateY", `${rotateY}deg`);
    };

    const handleMouseOut = () => {
      currentCardRef.style.setProperty("--rotateX", "0deg");
      currentCardRef.style.setProperty("--rotateY", "0deg");
    };

    currentCardRef.addEventListener("mousemove", handleMouseMove);
    currentCardRef.addEventListener("mouseout", handleMouseOut);

    return () => {
      currentCardRef.removeEventListener("mousemove", handleMouseMove);
      currentCardRef.removeEventListener("mouseout", handleMouseOut);
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
