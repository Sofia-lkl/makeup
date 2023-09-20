import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../contextCart/store/rootReducer";
import {
  StyledFormContainer,
  StyledButtonContainer,
  StyledTextField,
} from "./styleDatosUsuario";

interface DatosProps {
  onContinue: (datos: any) => void;
  onBack: () => void;
}

const DatosUsuario: React.FC<DatosProps> = ({ onContinue, onBack }) => {
  const [nombre, setNombre] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");

  const cart = useSelector((state: RootState) => state.cart); 
  const userId = useSelector((state: RootState) => state.auth.userId);
  const userToken = localStorage.getItem("jwt");

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Valores del estado antes de enviar:", {
      nombre,
      telefono,
      email,
    });

    try {
      const response = await axios.post(
        "http://localhost:3002/api/orders/create",
        {
          total: 100,
          userId,
          nombre,
          email,
          telefono,
          productos: cart,
        },
        {
          headers: {
            "x-auth-token": userToken,
          },
        }
      );

      if (response.status === 201 && response.data && response.data.orderId) {
        console.log("Orden creada con éxito", response.data);
        onContinue({
          nombre,
          email,
          telefono,
          orderId: response.data.orderId,
        });
      } else {
        console.error(
          "Error al crear la orden o no se recibió un orderId válido"
        );
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
    }
  };

  return (
    <StyledFormContainer>
      <Typography variant="h6">Tus Datos</Typography>
      <StyledTextField
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <StyledTextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <StyledTextField
        label="Telefono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      <StyledButtonContainer>
        <Button variant="contained" color="secondary" onClick={onBack}>
          Volver
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Continuar
        </Button>
      </StyledButtonContainer>
    </StyledFormContainer>
  );
};

export default DatosUsuario;
