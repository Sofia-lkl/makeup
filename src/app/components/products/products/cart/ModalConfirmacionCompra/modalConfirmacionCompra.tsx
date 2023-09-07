import React, { useState, useEffect } from "react";
import { Modal, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  ModalContent,
  Total,
  Button,
  ProductRow,
  ProductName,
  ProductPrice,
  ProductQuantity,
} from "./styleModalConfirmacion/modalConfirmacionCompraStyles";
import { CartState } from "../contextCart/contextCart";
import { Stepper } from "../ModalConfirmacionCompra/stepper"; // Importamos Stepper en vez de Step

interface ModalConfirmacionCompraProps {
  isOpen: boolean;
  productos: CartState;
  onClose: () => void;
  onContinuar: () => void;
  dispatch?: React.Dispatch<any>;
}

const ModalConfirmacionCompra: React.FC<ModalConfirmacionCompraProps> = ({
  isOpen,
  productos,
  onClose,
  onContinuar,
  dispatch,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const total = productos.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
    }
  }, [isOpen]);

  const incrementar = (id: number) => {
    if (dispatch) {
      dispatch({ type: "INCREMENT_ITEM", id });
    }
  };

  const decrementar = (id: number) => {
    if (dispatch) {
      dispatch({ type: "DECREMENT_ITEM", id });
    }
  };

  const eliminar = (id: number) => {
    if (dispatch) {
      dispatch({ type: "REMOVE_ITEM", id });
    }
  };

  const handleContinuar = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onContinuar();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalContent>
        <Stepper currentStep={currentStep} />{" "}
        {/* Usamos Stepper en vez de las llamadas individuales a Step */}
        {productos.map((producto) => (
          <ProductRow key={producto.id}>
            <ProductName>
              <img src={producto.imagen_url} alt={producto.nombre} />
              <span>{producto.nombre}</span>
            </ProductName>
            <ProductPrice>${producto.precio.toFixed(2)}</ProductPrice>
            <ProductQuantity>
              <IconButton
                color="primary"
                onClick={() => decrementar(producto.id)}
              >
                <RemoveIcon />
              </IconButton>
              {producto.cantidad}
              <IconButton
                color="primary"
                onClick={() => incrementar(producto.id)}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() => eliminar(producto.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ProductQuantity>
          </ProductRow>
        ))}
        <Total>
          <span>Total:</span> <span>${total.toFixed(2)}</span>
        </Total>
        <Button variant="contained" color="primary" onClick={handleContinuar}>
          {currentStep < 3 ? "Siguiente" : "Finalizar"}
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default ModalConfirmacionCompra;
