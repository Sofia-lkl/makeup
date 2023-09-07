import React from 'react';

import { styless } from './navbarStyles';

interface DropdownMenuProps {
  onLogout: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onLogout }) => {
  return (
    <div style={styless.dropdownMenu}>
      <button style={styless.dropdownMenuItem} onClick={onLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default DropdownMenu;
