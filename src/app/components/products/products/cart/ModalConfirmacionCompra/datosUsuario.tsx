import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import { useUnified } from "../../../../admin/context/contexto";
import { useCart } from "../contextCart/contextCart";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  margin: 20px auto;
`;

interface DatosProps {
  onContinue: (datos: any) => void;
}

const DatosUsuario: React.FC<DatosProps> = ({ onContinue }) => {
  const [nombre, setNombre] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [cart, dispatch] = useCart();

  // Agregando un estado para almacenar los datos del usuario
  const [datosUsuario, setDatosUsuario] = useState<any>(null);

  // Usando el hook useUnified para acceder al token del usuario
  const { userId } = useUnified();
  const userToken = localStorage.getItem("jwt");

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
            orderId: response.data.orderId 
        });
    } else {
        console.error("Error al crear la orden o no se recibió un orderId válido");
    }
    } catch (error) {
      console.error("Error al crear la orden:", error);
    }
  };

  return (
    <FormContainer>
      <Typography variant="h6">Tus Datos</Typography>
      <TextField
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Telefono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Continuar
      </Button>
    </FormContainer>
  );
};

export default DatosUsuario;