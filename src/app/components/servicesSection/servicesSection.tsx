"use client"


import React from 'react';
import styled from 'styled-components';
import { FaPaintBrush, FaBirthdayCake, FaHandSparkles, FaCut, FaUserAlt } from 'react-icons/fa';
import { FaUserMd as DermatologyIcon } from 'react-icons/fa';

import { motion } from 'framer-motion';
const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } },
};

const colors = {
    neutralLight: "#FAF3E0",
    darkerGray: "#808080",
    pinkLight: "#FFD1DC",
    pinkDark: "#FF69B4",
    purpleLight: "white",
    gold: "#808080",
  };
const CategoryContainer = styled(motion.div).attrs(() => ({
    initial: 'hidden',
    animate: 'visible',
    variants: fadeIn,
}))`
background: ${colors.neutralLight};
padding: 50px 0;
display: flex;
flex-direction: column;
align-items: center;
`;

const CategoryTitle = styled.h2`
font-family: 'Roboto', sans-serif;
font-size: 42px; // Aumentamos el tamaño
color: ${colors.darkerGray};
margin-bottom: 25px; // Aumentamos el espaciado
`;
  
  const CategoryDescription = styled.p`
  font-family: 'Roboto', sans-serif;
  text-align: center;
  color: ${colors.pinkDark};
  margin-bottom: 50px; // Aumentamos el espaciado
  max-width: 800px;
  font-size: 22px; // Aumentamos el tamaño
`;
  const ServicesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  width: 100%;
  max-width: 1200px;
`;
const ServiceCard = styled.div`
  background: ${colors.purpleLight};
  padding: 35px; // Aumentamos el padding
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); // Sombra más suave
  margin: 15px; // Aumentamos el margen
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 250px;
  flex: 1;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12); // Sombra más suave al hacer hover
  }
`;
  
  const ServiceIcon = styled.div`
    font-size: 50px;
    margin-bottom: 20px;
    color: ${colors.gold};
  `;
  
  const ServiceTitle = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-size: 26px; // Aumentamos el tamaño
  margin-bottom: 18px; // Ajustamos el espaciado
  color: ${colors.darkerGray};
`;

const ServiceDescription = styled.p`
  font-family: 'Roboto', sans-serif;
  text-align: center;
  color: ${colors.pinkLight};
  margin-bottom: 25px; // Ajustamos el espaciado
  font-size: 18px; // Aumentamos el tamaño
`;

const SeeMoreButton = styled.button`
  background: ${colors.pinkDark};
  color: white;
  padding: 12px 24px; // Ajustamos el padding
  border: none;
  border-radius: 30px; // Ajustamos el borde
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
  font-size: 16px; // Aumentamos el tamaño de letra

  &:hover {
    background: ${colors.gold}; // Cambiamos el color al hacer hover
    transform: translateY(-3px); // Ajustamos el movimiento al hacer hover
  }
`;

const ServicesSection: React.FC = () => {
  const makeupServices = [
    { icon: <FaPaintBrush />, title: 'Maquillaje Artístico', description: 'Estilos únicos para cada ocasión.' },
    { icon: <FaBirthdayCake />, title: 'Quinceañeras', description: 'Luce radiante en tu día especial.' },
    { icon: <FaUserAlt />, title: 'Automaquillaje', description: 'Aprende a resaltar tu belleza natural.' }
  ];

  const beautyServices = [
    { icon: <FaHandSparkles />, title: 'Uñas', description: 'Diseños y cuidado para tus manos.' },
    { icon: <FaCut />, title: 'Depilación', description: 'Técnicas avanzadas para suavidad duradera.' },
    { icon: <DermatologyIcon />, title: 'Dermatología', description: 'Salud y cuidado profesional para tu piel.' }
  ];

  return (
    <div>
      <CategoryContainer>
        <CategoryTitle>Servicios de Maquillaje</CategoryTitle>
        <CategoryDescription>Descubre una amplia gama de servicios de maquillaje para todas tus necesidades.</CategoryDescription>
        
        <ServicesGrid>
          {makeupServices.map((service, index) => (
            <ServiceCard key={index}>
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <SeeMoreButton>Ver más</SeeMoreButton>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </CategoryContainer>

      <CategoryContainer>
        <CategoryTitle>Cuidado y Belleza</CategoryTitle>
        <CategoryDescription>Desde el cuidado de tus uñas hasta tratamientos dermatológicos avanzados.</CategoryDescription>

        <ServicesGrid>
          {beautyServices.map((service, index) => (
            <ServiceCard key={index}>
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <SeeMoreButton>Ver más</SeeMoreButton>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </CategoryContainer>
    </div>
  );
}

export default ServicesSection;




