"use client";
import React from "react";
import StyledCard from "../courses/courses";
import styled from "styled-components";
import { motion } from "framer-motion";
const colors = {
  neutralLight: "#F5EAE0",
  darkerGray: "#5C5C5C",
  gradientPink: "linear-gradient(45deg, #FFB6C1, #FF69B4)",  
  gold: "#FFD700",
  backgroundColor: "#FFF0F5",
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

const CoursesSection: React.FC<CoursesSectionProps> = ({ style, children }) => {
  return <div style={{ ...containerStyles, ...style }}>{children}</div>;
};
const CoursesIntroContainer = styled.div`
  background-color: ${colors.backgroundColor};
  padding: 4rem 2rem;
  position: relative;
  z-index: 1;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1); 
`;

const AnimatedIntroTitle = styled(motion.h1)`
  font-size: 3em;
  background: ${colors.gradientPink};  
  color: white;  
  padding: 0.2em 0;  
  margin-bottom: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  text-align: center;
  -webkit-background-clip: text;  
  color: transparent;
`;

const AnimatedIntroDescription = styled(motion.p)`
  font-size: 1.4em;
  text-align: center;
  color: ${colors.darkerGray};
  max-width: 800px;
  margin: 0 auto 2rem;
`;


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
