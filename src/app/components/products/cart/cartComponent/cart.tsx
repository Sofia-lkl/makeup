import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  incrementItem,
  decrementItem,
  removeItem,
  CartState,
} from "../../../../redux/cartSlice/cartSlice";

import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import {
  CartMainContainer,
  CartHeaderContainer,
  CartEmptyMessage,
  CartFooter,
  CartHeader,
  CloseButton,
  CheckoutButton,
} from "../stylesCartComponent/stylesCart";

import { RootState } from "../../../../redux/store/rootReducer";

interface CartProps {
  onClose: () => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({ onClose, onCheckout }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);
  const cartItemsToDisplay = cartItems.filter((item) => item.stock > 0);
  const canCheckout = cartItems.every((item) => item.stock > 0);
  const cartRef = useRef<HTMLDivElement>(null);

  const handleRemove = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleIncrement = (id: number) => {
    const currentItem = cartItems.find((item) => item.id === id);
    if (currentItem && currentItem.cantidad < currentItem.stock) {
      dispatch(incrementItem(id));
    }
  };

  const handleDecrement = (id: number) => {
    const currentItem = cartItems.find((item) => item.id === id);
    if (currentItem && currentItem.cantidad > 1) {
      dispatch(decrementItem(id));
    }
  };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);
  return (
    <CartMainContainer ref={cartRef}>
      <CartHeaderContainer>
        <CartHeader>Tu Carrito</CartHeader>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </CartHeaderContainer>

      {cartItemsToDisplay.length === 0 ? (
        <CartEmptyMessage>Tu carrito está vacío.</CartEmptyMessage>
      ) : (
        <>
          <List>
            {cartItemsToDisplay.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <img
                    src={item.imagen_url}
                    alt={item.nombre}
                    style={{ width: "50px", marginRight: "10px" }}
                  />
                  <ListItemText
                    primary={item.nombre}
                    secondary={`$${item.precio.toFixed(2)} x ${item.cantidad} ${
                      item.stock === 0
                        ? "(Agotado)"
                        : item.stock < 3
                        ? "(Pocas unidades disponibles)"
                        : ""
                    }`}
                  />

                  <IconButton onClick={() => handleIncrement(item.id)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDecrement(item.id)}>
                    <RemoveIcon />
                  </IconButton>
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemove(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <CartFooter>
            <Typography variant="h6">
              Total: $
              {cartItemsToDisplay
                .reduce((acc, item) => acc + item.precio * item.cantidad, 0)
                .toFixed(2)}
            </Typography>
            <CheckoutButton onClick={onCheckout} disabled={!canCheckout}>
              Finalizar Compra
            </CheckoutButton>
          </CartFooter>
        </>
      )}
    </CartMainContainer>
  );
};

export default Cart;
