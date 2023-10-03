// pages/perfil/index.tsx

import React, { useEffect } from "react";
import {
  useAppSelector,
  useAppDispatch,
} from "../../src/app/redux/store/appHooks"; // Ajusta la ruta según donde estén tus hooks personalizados
import { fetchUserDetails } from "../../src/app/redux/userDetailSlice/userDetailsThunks";

const PerfilPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const userDetailsState = useAppSelector((state) => state.userDetails);

  useEffect(() => {
    if (authState.userId) {
      dispatch(fetchUserDetails(authState.userId));
    }
  }, [authState.userId, dispatch]);
  

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mi Perfil</h1>

      <section>
        <h2>Datos Personales</h2>
        {userDetailsState.isLoading ? (
          <p>Cargando detalles...</p>
        ) : (
          <>
            <p>Nombre de usuario: {userDetailsState.userDetails?.username}</p>
            <p>Correo electrónico: {userDetailsState.userDetails?.email}</p>
          </>
        )}
      </section>

      {/* ... resto de la página, como las órdenes, etc. ... */}
    </div>
  );
};

export default PerfilPage;
