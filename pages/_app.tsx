import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/app/components/products/products/cart/contextCart/store/rootReducer';
import { AppProps } from 'next/app';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
