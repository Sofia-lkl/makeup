import React from "react";
import { Provider } from "react-redux";
import { store } from "../src/app/redux/store/rootReducer";
import { AppProps } from "next/app";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../src/app/components/navbar/navbar/navbar";

import { GlobalRangeStyles } from "@/app/components/products/bar/sideBarStyles/sideBarStyle";

const theme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalRangeStyles />
        <ToastContainer />
        <div id="menu-portal"></div>
        <Navbar />  
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
