import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/config";

interface Props{
children:React.ReactNode;
}

export default function ProtectedAdminRoute({
children
}:Props){

const user=auth.currentUser;

if(!user){

return <Navigate to="/login" replace />;

}

if(user.email!=="admin@chic.com"){

return <Navigate to="/home" replace />;

}

return <>{children}</>;

}