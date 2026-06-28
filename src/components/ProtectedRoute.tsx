import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/config";

interface Props{
children:React.ReactNode;
}

export default function ProtectedRoute({
children
}:Props){

if(!auth.currentUser){

return <Navigate to="/login" replace />;

}

return <>{children}</>;

}