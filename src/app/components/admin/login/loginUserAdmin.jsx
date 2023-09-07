import React, { useState, useEffect, useContext } from "react";
import "./stylesLogin.css";
import { BeatLoader } from "react-spinners";
import { UnifiedContext, useUnified } from "../context/contexto";

const AdminLogin = () => {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    isLoading,
    loginMessage,
    handleSubmitSignUp,
    handleSubmitSignIn,
    loginError,
  } = useUnified();

  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Controladores de eventos
  const handleSignInClick = () => setIsSignUp(false);
  const handleSignUpClick = () => setIsSignUp(true);

  // Efectos secundarios
  useEffect(() => {
    if (loginMessage === "Registro exitoso") {
      setIsSignUp(false); // Cambia a la vista de inicio de sesión
    }
    if (loginMessage === "Inicio de sesión exitoso") {
      setTimeout(() => setIsLoginModalOpen(false), 2000); // Cierra el modal
    }
  }, [loginMessage, setIsLoginModalOpen]);

  // Salida condicional
  if (!isLoginModalOpen) return null;

  // Renderizado del componente
  return (
    <div className="container">
      <div className={`main ${isSignUp ? "sing-up" : "sing-in"}`}>
        <div className="sing-in-form form-container">
          <h1>Sign in</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitSignIn(username, password);
            }}
          >
            <input
              type="text"
              placeholder="usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="form-button" disabled={isLoading}>
              {isLoading ? <BeatLoader color={"#123abc"} /> : "Iniciar sesión"}
            </button>
            {loginError && <div style={{ color: "red" }}>{loginError}</div>}
            {loginMessage && (
              <div style={{ color: "green" }}>{loginMessage}</div>
            )}
          </form>
        </div>

        <div className="sing-up-form form-container">
          <h1>Sign up</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitSignUp(username, password, email);
            }}
          >
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="form-button" disabled={isLoading}>
              {isLoading ? <BeatLoader color={"#123abc"} /> : "Registrarse"}
            </button>
            {loginError && <div style={{ color: "red" }}>{loginError}</div>}
            {loginMessage && (
              <div style={{ color: "green" }}>{loginMessage}</div>
            )}
          </form>
        </div>

        <div className={`sliding-board ${isSignUp ? "" : "sliding"}`}>
          <div className="wide-board">
            <div className={`board sing-in ${isSignUp ? "" : "sliding"}`}>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button onClick={handleSignInClick} className="board-button">
                Sign in
              </button>
            </div>
            <div className={`board sing-up ${isSignUp ? "sliding" : ""}`}>
              <h1>Helloo, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button onClick={handleSignUpClick} className="board-button">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;
