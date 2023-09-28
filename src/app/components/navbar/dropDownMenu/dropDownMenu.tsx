import React from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/store/appHooks";
import { resetNewOrdersCount } from "../../../redux/orderSlice/orderSlice"; 
import { styless } from "../navbarStyles/navbarStyles";
import Badge from "@mui/material/Badge";

interface DropdownMenuProps {
  onLogout: () => void;
  onViewHistory: () => void;
  toggleDropdown: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  onLogout,
  onViewHistory,
  dropdownRef,
}) => {
  const dispatch = useAppDispatch();
  const newOrdersCount = useAppSelector((state) => state.order.newOrdersCount); 

  const handleViewHistoryClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(resetNewOrdersCount()); 
    onViewHistory();
  };

  const handleLogoutClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onLogout();
  };

  return (
    <div
      ref={dropdownRef}
      style={{ ...styless.dropdownMenu, border: "1px solid red" }}
    >
      <button style={buttonStyle} onClick={handleViewHistoryClick}>
        Ver Órdenes 
        {newOrdersCount > 0 && ( 
          <Badge badgeContent={newOrdersCount} color="error" />
        )}
      </button>
      <button style={buttonStyle} onClick={handleLogoutClick}>
        Cerrar Sesión
      </button>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "white",
  color: "black",
  border: "1px solid gray",
  padding: "0.5rem 1rem",
  margin: "0.5rem",
  cursor: "pointer",
  position: "relative",
};


export default DropdownMenu;

