"use client";
import React from "react";
import Navbar from "./components/navbar/navbar";
import HeaderPresentation from "./components/header/header";
import AcercaDe from "./components/presentation/presentation";
import CoursesSection from "./components/courses/coursesSection";
import ServicesSection from "./components/servicesSection/servicesSection";
import ParentComponent from "./components/products/listProducts/listProducts";
import { Provider } from "react-redux";
import { store } from "./components/products/products/cart/contextCart/store/rootReducer"; 

export default function Home() {
  return (
    <Provider store={store}>
      <HeaderPresentation />
      <AcercaDe />
      <CoursesSection />
      <ServicesSection />
      <Navbar />
      <ParentComponent />
    </Provider>
  );
}
