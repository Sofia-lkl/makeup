import React, { useState } from "react";

const colors = {
  neutralLight: "#FAF3E0",
  darkerGray: "#808080",
  pinkLight: "#FFD1DC",
  pinkDark: "#FF69B4",
  purpleLight: "#D8BFD8",
  gold: "#FFD700",
};

interface Style {
  header: React.CSSProperties;
  title: React.CSSProperties;
  subtitle: React.CSSProperties;
  ctaButton: React.CSSProperties;
}

const styles: Style = {
  header: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: 'url("/img/1.webp")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: colors.neutralLight,
    textAlign: "center",
    boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.6)",
  },
  title: {
    fontSize: "4rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    opacity: 0,
    transform: "translateY(-30px)",
    animation: "fadeInUp 2s forwards",
  },
  subtitle: {
    fontSize: "1.8rem",
    marginBottom: "2rem",
    opacity: 0,
    transform: "translateY(-30px)",
    animation: "fadeInUp 2.5s forwards",
  },
  ctaButton: {
    padding: "0.8rem 2rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: colors.neutralLight,
    backgroundColor: colors.pinkDark,
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s",
    opacity: 0,
    transform: "translateY(-30px)",
    animation: "fadeInUp 3s forwards",
  },
};

const HeaderPresentation: React.FC = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <header style={styles.header}>
      <div style={styles.title}>Bienvenidos a Makeup Magic</div>
      <div style={styles.subtitle}>
        Descubre la magia del maquillaje con nosotros.
      </div>
      <button
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        style={{
          ...styles.ctaButton,
          transform: isButtonHovered ? "scale(1.05)" : "scale(1)",
        }}
      >
        Explora nuestros productos
      </button>
    </header>
  );
};

export default HeaderPresentation;
