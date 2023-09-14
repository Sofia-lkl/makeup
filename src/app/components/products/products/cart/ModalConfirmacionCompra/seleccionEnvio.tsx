import React, { useState } from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  TextField,
} from "@mui/material";
import { StyledSeleccionEnvio } from "./styledSeccionEnvio";
import axios from "axios";

interface SeleccionEnvioProps {
  orden_id: string; 
  onContinue: (datos: {
    metodo_envio: string;
    direccion: string;
    ciudad: string;
    estado: string;
    codigo_postal: string;
    pais: string;
  }) => void;
  datosEnvio?: {
    metodo_envio: string;
    direccion: string;
    ciudad: string;
    estado: string;
    codigo_postal: string;
    pais: string;
  };
}

const SeleccionEnvio: React.FC<SeleccionEnvioProps> = ({
  orden_id, 
  onContinue,
  datosEnvio,
}) => {
  console.log("orden_id en SeleccionEnvio:", orden_id); 

  const [metodo_envio, setMetodoEnvio] = useState<string>(
    datosEnvio?.metodo_envio || ""
  );
  const [direccion, setDireccion] = useState<string>(
    datosEnvio?.direccion || ""
  );
  const [ciudad, setCiudad] = useState<string>(datosEnvio?.ciudad || "");
  const [estado, setEstado] = useState<string>(datosEnvio?.estado || "");
  const [codigo_postal, setCodigoPostal] = useState<string>(
    datosEnvio?.codigo_postal || ""
  );
  const [pais, setPais] = useState<string>(datosEnvio?.pais || "");

  const handleMetodoEnvioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMetodoEnvio((event.target as HTMLInputElement).value);
  };

  const handleSubmit = async () => {
    // Log para verificar los valores antes de enviar
    console.log("Datos de envío antes de enviar:", {
      orden_id,
      metodo_envio,
      direccion,
      ciudad,
      estado,
      codigo_postal,
      pais,
    });

    const userToken = localStorage.getItem("jwt"); 
    console.log("Token del usuario:", userToken);

    try {
      const response = await axios.post(
        "http://localhost:3002/api/orders/create/shipping-info",
        {
          orden_id, 
          metodo_envio,
          direccion,
          ciudad,
          estado,
          codigo_postal,
          pais,
        },
        {
          headers: {
            "x-auth-token": userToken, 
          },
        }
      );
      console.log("Respuesta completa del servidor:", response);
      if (response.data.success) {
        onContinue({
          metodo_envio,
          direccion,
          ciudad,
          estado,
          codigo_postal,
          pais,
        }); 
      } else {
        console.error("Error del backend:", response.data.message);
      }
    } catch (error) {
      console.error("Error enviando datos de envío:", error);
    }
  };

  return (
    <StyledSeleccionEnvio>
      <h6>Selecciona tu método de envío</h6>
      <RadioGroup
        aria-label="metodoEnvio"
        name="metodoEnvio"
        value={metodo_envio}
        onChange={handleMetodoEnvioChange}
      >
        <FormControlLabel
          value="express"
          control={<Radio />}
          label="Envío Express (1-2 días)"
        />
        <FormControlLabel
          value="recoger"
          control={<Radio />}
          label="Recoger en Tienda"
        />
      </RadioGroup>
      <TextField
        label="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ciudad"
        value={ciudad}
        onChange={(e) => setCiudad(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Estado"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Código Postal"
        value={codigo_postal}
        onChange={(e) => setCodigoPostal(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="País"
        value={pais}
        onChange={(e) => setPais(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: "1rem" }}
      >
        Continuar
      </Button>

    </StyledSeleccionEnvio>
  );
};

export default SeleccionEnvio;
