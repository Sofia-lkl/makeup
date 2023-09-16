import {
  configureStore,
  AnyAction,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ThunkDispatch } from "redux-thunk";

// Importando reducers y middlewares
import productUpdateReducer from "../features/productSlice/productUpdateSlice";
import cartReducer from "../cart/cartSlice";
import websocketMiddleware from "../features/productSlice/webSocketMiddleware";
import productManagementReducer from "../productManagement/productManagementSlice";
import authReducer from "../../../../../admin/context/authSlice/authSlice";
import loginModalReducer from "../../../../../admin/context/loginModalSlice/loginModalSlice";
import messagesReducer from "../../../../../admin/context/messagesSlice/messagesSlice";
import userDetailsReducer from "../../../../../admin/context/userDetailSlice/userDetailsSlice";
import modalReducer from "../../../../context/ModalContext/modalSlice";
import filterReducer from "../../../../context/ProductsFilterContext/filterSlice";
import orderReducer from "../../ModalConfirmacionCompra/orderSlice";

// Combinando todos los reducers
const rootReducer = combineReducers({
  order: orderReducer,
  userDetails: userDetailsReducer,
  messages: messagesReducer,
  loginModal: loginModalReducer,
  auth: authReducer,
  productManagement: productManagementReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  modal: modalReducer,
  filter: filterReducer,
});

// Configuración para la persistencia
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configurando y creando la tienda
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(websocketMiddleware),
});

// Configurando el persistor
export const persistor = persistStore(store);

// Definiendo los tipos para RootState y AppDispatch
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
