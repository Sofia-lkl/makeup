import React from 'react';

import { styless } from './navbarStyles';

interface DropdownMenuProps {
  onLogout: () => void;
  onViewHistory: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onLogout, onViewHistory }) => {
  return (
    <div style={{...styless.dropdownMenu, border: '1px solid red'}}> {/* Agregamos un borde rojo para debuggear */}
      <button style={buttonStyle} onClick={onViewHistory}>Ver Órdenes</button> {/* Estilo explícito */}
      <button style={buttonStyle} onClick={onLogout}>Cerrar Sesión</button> {/* Estilo explícito */}
    </div>
  );
};

const buttonStyle = { // Estilo para los botones
  backgroundColor: 'white',
  color: 'black',
  border: '1px solid gray',
  padding: '0.5rem 1rem',
  margin: '0.5rem',
  cursor: 'pointer',
};

export default DropdownMenu;
