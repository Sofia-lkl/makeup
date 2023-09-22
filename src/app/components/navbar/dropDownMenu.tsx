import React from "react";

import { styless } from "./navbarStyles";

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
  buttonRef,
}) => {
  const handleViewHistoryClick = (event: React.MouseEvent) => {
    event.stopPropagation();
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
      </button>
      <button style={buttonStyle} onClick={handleLogoutClick}>
        Cerrar Sesión
      </button>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "white",
  color: "black",
  border: "1px solid gray",
  padding: "0.5rem 1rem",
  margin: "0.5rem",
  cursor: "pointer",
};

export default DropdownMenu;
