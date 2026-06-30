import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { getUserRole } from "../firebase/roles";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedAdminRoute({ children }: Props) {

  const user = auth.currentUser;

  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {

    const checkRole = async () => {

      if (!user) {
        setLoading(false);
        return;
      }

      const role = await getUserRole(user.uid);

      setAllowed(role === "owner");

      setLoading(false);

    };

    checkRole();

  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#050505",
          color: "#D4AF37",
          fontSize: "22px",
          fontWeight: "bold"
        }}
      >
        جاري التحقق من الصلاحيات...
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}