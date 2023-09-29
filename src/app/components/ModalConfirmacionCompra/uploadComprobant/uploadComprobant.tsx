import React, { ChangeEvent, useState } from "react";
import axios, { AxiosError } from "axios";

interface UploadSuccessResponse {
  message: string;
  estado: string;
  comprobante: File;
}
interface CargarComprobanteProps {
  orderId: string | null;
  total?: number;
  onUploadSuccess: (data: UploadSuccessResponse) => void;
  onUploadError: (error: AxiosError<ErrorResponse>) => void;
  loadedComprobante?: File | null;
}
interface ErrorResponse {
  message?: string;
}

const CargarComprobante: React.FC<CargarComprobanteProps> = ({
  orderId,
  total,
  onUploadSuccess,
  onUploadError,
  loadedComprobante,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (!file) return;

      const formData = new FormData();
      formData.append("comprobante", file);

      try {
        const response = await axios.post<UploadSuccessResponse>(
          `http://localhost:3003/api/orders/upload-comprobante/${orderId}`,
          formData
        );
        onUploadSuccess(response.data);
        setErrorMessage(null);
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        onUploadError(axiosError);
        if (axiosError.response?.data?.message) {
          setErrorMessage(axiosError.response.data.message);
        } else {
          setErrorMessage("Ocurrió un error al subir el archivo.");
        }
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
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {loadedComprobante && (
        <div>Archivo cargado: {loadedComprobante.name}</div>
      )}
    </div>
  );
};

export default CargarComprobante;
