import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../redux/store/rootReducer";
import {
  fetchUserOrders,
  Order as OrderType,
  OrderDetail,
  ShippingInfo as ShippingInfoType,
  fetchOrdersByStatus,
  deleteOrderById,
} from "../../../../redux/orderSlice/orderSlice";

import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import CargarComprobante from "../../uploadComprobant/uploadComprobant";
import { updateStockFromOrder } from "../../../../redux/cartSlice/cartSlice";
import {
  StyledOrderContainer,
  OrderHeader,
  OrderDetailsContainer,
  OrderSection,
  SectionTitle,
  ListItem,
  successMessageStyle,
} from "../styledHistorial/styledHistorial";
import axios from "axios";
console.log("Componente Historial se está renderizando");

const Historial: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders: OrderType[] = useSelector(
    (state: RootState) => state.order.orders
  );
  console.log("Órdenes obtenidas:", orders);
  const orderError: string | null = useSelector(
    (state: RootState) => state.order.error
  );

  if (orderError) {
    return <div>Error al obtener las órdenes: {orderError}</div>;
  }
  const userRole: string | null = useSelector(
    (state: RootState) => state.auth.userRole
  );
  const [orderSorting, setOrderSorting] = useState<"asc" | "desc">("desc");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [showUploadForOrder, setShowUploadForOrder] = useState<number | null>(
    null
  );
  const [uploadMessage, setUploadMessage] = useState<{
    [orderId: number]: string;
  }>({});
  const [selectedStatus, setSelectedStatus] = useState<string>("activo");
  const isAdmin = userRole === "admin";
  const getExtensionFromUrl = (url: string) => {
    const match = url.match(/\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gm);
    return match && match[0];
  };
  const handleDownload = async (url: string) => {
    try {
      const response = await axios.get(url, {
        responseType: "blob",
      });

      const extension = getExtensionFromUrl(url);
      const fileName = extension ? `comprobante${extension}` : "comprobante";

      const link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([response.data]));
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error descargando el archivo:", error);
    }
  };
  useEffect(() => {
    if (isAdmin) {
      const fetchParams: any = {
        status: selectedStatus,
        sortByDate: orderSorting,
      };

      if (startDate && endDate) {
        fetchParams.startDate = startDate;
        fetchParams.endDate = endDate;
      }

      dispatch(fetchOrdersByStatus(fetchParams));
    } else {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, isAdmin, selectedStatus, orderSorting, startDate, endDate]);

  const handleReplaceComprobante = (orderId: number) => {
    setShowUploadForOrder((prevOrderId) =>
      prevOrderId === orderId ? null : orderId
    );
  };
  const getOrderDetails = (order: OrderType): OrderDetail[] | undefined => {
    return order.details || order.detalles;
  };
  const handleOrderClick = (orderId: number) => {
    setExpandedOrderId((prevOrderId) =>
      prevOrderId === orderId ? null : orderId
    );
  };
  console.log("Estado seleccionado:", selectedStatus);
  console.log("Ordenamiento seleccionado:", orderSorting);
  console.log("Fecha de inicio:", startDate);
  console.log("Fecha de fin:", endDate);

  return (
    <div>
      {/*       <h2>Historial de Órdenes</h2>
       */}{" "}
      {isAdmin && (
        <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <MenuItem value="activo">Activo</MenuItem>
              <MenuItem value="aprobado">Aprobado</MenuItem>
              <MenuItem value="pendiente">Pendiente</MenuItem>
            </Select>
            <Select
              value={orderSorting}
              onChange={(e) =>
                setOrderSorting(e.target.value as "asc" | "desc")
              }
            >
              <MenuItem value="desc">Fecha - Recientes primero</MenuItem>
              <MenuItem value="asc">Fecha - Antiguos primero</MenuItem>
            </Select>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <TextField
              label="Fecha inicio"
              type="date"
              value={startDate || ""}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Fecha fin"
              type="date"
              value={endDate || ""}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
      )}
      {orders.map((order: OrderType, index: number) => (
        <StyledOrderContainer key={order.id}>
          <OrderHeader onClick={() => handleOrderClick(order.id)}>
            Orden #{index + 1} - {new Date(order.fecha).toLocaleDateString()} -
            Haga clic para ver detalles
          </OrderHeader>

          {isAdmin && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                if (
                  window.confirm(
                    "¿Estás seguro de que deseas eliminar esta orden?"
                  )
                ) {
                  dispatch(deleteOrderById(order.id))
                    .unwrap()
                    .then((result) => {
                      if ("orderId" in result) {
                        const orderToDelete = orders.find(
                          (o) => o.id === result.orderId
                        );
                        if (orderToDelete && orderToDelete.details) {
                          dispatch(updateStockFromOrder(orderToDelete.details));
                        }
                      }
                    })
                    .catch((error) => {
                      console.error("Error al eliminar la orden:", error);
                    });
                }
              }}
            >
              Eliminar Orden
            </Button>
          )}
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
                  {getOrderDetails(order)?.map((detail: OrderDetail) => (
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

              {order.direccion ? (
                <OrderSection>
                  <SectionTitle>Información de Envío</SectionTitle>
                  <div>Dirección: {order.direccion}</div>
                  <div>Ciudad: {order.ciudad}</div>
                  <div>Estado: {order.estado}</div>
                  <div>Código Postal: {order.codigo_postal}</div>
                  <div>País: {order.pais}</div>
                </OrderSection>
              ) : (
                <OrderSection>
                  <SectionTitle>Información de Envío</SectionTitle>
                  <div>No hay información de envío para esta orden.</div>
                </OrderSection>
              )}

              {order.comprobante_pago ? (
                <OrderSection>
                  <SectionTitle>Comprobante de Pago</SectionTitle>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      order.comprobante_pago &&
                      handleDownload(order.comprobante_pago)
                    }
                  >
                    Descargar Comprobante
                  </Button>

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
                        // Mostrar el mensaje de éxito
                        setUploadMessage((prevMessages) => ({
                          ...prevMessages,
                          [order.id]: "Comprobante cargado con éxito!",
                        }));

                        // Esconder el mensaje después de 3 segundos
                        setTimeout(() => {
                          setUploadMessage((prevMessages) => ({
                            ...prevMessages,
                            [order.id]: "",
                          }));
                        }, 3000);

                        // Luego, vuelve a obtener la información de las órdenes para actualizar el estado
                        dispatch(fetchUserOrders());
                      }}
                      onUploadError={(error) => {
                        setUploadMessage((prevMessages) => ({
                          ...prevMessages,
                          [order.id]:
                            "Hubo un error al cargar el comprobante. Por favor, intenta de nuevo (Maximo 10MB).",
                        }));
                      }}
                    />
                  )}
                  {uploadMessage[order.id] && (
                    <div style={successMessageStyle}>
                      {uploadMessage[order.id]}
                    </div>
                  )}
                </OrderSection>
              ) : order.estado === "Aprobado" ? (
                <OrderSection>
                  <SectionTitle>Pago con MercadoPago</SectionTitle>
                  <div>Pago realizado exitosamente con MercadoPago</div>
                </OrderSection>
              ) : null}
            </OrderDetailsContainer>
          )}
        </StyledOrderContainer>
      ))}
    </div>
  );
};

export default Historial;
