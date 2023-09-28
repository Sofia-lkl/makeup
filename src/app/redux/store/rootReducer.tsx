import {
  configureStore,
  AnyAction,
} from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ThunkDispatch } from "redux-thunk";

// Importando reducers y middlewares
import productUpdateReducer from "../productSlice/productUpdateSlice/productUpdateSlice";
import cartReducer from "../cartSlice/cartSlice";
import websocketMiddleware from "../productSlice/features/webSocketMiddleware";
import productManagementReducer from "../productManagementSlice/productManagementSlice";
import authReducer from "../authSlice/authSlice";
import loginModalReducer from "../loginModalSlice/loginModalSlice";
import messagesReducer from "../messagesSlice/messagesSlice";
import userDetailsReducer from "../userDetailSlice/userDetailsSlice";
import modalReducer from "../sliceModal/modalSlice";
import filterReducer from "../ProductsFilterSlice/filterSlice";
import orderReducer from "../orderSlice/orderSlice";

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
