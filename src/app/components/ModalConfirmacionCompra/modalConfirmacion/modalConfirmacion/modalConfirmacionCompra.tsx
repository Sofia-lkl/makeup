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
} from "../modalConfirmacionStyles/modalConfirmacionCompraStyles";
import { useAppSelector } from "../../../../redux/store/appHooks";
import {
  incrementItem,
  decrementItem,
  removeItem,
} from "../../../../redux/cartSlice/cartSlice";
import { Stepper } from "../../stepper/stepper";
import DatosUsuario from "../../datosUsuario/datosUsuario/datosUsuario";
import SeleccionEnvio from "../../seccionEnvio/seccionEnvio/seleccionEnvio";
import PasarelaPago from "../../pasarelaPago/pasarelaPago/pasarelaPago";
import { useDispatch } from "react-redux";
import Image from "next/image";
interface ModalConfirmacionCompraProps {
  isOpen: boolean;
  onClose: () => void;
  onContinuar: () => void;
}

interface DatosUsuarioType {
  nombre: string;
  email: string;
  telefono: string;
}

interface DatosEnvioType {
  metodo_envio: string;
  direccion: string;
  ciudad: string;
  estado: string;
  codigo_postal: string;
  pais: string;
}

const ModalConfirmacionCompra: React.FC<ModalConfirmacionCompraProps> = ({
  isOpen,
  onClose,
  onContinuar,
}) => {
  const productos = useAppSelector((state) => state.cart);

  const [currentStep, setCurrentStep] = useState(1);
  const [ordenId, setOrdenId] = useState<string | null>(null);
  const [datosUsuario, setDatosUsuario] = useState<DatosUsuarioType | null>(
    null
  );
  const [datosEnvio, setDatosEnvio] = useState<DatosEnvioType | null>(null);

  const total = productos.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setDatosUsuario(null);
    }
  }, [isOpen]);
  const dispatch = useDispatch();

  const incrementar = (id: number) => dispatch(incrementItem(id));
  const decrementar = (id: number) => dispatch(decrementItem(id));
  const eliminar = (id: number) => dispatch(removeItem(id));

  const handleContinuar = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      onContinuar();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            {productos.map((producto) => (
              <ProductRow key={producto.id}>
                <ProductName>
                  <Image
                    src={producto?.imagen_url || "/path/to/default/image.jpg"}
                    alt={producto.nombre}
                    width={100}
                    height={100}
                  />
                  <span>{producto.nombre}</span>
                </ProductName>
                <ProductPrice>
                  ${(producto.precio * producto.cantidad).toFixed(2)}
                </ProductPrice>
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              {currentStep > 1 && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Volver
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleContinuar}
              >
                Continuar
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <DatosUsuario
            onContinue={(data) => {
              setDatosUsuario({
                nombre: data.nombre,
                email: data.email,
                telefono: data.telefono,
              });
              setOrdenId(data.orderId);
              setCurrentStep(currentStep + 1);
            }}
            onBack={() => {
              setCurrentStep(currentStep - 1);
            }}
          />
        );
      case 3:
        return (
          <SeleccionEnvio
            orden_id={ordenId || ""}
            onContinue={(datos) => {
              setDatosEnvio(datos);
              setCurrentStep(currentStep + 1);
            }}
            onBack={() => {
              setCurrentStep(currentStep - 1);
            }}
          />
        );
      case 4:
        if (datosUsuario && datosEnvio && ordenId) {
          return (
            <PasarelaPago
              onPaymentSuccess={() => onContinuar()}
              onPaymentFailure={() => {}}
              total={total}
              datosUsuario={datosUsuario}
              datosEnvio={datosEnvio}
              ordenId={ordenId}
            />
          );
        } else {
          return null;
        }
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalContent>
        <Stepper currentStep={currentStep} />
        {renderStepContent()}
        {currentStep === 4 && (
          <Button variant="contained" color="primary" onClick={handleContinuar}>
            Finalizar
          </Button>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalConfirmacionCompra;
