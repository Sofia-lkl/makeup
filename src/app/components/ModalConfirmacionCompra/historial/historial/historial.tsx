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
  updateOrderState,
  changeOrderStatus,
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
import { FaUser, FaBox, FaShippingFast, FaCreditCard } from "react-icons/fa";

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
  const handleCompleteOrder = (orderId: number) => {
    // Actualizar el estado en Redux y en el backend
    dispatch(changeOrderStatus({ orderId, newState: "Completado" }))
      .unwrap()
      .then((updatedOrder) => {
        console.log("Orden actualizada:", updatedOrder);

        // Vuelve a obtener la lista de órdenes
        if (isAdmin) {
          dispatch(
            fetchOrdersByStatus({
              status: selectedStatus,
              sortByDate: orderSorting,
              startDate: startDate || undefined, // Convertir null a undefined
              endDate: endDate || undefined, // Convertir null a undefined
            })
          );
        } else {
          dispatch(fetchUserOrders());
        }
      })
      .catch((error) => {
        console.error("Error al actualizar la orden:", error);
      });
  };

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
              <MenuItem value="aprobado">Aprobado</MenuItem>
              <MenuItem value="completado">Completado</MenuItem>
              <MenuItem value="activo">Activo</MenuItem>
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
            <span> Haga clic para ver detalles</span>
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
          {order.estado === "Aprobado" && isAdmin && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleCompleteOrder(order.id)}
            >
              Marcar como Completado
            </Button>
          )}

          {expandedOrderId === order.id && (
            <OrderDetailsContainer>
              {/* Sección de Datos del Usuario */}
              <OrderSection>
                <SectionTitle>
                  <FaUser /> Datos del Usuario
                </SectionTitle>
                <div>Nombre: {order.nombre}</div>
                <div>Email: {order.email}</div>
                <div>Teléfono: {order.telefono}</div>
              </OrderSection>
              <OrderSection>
                <SectionTitle>
                  <FaBox /> Productos
                </SectionTitle>
                <ul>
                  {getOrderDetails(order)?.map((detail: OrderDetail) => (
                    <ListItem key={detail.producto_id}>
                      <img
                        src={detail?.imagen_url}
                        alt={`Producto ${detail.nombre}`}
                        width="50"
                      />
                      <div>Producto: {detail.nombre}</div>
                      <div>Cantidad: {detail.cantidad}</div>
                      <div>Precio: {detail.precio}</div>
                    </ListItem>
                  ))}
                </ul>
              </OrderSection>
              {order.direccion ? (
                <OrderSection>
                  <SectionTitle>
                    <FaShippingFast /> Información de Envío
                  </SectionTitle>
                  <div>Dirección: {order.direccion}</div>
                  <div>Ciudad: {order.ciudad}</div>
                  <div>Estado: {order.estado}</div>
                  <div>Código Postal: {order.codigo_postal}</div>
                  <div>País: {order.pais}</div>
                </OrderSection>
              ) : (
                <OrderSection>
                  <SectionTitle>
                    <FaShippingFast /> Información de Envío
                  </SectionTitle>
                  <div>No hay información de envío para esta orden.</div>
                </OrderSection>
              )}

              {order.comprobante_pago ? (
                <OrderSection>
                  <SectionTitle>
                    <FaCreditCard /> Comprobante de Pago
                  </SectionTitle>

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
                  <SectionTitle>
                    <FaCreditCard /> Pago con MercadoPago
                  </SectionTitle>
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
