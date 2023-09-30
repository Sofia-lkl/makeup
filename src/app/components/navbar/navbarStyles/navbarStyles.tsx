export const colors = {
  neutralLight: "#FAF3E0",
  darkerGray: "#808080",
  pinkLight: "#FFD1DC",
  pinkDark: "#FF69B4",
  purpleLight: "black",
  gold: "#D8BFD8",
};

export const styles = {
  navbar: {
    position: "fixed" as const,
    width: "100%",
    top: 0,
    zIndex: 1000,
    backgroundColor: colors.neutralLight,
    color: colors.darkerGray,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  loginButton: {
    marginLeft: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem",
    fontSize: "1rem",
    fontWeight: "medium",
    color: colors.neutralLight,
    backgroundColor: colors.pinkDark,
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {},
  logo: {
    display: "flex",
    alignItems: "center",
    width: "90px",
    height: "100px",
    marginRight: "100px",
  },
  logoText: {
    marginLeft: "1rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: colors.pinkDark,
    whiteSpace: "nowrap" as const,
  },

  navLink: (isHovered: boolean) => ({
    marginLeft: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem",
    fontSize: "1rem",
    fontWeight: "medium",
    color: isHovered ? colors.gold : colors.darkerGray,
    textDecoration: "none",
    backgroundColor: isHovered ? colors.purpleLight : "transparent",
    transition: "background-color 0.3s, color 0.3s",
  }),
};
export const basicStyles = {
  navbar: {
    position: "fixed" as const,

    width: "100%",
    top: 0,
    zIndex: 1000,
    backgroundColor: colors.neutralLight,
    color: colors.darkerGray,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  navLinksContainer: {
    display: "flex",
    alignItems: "center",
  },
  loginButton: {
    marginLeft: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem",
    fontSize: "1rem",
    fontWeight: "medium",
    color: colors.neutralLight,
    backgroundColor: colors.pinkDark,
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
export const styless = {
  dropdownMenu: {
    position: "absolute" as const,
    top: "100%",
    right: 0,
    backgroundColor: colors.neutralLight,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "4px",
    padding: "0.5rem 0",
    zIndex: 1001,
  },

  dropdownMenuItem: {
    display: "block",
    padding: "0.5rem 1rem",
    color: colors.darkerGray,
    backgroundColor: "transparent",
    border: "none",
    width: "100%",
    textAlign: "left" as const,
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",

    "&:hover": {
      backgroundColor: colors.pinkLight,
      color: colors.purpleLight,
    },
  },
};
