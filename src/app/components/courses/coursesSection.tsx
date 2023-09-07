"use client";
import React from "react";
import StyledCard from "../courses/courses";
import styled from "styled-components";
import { motion } from "framer-motion";
const colors = {
  neutralLight: "#FAF3E0",
  darkerGray: "#808080",
  pinkLight: "#FFD1DC",
  pinkDark: "#B03468",  
  gold: "#D4AF37",  
  goldd: "black",
  backgroundColor: "#FDF2F5",  
};
const containerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "2rem",  
  justifyContent: "center",
  backgroundColor: colors.backgroundColor,  
};
interface CoursesSectionProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// 2. Modificar la definición del componente
const CoursesSection: React.FC<CoursesSectionProps> = ({ style, children }) => {
  return <div style={{ ...containerStyles, ...style }}>{children}</div>;
};
const CoursesIntroContainer = styled.div`
  background-color: ${colors.backgroundColor};  // Changed to light background color
  padding: 4rem 0;
  border-radius: 15px;
  position: relative;
  z-index: 1;
`;


const AnimatedIntroTitle = styled(motion.h1)`
  font-size: 2.8em;
  color: ${colors.pinkDark};
  margin-bottom: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  text-shadow: none;  // Removed text-shadow for a cleaner look
`;

const AnimatedIntroDescription = styled(motion.p)`
  font-size: 1.4em;
  text-align: center;
  color: ${colors.darkerGray};
  max-width: 800px;
  margin: 0 auto 2rem;
  background-color: transparent;
  text-shadow: none;  // Removed text-shadow for a cleaner look
`;

/* const StyledCard = styled.div`
  background: linear-gradient(to bottom, transparent 60%, ${colors.pinkLight});
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1); // Añade una sombra sutil
`; */
const CoursesContainer: React.FC = () => {
  return (
    <>
      <CoursesIntroContainer>
        <AnimatedIntroTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Cursos de Maquillaje Profesional
        </AnimatedIntroTitle>

        <AnimatedIntroDescription
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Sumérgete en el mundo del maquillaje con nuestros cursos
          especializados. Aprende técnicas avanzadas y conviértete en un
          experto.
        </AnimatedIntroDescription>

        

        <CoursesSection style={containerStyles}>
          <StyledCard
            $imageUrl="https://i.ibb.co/C7kg327/cursos-de-maquillaje-aprende-2.jpg"
            bgUrl="https://i.ibb.co/SRXK0Q3/abstract-pink-background-pink-modern-shapes-background-vector.jpg"
            cutUrl="https://i.ibb.co/N9szNs3/cursos-de-maquillaje-aprende-2-removebg.png"
            title="Hover me!"
            description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
            price="15000"
            borderStyle="lb"
          />
          <StyledCard
            $imageUrl="https://i.ibb.co/C7kg327/cursos-de-maquillaje-aprende-2.jpg"
            bgUrl="https://i.ibb.co/SRXK0Q3/abstract-pink-background-pink-modern-shapes-background-vector.jpg"
            cutUrl="https://i.ibb.co/N9szNs3/cursos-de-maquillaje-aprende-2-removebg.png"
            title="Hover me!"
            description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
            price="15000"
            borderStyle="lb"
          />
          <StyledCard
            $imageUrl="https://i.ibb.co/C7kg327/cursos-de-maquillaje-aprende-2.jpg"
            bgUrl="https://i.ibb.co/SRXK0Q3/abstract-pink-background-pink-modern-shapes-background-vector.jpg"
            cutUrl="https://i.ibb.co/N9szNs3/cursos-de-maquillaje-aprende-2-removebg.png"
            title="Hover me!"
            description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
            price="15000"
            borderStyle="lb"
          />
        </CoursesSection>
      </CoursesIntroContainer>
    </>
  );
};

export default CoursesContainer;
