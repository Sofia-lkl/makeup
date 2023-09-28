import {
  MiddlewareAPI,
  Dispatch,
  AnyAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import io from "socket.io-client";
import { fetchUpdatedProducts } from "../productUpdateSlice/productUpdateSlice";
import { syncCartWithUpdatedStock } from "../../cartSlice/cartSlice";
import jwt_decode from "jwt-decode";
import { loginSuccess } from "../../authSlice/authSlice";
import axios from "axios";
import { DecodedToken } from "../../../components/admin/productAction-reducer-types/types/types";
import { Product } from "../../productManagementSlice/productManagementSlice";
import { updateOrderState } from "../../orderSlice/orderSlice";
type ErrorType = { message?: string };

const websocketMiddleware = (storeAPI: MiddlewareAPI) => {
  // Verificamos si estamos en el entorno del cliente
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("jwt");

    if (token) {
      const decodedToken = jwt_decode(token) as DecodedToken;

      axios
        .post("http://localhost:3002/api/validateToken", { token })
        .then((response) => {
          if (response.data.isValid) {
            storeAPI.dispatch(
              loginSuccess({
                userRole: decodedToken.role,
                userId: decodedToken.id,
              })
            );
          } else {
            localStorage.removeItem("jwt");
          }
        })
        .catch((error) => {
          console.error("Error during token validation:", error);
          localStorage.removeItem("jwt");
        });
    }
  }

  const socket = io("http://localhost:3002");
  socket.on("order-status-updated", (data) => {
    console.log("Received order-status-updated event with data:", data);

    if (data.orderId && data.estado) {
      const { orderId, estado } = data;
      storeAPI.dispatch(updateOrderState({ orderId, newState: estado }));
    }
  });

  socket.on("stock-updated", () => {
    console.log("Evento stock-updated recibido.");

    (storeAPI.dispatch as ThunkDispatch<ReturnType<typeof fetchUpdatedProducts>, undefined, AnyAction>)(
      fetchUpdatedProducts()
    )
      .then((action: AnyAction) => {
        if (fetchUpdatedProducts.fulfilled.match(action)) {
          const updatedProducts = action.payload;

          console.log(
            "Productos actualizados después de fetchUpdatedProducts:",
            updatedProducts
          );

          // Itera sobre la lista de productos actualizados y sincroniza cada uno con el carrito.
          updatedProducts.forEach((product: Product) => {
            storeAPI.dispatch(syncCartWithUpdatedStock(product));
          });
        }
      })
      .catch((error: ErrorType) => {
        console.error("Error obteniendo productos actualizados:", error);
      });
  });

  return (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    return next(action);
  };
};

export default websocketMiddleware;