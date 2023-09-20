import io from "socket.io-client";
import { fetchUpdatedProducts } from "./productUpdateSlice";
import { syncCartWithUpdatedStock } from "../../cart/cartSlice";
import jwt_decode from "jwt-decode";
import { loginSuccess } from "../../../../../../admin/context/authSlice/authSlice";
import axios from "axios";
import { DecodedToken } from "../../../../../../admin/productContext/types";
import { Product } from "../../productManagement/productManagementSlice";

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
      console.log("Evento stock-updated recibido.");
  
      const updatedProducts = await storeAPI
        .dispatch(fetchUpdatedProducts())
        .unwrap();
  
      console.log('Productos actualizados después de fetchUpdatedProducts:', updatedProducts);
  
      // Itera sobre la lista de productos actualizados y sincroniza cada uno con el carrito.
      updatedProducts.forEach((product: Product) => {
        storeAPI.dispatch(syncCartWithUpdatedStock(product));
      });
      
  
    } catch (error) {
      console.error("Error obteniendo productos actualizados:", error);
    }
  });

  return (next: any) => (action: any) => {
    return next(action);
  };
};

export default websocketMiddleware;
