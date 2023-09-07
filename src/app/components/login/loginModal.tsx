import React, { useState, useContext } from "react";
import "./stylesLogin.css";
import { AdminContext } from "../admin/adminContext";
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, isLoading, loginError, } = useContext(AdminContext);

  console.log("LoginModal se está renderizando", {
    isSignUp,
    username,
    password,
    isLoading,
    loginError,
  });

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSubmitSignIn = async () => {
    console.log("handleSubmitSignIn se está ejecutando");

    if (await handleLogin(username, password)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="container">
      <div className={`main ${isSignUp ? "sing-up" : "sing-in"}`}>
        <div className="sing-in-form form-container">
          <h1>Sign in</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitSignIn();
            }}
          >
            <input
              type="text"
              placeholder="Usuario"
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
              {isLoading ? "Cargando..." : "Iniciar sesión"}
            </button>
            {loginError && <div style={{ color: "red" }}>{loginError}</div>}
          </form>
        </div>

        <div className="sing-up-form form-container">
          <h1>Sign up</h1>
          <ul>
            <li>
              <i className="fa-brands fa-facebook-f"></i>
            </li>
            <li>
              <i className="fa-brands fa-google-plus-g"></i>
            </li>
            <li>
              <i className="fa-brands fa-linkedin-in"></i>
            </li>
          </ul>
          <p>Or use your email for registration</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="name" />
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <p>
              <a href="#">Forgot your password?</a>
            </p>
            <button type="submit" className="form-button">
              Sign up
            </button>
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
              <h1>Hello, Friend!</h1>
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

export default LoginModal;
