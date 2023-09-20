"use client";
import React, { useState, useEffect, Fragment, useRef } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../products/products/cart/contextCart/store/appHooks";
import { logout } from "../admin/context/authSlice/authSlice";
import {
  openLoginModal,
  closeLoginModal,
} from "../admin/context/loginModalSlice/loginModalSlice";
import AdminLogin from "../admin/login/loginUserAdmin";
import ModalPanel from "../admin/modalPanel/modalPanel";
import DropdownMenu from "./dropDownMenu";
import Cart from "../products/products/cart/cart";
import ModalConfirmacionCompra from "../products/products/cart/ModalConfirmacionCompra/modalConfirmacionCompra";
import Historial from "../products/products/cart/ModalConfirmacionCompra/historial";
import Modal from "../products/products/cart/ModalConfirmacionCompra/modalOrders";
import { basicStyles, styles } from "./navbarStyles";
import { verifyToken } from "../admin/context/authSlice/authThunks";
import { PayloadAction } from "@reduxjs/toolkit";

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
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userRole = useAppSelector((state) => state.auth.userRole);
  const isLoginModalOpen = useAppSelector(
    (state) => state.loginModal.isLoginModalOpen
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const totalItemsInCart = cartItems.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );

  const openConfirmationModal = () => setIsConfirmationOpen(true);
  const closeConfirmationModal = () => setIsConfirmationOpen(false);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowCartModal(false);
      dispatch(openLoginModal());
    } else {
      setShowCartModal(false);
      openConfirmationModal();
    }
  };

  const handleLogout = () => dispatch(logout());
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current !== event.target // Añade esta línea
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(verifyToken())
      .unwrap()
      .then((action) => {
        // Colapsar el menú desplegable cuando un usuario inicie sesión
        setIsDropdownOpen(false);
      })
      .catch(() => {
        dispatch(logout());
      });
  }, [dispatch]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
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
            <>
              <button
                ref={buttonRef}
                style={{
                  ...basicStyles.loginButton,
                  position: "relative",
                  marginLeft: "1rem",
                }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                👤
              </button>

              {isDropdownOpen && (
                <DropdownMenu
                  onLogout={handleLogout}
                  onViewHistory={() => setIsHistoryModalOpen(true)}
                  toggleDropdown={toggleDropdown}
                  dropdownRef={dropdownRef}
                  buttonRef={buttonRef}
                />
              )}
            </>
          ) : (
            <button
              style={basicStyles.loginButton}
              onClick={() => dispatch(openLoginModal())}
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
      <Fragment>
        {isLoginModalOpen && <AdminLogin />}
        {showAdminModal && (
          <ModalPanel
            isOpen={showAdminModal}
            onClose={() => setShowAdminModal(false)}
          />
        )}
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
          onContinuar={closeConfirmationModal}
        />
      </Fragment>
    </nav>
  );
};

export default Navbar;
