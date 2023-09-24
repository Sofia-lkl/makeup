import {
    ADD_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT,
    SET_ALL_PRODUCTS,
    ProductActionTypes,
  } from '../productActions/productActions';
import { Product } from '../types/types';
  
  const initialState: Product[] = [];
  
  const productReducer = (state = initialState, action: ProductActionTypes): Product[] => {
    switch (action.type) {
      case ADD_PRODUCT:
        return [...state, action.payload];
      case EDIT_PRODUCT:
        return state.map(product =>
          product.id === action.payload.id ? action.payload.updatedProduct : product
        );
      case DELETE_PRODUCT:
        return state.filter(product => product.id !== action.payload);
      case SET_ALL_PRODUCTS:
        return action.payload;
      default:
        return state;
    }
  };
  
  export default productReducer;
  