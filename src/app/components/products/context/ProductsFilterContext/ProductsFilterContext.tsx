"use client";
import React, { createContext, useContext, useState } from "react";

export interface ProductType {
  id: number;
  imagen_url: string;
  nombre: string;
  precio: number;
  color: string;
  marca: string;
  stock: number;  
}

type FilterContextType = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  selectedColor: string | null;
  setSelectedColor: React.Dispatch<React.SetStateAction<string | null>>;
  selectedMarca: string | null; 
  setSelectedMarca: React.Dispatch<React.SetStateAction<string | null>>; 
  activeFilter: string | undefined;
  setActiveFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
  filterProducts: (productList: ProductType[]) => ProductType[];
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};

export const ProductsFilterProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedMarca, setSelectedMarca] = useState<string | null>(null); 
  const [activeFilter, setActiveFilter] = useState<string | undefined>(
    undefined
  );

  const filterProducts = (products: ProductType[]): ProductType[] => {
    return products
      .filter(
        (product) =>
          product.precio >= priceRange[0] && product.precio <= priceRange[1]
      )
      .filter((product) =>
        selectedColor ? product.color === selectedColor : true
      )
      .filter(
        (product) => (selectedMarca ? product.marca === selectedMarca : true) 
      )
      .filter((product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  return (
    <FilterContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        priceRange,
        setPriceRange,
        selectedColor,
        setSelectedColor,
        selectedMarca, 
        setSelectedMarca, 
        activeFilter,
        setActiveFilter,
        filterProducts,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
