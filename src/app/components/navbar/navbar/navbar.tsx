"use client";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store/appHooks";
import { logout } from "../../../redux/authSlice/authSlice";
import { openLoginModal } from "../../../redux/loginModalSlice/loginModalSlice";
import AdminLogin from "../../admin/login/loginUserAdmin/loginUserAdmin";
import ModalPanel from "../../admin/modalPanel/modalPanel/modalPanel";
import DropdownMenu from "../dropDownMenu/dropDownMenu";
import Cart from "../../products/cart/cartComponent/cart";
import ModalConfirmacionCompra from "../../ModalConfirmacionCompra/modalConfirmacion/modalConfirmacion/modalConfirmacionCompra";
import Historial from "../../ModalConfirmacionCompra/historial/historial/historial";
import Modal from "../../ModalConfirmacionCompra/modalOrders/modalOrders/modalOrders";
import { basicStyles, styles } from "../navbarStyles/navbarStyles";
import { verifyToken } from "../../../redux/authSlice/authThunks";
import {
  InnerMenuContainer,
  MenuWrapper,
  MobileMenuButton,
  NavLinksContainerDesktop,
} from "../navbarStyles/navBarResponsiveStyles";
import styled from "@emotion/styled";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface NavLinkProps {
  href: string;
  label: string;
}
const menuVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  closed: {
    y: "-100%",
    opacity: 0,
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
  },
};

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
  const newOrdersCount = useAppSelector((state) => state.order.newOrdersCount);

  const userRole = useAppSelector((state) => state.auth.userRole);
  const isLoginModalOpen = useAppSelector(
    (state) => state.loginModal.isLoginModalOpen
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const MobileMenuContainer = styled.div<{ isOpen: boolean }>`
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #faf3e0;
  `;
  const AnimatedMenuContainer: React.FC<any> = ({ children, ...props }) => (
    <motion.div
      as={InnerMenuContainer}
      initial="closed"
      animate="open"
      exit="closed"
      variants={menuVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current !== event.target
      ) {
        setTimeout(() => {
          setIsDropdownOpen(false);
        }, 100);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    dispatch(verifyToken())
      .unwrap()
      .then(() => {
        setTimeout(() => {
          setIsDropdownOpen(false);
        }, 50);
      })
      .catch(() => {
        dispatch(logout());
      });
  }, [dispatch]);

  const handleSuccessfulLogin = () => {
    setIsDropdownOpen(false);
  };

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
        <div style={styles.logo}>
          <Image
            src="/img/logo.png"
            alt="Makeup Magic Logo"
            width={100}
            height={50}
          />

          <div style={styles.logoText}>Fabiana Gimenez</div>
        </div>

        {/* Botón de menú para dispositivos móviles */}

        {/* El contenido del menú para pantallas grandes */}
        <NavLinksContainerDesktop>
          <NavLink href="/" label="Inicio" />
          <NavLink href="/products" label="Productos" />
          {isAuthenticated && userRole === "admin" && (
            <button
              style={styles.loginButton}
              onClick={() => setShowAdminModal(true)}
            >
              Panel de Administración
            </button>
          )}
          <NavLink href="/acercaDe" label="Sobre Nosotros" />
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
            <Badge badgeContent={totalItemsInCart} color="error">
              🛒
            </Badge>
          </div>
          {isAuthenticated ? (
            <div style={{ position: "relative" }}>
              <button
                ref={buttonRef}
                style={{
                  ...basicStyles.loginButton,
                  marginLeft: "1rem",
                }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Badge badgeContent={newOrdersCount} color="error">
                  👤
                </Badge>
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
            </div>
          ) : (
            <button
              style={basicStyles.loginButton}
              onClick={() => dispatch(openLoginModal())}
            >
              Iniciar Sesión
            </button>
          )}
        </NavLinksContainerDesktop>

        {/* El contenido del menú para dispositivos móviles */}
        <AnimatePresence>
          {isMenuOpen && (
            <MenuWrapper onClick={() => setIsMenuOpen(false)}>
              <AnimatedMenuContainer
                onClick={(e: { stopPropagation: () => any }) =>
                  e.stopPropagation()
                }
              >
                <MobileMenuContainer isOpen={isMenuOpen}>
                  <InnerMenuContainer>
                    <div className="innerMenuContainer">
                      <NavLink href="/" label="Inicio" />
                      <NavLink href="/products" label="Productos" />
                      {isAuthenticated && userRole === "admin" && (
                        <button
                          style={styles.loginButton}
                          onClick={() => setShowAdminModal(true)}
                        >
                          Panel de Administración
                        </button>
                      )}
                      <NavLink href="/acercaDe" label="Sobre Nosotros" />
                      <NavLink href="/contacto" label="Contacto" />
                      <div
                        style={{
                          marginLeft: "1rem",
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setShowCartModal(true);
                          setIsMenuOpen(false); // Esta línea cierra el menú hamburguesa
                        }}
                      >
                        🛒{" "}
                        <span style={{ marginLeft: "0.5rem" }}>
                          {totalItemsInCart}
                        </span>
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
                  </InnerMenuContainer>
                </MobileMenuContainer>
              </AnimatedMenuContainer>
            </MenuWrapper>
          )}
        </AnimatePresence>

        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <MenuIcon fontSize="large" />
        </MobileMenuButton>
      </div>

      <Fragment>
        {isLoginModalOpen && <AdminLogin onSuccess={handleSuccessfulLogin} />}
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
