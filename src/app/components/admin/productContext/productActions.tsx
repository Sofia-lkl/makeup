import { Product } from "./types";

// Tipos de acciones
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS';

interface AddProductAction {
  type: typeof ADD_PRODUCT;
  payload: Product;
}

interface EditProductAction {
  type: typeof EDIT_PRODUCT;
  payload: { id: number; updatedProduct: Product };
}

interface DeleteProductAction {
  type: typeof DELETE_PRODUCT;
  payload: number;
}

interface SetAllProductsAction {
  type: typeof SET_ALL_PRODUCTS;
  payload: Product[];
}

export type ProductActionTypes =
  | AddProductAction
  | EditProductAction
  | DeleteProductAction
  | SetAllProductsAction;

// Creadores de acciones
export const addProduct = (product: Product): AddProductAction => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const editProduct = (id: number, updatedProduct: Product): EditProductAction => ({
  type: EDIT_PRODUCT,
  payload: { id, updatedProduct },
});

export const deleteProduct = (id: number): DeleteProductAction => ({
  type: DELETE_PRODUCT,
  payload: id,
});

export const setAllProducts = (products: Product[]): SetAllProductsAction => ({
  type: SET_ALL_PRODUCTS,
  payload: products,
});

