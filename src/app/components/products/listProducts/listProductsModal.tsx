import React from "react";
import Products from "../products/products";
import {
  StyledModal,
  ViewAllButton,
  ModalContent,
  CloseButton,
  ModalBody,
  ProductListStyled,
} from "./listProductStyle";
import CombinedFilterComponent from "../bar/combinedFilterComponent";
import { ProductType } from "../context/ProductsFilterContext/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../context/ModalContext/modalSlice";
import { RootState } from "../products/cart/contextCart/store/rootReducer";

type ModalProps = {
  productList: ProductType[];
  highlightedList: ProductType[];
};

const ListProductModal: React.FC<ModalProps> = ({
  productList,
  highlightedList,
}) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const activeFilter = useSelector(
    (state: RootState) => state.filter.activeFilter
  );

  return (
    <StyledModal
      open={isOpen}
      onClose={(event, reason) => {
        if (reason === "backdropClick") {
          dispatch(closeModal());
        }
      }}
    >
      <ModalContent>
        <CloseButton onClick={() => dispatch(closeModal())}>X</CloseButton>
        <CombinedFilterComponent />
        <ViewAllButton
          variant="contained"
          size="large"
          onClick={() => dispatch(closeModal())}
        >
          No ver más productos
        </ViewAllButton>
        <ModalBody>
          <ProductListStyled>
            <Products type="highlighted" productList={highlightedList} />
            <Products
              type="fullList"
              productList={productList}
              activeFilter={activeFilter}
            />
          </ProductListStyled>
        </ModalBody>
      </ModalContent>
    </StyledModal>
  );
};

export default ListProductModal;
