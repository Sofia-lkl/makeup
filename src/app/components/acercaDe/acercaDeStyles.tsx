import { makeStyles } from "@mui/styles";

const COLORS = {
  NEUTRAL_LIGHT: "#FAF3E0",
  DARKER_GRAY: "#808080",
  PINK_LIGHT: "#FFD1DC",
  PINK_DARK: "#FF69B4",
  PURPLE_LIGHT: "#D8BFD8",
  GOLD: "#FFD700",
};

export const useAcercaDeStyles = makeStyles(() => ({
  root: {
    padding: "5rem 0",
    textAlign: "center",
    minHeight: '50vh',
    minWidth: '100vw',
    backgroundColor: COLORS.NEUTRAL_LIGHT,
  },
  title: {
    marginBottom: "1rem",
    fontWeight: 600,
  },
  subtitle: {
    marginBottom: "3rem",
    color: COLORS.DARKER_GRAY,
  },
  gridContainer: {
    marginBottom: "3rem",
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  icon: {
    fontSize: "3rem",
    color: COLORS.PINK_DARK,
  },
  gridTitle: {
    marginBottom: "1rem",
    fontWeight: 600,
  },
  gridText: {
    color: COLORS.DARKER_GRAY,
  },
  learnMoreButton: {
    backgroundColor: COLORS.PINK_DARK,
    color: "#fff",
    padding: "10px 20px",
    "&:hover": {
      backgroundColor: COLORS.PURPLE_LIGHT,
    },
  },
}));
