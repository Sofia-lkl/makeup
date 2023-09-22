"use client";
import React from "react";
import Navbar from "../src/app/components/navbar/navbar";
import HeaderPresentation from "../src/app/components/header/header";
import AcercaDe from "../src/app/components/presentation/presentation";
import CoursesSection from "../src/app/components/courses/coursesSection";
import ServicesSection from "../src/app/components/servicesSection/servicesSection";
import ParentComponent from "../src/app/components/products/listProducts/listProducts";


export default function Home() {
  return (
    <div>
      <Navbar />
      <HeaderPresentation />
      <AcercaDe />
      <CoursesSection />
      <ServicesSection />
      <ParentComponent />
    </div>
  );
}
