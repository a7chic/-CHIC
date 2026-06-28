import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({
children
}:{
children:React.ReactNode;
}){

const {user,loading}=useAuth();

if(loading){

return <div style={{padding:"40px",color:"#D4AF37"}}>جاري التحميل...</div>;

}

if(!user){

return <Navigate to="/login" replace/>;

}

return <>{children}</>;

}