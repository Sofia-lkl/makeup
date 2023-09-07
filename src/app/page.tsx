"use client";
import React from "react";
import Navbar from "./components/navbar/navbar";
import HeaderPresentation from "./components/header/header";
import AcercaDe from "./components/presentation/presentation";
import CoursesSection from "./components/courses/coursesSection";
import ServicesSection from "./components/servicesSection/servicesSection";
import ParentComponent from "./components/products/listProducts/listProducts";
import { ProductsFilterProvider } from "./components/products/context/ProductsFilterContext/ProductsFilterContext";
import { ModalProvider } from "./components/products/context/ModalContext/ModalContext";
import { ProductsProvider } from "./components/admin/productContext/ProductContext";
import { UnifiedProvider } from "./components/admin/context/contexto";
import { CartProvider } from "./components/products/products/cart/contextCart/contextCart";

export default function Home() {
  return (
    <UnifiedProvider>
      <CartProvider>
        <HeaderPresentation />
        <AcercaDe />
        <CoursesSection />
        <ServicesSection />
        <ProductsProvider>
          <ProductsFilterProvider>
            <ModalProvider>
              <Navbar />
              <ParentComponent />
            </ModalProvider>
          </ProductsFilterProvider>
        </ProductsProvider>
      </CartProvider>
    </UnifiedProvider>
  );
}
