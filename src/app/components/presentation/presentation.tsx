import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/app/globals.css";
import { Typography, Grid, Button } from "@mui/material";
import styled from "styled-components";

const colors = {
  neutralLight: "#FAF3E0",
  darkerGray: "#808080",
  pinkLight: "#FFD1DC",
  pinkDark: "#FF69B4",
  purpleLight: "#D8BFD8",
  gold: "#FFD700",
};

const StyledSection = styled.section`
  background-color: ${colors.neutralLight};
  padding: 6rem 0;
`;

const ContentBackground = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.05);
`;

const HighlightText = styled.span`
  color: ${colors.pinkDark};
  font-weight: bold;
`;

const CustomButton = styled(Button)`
  background-color: ${colors.pinkDark};
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 1rem;
  margin-top: 2rem;
  transition: all 0.3s;
  &:hover {
    background-color: ${colors.purpleLight};
    transform: translateY(-3px);
  }
  &:active {
    transform: translateY(1px);
  }
`;
const itemData = [
  { img: "/img/trabajosMaquillaje/1.jpg", title: "Título 1" },
  { img: "/img/trabajosMaquillaje/2.jpg", title: "Título 2" },
  { img: "/img/trabajosMaquillaje/3.jpg", title: "Título 3" },
  { img: "/img/trabajosMaquillaje/4.jpg", title: "Título 4" },
  { img: "/img/trabajosMaquillaje/5.jpg", title: "Título 5" },
  { img: "/img/trabajosMaquillaje/2.jpg", title: "Título 6" },
];
const StyledImage = styled.img`
  max-width: 100%;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  padding: 0 8px; // Agrega un padding horizontal

  &:hover {
    transform: scale(1.05);
  }
`;

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const AcercaDe: React.FC = () => {
  return (
    <StyledSection>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <ContentBackground>
            <Typography variant="h2" color="textPrimary" gutterBottom>
              Acerca de <HighlightText>Makeup Magic</HighlightText>
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Transformando la belleza, un rostro a la vez.
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              paragraph
              style={{ lineHeight: "1.7" }}
            >
              Makeup Magic ha sido líder en la industria del maquillaje desde
              2020. Nuestro equipo de artistas talentosos trabaja
              incansablemente para proporcionar a nuestros clientes los
              servicios y productos de la más alta calidad.
            </Typography>
            <CustomButton variant="contained">Más sobre nosotros</CustomButton>
          </ContentBackground>
        </Grid>
        <Grid item xs={12} md={6}>
          <Slider {...sliderSettings}>
            {itemData.map((item) => (
              <div key={item.img}>
                <StyledImage
                  src={`${item.img}?w=161&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </div>
            ))}
          </Slider>
        </Grid>
      </Grid>
    </StyledSection>
  );
};

export default AcercaDe;
