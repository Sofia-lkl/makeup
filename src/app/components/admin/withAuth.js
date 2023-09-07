// withAuth.jsx
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { LoginContext } from "./LoginContext";

export default function withAuth(Component, role) {
  return function ProtectedRoute(props) {
    const { isAuthenticated, userRole } = useContext(LoginContext);
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated || (role && role !== userRole)) {
        router.push("/");
      }
    }, [isAuthenticated, userRole]);

    return <Component {...props} />;
  };
}
