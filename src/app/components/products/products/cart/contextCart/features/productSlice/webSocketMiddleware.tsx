import io from "socket.io-client";
import { fetchUpdatedProducts } from "./productUpdateSlice";
import { syncCartWithUpdatedStock } from "../../cart/cartSlice";
import jwt_decode from "jwt-decode";
import { loginSuccess } from "../../../../../../admin/context/authSlice/authSlice";
import axios from "axios";
import { DecodedToken } from "../../../../../../admin/productContext/types";

const websocketMiddleware = (storeAPI: any) => {
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

  socket.on("stock-updated", async () => {
    try {
      const updatedProducts = await storeAPI
        .dispatch(fetchUpdatedProducts())
        .unwrap();
      storeAPI.dispatch(syncCartWithUpdatedStock(updatedProducts));
    } catch (error) {
      console.error("Error fetching updated products:", error);
    }
  });

  return (next: any) => (action: any) => {
    return next(action);
  };
};

export default websocketMiddleware;
