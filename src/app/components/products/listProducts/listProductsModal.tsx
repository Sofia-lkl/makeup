"use client";
import React from "react";
import Products from "../products/products";
import { SidebarStyled } from "../bar/sideBarStyle";
import {
  StyledModal,
  ViewAllButton,
  ModalContent,
  CloseButton,
  ModalBody,
  ProductListStyled,
} from "./listProductStyle";
import CombinedFilterComponent from "../bar/combinedFilterComponent";
import { useFilter, ProductType } from "../context/ProductsFilterContext/ProductsFilterContext";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productList: ProductType[];
  highlightedList: ProductType[];
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  priceRange: [number, number];
  onPriceRangeChange: React.Dispatch<React.SetStateAction<[number, number]>>;
  
};

const ListProductModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  productList,
  highlightedList,
  searchTerm,
  onSearchChange,
  priceRange,
  onPriceRangeChange,
}) => {
  const { filterProducts, activeFilter } = useFilter();
  const filteredProducts = filterProducts(productList);

  return (
    <StyledModal open={isOpen}>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <ViewAllButton variant="contained" size="large" onClick={onClose}>
          No ver más productos
        </ViewAllButton>
        <ModalBody>
          <SidebarStyled>
            <CombinedFilterComponent />
          </SidebarStyled>
          <ProductListStyled>
            <Products type="highlighted" productList={highlightedList} />
            <Products
              type="fullList"
              productList={filteredProducts}
              activeFilter={activeFilter}
            />
          </ProductListStyled>
        </ModalBody>
      </ModalContent>
    </StyledModal>
  );
};

export default ListProductModal;
