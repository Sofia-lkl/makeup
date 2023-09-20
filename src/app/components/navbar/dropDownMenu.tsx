import React from 'react';

import { styless } from './navbarStyles';

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
  return (
    <div ref={dropdownRef} style={{...styless.dropdownMenu, border: '1px solid red'}}>
      <button style={buttonStyle} onClick={onViewHistory}>Ver Órdenes</button>
      <button style={buttonStyle} onClick={onLogout}>Cerrar Sesión</button>
    </div>
  );
};

const buttonStyle = {
  // Estilo para los botones
  backgroundColor: 'white',
  color: 'black',
  border: '1px solid gray',
  padding: '0.5rem 1rem',
  margin: '0.5rem',
  cursor: 'pointer',
};

export default DropdownMenu;
