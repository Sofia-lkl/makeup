"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useModal } from "../context/ModalContext/ModalContext";
import { useFilter } from "../context/ProductsFilterContext/ProductsFilterContext";
import ProductPreview from "../previewProducts/previewProductos";
import ListProductModal from "./listProductsModal";

const ParentComponent: React.FC = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    searchTerm,
    setSearchTerm,
    priceRange,
    setPriceRange,
    activeFilter,
    filterProducts,
  } = useFilter();

  const [productList, setProductList] = useState([]); // Estado para almacenar todos los productos del backend
  const [highlightedProductList, setHighlightedProductList] = useState([]); // Estado para almacenar productos destacados

  useEffect(() => {
    // Llamada al backend para obtener productos
    axios
      .get("http://localhost:3002/api/products")
      .then((response) => {
        setProductList(response.data);
        setHighlightedProductList(response.data.slice(0, 3)); // Guarda los primeros 3 productos como destacados
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []); // Dependencias vacías para que solo se ejecute una vez

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProductList = filterProducts(productList);

  return (
    <>
      <ProductPreview
        onProductClick={openModal}
        productList={filteredProductList} 
        isModalOpen={isModalOpen}
      />

      <ListProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        productList={filteredProductList} 
        highlightedList={highlightedProductList} 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
      />
    </>
  );
};

export default ParentComponent;
