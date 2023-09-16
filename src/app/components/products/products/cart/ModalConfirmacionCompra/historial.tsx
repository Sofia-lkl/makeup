import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../contextCart/store/rootReducer";
import {
  fetchUserOrders,
  Order as OrderType,
  OrderDetail as OrderDetailType,
  ShippingInfo as ShippingInfoType,
} from "./orderSlice";
import {
  StyledOrderContainer,
  OrderHeader,
  OrderDetailsContainer,
  OrderSection,
  SectionTitle,
  ListItem,
} from "./styledHistorial";
import { Button } from "@mui/material";
import CargarComprobante from "./uploadComprobant";

const Historial: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders: OrderType[] = useSelector(
    (state: RootState) => state.order.orders
  );

  console.log("Orders:", orders); // <-- Añadido para diagnóstico

  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [showUploadForOrder, setShowUploadForOrder] = useState<number | null>(
    null
  );
  const [uploadMessage, setUploadMessage] = useState<{
    [orderId: number]: string;
  }>({});

  const handleReplaceComprobante = (orderId: number) => {
    if (showUploadForOrder === orderId) {
      setShowUploadForOrder(null);
    } else {
      setShowUploadForOrder(orderId);
    }
  };

  const handleOrderClick = (orderId: number) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return (
    <div>
      <h2>Historial de Órdenes</h2>

      {orders.map((order: OrderType, index: number) => (
        <StyledOrderContainer key={order.id}>
          <OrderHeader onClick={() => handleOrderClick(order.id)}>
            Orden #{index + 1} - Haga clic para ver detalles
          </OrderHeader>

          {expandedOrderId === order.id && (
            <OrderDetailsContainer>
              <OrderSection>
                <SectionTitle>Datos del Usuario</SectionTitle>
                <div>Nombre: {order.nombre}</div>
                <div>Email: {order.email}</div>
                <div>Teléfono: {order.telefono}</div>
              </OrderSection>

              <OrderSection>
                <SectionTitle>Productos</SectionTitle>
                <ul>
                  {order.detalles?.map((detail: OrderDetailType) => (
                    <ListItem key={detail.producto_id}>
                      <img
                        src={detail?.imagen_url}
                        alt={`Producto ${detail.producto_id}`}
                        width="50"
                      />
                      Producto ID: {detail.producto_id}, Cantidad:{" "}
                      {detail.cantidad}, Precio: {detail.precio}
                    </ListItem>
                  ))}
                </ul>
              </OrderSection>

              <OrderSection>
                <SectionTitle>Información de Envío</SectionTitle>
                <div>Dirección: {order.shippingInfo?.direccion}</div>
                <div>Ciudad: {order.shippingInfo?.ciudad}</div>
                <div>Estado: {order.shippingInfo?.estado}</div>
                <div>Código Postal: {order.shippingInfo?.codigo_postal}</div>
                <div>País: {order.shippingInfo?.pais}</div>
              </OrderSection>

              {order.comprobante_pago && (
                <OrderSection>
                  <SectionTitle>Comprobante de Pago</SectionTitle>
                  <a
                    href={`http://localhost:3002${order.comprobante_pago}`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="contained" color="secondary">
                      Descargar Comprobante
                    </Button>
                  </a>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleReplaceComprobante(order.id)}
                  >
                    Reemplazar Comprobante
                  </Button>
                  {showUploadForOrder === order.id && (
                    <CargarComprobante
                      orderId={order.id.toString()}
                      onUploadSuccess={(data) => {
                        setUploadMessage((prevMessages) => ({
                          ...prevMessages,
                          [order.id]: "Comprobante cargado con éxito!",
                        }));
                      }}
                      onUploadError={(error) => {
                        setUploadMessage((prevMessages) => ({
                          ...prevMessages,
                          [order.id]:
                            "Hubo un error al cargar el comprobante. Por favor, intenta de nuevo.",
                        }));
                      }}
                    />
                  )}
                </OrderSection>
              )}
            </OrderDetailsContainer>
          )}
        </StyledOrderContainer>
      ))}
    </div>
  );
};

export default Historial;
