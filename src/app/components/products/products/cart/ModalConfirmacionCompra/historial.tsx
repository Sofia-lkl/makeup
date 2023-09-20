import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../contextCart/store/rootReducer";
import {
  fetchUserOrders,
  Order as OrderType,
  OrderDetail,
  ShippingInfo as ShippingInfoType,
  fetchOrdersByStatus,
  deleteOrderById,
} from "./orderSlice";

import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import CargarComprobante from "./uploadComprobant";
import { updateStockFromOrder } from "../contextCart/cart/cartSlice";
import {
  StyledOrderContainer,
  OrderHeader,
  OrderDetailsContainer,
  OrderSection,
  SectionTitle,
  ListItem,
} from "./styledHistorial";

const Historial: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders: OrderType[] = useSelector(
    (state: RootState) => state.order.orders
  );
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

  const handleOrderClick = (orderId: number) => {
    setExpandedOrderId((prevOrderId) =>
      prevOrderId === orderId ? null : orderId
    );
  };
  return (
    <div>
      <h2>Historial de Órdenes</h2>
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
                        // Aquí es donde despachas la acción para actualizar el stock, 
                        // pero ahora debes pasarle los detalles de la orden que acabas de eliminar.
                        const orderToDelete = orders.find(
                          (o) => o.id === result.orderId
                        );
                        if (orderToDelete && orderToDelete.detalles) {
                          dispatch(
                            updateStockFromOrder(orderToDelete.detalles)
                          );
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
                  {order.detalles?.map((detail: OrderDetail) => (
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
                        // Mostrar el mensaje de éxito
                        setUploadMessage((prevMessages) => ({
                          ...prevMessages,
                          [order.id]: "Comprobante cargado con éxito!",
                        }));

                        // Luego, vuelve a obtener la información de las órdenes para actualizar el estado
                        dispatch(fetchUserOrders());
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
