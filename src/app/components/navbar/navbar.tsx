"use client";
import React, { useState, useContext } from "react";
import { UnifiedContext, useUnified } from "../admin/context/contexto";
import { useCart } from "../products/products/cart/contextCart/contextCart";
import AdminLogin from "../admin/login/loginUserAdmin";
import ModalPanel from "../admin/modalPanel/modalPanel";
import { styles, basicStyles } from "./navbarStyles";
import DropdownMenu from "./dropDownMenu";
import Cart from "../products/products/cart/cart";
import ModalConfirmacionCompra from "../products/products/cart/ModalConfirmacionCompra/modalConfirmacionCompra";
import Historial from "../products/products/cart/ModalConfirmacionCompra/historial"; // Cambia esto a la ruta correcta a tu componente Historial
import Modal from "../products/products/cart/ModalConfirmacionCompra/modalOrders"; // Cambia la ruta a la ubicación correcta de tu componente Modal.

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      style={styles.navLink(isHovered)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </a>
  );
};

const Navbar: React.FC = () => {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cart] = useCart();
  const [showCartModal, setShowCartModal] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const totalItemsInCart = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const { handleLogout, isAuthenticated, userRole } =
    useContext(UnifiedContext);

  const { isLoginModalOpen, setIsLoginModalOpen } = useUnified();

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [cartItems, dispatch] = useCart();

  const openConfirmationModal = () => {
    setIsConfirmationOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationOpen(false);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowCartModal(false);
      setIsLoginModalOpen(true);
    } else {
      setShowCartModal(false);
      openConfirmationModal();
    }
  };

  return (
    <nav style={basicStyles.navbar}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "4rem",
        }}
      >
        <div style={styles.logoContainer}>
          <img
            src="/img/logo.png"
            alt="Makeup Magic Logo"
            style={styles.logo}
          />
          <div style={styles.logoText}>Makeup Magic</div>
        </div>

        <div style={basicStyles.navLinksContainer}>
          <NavLink href="/" label="Inicio" />
          <NavLink href="/productos" label="Productos" />

          {isAuthenticated && userRole === "admin" && (
            <button
              style={styles.loginButton}
              onClick={() => setShowAdminModal(true)}
            >
              Panel de Administración
            </button>
          )}

          <NavLink href="/sobre-nosotros" label="Sobre Nosotros" />
          <NavLink href="/contacto" label="Contacto" />

          <div
            style={{
              marginLeft: "1rem",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setShowCartModal(true)}
          >
            🛒 <span style={{ marginLeft: "0.5rem" }}>{totalItemsInCart}</span>
          </div>

          {isAuthenticated ? (
            <div
              style={{
                ...basicStyles.loginButton,
                position: "relative",
                marginLeft: "1rem",
              }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              👤
              {isDropdownOpen && (
                <DropdownMenu
                  onLogout={handleLogout}
                  onViewHistory={() => setIsHistoryModalOpen(true)} // Pasamos una nueva prop para abrir el modal de historial
                />
              )}
            </div>
          ) : (
            <button
              style={basicStyles.loginButton}
              onClick={() => setIsLoginModalOpen(true)}
            >
              Iniciar Sesión
            </button>
          )}
        </div>

        {isLoginModalOpen && <AdminLogin />}
        {showAdminModal && (
          <ModalPanel
            isOpen={showAdminModal}
            onClose={() => setShowAdminModal(false)}
          />
        )}
      </div>
      {showCartModal && (
        <Cart
          onClose={() => setShowCartModal(false)}
          onCheckout={handleCheckout}
        />
      )}
      <Modal
        isOpen={isHistoryModalOpen}
        title="Historial de Órdenes"
        onClose={() => setIsHistoryModalOpen(false)}
      >
        <Historial />
      </Modal>

      <ModalConfirmacionCompra
        isOpen={isConfirmationOpen}
        onClose={closeConfirmationModal}
        productos={cart}
        onContinuar={closeConfirmationModal}
        dispatch={dispatch}
      />
    </nav>
  );
};

export default Navbar;
