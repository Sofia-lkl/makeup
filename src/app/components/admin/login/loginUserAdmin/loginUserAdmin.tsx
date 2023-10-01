import React, { useState, useEffect, useCallback } from "react";
import "./stylesLogin.css";
import { BeatLoader } from "react-spinners";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../redux/store/appHooks";
import { RootState } from "../../../../redux/store/rootReducer";
import {
  loginUser,
  registerUser,
} from "../../../../redux/authSlice/authThunks";
import { closeLoginModal } from "../../../../redux/loginModalSlice/loginModalSlice";
import {
  setLoginMessage,
  setLoginError,
  clearMessages,
  setLoading,
} from "../../../../redux/messagesSlice/messagesSlice";

interface AdminLoginProps {
  onSuccess?: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const isLoginModalOpen = useAppSelector(
    (state: RootState) => state.loginModal.isLoginModalOpen
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.messages.isLoading
  );
  const loginMessage = useAppSelector(
    (state: RootState) => state.messages.loginMessage
  );
  const loginError = useAppSelector(
    (state: RootState) => state.messages.loginError
  );

  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setUsername("");
    setPassword("");
    setEmail("");
    dispatch(clearMessages());
  }, [dispatch]);

  const handleModalClose = useCallback(() => {
    dispatch(closeLoginModal());
    setUsername("");
    setPassword("");
    setEmail("");
    dispatch(clearMessages());
  }, [dispatch]);

  const handleSignInClick = () => setIsSignUp(false);
  const handleSignUpClick = () => setIsSignUp(true);
  useEffect(() => {
    if (isDropdownOpen) {
      /*       console.log("Dropdown está abierto");
       */
    }
  }, [isDropdownOpen]);
  useEffect(() => {
    if (loginMessage) {
      if (loginMessage === "Registro exitoso") {
        setIsSignUp(false);
      } else if (loginMessage === "Inicio de sesión exitoso") {
        setTimeout(() => {
          handleModalClose();
          dispatch(setLoading(false));
        }, 2000);
      }
    }
  }, [loginMessage, dispatch, handleModalClose]);

  const handleSubmitSignIn = (username: string, password: string) => {
    dispatch(loginUser({ username, password }))
      .then((action) => {
        if (loginUser.fulfilled.match(action)) {
          dispatch(setLoginMessage("Inicio de sesión exitoso"));
          setIsDropdownOpen(false);
          if (typeof onSuccess === "function") {
            onSuccess();
          }
        }
      })
      .catch(() => {
        dispatch(setLoginError("Error al iniciar sesión"));
      });
  };

  const handleSubmitSignUp = (
    username: string,
    password: string,
    email: string
  ) => {
    dispatch(registerUser({ username, password, email }))
      .then((action) => {
        if (registerUser.fulfilled.match(action)) {
          dispatch(setLoginMessage("Registro exitoso"));
          dispatch(setLoginError(null));
        }
      })
      .catch(() => {
        dispatch(
          setLoginError(
            "Error desconocido al registrarse. Por favor, intente nuevamente."
          )
        );
      });
  };

  if (!isLoginModalOpen) return null;
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
              {isLoading ? (
                <BeatLoader size={8} color={"#123abc"} />
              ) : (
                "Iniciar sesión"
              )}
            </button>

            {loginError && <div style={{ color: "red" }}>{loginError}</div>}
            {loginMessage && (
              <div style={{ color: "green" }}>{loginMessage}</div>
            )}
          </form>
        </div>

        <div className="sing-up-form form-container">
          <h1>Regístrate</h1>

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
              placeholder="Correo"
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
              {isLoading ? (
                <BeatLoader size={8} color={"#123abc"} />
              ) : (
                "Registrarse"
              )}
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
              <h1>¡Bienvenide de nuevo!</h1>
              <p>
                Para seguir conectade con nosotros, por favor inicia sesión con
                tus datos.
              </p>
              <button onClick={handleSignInClick} className="board-button">
                Iniciar sesión
              </button>
            </div>
            <div className={`board sing-up ${isSignUp ? "sliding" : ""}`}>
              <h1>¡Hola!</h1>
              <p>
                Ingresa tus datos personales y comienza tu experiencia con
                nosotros.
              </p>
              <button onClick={handleSignUpClick} className="board-button">
                Regístrate
              </button>
            </div>
          </div>
          <button
            onClick={handleModalClose}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
