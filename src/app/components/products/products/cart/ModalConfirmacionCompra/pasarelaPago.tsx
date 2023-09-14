import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { StyledPasarelaPago } from "./styledPasarelaPago";
import { CartState } from "../contextCart/contextCart";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import CargarComprobante from "./uploadComprobant";

interface PasarelaPagoProps {
  onPaymentSuccess: () => void;
  onPaymentFailure: () => void;
  total: number;
  datosUsuario: {
    nombre: string;
    email: string;
    telefono: string;
  };
  productos: CartState;
  datosEnvio: {
    metodo_envio: string;
    direccion: string;
    ciudad: string;
    estado: string;
    codigo_postal: string;
    pais: string;
  };
  ordenId: string | null;
}

const PasarelaPago: React.FC<PasarelaPagoProps> = ({
  onPaymentSuccess,
  onPaymentFailure,
  total,
  datosUsuario,
  datosEnvio,
  productos,
  ordenId,
}) => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showUploadOption, setShowUploadOption] = useState(false);
  const [replaceComprobante, setReplaceComprobante] = useState(false);

  initMercadoPago("TEST-75e8ff76-27ca-4d24-8d0e-9ea271a2ef88");

  const handleUploadSuccess = (data: any) => {
    console.log("Comprobante cargado con éxito:", data);
  };

  const handleUploadError = (error: any) => {
    console.error("Error al cargar el comprobante:", error);
  };

  const handlePayment = async () => {
    try {
      const paymentData = {
        total,
        datosUsuario,
        datosEnvio,
        productos,
      };

      const userToken = localStorage.getItem("jwt");
      console.log("Datos enviados al backend:", paymentData);

      const response = await axios.post(
        "http://localhost:3002/api/mercadopago/create_preference",
        paymentData,
        {
          headers: {
            "x-auth-token": userToken,
          },
        }
      );

      if (response.data && response.data.id) {
        setPreferenceId(response.data.id);
      } else {
        console.error("No se recibió el id de preferencia de MercadoPago.");
        onPaymentFailure();
      }
    } catch (error: any) {
      console.error("Error procesando el pago:", error);
      if (error.response && error.response.status === 400) {
        alert(error.response.data.error);
      } else {
        onPaymentFailure();
      }
    }
  };

  return (
    <StyledPasarelaPago>
      <h6>Procesar pago con MercadoPago</h6>
      <p>
        <strong>Nombre:</strong> {datosUsuario.nombre}
      </p>
      <p>
        <strong>Email:</strong> {datosUsuario.email}
      </p>
      <p>
        <strong>Teléfono:</strong> {datosUsuario.telefono}
      </p>
      <h6>Productos a comprar:</h6>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <img
              src={producto.imagen_url}
              alt={producto.nombre}
              style={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
            <strong>{producto.nombre}</strong> - ${producto.precio.toFixed(2)} x{" "}
            {producto.cantidad}
          </li>
        ))}
      </ul>
      <h6>Datos de envío:</h6>
      <p>
        <strong>Método de Envío:</strong> {datosEnvio.metodo_envio}
      </p>
      <p>
        <strong>Dirección:</strong> {datosEnvio.direccion}
      </p>
      <p>
        <strong>Ciudad:</strong> {datosEnvio.ciudad}
      </p>
      <p>
        <strong>Estado:</strong> {datosEnvio.estado}
      </p>
      <p>
        <strong>Código Postal:</strong> {datosEnvio.codigo_postal}
      </p>
      <p>
        <strong>País:</strong> {datosEnvio.pais}
      </p>
      <p>Total a pagar: ${total.toFixed(2)}</p>
      {showUploadOption || replaceComprobante ? (
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setShowUploadOption(false);
              setReplaceComprobante(false);
            }}
          >
            Cerrar Método de Pago
          </Button>
          <CargarComprobante
            orderId={ordenId}
            total={total}
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setReplaceComprobante(true)}
          >
            Reemplazar Comprobante
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowUploadOption(true)}
        >
          Cargar Comprobante de Transferencia
        </Button>
      )}
      <Button variant="contained" color="primary" onClick={handlePayment}>
        Pagar con MercadoPago
      </Button>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </StyledPasarelaPago>
  );
};

export default PasarelaPago;
