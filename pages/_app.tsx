import React from "react";
import { Provider } from "react-redux";
import { store } from "../src/app/redux/store/rootReducer";
import { AppProps } from "next/app";
import "react-input-range/lib/css/index.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GlobalRangeStyles } from "@/app/components/products/bar/sideBarStyles/sideBarStyle";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GlobalRangeStyles />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
