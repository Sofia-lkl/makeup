import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function withAuth(Component, role) {
  return function ProtectedRoute(props) {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userRole = useSelector(state => state.auth.userRole);
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated || (role && role !== userRole)) {
        router.push("/");
      }
    }, [isAuthenticated, userRole, router]); 
    
    return <Component {...props} />;
  };
}
