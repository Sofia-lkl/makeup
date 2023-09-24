import React, { ChangeEvent } from "react";
import axios from "axios";

interface CargarComprobanteProps {
  orderId: string | null;
  total?: number;
  onUploadSuccess: (data: any) => void;
  onUploadError: (error: any) => void;
  loadedComprobante?: File | null;
}

const CargarComprobante: React.FC<CargarComprobanteProps> = ({
  orderId,
  total,
  onUploadSuccess,
  onUploadError,
  loadedComprobante,
}) => {
  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (!file) return;

      const formData = new FormData();
      formData.append("comprobante", file);

      try {
        const response = await axios.post(
          `http://localhost:3002/api/orders/upload-comprobante/${orderId}`,
          formData
        );
        onUploadSuccess(response.data);
      } catch (error) {
        onUploadError(error);
      }
    }
  };

  return (
    <div>
      <h6>Detalles para Transferencia Bancaria:</h6>
      <p>
        <strong>Nombre de la Cuenta:</strong> Tu Nombre o Nombre de Empresa
      </p>
      <p>
        <strong>CBU:</strong> 12345678901234567890
      </p>
      <p>
        <strong>Banco:</strong> Nombre del Banco
      </p>
      <p>
        <strong>Alias CBU:</strong> ALIASCBU
      </p>
      <p>
        <strong>Total a transferir:</strong> ${total ? total.toFixed(2) : "N/A"}
      </p>
      <input type="file" onChange={handleUpload} />
      {loadedComprobante && (
        <div>Archivo cargado: {loadedComprobante.name}</div>
      )}
    </div>
  );
};

export default CargarComprobante;
