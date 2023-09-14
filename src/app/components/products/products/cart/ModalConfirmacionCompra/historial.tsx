import React, { useEffect, useState } from "react";
import {
  useOrders,
  OrderDetail,
  Order,
  ShippingInfo,
  User,
} from "./orderConext";
import {
  OrderContainer,
  ProductsContainer,
  ShippingInfoContainer,
  UserDetail,
  ProductDetail,
  Image,
  ProductInfo,
} from "./modalOrdersStyles";
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

interface UserOrdersResponse {
  user: User;
  orders: Order[];
}

const Historial: React.FC = () => {
  const { orders, setOrders } = useOrders();
  const [orderDetails, setOrderDetails] = useState<OrderDetail[][]>([]);
  const [shippingInfos, setShippingInfos] = useState<ShippingInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<{
    [orderId: number]: string;
  }>({});

  const isClient = typeof window !== "undefined";
  const userToken = isClient ? localStorage.getItem("jwt") : null;
  const [userData, setUserData] = useState<User | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [showUploadForOrder, setShowUploadForOrder] = useState<number | null>(
    null
  );
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
    if (!userToken) {
      setError("Token no encontrado. Asegúrate de estar autenticado.");
      return;
    }
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:3002/api/orders/user-orders",
          {
            headers: {
              "x-auth-token": userToken,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching user orders: ${response.statusText}`);
        }

        const data: UserOrdersResponse = await response.json();
        const orderDetailsPromises: Promise<any>[] = [];
        const shippingInfosPromises: Promise<any>[] = [];

        for (const order of data.orders) {
          const shippingInfoResponse = await fetch(
            `http://localhost:3002/api/orders/order-complete-info/${order.id}`,
            {
              headers: {
                "x-auth-token": userToken,
              },
            }
          );

          if (!shippingInfoResponse.ok) {
            throw new Error(
              `Error fetching shipping info for order ${order.id}: ${shippingInfoResponse.statusText}`
            );
          }

          const shippingData = await shippingInfoResponse.json();
          orderDetailsPromises.push(shippingData.orderDetails);
          shippingInfosPromises.push(shippingData.shippingInfo);
        }

        const allOrderDetails = await Promise.all(orderDetailsPromises);
        const allShippingInfos = await Promise.all(shippingInfosPromises);

        setOrders(data.orders);
        setUserData(data.user);
        setOrderDetails(allOrderDetails);
        setShippingInfos(allShippingInfos);
      } catch (error) {
        setError("Error al obtener las órdenes.");
        console.error(error);
      }
    };

    fetchOrders();
  }, [setOrders]);

  return (
    <div>
      <h2>Historial de Órdenes</h2>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {orders &&
        orders.map((order, index) => (
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
                    {orderDetails[index]?.map((detail) => (
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
                  <div>Dirección: {shippingInfos[index]?.direccion}</div>
                  <div>Ciudad: {shippingInfos[index]?.ciudad}</div>
                  <div>Estado: {shippingInfos[index]?.estado}</div>
                  <div>
                    Código Postal: {shippingInfos[index]?.codigo_postal}
                  </div>
                  <div>País: {shippingInfos[index]?.pais}</div>
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

                          const updatedOrders = [...orders];
                          const orderToUpdate = updatedOrders.find(
                            (o) => o.id === order.id
                          );
                          if (orderToUpdate) {
                            orderToUpdate.comprobante_pago = data.filePath;
                            setOrders(updatedOrders);
                          }
                          handleReplaceComprobante(order.id);
                        }}
                        onUploadError={(error) => {
                          setUploadMessage((prevMessages) => ({
                            ...prevMessages,
                            [order.id]:
                              "Hubo un error al cargar el comprobante. Por favor, intenta de nuevo.",
                          }));
                          handleReplaceComprobante(order.id);
                        }}
                      />
                    )}
                  </OrderSection>
                )}
                {uploadMessage[order.id] && (
                  <div
                    style={{
                      color: uploadMessage[order.id].includes("error")
                        ? "red"
                        : "green",
                    }}
                  >
                    {uploadMessage[order.id]}
                  </div>
                )}
              </OrderDetailsContainer>
            )}
          </StyledOrderContainer>
        ))}
    </div>
  );
};

export default Historial;
